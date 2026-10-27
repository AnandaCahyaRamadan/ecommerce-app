import React from 'react';
import { View, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useShop } from '../../src/context/ShopContext';
import { WishlistScreen } from '../../src/screens/WishlistScreen';

export default function WishlistRoute() {
  const router = useRouter();
  const {
    wishlistProducts,
    wishlist,
    setSelectedProduct,
    toggleWishlist,
    addToCart,
  } = useShop();

  return (
    <View style={styles.container}>
      <WishlistScreen
        wishlistProducts={wishlistProducts}
        wishlist={wishlist}
        onSelectProduct={(product) => router.push(`/product/${product.id}` as any)}
        onToggleWishlist={toggleWishlist}
        onAddToCart={addToCart}
        onNavigateExplore={() => router.push('/catalog')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 44,
  },
});
