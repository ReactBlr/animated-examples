import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';

const logoImage = require('./assets/icon.png');

export default class App extends React.Component {
  state={
    animatedRotateValue: new Animated.Value(0),
    animatedScaleValue: new Animated.Value(0),
  };

  componentDidMount() {
    const { animatedRotateValue, animatedScaleValue } = this.state;

    Animated.timing(
      animatedScaleValue, {
        toValue: 1,
        useNativeDriver: true,
        duration: 3000,
        easing: Easing.elastic(2),
      },
    ).start();

    Animated.loop(
      Animated.timing(
        animatedRotateValue,
        {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.linear,
        },
      ),
    ).start();
  }

  render() {
    const { animatedRotateValue, animatedScaleValue } = this.state;

    const spinTransform = animatedRotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const scaleTransform = animatedScaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <View style={styles.container}>
        <Animated.Image
          source={logoImage}
          style={{
            height: 100,
            width: 100,
            transform: [
              { rotate: spinTransform },
              { scaleX: scaleTransform },
              { scaleY: scaleTransform },
            ],
          }}
        />
        <Text style={styles.t1}>
          Checkout the branches of this repo to try out awesome animations.
        </Text>
        <Text style={styles.t2}>
          {'😬 Also check README.md 😬'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  t1: {
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
  },
  t2: {
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 16,
  },
});
