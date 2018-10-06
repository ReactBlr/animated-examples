import React from 'react';
import { View, Animated, Image, FlatList } from 'react-native';
import ImageCard from './components/ImageCard';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 64;
const IMAGE_MAX_WIDTH = 80;

const imageSource = require('./assets/icon.png');

const GET_DATA_URL = 'http://www.mocky.io/v2/5b35cb7c2f0000692d3763c5';

export default class App extends React.Component {
  state={
    scrollY: new Animated.Value(0),
    data: [],
  };

  componentDidMount() {
    this.callApi();
  }

  callApi = async () => {
    try {
      const response = await fetch(GET_DATA_URL);
      const { data } = await response.json();
      this.setState({ data });
      console.log(data);
    } catch (err) {
      console.warn(err);
    }
  }

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

    const imageTranslateX = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, -24],
      extrapolate: 'clamp',
    });

    const imageTranslateY = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, -HEADER_MIN_HEIGHT - 20],
      extrapolate: 'clamp',
    });

    const imageScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    const textColorInterpolate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: ['black', 'white'],
      extrapolate: 'clamp',
    });

    const textTranslateY = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, -HEADER_MAX_HEIGHT - 18],
      extrapolate: 'clamp',
    });

    const textTranslateX = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 48],
      extrapolate: 'clamp',
    });

    return (
      <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
        <FlatList
          style={{ flex: 1 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          )}
          scrollEventThrottle={16}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={(
            <View style={{ paddingHorizontal: 16 }}>
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: headerHeightInterpolate,
                  backgroundColor: headerColorInterpolate,
                }}
              />
              <Animated.View
                style={{
                  height: IMAGE_MAX_WIDTH,
                  width: IMAGE_MAX_WIDTH,
                  borderRadius: IMAGE_MAX_WIDTH / 2,
                  borderWidth: 4,
                  borderColor: 'white',
                  backgroundColor: 'white',
                  marginTop: HEADER_MAX_HEIGHT - IMAGE_MAX_WIDTH / 2,
                  transform: [
                    { translateY: imageTranslateY },
                    { translateX: imageTranslateX },
                    { scale: imageScale },
                  ],
                }}
              >
                <Image
                  source={imageSource}
                  style={{ flex: 1, width: null, height: null }}
                />
              </Animated.View>
              <Animated.Text
                style={{
                  fontSize: 24,
                  fontWeight: '500',
                  color: textColorInterpolate,
                  transform: [
                    { translateY: textTranslateY },
                    { translateX: textTranslateX },
                  ],
                }}
              >
                React Bangalore
              </Animated.Text>
            </View>
          )}
          data={this.state.data}
          renderItem={({ item }) => (
            <ImageCard item={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}
