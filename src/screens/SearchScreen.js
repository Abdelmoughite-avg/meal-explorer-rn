import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  ActivityIndicator, SafeAreaView
} from 'react-native';
import { searchMealByName } from '../services/mealApi';
import MealCard from '../components/MealCard';

export default function SearchScreen({ route, navigation }) {
  const { query } = route.params;
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchMealByName(query)
      .then(setMeals)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Results for "{query}"</Text>
      <Text style={styles.sub}>{meals.length} meals found</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#D85A30" style={{ marginTop: 40 }} />
      ) : meals.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.empty}>No results found.</Text>
        </View>
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
  title: { fontSize: 22, fontWeight: '700', padding: 16, paddingBottom: 4, color: '#1a1a1a' },
  sub: { fontSize: 13, color: '#888', paddingHorizontal: 16, marginBottom: 8 },
  list: { padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  empty: { fontSize: 14, color: '#888' },
});