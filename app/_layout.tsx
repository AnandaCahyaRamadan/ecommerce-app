import React from 'react';
import { View, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ShopProvider, useShop } from '../src/context/ShopContext';
import { ToastNotification } from '../src/components/common/ToastNotification';
import { ProductDetailModal } from '../src/components/product/ProductDetailModal';

function RootLayoutContent() {
  const {
    toastText,
    selectedProduct,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    addToCart,
  } = useShop();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F8FAFC' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="product/[id]"
          options={{
            presentation: 'card',
            headerShown: false,
          }}
        />
      </Stack>

      {/* Global Toast */}
      <ToastNotification message={toastText} />

      {/* Quick View / Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={() => selectedProduct && toggleWishlist(selectedProduct.id)}
        onAddToCart={addToCart}
      />
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ShopProvider>
        <RootLayoutContent />
      </ShopProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
