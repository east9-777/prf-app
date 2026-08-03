import React from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useAuth } from '@/context/AuthContext';
import { CONTEUDO_SUBJECTS } from '@/lib/conteudoData';
import { formatDate } from '@/lib/dateUtils';

export default function PerfilScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const topPadding = insets.top + (Platform.OS === 'web' ? 67 : 12);
  const totalTopics = CONTEUDO_SUBJECTS.reduce((a, s) => a + s.topics.length, 0);

  const handleSignOut = () => {
    Alert.alert('Sair', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/login');
        },
      },
    ]);
  };

  const infoRows = [
    { icon: 'user', label: 'Usuário', value: user?.username ?? '—' },
    { icon: 'calendar', label: 'Membro desde', value: user?.createdAt ? formatDate(user.createdAt) : '—' },
    { icon: 'book', label: 'Matérias disponíveis', value: String(CONTEUDO_SUBJECTS.length) },
    { icon: 'list', label: 'Total de tópicos', value: String(totalTopics) },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: topPadding, paddingBottom: insets.bottom + (Platform.OS === 'web' ? 34 : 0) + 80 },
        ]}
      >
        <Text style={[styles.screenTitle, { color: colors.text }]}>Perfil</Text>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatar, { backgroundColor: colors.primary + '22' }]}>
            <Feather name="user" size={40} color={colors.primary} />
          </View>
          <Text style={[styles.username, { color: colors.text }]}>
            {user?.username ?? 'Candidato'}
          </Text>
          <View style={[styles.roleBadge, { backgroundColor: colors.primary + '18' }]}>
            <Text style={[styles.roleText, { color: colors.primary }]}>Candidato PRF</Text>
          </View>
        </View>

        {/* Info */}
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {infoRows.map((row, i) => (
            <React.Fragment key={row.label}>
              <View style={styles.infoRow}>
                <View style={[styles.infoIcon, { backgroundColor: colors.muted }]}>
                  <Feather name={row.icon as any} size={14} color={colors.mutedForeground} />
                </View>
                <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>{row.label}</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{row.value}</Text>
              </View>
              {i < infoRows.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* About */}
        <View style={[styles.aboutCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }]}>
          <Feather name="shield" size={18} color={colors.primary} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={[styles.aboutTitle, { color: colors.primary }]}>Project P.R.F</Text>
            <Text style={[styles.aboutText, { color: colors.primary }]}>
              App de preparação para o concurso da Polícia Rodoviária Federal. Conteúdo baseado no edital com exemplos, exercícios comentados e simulados estilo CEBRASPE.
            </Text>
          </View>
        </View>

        {/* Sign out */}
        <Pressable
          style={({ pressed }) => [
            styles.signOutBtn,
            { backgroundColor: '#C6282818', borderColor: '#C6282830', opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={handleSignOut}
        >
          <Feather name="log-out" size={16} color="#C62828" />
          <Text style={styles.signOutText}>Encerrar sessão</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 16, gap: 16 },
  screenTitle: { fontFamily: 'Inter_700Bold', fontSize: 28, letterSpacing: -0.5 },
  avatarSection: { alignItems: 'center', gap: 10, paddingVertical: 16 },
  avatar: { width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center' },
  username: { fontFamily: 'Inter_700Bold', fontSize: 20 },
  roleBadge: { paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20 },
  roleText: { fontFamily: 'Inter_500Medium', fontSize: 12 },
  infoCard: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  infoIcon: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontFamily: 'Inter_400Regular', fontSize: 13, flex: 1 },
  infoValue: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  divider: { height: StyleSheet.hairlineWidth, marginHorizontal: 14 },
  aboutCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  aboutTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  aboutText: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  signOutText: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: '#C62828' },
});
