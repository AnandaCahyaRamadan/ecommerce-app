import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Product } from '../../types';
import { formatRupiah } from '../../data/mockData';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onPress: () => void;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onPress,
  onToggleWishlist,
  onAddToCart,
}) => {
  const discountPct = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.92}
      onPress={onPress}
    >
      {/* Media & Badges */}
      <View style={styles.productMediaWrap}>
        <Image source={{ uri: product.image }} style={styles.productMedia} resizeMode="cover" />

        {product.isOfficial && (
          <View style={styles.officialTag}>
            <Text style={styles.officialTagText}>OFFICIAL</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.wishlistFloatBtn}
          onPress={onToggleWishlist}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={isWishlisted ? '#EF4444' : '#64748B'}
          />
        </TouchableOpacity>
      </View>

      {/* Info Body */}
      <View style={styles.productBody}>
        <Text numberOfLines={2} style={styles.productTitle}>
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.mainPrice}>{formatRupiah(product.price)}</Text>
          {discountPct > 0 && (
            <View style={styles.discountTag}>
              <Text style={styles.discountTagText}>{discountPct}%</Text>
            </View>
          )}
        </View>

        {discountPct > 0 && (
          <Text style={styles.slashPrice}>{formatRupiah(product.originalPrice)}</Text>
        )}

        <View style={styles.metaRow}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={11} color="#EAB308" />
            <Text style={styles.ratingValue}>{product.rating}</Text>
            <Text style={styles.soldValue}>• Terjual {product.soldCount}</Text>
          </View>
        </View>

        <View style={styles.storeRow}>
          <Feather name="map-pin" size={11} color="#94A3B8" />
          <Text numberOfLines={1} style={styles.locationText}>
            {product.location}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.quickAddBtn}
          activeOpacity={0.8}
          onPress={onAddToCart}
        >
          <Feather name="plus" size={14} color="#0F172A" />
          <Text style={styles.quickAddBtnText}>Keranjang</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  productMediaWrap: {
    width: '100%',
    height: 150,
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  productMedia: {
    width: '100%',
    height: '100%',
  },
  officialTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#0F172A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  officialTagText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  wishlistFloatBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productBody: {
    padding: 10,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 16,
    minHeight: 32,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  mainPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  discountTag: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  discountTagText: {
    color: '#DC2626',
    fontSize: 9,
    fontWeight: 'bold',
  },
  slashPrice: {
    fontSize: 10,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingValue: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
  },
  soldValue: {
    fontSize: 10,
    color: '#64748B',
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: 10,
    color: '#64748B',
  },
  quickAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingVertical: 6,
    marginTop: 10,
    gap: 4,
  },
  quickAddBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
});
