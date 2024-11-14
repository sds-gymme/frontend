import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft } from 'iconsax-react-native'
import WorkoutCard from '../components/WorkoutCard'

export default function WorkoutScreen() {
  const workouts = [
    { id: '1', name: 'Gym Workout', image: require('../assets/images/GymWorkout.svg') },
    { id: '2', name: 'Cardio', image: require('../assets/images/CardioWorkout.svg') },
    { id: '3', name: 'Cross Fit', image: require('../assets/images/CrossFit.svg') },
    { id: '4', name: 'Zumba', image: require('../assets/images/Zumba.svg') },
    { id: '5', name: 'Aerobics', image: require('../assets/images/Aerobics.svg') },
    { id: '6', name: 'Boxing', image: require('../assets/images/Boxing.svg') },
    { id: '7', name: 'Martial Arts\n(MMA)', image: require('../assets/images/MMA.svg') },
    { id: '8', name: 'Yoga', image: require('../assets/images/Yoga.svg') },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ArrowLeft size={24} color="#000" />
        <Text style={styles.title}>Recorded Home Workout</Text>
      </View>
      <Text style={styles.subtitle}>Exercise you're looking for today?</Text>
      <Text style={styles.description}>Select at least one option to get started.</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {workouts.map((workout) => (
            <View key={workout.id} style={styles.cardContainer}>
              <WorkoutCard
                name={workout.name}
                image={workout.image}
                onPress={() => console.log(`Selected: ${workout.name}`)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  scrollContent: {
    padding: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    width: '50%',
  },
})
