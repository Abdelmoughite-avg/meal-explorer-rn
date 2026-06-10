import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  ActivityIndicator, SafeAreaView
} from 'react-native';
import { getMealsByCategory } from '../services/mealApi';
import MealCard from '../components/MealCard';

export default function CategoryScreen({ route, navigation }) {
  const { name } = route.params;
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealsByCategory(name)
      .then(setMeals)
      .finally(() => setLoading(false));
  }, [name]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.sub}>{meals.length} meals found</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#D85A30" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          renderItem={({ item }) => (
            <MealCard
              meal={item}
              onPress={() => navigation.navigate('Detail', { name: item.strMeal })}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f3ef' },
  title: {
    fontSize: 24, fontWeight: '700',
    padding: 16, paddingBottom: 4, color: '#1a1a1a',
  },
  sub: { fontSize: 13, color: '#888', paddingHorizontal: 16, marginBottom: 8 },
  list: { padding: 10 },
});