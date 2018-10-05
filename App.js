/*
  In this example, we have a Button and an Animated.View. Click the Button and
  the View becomes opaque. Click it again and the View becomes transparent.

  Take a close look at what happens. On click the Animated.Value will time to
  the 'toValues' mention in the onPressButton function.

  Try fiddling around with the 'toValues' and the styles of the Animated.View.
*/

import React from 'react';
import { StyleSheet, View, Button, Animated } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state={
    valueA: new Animated.Value(0),
    animatingIn: false,
  };

  onPressButton = () => {
    const { animatingIn, valueA } = this.state;
    this.setState({ animatingIn: !animatingIn });

    if (animatingIn) {
      Animated.timing(valueA, { toValue: 0, duration: 1000 }).start();
    } else {
      Animated.timing(valueA, { toValue: 1, duration: 1000 }).start();
    }
  }

  render() {
    const { valueA } = this.state;

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: valueA,
            width: 200,
            height: 200,
            backgroundColor: '#ffaa00',
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
