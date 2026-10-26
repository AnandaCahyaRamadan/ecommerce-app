import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Product } from '../../types';
import { formatRupiah } from '../../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
}) => {
  return (
    <Modal
      visible={!!product}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalSheet}>
          {product && (
            <>
              <View style={styles.modalSheetHeader}>
                <Text style={styles.modalSheetTitle}>Detail Produk</Text>
                <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                  <Ionicons name="close" size={20} color="#475569" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />

                <View style={styles.modalBody}>
                  <View style={styles.modalPriceSection}>
                    <Text style={styles.modalMainPrice}>{formatRupiah(product.price)}</Text>
                    {product.originalPrice > product.price && (
                      <Text style={styles.modalSlashPrice}>
                        {formatRupiah(product.originalPrice)}
                      </Text>
                    )}
                  </View>

                  <Text style={styles.modalProductName}>{product.name}</Text>

                  <View style={styles.modalStoreCard}>
                    <View style={styles.modalStoreAvatar}>
                      <Feather name="shopping-bag" size={18} color="#0F172A" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.modalStoreName}>{product.storeName}</Text>
                      <Text style={styles.modalStoreCity}>{product.location}</Text>
                    </View>
                    {product.isOfficial && (
                      <View style={styles.officialPill}>
                        <Text style={styles.officialPillText}>Official Store</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.modalSectionLabel}>Deskripsi</Text>
                  <Text style={styles.modalDescText}>{product.description}</Text>

                  <View style={styles.trustBanner}>
                    <Feather name="shield" size={18} color="#16A34A" />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                      <Text style={styles.trustTitle}>Garansi 100% Produk Original</Text>
                      <Text style={styles.trustSub}>Jaminan uang kembali jika barang terbukti palsu.</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.modalFooterActions}>
                <TouchableOpacity style={styles.modalWishlistBtn} onPress={onToggleWishlist}>
                  <Ionicons
                    name={isWishlisted ? 'heart' : 'heart-outline'}
                    size={22}
                    color={isWishlisted ? '#EF4444' : '#0F172A'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalCartBtn}
                  activeOpacity={0.85}
                  onPress={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                >
                  <Text style={styles.modalCartBtnText}>+ Tambah ke Keranjang</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '88%',
    minHeight: '75%',
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
  },
  modalSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalSheetTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalCloseBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 280,
    backgroundColor: '#F8FAFC',
  },
  modalBody: {
    padding: 16,
  },
  modalPriceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 6,
  },
  modalMainPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSlashPrice: {
    fontSize: 13,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  modalProductName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 22,
    marginBottom: 14,
  },
  modalStoreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalStoreAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalStoreName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalStoreCity: {
    fontSize: 11,
    color: '#64748B',
  },
  officialPill: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  officialPillText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  modalSectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  modalDescText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 14,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  trustTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  trustSub: {
    fontSize: 11,
    color: '#166534',
  },
  modalFooterActions: {
    flexDirection: 'row',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 10,
    backgroundColor: '#FFFFFF',
  },
  modalWishlistBtn: {
    width: 46,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCartBtn: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalCartBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
