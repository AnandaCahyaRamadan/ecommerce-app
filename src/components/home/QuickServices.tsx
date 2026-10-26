import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const QuickServices: React.FC = () => {
  const services = [
    { label: 'Official Store', icon: 'shield-checkmark-outline' as const },
    { label: 'Flash Sale', icon: 'flash-outline' as const },
    { label: 'Bebas Ongkir', icon: 'car-outline' as const },
    { label: 'Kupon Saya', icon: 'ticket-outline' as const },
  ];

  return (
    <View style={styles.quickServices}>
      {services.map((service, idx) => (
        <TouchableOpacity key={idx} style={styles.serviceItem} activeOpacity={0.7}>
          <View style={styles.serviceIconWrap}>
            <Ionicons name={service.icon} size={20} color="#0F172A" />
          </View>
          <Text style={styles.serviceLabel}>{service.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  quickServices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  serviceItem: {
    alignItems: 'center',
    flex: 1,
  },
  serviceIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  serviceLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
});
