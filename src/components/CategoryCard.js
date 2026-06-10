import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';

export default function CategoryCard({ category, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: category.strCategoryThumb }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.name}>{category.strCategory}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {category.strCategoryDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: '100%', height: 130 },
  body: { padding: 12 },
  name: { fontSize: 15, fontWeight: '600', marginBottom: 4, color: '#1a1a1a' },
  desc: { fontSize: 12, color: '#888', lineHeight: 18 },
});