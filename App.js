/*
  In this example, I animate the size of a circle over a period of time.
  Using Animated.Stagger & Animated.Loop, I sequence a few simple animations.
*/

import React from 'react';
import { StyleSheet, View, Button, Animated } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state={
    valueA: new Animated.Value(0),
    valueB: new Animated.Value(1),
  };

  onPressButton = () => {
    const { valueA, valueB } = this.state;
    Animated.loop(
      Animated.stagger(1000, [
        Animated.timing(valueA, { toValue: 100 }),
        Animated.timing(valueB, { toValue: 0.5 }),
        Animated.timing(valueA, { toValue: 200 }),
        Animated.timing(valueB, { toValue: 1 }),
        Animated.timing(valueA, { toValue: 100 }),
        Animated.timing(valueB, { toValue: 0.5 }),
        Animated.timing(valueA, { toValue: 0 }),
        Animated.timing(valueB, { toValue: 1 }),
      ]),
    ).start();
  }

  render() {
    const { valueA, valueB } = this.state;

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: valueB,
            width: valueA,
            height: valueA,
            borderRadius: valueA,
            backgroundColor: '#ff7700',
          }}
        />
        <Button
          title="Click Me"
          onPress={this.onPressButton}
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
  animatedViewStyle: {
  },
});
