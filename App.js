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
    setTimeout(() => { burnCPU(500); }, 200);

    const { valueA, valueB } = this.state;

    // Bad Animated
    Animated.timing(valueA, {
      duration: 5000,
      toValue: 1,
    }).start();

    // Good Animated
    Animated.timing(valueB, {
      duration: 5000,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { valueA, valueB } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Animated.View
            style={{
              backgroundColor: 'black',
              width: 100,
              height: 200,
              margin: 20,
              opacity: valueA,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: 'black',
              width: 100,
              height: 200,
              margin: 20,
              opacity: valueB,
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
