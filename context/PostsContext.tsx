import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { getData, storeData, STORAGE_KEYS } from "@/lib/storage";
import {
  MOCK_COMMENTS,
  MOCK_COMMUNITY_POSTS,
  MOCK_POSTS,
} from "@/lib/mockData";
import type { Comment, Post } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

interface PostsContextType {
  novelPosts: Post[];
  communityPosts: Post[];
  comments: Comment[];
  isLoading: boolean;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  toggleCommentLike: (commentId: string) => void;
  addPost: (
    post: Omit<
      Post,
      | "id"
      | "createdAt"
      | "likes"
      | "likedBy"
      | "commentCount"
      | "savedBy"
      | "reportedBy"
    >
  ) => void;
  deletePost: (postId: string) => void;
  togglePin: (postId: string) => void;
  addComment: (
    comment: Omit<Comment, "id" | "likes" | "likedBy" | "createdAt">
  ) => void;
  getPostComments: (postId: string) => Comment[];
  refreshPosts: () => Promise<void>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [novelPosts, setNovelPosts] = useState<Post[]>([]);
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const novelPostIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    novelPostIds.current = new Set(novelPosts.map((p) => p.id));
  }, [novelPosts]);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      loadLocalPosts();
      return;
    }

    setIsLoading(true);

    const novelQ = query(
      collection(db, "posts"),
      orderBy("isPinned", "desc"),
      orderBy("createdAt", "desc")
    );
    const communityQ = query(
      collection(db, "communityPosts"),
      orderBy("createdAt", "desc")
    );
    const commentsQ = query(
      collection(db, "comments"),
      orderBy("createdAt", "asc")
    );

    let novelLoaded = false;
    let communityLoaded = false;
    let commentsLoaded = false;

    const checkAllLoaded = () => {
      if (novelLoaded && communityLoaded && commentsLoaded) {
        setIsLoading(false);
      }
    };

    const unsubNovel = onSnapshot(novelQ, (snap) => {
      const posts = snap.docs.map((d) => ({
        ...(d.data() as Omit<Post, "id">),
        id: d.id,
        createdAt:
          (d.data().createdAt?.toDate?.() ?? new Date()).toISOString(),
      }));
      setNovelPosts(posts);
      novelLoaded = true;
      checkAllLoaded();
    });

    const unsubCommunity = onSnapshot(communityQ, (snap) => {
      const posts = snap.docs.map((d) => ({
        ...(d.data() as Omit<Post, "id">),
        id: d.id,
        createdAt:
          (d.data().createdAt?.toDate?.() ?? new Date()).toISOString(),
      }));
      setCommunityPosts(posts);
      communityLoaded = true;
      checkAllLoaded();
    });

    const unsubComments = onSnapshot(commentsQ, (snap) => {
      const c = snap.docs.map((d) => ({
        ...(d.data() as Omit<Comment, "id">),
        id: d.id,
        createdAt:
          (d.data().createdAt?.toDate?.() ?? new Date()).toISOString(),
      }));
      setComments(c);
      commentsLoaded = true;
      checkAllLoaded();
    });

    return () => {
      unsubNovel();
      unsubCommunity();
      unsubComments();
    };
  }, []);

  const loadLocalPosts = async () => {
    setIsLoading(true);
    try {
      const [storedPosts, storedCommunity, storedComments] = await Promise.all([
        getData<Post[]>(STORAGE_KEYS.POSTS),
        getData<Post[]>(STORAGE_KEYS.COMMUNITY_POSTS),
        getData<Comment[]>(STORAGE_KEYS.COMMENTS),
      ]);

      if (!storedPosts || storedPosts.length === 0) {
        setNovelPosts(MOCK_POSTS);
        await storeData(STORAGE_KEYS.POSTS, MOCK_POSTS);
      } else {
        setNovelPosts(storedPosts);
      }

      if (!storedCommunity || storedCommunity.length === 0) {
        setCommunityPosts(MOCK_COMMUNITY_POSTS);
        await storeData(STORAGE_KEYS.COMMUNITY_POSTS, MOCK_COMMUNITY_POSTS);
      } else {
        setCommunityPosts(storedCommunity);
      }

      if (!storedComments || storedComments.length === 0) {
        setComments(MOCK_COMMENTS);
        await storeData(STORAGE_KEYS.COMMENTS, MOCK_COMMENTS);
      } else {
        setComments(storedComments);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLike = useCallback(
    async (postId: string) => {
      if (!user) return;
      const uid = user.id;

      if (!isFirebaseConfigured) {
        const update = (posts: Post[]) =>
          posts.map((p) => {
            if (p.id !== postId) return p;
            const liked = p.likedBy.includes(uid);
            return {
              ...p,
              likes: liked ? p.likes - 1 : p.likes + 1,
              likedBy: liked
                ? p.likedBy.filter((id) => id !== uid)
                : [...p.likedBy, uid],
            };
          });

        const isNovel = novelPostIds.current.has(postId);
        if (isNovel) {
          setNovelPosts((prev) => {
            const next = update(prev);
            storeData(STORAGE_KEYS.POSTS, next);
            return next;
          });
        } else {
          setCommunityPosts((prev) => {
            const next = update(prev);
            storeData(STORAGE_KEYS.COMMUNITY_POSTS, next);
            return next;
          });
        }
        return;
      }

      const isNovel = novelPostIds.current.has(postId);
      const colName = isNovel ? "posts" : "communityPosts";
      const allPosts = isNovel ? novelPosts : communityPosts;
      const post = allPosts.find((p) => p.id === postId);
      if (!post) return;

      const liked = post.likedBy.includes(uid);
      const postRef = doc(db, colName, postId);
      await updateDoc(postRef, {
        likes: increment(liked ? -1 : 1),
        likedBy: liked ? arrayRemove(uid) : arrayUnion(uid),
      });

      if (!liked) {
        const authorRef = doc(db, "users", post.authorId);
        await updateDoc(authorRef, { likesReceived: increment(1) });
      }
    },
    [user, novelPosts, communityPosts]
  );

  const toggleSave = useCallback(
    async (postId: string) => {
      if (!user) return;
      const uid = user.id;

      if (!isFirebaseConfigured) {
        const update = (posts: Post[]) =>
          posts.map((p) => {
            if (p.id !== postId) return p;
            const saved = p.savedBy.includes(uid);
            return {
              ...p,
              savedBy: saved
                ? p.savedBy.filter((id) => id !== uid)
                : [...p.savedBy, uid],
            };
          });
        setNovelPosts((prev) => {
          const next = update(prev);
          storeData(STORAGE_KEYS.POSTS, next);
          return next;
        });
        setCommunityPosts((prev) => {
          const next = update(prev);
          storeData(STORAGE_KEYS.COMMUNITY_POSTS, next);
          return next;
        });
        return;
      }

      const allPosts = [...novelPosts, ...communityPosts];
      const post = allPosts.find((p) => p.id === postId);
      if (!post) return;

      const isNovel = novelPostIds.current.has(postId);
      const colName = isNovel ? "posts" : "communityPosts";
      const postRef = doc(db, colName, postId);
      const saved = post.savedBy.includes(uid);
      await updateDoc(postRef, {
        savedBy: saved ? arrayRemove(uid) : arrayUnion(uid),
      });
    },
    [user, novelPosts, communityPosts]
  );

  const toggleCommentLike = useCallback(
    async (commentId: string) => {
      if (!user) return;
      const uid = user.id;

      if (!isFirebaseConfigured) {
        setComments((prev) => {
          const next = prev.map((c) => {
            if (c.id !== commentId) return c;
            const liked = c.likedBy.includes(uid);
            return {
              ...c,
              likes: liked ? c.likes - 1 : c.likes + 1,
              likedBy: liked
                ? c.likedBy.filter((id) => id !== uid)
                : [...c.likedBy, uid],
            };
          });
          storeData(STORAGE_KEYS.COMMENTS, next);
          return next;
        });
        return;
      }

      const comment = comments.find((c) => c.id === commentId);
      if (!comment) return;
      const liked = comment.likedBy.includes(uid);
      const commentRef = doc(db, "comments", commentId);
      await updateDoc(commentRef, {
        likes: increment(liked ? -1 : 1),
        likedBy: liked ? arrayRemove(uid) : arrayUnion(uid),
      });
    },
    [user, comments]
  );

  const addPost = useCallback(
    async (
      post: Omit<
        Post,
        | "id"
        | "createdAt"
        | "likes"
        | "likedBy"
        | "commentCount"
        | "savedBy"
        | "reportedBy"
      >
    ) => {
      const newPostData = {
        ...post,
        likes: 0,
        likedBy: [],
        commentCount: 0,
        savedBy: [],
        reportedBy: [],
        createdAt: serverTimestamp(),
      };

      if (!isFirebaseConfigured) {
        const newPost: Post = {
          ...post,
          id: `post_${Date.now()}`,
          createdAt: new Date().toISOString(),
          likes: 0,
          likedBy: [],
          commentCount: 0,
          savedBy: [],
          reportedBy: [],
        };
        if (post.type === "novidades") {
          setNovelPosts((prev) => {
            const next = [newPost, ...prev];
            storeData(STORAGE_KEYS.POSTS, next);
            return next;
          });
        } else {
          setCommunityPosts((prev) => {
            const next = [newPost, ...prev];
            storeData(STORAGE_KEYS.COMMUNITY_POSTS, next);
            return next;
          });
        }
        if (user) {
          await updateDoc(doc(db, "users", user.id), {
            postCount: increment(1),
          }).catch(() => {});
        }
        return;
      }

      const colName =
        post.type === "novidades" ? "posts" : "communityPosts";
      await addDoc(collection(db, colName), newPostData);

      if (user) {
        await updateDoc(doc(db, "users", user.id), {
          postCount: increment(1),
        });
      }
    },
    [user]
  );

  const deletePost = useCallback(
    async (postId: string) => {
      if (!isFirebaseConfigured) {
        setNovelPosts((prev) => {
          const next = prev.filter((p) => p.id !== postId);
          storeData(STORAGE_KEYS.POSTS, next);
          return next;
        });
        setCommunityPosts((prev) => {
          const next = prev.filter((p) => p.id !== postId);
          storeData(STORAGE_KEYS.COMMUNITY_POSTS, next);
          return next;
        });
        return;
      }

      const isNovel = novelPostIds.current.has(postId);
      const colName = isNovel ? "posts" : "communityPosts";
      await deleteDoc(doc(db, colName, postId));
    },
    []
  );

  const togglePin = useCallback(
    async (postId: string) => {
      if (!isFirebaseConfigured) {
        setNovelPosts((prev) => {
          const next = prev.map((p) =>
            p.id === postId ? { ...p, isPinned: !p.isPinned } : p
          );
          storeData(STORAGE_KEYS.POSTS, next);
          return next;
        });
        return;
      }

      const post = novelPosts.find((p) => p.id === postId);
      if (!post) return;
      await updateDoc(doc(db, "posts", postId), {
        isPinned: !post.isPinned,
      });
    },
    [novelPosts]
  );

  const addComment = useCallback(
    async (
      comment: Omit<Comment, "id" | "likes" | "likedBy" | "createdAt">
    ) => {
      if (!isFirebaseConfigured) {
        const newComment: Comment = {
          ...comment,
          id: `c_${Date.now()}`,
          createdAt: new Date().toISOString(),
          likes: 0,
          likedBy: [],
        };
        setComments((prev) => {
          const next = [...prev, newComment];
          storeData(STORAGE_KEYS.COMMENTS, next);
          return next;
        });
        const updateCount = (posts: Post[], key: string) => {
          const next = posts.map((p) =>
            p.id === comment.postId
              ? { ...p, commentCount: p.commentCount + 1 }
              : p
          );
          storeData(key, next);
          return next;
        };
        setNovelPosts((prev) =>
          updateCount(prev, STORAGE_KEYS.POSTS)
        );
        setCommunityPosts((prev) =>
          updateCount(prev, STORAGE_KEYS.COMMUNITY_POSTS)
        );
        return;
      }

      const commentData = {
        ...comment,
        likes: 0,
        likedBy: [],
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "comments"), commentData);

      const isNovel = novelPostIds.current.has(comment.postId);
      const colName = isNovel ? "posts" : "communityPosts";
      await updateDoc(doc(db, colName, comment.postId), {
        commentCount: increment(1),
      });

      if (user) {
        await updateDoc(doc(db, "users", user.id), {
          commentCount: increment(1),
        });
      }
    },
    [user]
  );

  const getPostComments = useCallback(
    (postId: string) =>
      comments.filter((c) => c.postId === postId && !c.parentId),
    [comments]
  );

  const refreshPosts = useCallback(async () => {
    if (!isFirebaseConfigured) {
      await loadLocalPosts();
    }
  }, []);

  return (
    <PostsContext.Provider
      value={{
        novelPosts,
        communityPosts,
        comments,
        isLoading,
        toggleLike,
        toggleSave,
        toggleCommentLike,
        addPost,
        deletePost,
        togglePin,
        addComment,
        getPostComments,
        refreshPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within PostsProvider");
  return ctx;
}
