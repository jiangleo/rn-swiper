/**
 * Sample React Native App
 * https://github.com/facebook/reactnative
 * @flow
 */

import React, {Component,PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  PanResponder,
  Animated,
} from 'react-native';

import Swiper from '../../lib/swiper';



export default class HorizontalExample extends Component {
  render(){
    return(
      <Swiper
        style={styles.wrapper}
        defaultPosition={0}
        horizontal={false}
        isLoop={true}
        onChangeStart={(index)=>{
          console.log('onChangeStart',index)
        }}
        onChangeEnd={(index)=>{
          console.log('onChangeEnd',index)
        }}
        autoPlayDirection={false}
        autoPlayTimeout={10000}
      >
        <View style={styles.view1}>
          <Text>0</Text>
        </View>
        <View style={styles.view2}>
          <Text>1</Text>
        </View>
        <View style={styles.view3}>
          <Text>2</Text>
        </View>
      </Swiper>
    )
  }
}




const styles = StyleSheet.create({
  wrapper: {
    marginTop: 200,
    width: 200,
    height: 200,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  view1: {
    flex:1,
    backgroundColor: '#0ca',
  },
  view2: {
    flex:1,
    backgroundColor: '#0ac',
  },
  view3: {
    flex:1,
    backgroundColor: '#ac0',
  },
});