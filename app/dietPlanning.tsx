import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import {
  ArrowLeft2,
  Clock,
  Timer1,
  ArrowDown,
  ArrowUp,
} from "iconsax-react-native";
import { Link } from "expo-router";

type MealCategory = "Breakfast" | "Lunch" | "Dinner";
type SortOrder = "asc" | "desc" | "none";

interface MealItem {
  id: string;
  title: string;
  calories: number;
  duration: number;
  image: any;
  category: MealCategory;
  recipe: string;
}

const mealData: MealItem[] = [
  {
    id: "1",
    title: "Green beans, tomatoes, eggs",
    calories: 135,
    duration: 30,
    image: require("../assets/images/DietPlanningImage1.png"),
    category: "Breakfast",
    recipe:
      "1. Boil green beans. \n2. Add chopped tomatoes. \n3. Cook scrambled eggs. \n4. Mix and serve.",
  },
  {
    id: "2",
    title: "Healthy balanced vegetarian food",
    calories: 145,
    duration: 30,
    image: require("../assets/images/DecodeAgeFood.png"),
    category: "Lunch",
    recipe:
      "1. Prepare a salad with lettuce, cucumbers, and carrots. \n2. Add boiled lentils. \n3. Season with olive oil and lemon juice.",
  },
  {
    id: "3",
    title: "Broccoli and eggs breakfast",
    calories: 165,
    duration: 25,
    image: require("../assets/images/DietPlanningImage2.png"),
    category: "Breakfast",
    recipe:
      "1. Steam broccoli. \n2. Fry eggs sunny-side up. \n3. Serve broccoli with eggs on top.",
  },
  {
    id: "4",
    title: "Grilled chicken salad",
    calories: 180,
    duration: 35,
    image: require("../assets/images/DietPlanningImage2.png"),
    category: "Dinner",
    recipe:
      "1. Grill chicken breast. \n2. Prepare a salad with greens, tomatoes, and cucumbers. \n3. Add chicken slices on top.",
  },
];

export default function DietPlanning() {
  const [selectedCategory, setSelectedCategory] =
    useState<MealCategory>("Breakfast");
  const [selectedMeal, setSelectedMeal] = useState<MealItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  const sortMeals = (meals: MealItem[]): MealItem[] => {
    if (sortOrder === "none") return meals;

    return [...meals].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.calories - b.calories;
      } else {
        return b.calories - a.calories;
      }
    });
  };

  const toggleSort = () => {
    const orders: SortOrder[] = ["none", "asc", "desc"];
    const currentIndex = orders.indexOf(sortOrder);
    const nextIndex = (currentIndex + 1) % orders.length;
    setSortOrder(orders[nextIndex]);
  };

  const getSortIcon = () => {
    switch (sortOrder) {
      case "asc":
        return <ArrowUp size={16} color="#666" variant="Linear" />;
      case "desc":
        return <ArrowDown size={16} color="#666" variant="Linear" />;
      default:
        return null;
    }
  };

  const filteredMeals = sortMeals(
    mealData.filter((meal) => meal.category === selectedCategory)
  );

  const openModal = (meal: MealItem) => {
    setSelectedMeal(meal);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {["Breakfast", "Lunch", "Dinner"].map((category) => (
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

      <View style={styles.headerContainer}>
        <Text style={styles.mealsCount}>{filteredMeals.length} meals</Text>
        <TouchableOpacity style={styles.sortButton} onPress={toggleSort}>
          <Text style={styles.sortButtonText}>
            Sort by calories {getSortIcon()}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mealList}>
        {filteredMeals.map((meal) => (
          <TouchableOpacity
            key={meal.id}
            style={styles.mealCard}
            onPress={() => openModal(meal)}
          >
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

      {selectedMeal && (
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedMeal.title}</Text>
              <Image source={selectedMeal.image} style={styles.modalImage} />
              <View style={styles.modalStats}>
                <View style={styles.modalStatItem}>
                  <Text style={styles.modalStatValue}>
                    {selectedMeal.calories}
                  </Text>
                  <Text style={styles.modalStatLabel}>Calories</Text>
                </View>
                <View style={styles.modalStatItem}>
                  <Text style={styles.modalStatValue}>
                    {selectedMeal.duration}
                  </Text>
                  <Text style={styles.modalStatLabel}>Minutes</Text>
                </View>
              </View>
              <ScrollView style={{ width: "100%" }}>
                <Text style={styles.modalRecipe}>{selectedMeal.recipe}</Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={closeModal}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 8,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
  },
  selectedCategory: {
    backgroundColor: "#000",
  },
  categoryText: {
    color: "#666",
    fontSize: 16,
  },
  selectedCategoryText: {
    color: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  mealsCount: {
    fontSize: 18,
    fontWeight: "600",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  sortButtonText: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  mealList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mealCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  mealInfo: {
    padding: 12,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  mealStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    color: "#666",
    marginLeft: 4,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
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
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  modalImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 16,
  },
  modalRecipe: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  modalCloseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 16,
  },
  modalStatItem: {
    alignItems: "center",
  },
  modalStatValue: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  modalStatLabel: {
    fontSize: 14,
    color: "#666",
  },
});
