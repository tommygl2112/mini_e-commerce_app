import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { productsSlice } from '../store/productsSlice';
import { useEffect } from 'react';

const ProductsScreen = ({ navigation }) => {
  // const navigation = useNavigation();

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => dispatch(productsSlice.actions.productsFetched(data)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            // update selected product
            dispatch(productsSlice.actions.setSelectedProduct(item.id));

            navigation.navigate('Product Details');
          }}
          style={styles.itemContainer}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>{item.title}</Text>
          </View>
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '50%',
    padding: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  textStyle: {
    color: 'white',
  },
});

export default ProductsScreen;
