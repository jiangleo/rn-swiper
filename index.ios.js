/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import Demo from './example/HorizontalExample';
import Demo from './example/VerticalExample';

AppRegistry.registerComponent('swiper', () => Demo);
