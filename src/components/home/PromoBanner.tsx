import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SkeletonBlock } from '../common/Skeleton';

interface PromoBannerProps {
  isLoading: boolean;
  onPressCTA: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ isLoading, onPressCTA }) => {
  if (isLoading) {
    return (
      <View style={styles.skeletonWrap}>
        <SkeletonBlock width="100%" height={130} borderRadius={14} />
      </View>
    );
  }

  return (
    <View style={styles.promoBanner}>
      <View style={styles.bannerBadge}>
        <Text style={styles.bannerBadgeText}>LIMITED OFFER</Text>
      </View>
      <Text style={styles.bannerHeadline}>Ekstra Diskon hingga 35%</Text>
      <Text style={styles.bannerSub}>
        Voucher gratis ongkir s/d Rp50.000 untuk produk audio & apparel pilihan.
      </Text>
      <TouchableOpacity
        style={styles.bannerCTA}
        activeOpacity={0.85}
        onPress={onPressCTA}
      >
        <Text style={styles.bannerCTAText}>Belanja Sekarang</Text>
        <Feather name="arrow-right" size={14} color="#0F172A" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonWrap: {
    marginHorizontal: 16,
    marginTop: 14,
  },
  promoBanner: {
    backgroundColor: '#0F172A',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 18,
  },
  bannerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  bannerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bannerHeadline: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  bannerSub: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 14,
  },
  bannerCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 6,
  },
  bannerCTAText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '700',
  },
});
