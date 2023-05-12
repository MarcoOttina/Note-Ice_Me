import React from 'react'; // , { useMemo }
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

const baseOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade',
};