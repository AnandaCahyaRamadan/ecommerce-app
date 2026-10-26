import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface SkeletonBlockProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: any;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width,
  height,
  borderRadius = 6,
  style,
}) => {
  const animatedOpacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 0.85,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0.35,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [animatedOpacity]);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: '#E2E8F0',
          opacity: animatedOpacity,
        },
        style,
      ]}
    />
  );
};

export const SkeletonProductCard: React.FC = () => (
  <View style={styles.card}>
    <SkeletonBlock width="100%" height={150} borderRadius={0} />
    <View style={styles.body}>
      <SkeletonBlock width="90%" height={12} style={{ marginBottom: 6 }} />
      <SkeletonBlock width="60%" height={12} style={{ marginBottom: 10 }} />
      <SkeletonBlock width="70%" height={16} style={{ marginBottom: 6 }} />
      <SkeletonBlock width="40%" height={10} style={{ marginBottom: 8 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <SkeletonBlock width={30} height={10} />
        <SkeletonBlock width={50} height={10} />
      </View>
      <SkeletonBlock width="100%" height={28} borderRadius={6} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  body: {
    padding: 10,
  },
});
