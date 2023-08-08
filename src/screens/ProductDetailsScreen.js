import {
  StyleSheet,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import products from '../data/products';
import { useSelector, useDispatch } from 'react-redux';
import { cartSlice } from '../store/cartSlice';
import { userSlice } from '../store/userSlice';

const ProductDetailsScreen = ({ navigation }) => {
  const product = useSelector((state) => state.products.selectedProduct);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
    navigation.goBack(); // Close the modal
    navigation.navigate('Cart'); // Navigate to the Cart screen
  };

  return (
    <View>
      <ScrollView>
        {/* Image Carousel */}
        <FlatList
          // data={product.images} // get images array
          data={product.image}
          renderItem={({ item }) => (
            // <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} /> // show images array
            <Image source={{ uri: product.image }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        {/* Data container */}
        <View style={{ padding: 20, marginBottom: 100 }}>
          {/* Title */}
          <Text style={styles.title}>{product.title}</Text>

          {/* Category */}
          <Text style={styles.category}>{product.category}</Text>

          {/* Price */}
          <Text style={styles.price}>${product.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Add to cart button */}
      {user != '' ? <Pressable onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable> : null}

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: '500',
    marginVertical: 10,
  },
  price: {
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
  },
  category: {
    fontSize: 14,
    marginBottom: 40,
    fontWeight: '300',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
