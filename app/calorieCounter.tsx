import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import {
  ArrowLeft2,
  Coffee,
  Cake,
  MessageCircle,
  Apple,
  Home2,
  Add,
} from "iconsax-react-native";
import { router } from "expo-router";
import AddMealModal from "./addMealModal";

const initialDays = [
  { day: "Sun", date: "1", active: true },
  { day: "Mon", date: "2", active: false },
  { day: "Tue", date: "3", active: false },
  { day: "Wed", date: "4", active: false },
  { day: "Thu", date: "5", active: false },
  { day: "Fri", date: "6", active: false },
  { day: "Sat", date: "7", active: false },
];

const initialMacros = [
  { label: "Carbs", percent: 60, color: "#FF6B6B", value: "100/120" },
  { label: "Protein", percent: 25, color: "#9775FA", value: "100/120" },
  { label: "Fat", percent: 30, color: "#63E6BE", value: "30/120" },
];

const initialMeals = [
  {
    title: "Breakfast",
    icon: Coffee,
    calories: "352/573 Cal",
    items: [
      { name: "Paratha", quantity: "1.0", calories: 289 },
      { name: "Tea", quantity: "1.0", calories: 73 },
    ],
  },
  {
    title: "Morning Snacks",
    icon: Cake,
    calories: "73/215 Cal",
    items: [{ name: "Oats", quantity: "1.0", calories: 73 }],
  },
  { title: "Lunch", icon: MessageCircle, calories: "0/0 Cal", items: [] },
  { title: "Evening Snacks", icon: Apple, calories: "0/0 Cal", items: [] },
  { title: "Dinner", icon: Home2, calories: "0/0 Cal", items: [] },
];

const CalorieCounter: React.FC = () => {
  const [days, setDays] = useState(initialDays);
  const [macros, setMacros] = useState(initialMacros);
  const [meals, setMeals] = useState(initialMeals);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMealIndex, setSelectedMealIndex] = useState(-1);

  const handleDayPress = (index: number) => {
    const newDays = days.map((day, i) => ({
      ...day,
      active: i === index,
    }));
    setDays(newDays);
    // Here you would typically fetch data for the selected day
    // For this example, we'll just reset the meals
    setMeals(initialMeals);
  };

  const handleAddMeal = (mealIndex: number) => {
    setSelectedMealIndex(mealIndex);
    setModalVisible(true);
  };

  const handleAddMealItem = (item: {
    name: string;
    quantity: string;
    calories: number;
  }) => {
    const newMeals = [...meals];
    newMeals[selectedMealIndex].items.push(item);
    const totalCalories = newMeals[selectedMealIndex].items.reduce(
      (sum, item) => sum + item.calories,
      0
    );
    newMeals[selectedMealIndex].calories = `${totalCalories}/1000 Cal`; // Assuming 1000 Cal target for each meal
    setMeals(newMeals);
    setModalVisible(false);
    updateMacros();
  };

  const updateMacros = () => {
    const totalCalories = meals.reduce(
      (sum, meal) =>
        sum + meal.items.reduce((mealSum, item) => mealSum + item.calories, 0),
      0
    );

    const newMacros = macros.map((macro) => ({
      ...macro,
      value: `${Math.round(totalCalories * (macro.percent / 100))}/${Math.round(
        totalCalories * 1.2 * (macro.percent / 100)
      )}`,
    }));

    setMacros(newMacros);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.back();
          }}
        >
          <ArrowLeft2 size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calorie Counter</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroller}
        >
          {days.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateButton,
                item.active && styles.activeDateButton,
              ]}
              onPress={() => handleDayPress(index)}
            >
              <Text
                style={[styles.dateDay, item.active && styles.activeDateText]}
              >
                {item.day}
              </Text>
              <View style={styles.dateNumber}>
                <Text
                  style={[
                    styles.dateNumberText,
                    item.active && styles.activeDateNumberText,
                  ]}
                >
                  {item.date}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.calorieCard}>
          <View style={styles.calorieCircle}>
            <Text style={styles.calorieNumber}>
              {meals.reduce(
                (sum, meal) =>
                  sum +
                  meal.items.reduce(
                    (mealSum, item) => mealSum + item.calories,
                    0
                  ),
                0
              )}
            </Text>
            <Text style={styles.calorieUnit}>Kcal</Text>
          </View>
          <View style={styles.macroContainer}>
            {macros.map((macro, index) => (
              <View key={index} style={styles.macroItem}>
                <View
                  style={[styles.macroCircle, { borderColor: macro.color }]}
                >
                  <Text style={[styles.macroPercent, { color: macro.color }]}>
                    {macro.percent}%
                  </Text>
                </View>
                <Text style={styles.macroLabel}>{macro.label}</Text>
                <Text style={styles.macroValue}>{macro.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {meals.map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View style={styles.mealTitleContainer}>
                <meal.icon size={24} color="#FF8A65" variant="Linear" />
                <Text style={styles.mealTitle}>{meal.title}</Text>
              </View>
              <View style={styles.mealCaloriesContainer}>
                <Text style={styles.mealCalories}>{meal.calories}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddMeal(index)}
                >
                  <Add size={20} color="#FF8A65" variant="Linear" />
                </TouchableOpacity>
              </View>
            </View>
            {meal.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.mealItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <Text style={styles.itemCalories}>{item.calories} Cal</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <AddMealModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddMeal={handleAddMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  dateScroller: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dateButton: {
    width: 60,
    height: 80,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 12,
    backgroundColor: "#F0F0F0",
    padding: 8,
  },
  activeDateButton: {
    backgroundColor: "#000000",
  },
  dateDay: {
    fontSize: 12,
    color: "#666666",
  },
  dateNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  dateNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
  activeDateText: {
    color: "#FFFFFF",
  },
  activeDateNumberText: {
    color: "#000000",
  },
  calorieCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    margin: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calorieCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 12,
    borderColor: "#FF8A65",
    alignItems: "center",
    justifyContent: "center",
  },
  calorieNumber: {
    fontSize: 36,
    fontWeight: "600",
    color: "#FF8A65",
  },
  calorieUnit: {
    fontSize: 14,
    color: "#666666",
  },
  macroContainer: {
    alignItems: "flex-start",
  },
  macroItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  macroCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  macroPercent: {
    fontSize: 12,
    fontWeight: "600",
  },
  macroLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
  macroValue: {
    fontSize: 12,
    color: "#666666",
  },
  mealCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  mealTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  mealCaloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealCalories: {
    fontSize: 14,
    color: "#666666",
  },
  addButton: {
    marginLeft: 8,
  },
  mealItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 16,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666666",
    marginRight: 16,
  },
  itemCalories: {
    fontSize: 14,
    color: "#666666",
  },
});

export default CalorieCounter;
