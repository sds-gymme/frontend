import { Play } from "lucide-react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
} from "react-native";

interface ImageCarouselProps {
  title: string;
  images: {
    src: ImageSourcePropType;
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
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width,
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  const imageWidth = screenWidth * 0.75; // Increased width
  const containerPadding = 16;
  const gap = 8;

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollPosition / (imageWidth + gap));
    setActiveIndex(newIndex);
  };

  const scrollToIndex = (index: number) => {
    scrollRef.current?.scrollTo({
      x: index * (imageWidth + gap),
      animated: true,
    });
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
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.scrollViewContent,
          {
            paddingHorizontal:
              (screenWidth - imageWidth) / 2 - containerPadding,
          },
        ]}
        snapToInterval={imageWidth + gap}
        decelerationRate="fast"
      >
        {images.map((image, index) => (
          <View
            key={index}
            style={[
              styles.imageContainer,
              {
                width: imageWidth,
                marginRight: index === images.length - 1 ? 0 : gap,
              },
            ]}
          >
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
            onPress={() => scrollToIndex(index)}
            style={[
              styles.indicator,
              index === activeIndex
                ? styles.activeIndicator
                : styles.inactiveIndicator,
            ]}
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
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
    marginLeft: 8,
  },
  scrollViewContent: {
    gap: 8,
  },
  imageContainer: {
    height: 350, // Slightly decreased from 400
    borderRadius: 12,
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
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    gap: 4,
  },
  indicator: {
    width: 16,
    height: 4,
    borderRadius: 2,
  },
  activeIndicator: {
    backgroundColor: "#2563EB",
    width: 24,
  },
  inactiveIndicator: {
    backgroundColor: "#E5E5E5",
  },
});
