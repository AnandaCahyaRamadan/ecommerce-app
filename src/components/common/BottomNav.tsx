import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabType } from '../../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  cartCount: number;
  wishlistCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  wishlistCount,
}) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navTab}
        onPress={() => onTabChange('home')}
        activeOpacity={0.8}
      >
        <Ionicons
          name={activeTab === 'home' ? 'home' : 'home-outline'}
          size={22}
          color={activeTab === 'home' ? '#0F172A' : '#94A3B8'}
        />
        <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>
          Beranda
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navTab}
        onPress={() => onTabChange('catalog')}
        activeOpacity={0.8}
      >
        <Ionicons
          name={activeTab === 'catalog' ? 'grid' : 'grid-outline'}
          size={22}
          color={activeTab === 'catalog' ? '#0F172A' : '#94A3B8'}
        />
        <Text style={[styles.navLabel, activeTab === 'catalog' && styles.navLabelActive]}>
          Katalog
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navTab}
        onPress={() => onTabChange('wishlist')}
        activeOpacity={0.8}
      >
        <View>
          <Ionicons
            name={activeTab === 'wishlist' ? 'heart' : 'heart-outline'}
            size={22}
            color={activeTab === 'wishlist' ? '#0F172A' : '#94A3B8'}
          />
          {wishlistCount > 0 && (
            <View style={styles.navBadge}>
              <Text style={styles.navBadgeText}>{wishlistCount}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.navLabel, activeTab === 'wishlist' && styles.navLabelActive]}>
          Wishlist
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navTab}
        onPress={() => onTabChange('cart')}
        activeOpacity={0.8}
      >
        <View>
          <Ionicons
            name={activeTab === 'cart' ? 'bag-handle' : 'bag-handle-outline'}
            size={22}
            color={activeTab === 'cart' ? '#0F172A' : '#94A3B8'}
          />
          {cartCount > 0 && (
            <View style={styles.navBadge}>
              <Text style={styles.navBadgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.navLabel, activeTab === 'cart' && styles.navLabelActive]}>
          Keranjang
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navTab}
        onPress={() => onTabChange('profile')}
        activeOpacity={0.8}
      >
        <Ionicons
          name={activeTab === 'profile' ? 'person' : 'person-outline'}
          size={22}
          color={activeTab === 'profile' ? '#0F172A' : '#94A3B8'}
        />
        <Text style={[styles.navLabel, activeTab === 'profile' && styles.navLabelActive]}>
          Akun
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  navLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  navBadge: {
    position: 'absolute',
    top: -3,
    right: -6,
    backgroundColor: '#EF4444',
    borderRadius: 7,
    minWidth: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  navBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
});
