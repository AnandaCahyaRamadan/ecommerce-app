import React from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Product, Category } from '../types';
import { CategoryChips } from '../components/home/CategoryChips';
import { ProductGrid } from '../components/product/ProductGrid';

interface CatalogScreenProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  products: Product[];
  wishlist: string[];
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  products,
  wishlist,
  isLoading,
  isRefreshing,
  onRefresh,
  onSelectProduct,
  onToggleWishlist,
  onAddToCart,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['#0F172A']} />
      }
    >
      <View style={styles.catalogFilterBar}>
        <CategoryChips
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeading}>Daftar Produk</Text>
        <Text style={styles.sectionMeta}>Menampilkan {products.length} hasil</Text>
      </View>

      <ProductGrid
        products={products}
        wishlist={wishlist}
        isLoading={isLoading}
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
  catalogFilterBar: {
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
});
