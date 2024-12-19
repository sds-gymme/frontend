import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { VideoView, useVideoPlayer } from 'expo-video';

interface VideoCarouselProps {
  title: string;
  videos: {
    src: string;
  }[];
}

export default function VideoCarousel({ title, videos }: VideoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
  const videoPlayers = videos.map((video) =>
    useVideoPlayer(video.src, (player) => {
      player.loop = true;
    })
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  const videoWidth = screenWidth * 0.75;
  const containerPadding = 16;
  const gap = 8;

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollPosition / (videoWidth + gap));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      videoPlayers.forEach((player, index) => {
        if (index === newIndex) {
          player.play();
        } else {
          player.pause();
        }
      });
    }
  };

  const scrollToIndex = (index: number) => {
    scrollRef.current?.scrollTo({
      x: index * (videoWidth + gap),
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
            paddingHorizontal: (screenWidth - videoWidth) / 2 - containerPadding,
          },
        ]}
        snapToInterval={videoWidth + gap}
        decelerationRate="fast"
      >
        {videos.map((video, index) => (
          <View
            key={index}
            style={[
              styles.videoContainer,
              {
                width: videoWidth,
                marginRight: index === videos.length - 1 ? 0 : gap,
              },
            ]}
          >
            <VideoView
              player={videoPlayers[index]}
              style={styles.video}
              videoStyle={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.indicatorContainer}>
        {videos.map((_, index) => (
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
  videoContainer: {
    height: 350,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    borderRadius: 12,
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
