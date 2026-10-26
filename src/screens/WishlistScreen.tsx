import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Product } from '../types';
import { ProductGrid } from '../components/product/ProductGrid';

interface WishlistScreenProps {
  wishlistProducts: Product[];
  wishlist: string[];
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onNavigateExplore: () => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  wishlistProducts,
  wishlist,
  onSelectProduct,
  onToggleWishlist,
  onAddToCart,
  onNavigateExplore,
}) => {
  if (wishlistProducts.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Feather name="heart" size={54} color="#CBD5E1" />
        <Text style={styles.emptyTitle}>Wishlist Masih Kosong</Text>
        <Text style={styles.emptyDesc}>
          Simpan barang yang Anda incar dengan menekan ikon hati untuk dibeli nanti.
        </Text>
        <TouchableOpacity style={styles.emptyActionBtn} onPress={onNavigateExplore}>
          <Text style={styles.emptyActionBtnText}>Mulai Eksplorasi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeading}>Barang Disimpan</Text>
        <Text style={styles.sectionMeta}>{wishlistProducts.length} item</Text>
      </View>

      <ProductGrid
        products={wishlistProducts}
        wishlist={wishlist}
        onSelectProduct={onSelectProduct}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionMeta: {
    fontSize: 12,
    color: '#64748B',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  emptyActionBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 18,
  },
  emptyActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
