import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { Product, Category, CartItem } from '../types';
import { CATEGORIES, PRODUCTS, formatRupiah } from '../data/mockData';

interface ShopContextType {
  categories: Category[];
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  wishlist: string[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isLoading: boolean;
  isRefreshing: boolean;
  toastText: string | null;
  showNotification: (text: string) => void;
  handleRefresh: () => void;
  toggleWishlist: (id: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQty: (id: string, delta: number) => void;
  toggleSelectCartItem: (id: string) => void;
  handleCheckout: () => void;
  triggerSkeleton: () => void;
  filteredProducts: Product[];
  wishlistProducts: Product[];
  selectedCartTotal: number;
  totalCartCount: number;
  selectedItemCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['1', '3']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastText, setToastText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Initial Simulated Load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const showNotification = (text: string) => {
    setToastText(text);
    setTimeout(() => {
      setToastText(null);
    }, 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsRefreshing(false);
      showNotification('Halaman diperbarui');
    }, 1000);
  };

  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((x) => x !== id));
      showNotification('Dihapus dari wishlist');
    } else {
      setWishlist([...wishlist, id]);
      showNotification('Disimpan ke wishlist');
    }
  };

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
    <ShopContext.Provider
      value={{
        categories: CATEGORIES,
        products: PRODUCTS,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cart,
        wishlist,
        selectedProduct,
        setSelectedProduct,
        isLoading,
        isRefreshing,
        toastText,
        showNotification,
        handleRefresh,
        toggleWishlist,
        addToCart,
        updateCartQty,
        toggleSelectCartItem,
        handleCheckout,
        triggerSkeleton,
        filteredProducts,
        wishlistProducts,
        selectedCartTotal,
        totalCartCount,
        selectedItemCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
