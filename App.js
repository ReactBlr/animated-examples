import React from 'react';
import { StyleSheet, View, Button, Animated } from 'react-native';

function burnCPU(milliseconds) {
  const startDate = new Date();
  let currDate = new Date();
  while (currDate - startDate < milliseconds) {
    currDate = new Date();
  }
}

export default class App extends React.Component {
  state={
    valueA: new Animated.Value(0),
    valueB: new Animated.Value(0),
  };

  handleOnPress = () => {
    setTimeout(() => { burnCPU(1000); }, 200);

    const { valueA, valueB } = this.state;

    // Bad Animated
    Animated.timing(valueA, {
      duration: 3000,
      toValue: 1,
    }).start();

    // Good Animated
    Animated.timing(valueB, {
      duration: 3000,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { valueA, valueB } = this.state;

    const scaleTransformA = valueA.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -200],
    });

    const scaleTransformB = valueB.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -200],
    });

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Animated.View
            style={{
              backgroundColor: 'black',
              width: 50,
              height: 100,
              margin: 40,
              transform: [{ translateY: scaleTransformA }],
            }}
          />
          <Animated.View
            style={{
              backgroundColor: 'black',
              width: 50,
              height: 100,
              margin: 40,
              transform: [{ translateY: scaleTransformB }],
            }}
          />
        </View>
        <Button
          title="Click Me"
          onPress={this.handleOnPress}
          style={styles.button}
        />
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
  button: {
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
  },
});
