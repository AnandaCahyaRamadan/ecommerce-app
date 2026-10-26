import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { CartItem } from '../../types';
import { formatRupiah } from '../../data/mockData';

interface CartItemRowProps {
  item: CartItem;
  onToggleSelect: () => void;
  onUpdateQty: (delta: number) => void;
  onDelete: () => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onToggleSelect,
  onUpdateQty,
  onDelete,
}) => {
  return (
    <View style={styles.cartItemRow}>
      <TouchableOpacity style={styles.cartCheckbox} onPress={onToggleSelect}>
        <Ionicons
          name={item.selected ? 'checkbox' : 'square-outline'}
          size={20}
          color={item.selected ? '#0F172A' : '#94A3B8'}
        />
      </TouchableOpacity>

      <Image source={{ uri: item.image }} style={styles.cartItemThumb} />

      <View style={styles.cartItemDetails}>
        <Text numberOfLines={2} style={styles.cartItemTitle}>
          {item.name}
        </Text>

        <Text style={styles.cartItemPrice}>{formatRupiah(item.price)}</Text>

        <View style={styles.cartItemActions}>
          <View style={styles.qtyBox}>
            <TouchableOpacity style={styles.qtyControl} onPress={() => onUpdateQty(-1)}>
              <Feather name="minus" size={14} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.qtyDisplay}>{item.quantity}</Text>
            <TouchableOpacity style={styles.qtyControl} onPress={() => onUpdateQty(1)}>
              <Feather name="plus" size={14} color="#0F172A" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cartDeleteBtn} onPress={onDelete}>
            <Feather name="trash-2" size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
  },
  cartCheckbox: {
    marginRight: 10,
  },
  cartItemThumb: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  cartItemTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 16,
  },
  cartItemPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },
  cartItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
  },
  qtyControl: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyDisplay: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 8,
    color: '#0F172A',
  },
  cartDeleteBtn: {
    padding: 4,
  },
});
