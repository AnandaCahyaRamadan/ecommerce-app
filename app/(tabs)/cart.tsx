import React from 'react';
import { View, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useShop } from '../../src/context/ShopContext';
import { CartScreen } from '../../src/screens/CartScreen';

export default function CartRoute() {
  const router = useRouter();
  const {
    cart,
    selectedCartTotal,
    selectedItemCount,
    toggleSelectCartItem,
    updateCartQty,
    handleCheckout,
  } = useShop();

  return (
    <View style={styles.container}>
      <CartScreen
        cart={cart}
        selectedCartTotal={selectedCartTotal}
        selectedItemCount={selectedItemCount}
        onToggleSelect={toggleSelectCartItem}
        onUpdateQty={updateCartQty}
        onCheckout={handleCheckout}
        onNavigateHome={() => router.push('/')}
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
