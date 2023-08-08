import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductsScreen from './screens/ProductsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ShoppingCart from './screens/ShoppingCart';
import { UserMenuScreen } from './screens/UserMenuScreen';
import { LoginScreen } from './screens/LoginScreen';

import { Pressable, Text } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectNumberOfItems } from './store/cartSlice';

import { userSlice } from './store/userSlice';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numberOfItems = useSelector(selectNumberOfItems);
  const user = useSelector((state) => state.user.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
      >
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerLeft: () => ( // () => () equal to return
              <Pressable
                onPress={() => navigation.navigate('UserMenu')}
              >
                <FontAwesome5 name="user" size={18} color="gray" />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Cart')}
                style={{ flexDirection: 'row' }}
              >
                {user != '' ? <FontAwesome5 name="shopping-cart" size={18} color="gray" /> : null}
                {user != '' ? <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                  {numberOfItems}
                </Text> : null}
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="Cart"
          component={ShoppingCart}
        />
        <Stack.Screen
          name="UserMenu"
          component={UserMenuScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            presentation: 'modal'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
