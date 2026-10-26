import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CartItem } from '../types';
import { CartItemRow } from '../components/cart/CartItemRow';
import { formatRupiah } from '../data/mockData';

interface CartScreenProps {
  cart: CartItem[];
  selectedCartTotal: number;
  selectedItemCount: number;
  onToggleSelect: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
  onNavigateHome: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  selectedCartTotal,
  selectedItemCount,
  onToggleSelect,
  onUpdateQty,
  onCheckout,
  onNavigateHome,
}) => {
  if (cart.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Feather name="shopping-bag" size={54} color="#CBD5E1" />
        <Text style={styles.emptyTitle}>Keranjang Belanja Kosong</Text>
        <Text style={styles.emptyDesc}>
          Belum ada barang di keranjang Anda. Yuk, temukan produk menarik hari ini!
        </Text>
        <TouchableOpacity style={styles.emptyActionBtn} onPress={onNavigateHome}>
          <Text style={styles.emptyActionBtnText}>Lihat Produk Promo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cartListContent}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onToggleSelect={() => onToggleSelect(item.id)}
            onUpdateQty={(delta) => onUpdateQty(item.id, delta)}
            onDelete={() => onUpdateQty(item.id, -item.quantity)}
          />
        )}
      />

      {/* Checkout Footer Bar */}
      <View style={styles.checkoutBar}>
        <View style={styles.checkoutPriceCol}>
          <Text style={styles.checkoutTotalLabel}>Total Tagihan</Text>
          <Text style={styles.checkoutTotalPrice}>{formatRupiah(selectedCartTotal)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.checkoutBtn, selectedItemCount === 0 && styles.checkoutBtnDisabled]}
          activeOpacity={0.85}
          onPress={onCheckout}
          disabled={selectedItemCount === 0}
        >
          <Text style={styles.checkoutBtnText}>Beli Sekarang ({selectedItemCount})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  cartListContent: {
    padding: 16,
    paddingBottom: 20,
  },
  checkoutBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkoutPriceCol: {
    justifyContent: 'center',
  },
  checkoutTotalLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  checkoutTotalPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  checkoutBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
