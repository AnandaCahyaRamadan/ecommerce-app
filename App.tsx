import React, { useState, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Alert,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Types & Data
import { TabType, Product, CartItem } from './src/types';
import { CATEGORIES, PRODUCTS, formatRupiah } from './src/data/mockData';

// Common Components
import { TopAppBar } from './src/components/common/TopAppBar';
import { BottomNav } from './src/components/common/BottomNav';
import { ToastNotification } from './src/components/common/ToastNotification';
import { ProductDetailModal } from './src/components/product/ProductDetailModal';

// Screens
import { HomeScreen } from './src/screens/HomeScreen';
import { CatalogScreen } from './src/screens/CatalogScreen';
import { WishlistScreen } from './src/screens/WishlistScreen';
import { CartScreen } from './src/screens/CartScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['1', '3']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastText, setToastText] = useState<string | null>(null);

  // Loading & Shimmer State
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Initial Simulated Load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Toast Helper
  const showNotification = (text: string) => {
    setToastText(text);
    setTimeout(() => {
      setToastText(null);
    }, 2000);
  };

  // Pull-to-refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsRefreshing(false);
      showNotification('Halaman diperbarui');
    }, 1000);
  };

  // Wishlist Action
  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((x) => x !== id));
      showNotification('Dihapus dari wishlist');
    } else {
      setWishlist([...wishlist, id]);
      showNotification('Disimpan ke wishlist');
    }
  };

  // Cart Actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += quantity;
        return next;
      }
      return [...prev, { ...product, quantity, selected: true }];
    });
    showNotification('Berhasil ditambahkan ke keranjang');
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const toggleSelectCartItem = (id: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.storeName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((item) => wishlist.includes(item.id));
  }, [wishlist]);

  const selectedCartTotal = useMemo(() => {
    return cart
      .filter((x) => x.selected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const selectedItemCount = useMemo(() => {
    return cart.filter((x) => x.selected).reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const handleCheckout = () => {
    if (selectedItemCount === 0) {
      Alert.alert('Perhatian', 'Pilih minimal satu barang di keranjang untuk checkout.');
      return;
    }
    Alert.alert(
      'Konfirmasi Checkout',
      `Total Pembayaran: ${formatRupiah(selectedCartTotal)}\nLanjutkan proses pembayaran?`,
      [
        { text: 'Kembali', style: 'cancel' },
        {
          text: 'Bayar Sekarang',
          onPress: () => {
            setCart((prev) => prev.filter((item) => !item.selected));
            Alert.alert('Pesanan Diproses', 'Terima kasih! Pesanan Anda segera dikirim oleh penjual.');
          },
        },
      ]
    );
  };

  const triggerSkeleton = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Top Header Bar */}
      <TopAppBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onCartPress={() => setActiveTab('cart')}
      />

      {/* Floating Toast Notification */}
      <ToastNotification message={toastText} />

      {/* Main Tab Screen Area */}
      <View style={styles.screenContainer}>
        {activeTab === 'home' && (
          <HomeScreen
            categories={CATEGORIES}
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
            onNavigateCatalog={() => setActiveTab('catalog')}
            onSelectProduct={setSelectedProduct}
            onToggleWishlist={toggleWishlist}
            onAddToCart={addToCart}
            onTriggerSkeleton={triggerSkeleton}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogScreen
            categories={CATEGORIES}
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
            onSelectProduct={setSelectedProduct}
            onToggleWishlist={toggleWishlist}
            onAddToCart={addToCart}
          />
        )}

        {activeTab === 'wishlist' && (
          <WishlistScreen
            wishlistProducts={wishlistProducts}
            wishlist={wishlist}
            onSelectProduct={setSelectedProduct}
            onToggleWishlist={toggleWishlist}
            onAddToCart={addToCart}
            onNavigateExplore={() => setActiveTab('catalog')}
          />
        )}

        {activeTab === 'cart' && (
          <CartScreen
            cart={cart}
            selectedCartTotal={selectedCartTotal}
            selectedItemCount={selectedItemCount}
            onToggleSelect={toggleSelectCartItem}
            onUpdateQty={updateCartQty}
            onCheckout={handleCheckout}
            onNavigateHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'profile' && <ProfileScreen />}
      </View>

      {/* Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
      />

      {/* Modal Detail Produk */}
      <ProductDetailModal
        product={selectedProduct}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={() => selectedProduct && toggleWishlist(selectedProduct.id)}
        onAddToCart={addToCart}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
