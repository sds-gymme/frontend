import { Play } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface ImageCarouselProps {
  title: string;
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ImageCarousel(
  { title, images }: ImageCarouselProps = {
    title: "Professional trainer's real life",
    images: [
      {
        src: require("../assets/images/1.png"),
        alt: "Trainer demonstrating medicine ball exercise",
      },
      {
        src: require("../assets/images/2.png"),
        alt: "Trainer demonstrating standing exercise",
      },
      {
        src: require("../assets/images/3.png"),
        alt: "Trainer demonstrating workout routine",
      },
    ],
  },
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const itemWidth = event.nativeEvent.layoutMeasurement.width;
    const newIndex = Math.round(scrollPosition / itemWidth);
    setActiveIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.divider} />
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={image.src} style={styles.image} />
            <View style={styles.overlay} />
            <TouchableOpacity
              style={styles.playButton}
              accessibilityLabel="Play video"
            >
              <Play size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              index === activeIndex
                ? styles.activeIndicator
                : styles.inactiveIndicator,
            ]}
            onPress={() => {
              scrollRef.current?.scrollTo({ x: index * 280, animated: true });
            }}
            accessibilityLabel={`Go to slide ${index + 1}`}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    marginLeft: 16,
  },
  scrollView: {
    marginTop: 16,
  },
  imageContainer: {
    width: 280,
    height: 350,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -24 }, { translateY: -24 }],
    width: 48,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#000",
  },
  inactiveIndicator: {
    backgroundColor: "#ccc",
  },
});
