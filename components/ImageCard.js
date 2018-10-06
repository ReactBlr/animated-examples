import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';

class ImageCard extends React.Component {
  state = {};

  render() {
    const { item } = this.props;

    const isProductAvailable = item.availability === 'in stock';

    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.card}>
        <Image
          style={[
            styles.image,
            {
              opacity: isProductAvailable ? 1 : 0.5,
              borderWidth: 1,
              borderColor: '#eee',
              marginRight: 16,
            },
          ]}
          source={{ uri: item.image }}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.title}>
            {item.title}
          </Text>
          {isProductAvailable
            ? (
              <Text style={styles.price}>
                {`₹ ${item.price}`}
              </Text>
            )
            : (
              <Text style={styles.soldOutText}>
                Sold Out
              </Text>
            )
          }
        </View>
      </TouchableOpacity>
    );
  }
}

export default ImageCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    height: 120,
    width: 120,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
  },
  price: {
    paddingTop: 8,
    fontSize: 16,
  },
  soldOutText: {
    paddingTop: 8,
    color: '#fc6c85',
    fontWeight: '500',
  },
});
