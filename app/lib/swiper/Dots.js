import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Dot from './Dot';

export default class Dots extends PureComponent {

  static propTypes = {
    total: React.PropTypes.number,
    active: React.PropTypes.number,
    style: View.propTypes.style,
    horizontal: React.PropTypes.bool,
    dotStyle: View.propTypes.style,
    dotColor: React.PropTypes.string,
    activeDotStyle: View.propTypes.style,
    activeDotColor: React.PropTypes.string,
  };

  static defaultProps = {
    total: 0,
    active: -1,
    activeDotColor: 'red'
  };

  render() {
    const { total, active, style, horizontal, dotColor, dotStyle, activeDotStyle,activeDotColor } = this.props;
    const dot = <Dot />;
    const dots = [];
    const dotsStyle = [styles["dots_" + (horizontal ? "x": "y" )], style];

    for( let i = 0; i < total; i++){

      let dStyle = [dotStyle, dotColor && {backgroundColor: dotColor}];

      if(i == active){
        dStyle.push(activeDotStyle,activeDotColor && {backgroundColor: activeDotColor})
      }

      dots.push(
        React.cloneElement(dot, {key: i, style: dStyle})
      )
    }


    return (
      <View style={ dotsStyle }>
        { dots }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dots_x: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  dots_y: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

});