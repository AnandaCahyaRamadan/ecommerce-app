import React from 'react';
import { View, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useShop } from '../../src/context/ShopContext';
import { TopAppBar } from '../../src/components/common/TopAppBar';
import { HomeScreen } from '../../src/screens/HomeScreen';

export default function HomeRoute() {
  const router = useRouter();
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    wishlist,
    isLoading,
    isRefreshing,
    handleRefresh,
    setSelectedProduct,
    toggleWishlist,
    addToCart,
    triggerSkeleton,
    searchQuery,
    setSearchQuery,
    totalCartCount,
  } = useShop();

  return (
    <View style={styles.container}>
      <TopAppBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onCartPress={() => router.push('/cart')}
      />
      <View style={styles.content}>
        <HomeScreen
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => {
            setSelectedCategory(id);
            triggerSkeleton();
          }}
          products={filteredProducts}
          wishlist={wishlist}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onNavigateCatalog={() => router.push('/catalog')}
          onSelectProduct={(product) => router.push(`/product/${product.id}` as any)}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
          onTriggerSkeleton={triggerSkeleton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 44,
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
