/*
  In this example, I show how to create a spinning animation using interpolations.
*/

import React from 'react';
import { StyleSheet, View, Button, Animated } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  spinValue = new Animated.Value(0);

  onPressStart = () => {
    Animated.loop(
      Animated.stagger(1000, [
        Animated.timing(this.spinValue, { toValue: 1 }),
        Animated.timing(this.spinValue, { toValue: 0 }),
      ]),
    ).start();
  }

  render() {
    const spinTransform = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            width: 200,
            height: 100,
            borderRadius: 50,
            backgroundColor: 'green',
            transform: [{ rotate: spinTransform }],
          }}
        />
        <Button
          title="Spin Button"
          onPress={this.onPressStart}
          style={styles.buttonStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    padding: 100,
  },
});
