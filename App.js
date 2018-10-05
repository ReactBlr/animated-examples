import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  state={};

  onPressButton = () => {

  }

  render() {
    return (
      <View style={styles.container}>
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
});
