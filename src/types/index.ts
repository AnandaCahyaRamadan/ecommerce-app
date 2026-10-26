export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  soldCount: string;
  location: string;
  storeName: string;
  isOfficial?: boolean;
  freeShipping?: boolean;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

export type TabType = 'home' | 'catalog' | 'wishlist' | 'cart' | 'profile';

export interface Category {
  id: string;
  name: string;
  iconName: 'grid-outline' | 'headset-outline' | 'watch-outline' | 'footsteps-outline' | 'shirt-outline';
}
