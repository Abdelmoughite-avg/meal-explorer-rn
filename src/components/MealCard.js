import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export default function MealCard({ meal, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>{meal.strMeal}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    flex: 1,
    margin: 6,
  },
  image: { width: '100%', height: 100 },
  name: { fontSize: 12, fontWeight: '500', padding: 8, color: '#1a1a1a' },
});