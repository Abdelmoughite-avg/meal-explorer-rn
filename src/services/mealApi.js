const BASE = 'https://www.themealdb.com/api/json/v1/1';

export const getCategories = async () => {
  const res = await fetch(`${BASE}/categories.php`);
  const data = await res.json();
  return data.categories;
};

export const getMealsByCategory = async (category) => {
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
  const data = await res.json();
  return data.meals || [];
};

export const searchMealByName = async (name) => {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(name)}`);
  const data = await res.json();
  return data.meals || [];
};