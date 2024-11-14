import { View, Text, Image, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'

interface WorkoutCardProps {
  name: string
  image: any // Using any for image source type in React Native
  onPress?: () => void
}

export default function WorkoutCard({ name, image, onPress }: WorkoutCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    padding: 8,
    color: '#333',
  },
})
