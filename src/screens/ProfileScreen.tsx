import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export const ProfileScreen: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      {/* Header Profil Pengguna */}
      <View style={styles.profileHeaderCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.avatarInitial}>AP</Text>
        </View>
        <View style={styles.profileMeta}>
          <Text style={styles.profileName}>Ananda Pratama</Text>
          <Text style={styles.profilePhone}>+62 812-3456-7890</Text>
          <View style={styles.tierPill}>
            <MaterialCommunityIcons name="crown-outline" size={13} color="#B45309" />
            <Text style={styles.tierPillText}>Member Prioritas</Text>
          </View>
        </View>
      </View>

      {/* Status Transaksi / Pesanan */}
      <View style={styles.cardSection}>
        <View style={styles.cardSectionHeader}>
          <Text style={styles.cardSectionTitle}>Transaksi Saya</Text>
          <TouchableOpacity>
            <Text style={styles.cardSectionLink}>Riwayat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orderStatusRow}>
          {[
            { label: 'Belum Bayar', icon: 'credit-card' as const },
            { label: 'Dikemas', icon: 'package' as const },
            { label: 'Dikirim', icon: 'truck' as const },
            { label: 'Beri Ulasan', icon: 'star' as const },
          ].map((st, i) => (
            <TouchableOpacity key={i} style={styles.orderStatusCol} activeOpacity={0.7}>
              <View style={styles.orderStatusIconBox}>
                <Feather name={st.icon} size={20} color="#334155" />
              </View>
              <Text style={styles.orderStatusLabel}>{st.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Menu Pengaturan Akun */}
      <View style={styles.cardSection}>
        {[
          { label: 'Daftar Alamat Pengiriman', icon: 'map-pin' as const },
          { label: 'Metode Pembayaran Tersimpan', icon: 'credit-card' as const },
          { label: 'Kupon & Voucher Diskon', icon: 'tag' as const },
          { label: 'Pusat Bantuan & Kebijakan', icon: 'help-circle' as const },
          { label: 'Pengaturan Akun', icon: 'settings' as const },
        ].map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.settingsRow} activeOpacity={0.7}>
            <View style={styles.settingsLeft}>
              <Feather name={item.icon} size={18} color="#64748B" />
              <Text style={styles.settingsLabel}>{item.label}</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#CBD5E1" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.signOutBtn}
        onPress={() => Alert.alert('Keluar', 'Apakah Anda yakin ingin keluar dari akun?')}
      >
        <Text style={styles.signOutBtnText}>Keluar dari Akun</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 24,
  },
  profileHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileMeta: {
    marginLeft: 14,
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  profilePhone: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  tierPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
    gap: 3,
  },
  tierPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSectionLink: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '600',
  },
  orderStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderStatusCol: {
    alignItems: 'center',
    flex: 1,
  },
  orderStatusIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  orderStatusLabel: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '500',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsLabel: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  signOutBtn: {
    marginHorizontal: 16,
    marginTop: 4,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
  },
  signOutBtnText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700',
  },
});
