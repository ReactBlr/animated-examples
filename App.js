import React from 'react';
import { View, Animated, Text, Image, ScrollView } from 'react-native';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 64;
const IMAGE_MAX_WIDTH = 80;
// const IMAGE_MIN_WIDTH = 40;

const imageSource = require('./assets/icon.png');

// const GET_DATA_URL = 'http://www.mocky.io/v2/5b35cb7c2f0000692d3763c5';

export default class App extends React.Component {
  state={
    scrollY: new Animated.Value(0),
  };

  render() {
    const headerHeightInterpolate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerColorInterpolate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: ['lightblue', 'lightskyblue'],
      extrapolate: 'clamp',
    });

    return (
      <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            // height: HEADER_MAX_HEIGHT,
            // color: 'lightskyblue'
            height: headerHeightInterpolate,
            backgroundColor: headerColorInterpolate,
          }}
        />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ marginHorizontal: 16 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          )}
          scrollEventThrottle={16}
        >
          <View
            style={{
              height: IMAGE_MAX_WIDTH,
              width: IMAGE_MAX_WIDTH,
              borderRadius: IMAGE_MAX_WIDTH / 2,
              borderWidth: 4,
              borderColor: 'white',
              backgroundColor: 'white',
              marginTop: HEADER_MAX_HEIGHT - IMAGE_MAX_WIDTH / 2,
            }}
          >
            <Image
              source={imageSource}
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
          {/* Title Component */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: '500',
            }}
          >
            React Bangalore
          </Text>
        </ScrollView>
      </View>
    );
  }
}
