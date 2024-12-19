import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft2, Clock, Timer1 } from 'iconsax-react-native';
import { Link } from 'expo-router';

type MealCategory = 'Breakfast' | 'Lunch' | 'Dinner';

interface MealItem {
  id: string;
  title: string;
  calories: number;
  duration: number;
  image: any;
  category: MealCategory;
}

const mealData: MealItem[] = [
  {
    id: '1',
    title: 'Green beans, tomatoes, eggs',
    calories: 135,
    duration: 30,
    image: require('../assets/images/DietPlanningImage1.png'),
    category: 'Breakfast'
  },
  {
    id: '2',
    title: 'Healthy balanced vegetarian food',
    calories: 145,
    duration: 30,
    image: require('../assets/images/DecodeAgeFood.png'),
    category: 'Lunch'
  },
  {
    id: '3',
    title: 'Broccoli and eggs breakfast',
    calories: 165,
    duration: 25,
    image: require('../assets/images/DietPlanningImage2.png'),
    category: 'Breakfast'
  },
  {
    id: '4',
    title: 'Grilled chicken salad',
    calories: 180,
    duration: 35,
    image: require('../assets/images/DietPlanningImage2.png'),
    category: 'Dinner'
  }
];

export default function DietPlanning() {
  const [selectedCategory, setSelectedCategory] = useState<MealCategory>('Breakfast');
  const filteredMeals = mealData.filter(meal => meal.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {['Breakfast', 'Lunch', 'Dinner'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category as MealCategory)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.mealsCount}>{filteredMeals.length} meals</Text>

      <ScrollView style={styles.mealList}>
        {filteredMeals.map((meal) => (
          <TouchableOpacity key={meal.id} style={styles.mealCard}>
            <Image source={meal.image} style={styles.mealImage} />
            <View style={styles.mealInfo}>
              <Text style={styles.mealTitle}>{meal.title}</Text>
              <View style={styles.mealStats}>
                <View style={styles.statItem}>
                  <Timer1 size={16} color="#666" variant="Linear" />
                  <Text style={styles.statText}>{meal.calories} kcal</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={16} color="#666" variant="Linear" />
                  <Text style={styles.statText}>{meal.duration} min</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 8,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  selectedCategory: {
    backgroundColor: '#000',
  },
  categoryText: {
    color: '#666',
    fontSize: 16,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  mealsCount: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 16,
  },
  mealList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mealCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  mealInfo: {
    padding: 12,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  mealStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    color: '#666',
    marginLeft: 4,
    fontSize: 14,
  },
});
