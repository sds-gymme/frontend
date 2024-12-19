import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { ArrowLeft2, Activity } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';

const DecodeAge = () => {
  const navigation = useNavigation();

  const MenuButton = ({
    icon: Icon,
    title,
    subtitle
  }: {
    icon: React.FC<any>,
    title: string,
    subtitle: string
  }) => (
    <TouchableOpacity style={styles.menuButton}>
      <View style={styles.menuIconContainer}>
        <Icon size={24} color="#FFF" variant="Bold" />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <ArrowLeft2
        size={20}
        color="#666"
        variant="Linear"
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/DecodeAgeFood.png')}
          style={styles.foodImage}
        />
        <View style={styles.playButton}>
          <View style={styles.playIcon} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Lorem Ipsum Dolor Sit Amet, Consectetur Apicing Elit. Sed Do Eiusmod
          Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Veniam,
          Quis Nostrud Exercitation Ullamco Laboris Nisi Aliquip Ea Commodo Consequat.
        </Text>
        <View style={styles.separator} />

        <Text style={styles.stepsTitle}>STEPS TO DECODE AGE:</Text>

        <MenuButton
          icon={Activity}
          title="Diet Plan"
          subtitle="Explore Diet Plans"
        />

        <MenuButton
          icon={Activity}
          title="Exercise"
          subtitle="Explore Workout Videos"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  imageContainer: {
    width: '100%',
    height: 290,
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#000',
    marginLeft: 5,
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    width: '100%',
    zIndex: 1,
    padding: 14,
    marginBottom: 16,
    marginTop: 16,
    shadowColor: '#1b1b1b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for android
    borderRadius: 12,
    backgroundColor: '#FFF',
  }



  ,
  stepsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  separator: {
    height: 0.75,
    backgroundColor: "#E0E0E0",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#1b1b1b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, //for andorid 
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  arrowIcon: {
    transform: [{ rotate: '180deg' }],
  },
});

export default DecodeAge;
