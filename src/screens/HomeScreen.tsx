import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Product, Category } from '../types';
import { PromoBanner } from '../components/home/PromoBanner';
import { QuickServices } from '../components/home/QuickServices';
import { CategoryChips } from '../components/home/CategoryChips';
import { ProductGrid } from '../components/product/ProductGrid';

interface HomeScreenProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  products: Product[];
  wishlist: string[];
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onNavigateCatalog: () => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onTriggerSkeleton: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  products,
  wishlist,
  isLoading,
  isRefreshing,
  onRefresh,
  onNavigateCatalog,
  onSelectProduct,
  onToggleWishlist,
  onAddToCart,
  onTriggerSkeleton,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['#0F172A']} />
      }
    >
      <PromoBanner isLoading={isLoading} onPressCTA={onNavigateCatalog} />

      <QuickServices />

      {/* Baris Kategori */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeading}>Kategori</Text>
        <TouchableOpacity onPress={onNavigateCatalog}>
          <Text style={styles.sectionMoreLink}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>

      <CategoryChips
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        isLoading={isLoading}
      />

      {/* Rekomendasi Section */}
      <View style={[styles.sectionHeaderRow, { marginTop: 20 }]}>
        <Text style={styles.sectionHeading}>Rekomendasi Untuk Anda</Text>
        <TouchableOpacity onPress={onTriggerSkeleton}>
          <Text style={styles.sectionRefreshLink}>
            <Feather name="refresh-cw" size={11} /> Refresh
          </Text>
        </TouchableOpacity>
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
  sectionMoreLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionRefreshLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
});
