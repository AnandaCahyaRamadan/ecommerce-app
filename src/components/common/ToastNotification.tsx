import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ToastProps {
  message: string | null;
}

export const ToastNotification: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <View style={styles.toastWrap}>
      <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
      <Text style={styles.toastMessage}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toastWrap: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    zIndex: 999,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  toastMessage: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
