import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet,
  ActivityIndicator, TouchableOpacity, Linking, SafeAreaView
} from 'react-native';
import { searchMealByName } from '../services/mealApi';

export default function DetailScreen({ route }) {
  const { name } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchMealByName(name)
      .then((meals) => setMeal(meals[0] || null))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return (
    <ActivityIndicator size="large" color="#D85A30" style={{ marginTop: 40 }} />
  );
  if (!meal) return (
    <View style={styles.center}><Text>Meal not found.</Text></View>
  );

  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    name: meal[`strIngredient${i + 1}`],
    measure: meal[`strMeasure${i + 1}`],
  })).filter((i) => i.name && i.name.trim());

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.hero} />
      <View style={styles.body}>
        <Text style={styles.title}>{meal.strMeal}</Text>
        <View style={styles.tagsRow}>
          {meal.strCategory && (
            <View style={[styles.tag, styles.tagGreen]}>
              <Text style={styles.tagTextGreen}>{meal.strCategory}</Text>
            </View>
          )}
          {meal.strArea && (
            <View style={[styles.tag, styles.tagOrange]}>
              <Text style={styles.tagTextOrange}>{meal.strArea}</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionLabel}>Ingredients</Text>
        <View style={styles.ingredientsGrid}>
          {ingredients.map((ing) => (
            <View key={ing.name} style={styles.ingredientPill}>
              <Text style={styles.ingName}>{ing.name}</Text>
              <Text style={styles.ingMeasure}>{ing.measure}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Instructions</Text>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>

        {meal.strYoutube && (
          <TouchableOpacity
            style={styles.ytBtn}
            onPress={() => Linking.openURL(meal.strYoutube)}
          >
            <Text style={styles.ytBtnText}>▶ Watch on YouTube</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f3ef' },
  hero: { width: '100%', height: 250 },
  body: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#1a1a1a', marginBottom: 12 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  tagGreen: { backgroundColor: '#EAF3DE' },
  tagOrange: { backgroundColor: '#FAECE7' },
  tagTextGreen: { color: '#3B6D11', fontSize: 12, fontWeight: '500' },
  tagTextOrange: { color: '#993C1D', fontSize: 12, fontWeight: '500' },
  sectionLabel: {
    fontSize: 11, fontWeight: '600', color: '#888',
    textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 10, marginTop: 16,
  },
  ingredientsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  ingredientPill: {
    backgroundColor: '#fff', borderRadius: 10,
    padding: 8, minWidth: 100,
    borderWidth: 0.5, borderColor: '#e8e6e0',
  },
  ingName: { fontSize: 12, fontWeight: '500', color: '#1a1a1a' },
  ingMeasure: { fontSize: 11, color: '#888' },
  instructions: { fontSize: 13, color: '#555', lineHeight: 22 },
  ytBtn: {
    backgroundColor: '#D85A30', borderRadius: 999,
    padding: 14, alignItems: 'center', marginTop: 20, marginBottom: 40,
  },
  ytBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});