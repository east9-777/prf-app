import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getData, storeData, STORAGE_KEYS } from "@/lib/storage";
import {
  MOCK_POSTS,
  MOCK_COMMUNITY_POSTS,
  MOCK_COMMENTS,
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
  addPost: (post: Omit<Post, "id" | "createdAt" | "likes" | "likedBy" | "commentCount" | "savedBy" | "reportedBy">) => void;
  deletePost: (postId: string) => void;
  togglePin: (postId: string) => void;
  addComment: (comment: Omit<Comment, "id" | "likes" | "likedBy" | "createdAt">) => void;
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

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const stored = await getData<Post[]>(STORAGE_KEYS.POSTS);
      const storedCommunity = await getData<Post[]>(STORAGE_KEYS.COMMUNITY_POSTS);
      const storedComments = await getData<Comment[]>(STORAGE_KEYS.COMMENTS);

      if (!stored || stored.length === 0) {
        setNovelPosts(MOCK_POSTS);
        await storeData(STORAGE_KEYS.POSTS, MOCK_POSTS);
      } else {
        setNovelPosts(stored);
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
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const toggleLike = useCallback(
    (postId: string) => {
      if (!user) return;
      const uid = user.id;

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

      const isNovel = novelPosts.some((p) => p.id === postId);
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
    },
    [user, novelPosts]
  );

  const toggleSave = useCallback(
    (postId: string) => {
      if (!user) return;
      const uid = user.id;

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
    },
    [user]
  );

  const toggleCommentLike = useCallback(
    (commentId: string) => {
      if (!user) return;
      const uid = user.id;
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
    },
    [user]
  );

  const addPost = useCallback(
    (post: Omit<Post, "id" | "createdAt" | "likes" | "likedBy" | "commentCount" | "savedBy" | "reportedBy">) => {
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
    },
    []
  );

  const deletePost = useCallback((postId: string) => {
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
  }, []);

  const togglePin = useCallback((postId: string) => {
    setNovelPosts((prev) => {
      const next = prev.map((p) =>
        p.id === postId ? { ...p, isPinned: !p.isPinned } : p
      );
      storeData(STORAGE_KEYS.POSTS, next);
      return next;
    });
  }, []);

  const addComment = useCallback(
    (comment: Omit<Comment, "id" | "likes" | "likedBy" | "createdAt">) => {
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

      const updateCommentCount = (posts: Post[], key: string) => {
        const next = posts.map((p) =>
          p.id === comment.postId
            ? { ...p, commentCount: p.commentCount + 1 }
            : p
        );
        storeData(key, next);
        return next;
      };

      setNovelPosts((prev) => updateCommentCount(prev, STORAGE_KEYS.POSTS));
      setCommunityPosts((prev) => updateCommentCount(prev, STORAGE_KEYS.COMMUNITY_POSTS));

      if (user) {
        import("@/lib/storage").then(({ getData: gd, storeData: sd, STORAGE_KEYS: sk }) => {
          gd<any>(sk.USER).then((u) => {
            if (u) sd(sk.USER, { ...u, commentCount: (u.commentCount || 0) + 1 });
          });
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
    await loadPosts();
  }, [loadPosts]);

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
