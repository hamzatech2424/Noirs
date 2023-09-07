import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../theme';

const { width, height } = Dimensions.get('window');
const itemWidth = width / 5 * 4.5;
// const itemHeight = height / 3 * 2;
const itemHeight = 353 / 1.02;
const padding = (width - itemWidth) / 2;
const offset = itemWidth;
const BORDER_RADIUS = 10

// const data = ['violet', 'indigo', 'blue', 'orange']
export default function Carousel({ data }) {


  const [activeIndex, setActiveIndex] = useState({ current: 0, previous: null })
  const scale = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animate();
  }, [])
  useEffect(() => {
    animate();
  }, [activeIndex])
  const animate = () => {
    scale.setValue(0);
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 1, bounciness: 1000 }).start();
  }
  const onScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    let newIndex = Math.floor((x / itemWidth) + 0.5)
    if (activeIndex.current != newIndex) {
      setActiveIndex({ current: newIndex, previous: activeIndex.current })
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={16}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        style={{ flexGrow: 0 }}
        contentContainerStyle={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        snapToInterval={offset}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
          listener: onScroll
        })}>
        {data.pictures.map((x, i) => (
          <Item key={x._id} data={x} i={i} scrollX={scrollX} totalLength={data.pictures.length} />
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {data.pictures.map((x, i) => (
          <View key={x._id} style={[styles.indicator, i == activeIndex.current && { backgroundColor: Colors.primaryBlue }]} />
        ))}
      </View>
    </View>
  );
}

function Item({ i, data, scrollX, totalLength }) {
  const scale = scrollX.interpolate({
    inputRange: [-offset + i * offset, i * offset, offset + i * offset],
    outputRange: [0.9, 1, 0.9],
  });

  return <Animated.View style={[styles.item, { transform: [{ scale }] }]}>
    <View style={[{ ...StyleSheet.absoluteFillObject }, styles.item]} >
      <Image source={{ uri: data.avatar.url }} resizeMode={'cover'} style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
    </View>
    <View style={[{ ...StyleSheet.absoluteFillObject }, styles.item]} >
      <Image source={{ uri: data.image.url }} resizeMode={'cover'} style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS }} />
    </View>

    <View style={styles.counterView} >
      <Text style={[styles.textThree,{color:Colors.primaryBlack,fontFamily:Fonts.semiBold}]}>
        {`${++i}`}
        <Text style={[styles.textThree,{color:Colors.primaryBlack,fontFamily:Fonts.default,fontSize:12}]}>{`/${totalLength}`}</Text>
        </Text>
    </View>

  </Animated.View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    paddingHorizontal: padding,
    alignItems: 'center',
    paddingVertical: 10,
    zIndex: 1
  },
  item: {
    height: itemHeight,
    width: itemWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    // backgroundColor: "pink",
    // elevation: 5,
  },
  indicatorContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20
  },
  indicator: {
    height: 3,
    width: 20,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: "lightgrey"
  },
  textOne: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.primaryPink
  },
  textTwo: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.primaryBlack
  },
  textThree: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.primaryWhite
  },
  buttonView: {
    height: 27,
    width: 120,
    backgroundColor: Colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counterView: {
    width: 45,
    height: 20,
    borderRadius: 50,
    backgroundColor: Colors.primaryWhite,
    position: 'absolute',
    right: 10,
    bottom: 10,
    justifyContent: "center",
    alignItems: 'center'
  }
});