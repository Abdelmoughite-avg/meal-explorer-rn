import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput,
  StyleSheet, ActivityIndicator, SafeAreaView
} from 'react-native';
import { getCategories } from '../services/mealApi';
import CategoryCard from '../components/CategoryCard';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      navigation.navigate('Search', { query: search.trim() });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          Meal<Text style={styles.logoSpan}>Explorer</Text>
        </Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a meal..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#D85A30" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.idCategory}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onPress={() => navigation.navigate('Category', {
                name: item.strCategory,
                thumb: item.strCategoryThumb,
              })}
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
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e8e6e0',
  },
  logo: { fontSize: 24, fontWeight: '700', color: '#1a1a1a', marginBottom: 10 },
  logoSpan: { color: '#D85A30' },
  searchInput: {
    backgroundColor: '#f5f3ef',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: '#e0ddd5',
  },
  list: { padding: 16 },
});