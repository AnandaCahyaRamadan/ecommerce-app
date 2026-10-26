import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { SkeletonProductCard } from '../common/Skeleton';

interface ProductGridProps {
  products: Product[];
  wishlist: string[];
  isLoading?: boolean;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  wishlist,
  isLoading,
  onSelectProduct,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (isLoading) {
    return (
      <View style={styles.gridContainer}>
        <SkeletonProductCard />
        <SkeletonProductCard />
        <SkeletonProductCard />
        <SkeletonProductCard />
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.emptyGridState}>
        <Feather name="search" size={40} color="#CBD5E1" />
        <Text style={styles.emptyGridTitle}>Produk Tidak Ditemukan</Text>
        <Text style={styles.emptyGridDesc}>
          Coba cari dengan kata kunci lain atau pilih kategori yang berbeda.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.gridContainer}>
      {products.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          isWishlisted={wishlist.includes(item.id)}
          onPress={() => onSelectProduct(item)}
          onToggleWishlist={() => onToggleWishlist(item.id)}
          onAddToCart={() => onAddToCart(item)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  emptyGridState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyGridTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 10,
  },
  emptyGridDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
});
