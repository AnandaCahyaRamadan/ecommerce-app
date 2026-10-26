import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../../types';
import { SkeletonBlock } from '../common/Skeleton';

interface CategoryChipsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  isLoading?: boolean;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 16, gap: 8 }}>
        <SkeletonBlock width={90} height={36} borderRadius={8} />
        <SkeletonBlock width={140} height={36} borderRadius={8} />
        <SkeletonBlock width={110} height={36} borderRadius={8} />
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryScroll}
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
            onPress={() => onSelectCategory(cat.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={cat.iconName}
              size={16}
              color={isSelected ? '#FFFFFF' : '#475569'}
            />
            <Text
              style={[
                styles.categoryChipText,
                isSelected && styles.categoryChipTextActive,
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
});
