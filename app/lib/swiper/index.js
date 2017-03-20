import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import ViewPan from './ViewPan';
import Dots from './Dots';

export default class Swiper extends Component{

  static propTypes = {
    // 可选优化项。
    // 轮播图的高度（horizontal: false）或者宽度（horizontal: true）。
    size: PropTypes.number,
  };

  static defaultProps = {
    size: null
  };

  constructor(props){
    super(props);

    this.state = {
      size: props.size
    }
  }


  onWrapperLayout = (ev) => {

    const layout = ev.nativeEvent.layout;
    const size = this.props.horizontal ? layout.width : layout.height;

    if (size !== this.state.size) {
      this.setState({
        size,
      })
    }
  };

  _onChangeStart = (active) => {
    const {onChangeStart} = this.props;

    this.setState({
      active
    })

    onChangeStart && onChangeStart(active)
  };

  render(){

    const {style,horizontal,children} = this.props;
    const {size} = this.state;
    const stylesWrapper = horizontal ? styles.wrapper : styles.verticalWrapper;
    const total = React.Children.count(children)

    if (!size) {
      return (
        <View
          style={[style,stylesWrapper]}
          onLayout={this.onWrapperLayout}
        />
      )
    }

    return(
      <View
        style={[style,stylesWrapper]}
        onLayout={this.onWrapperLayout}
      >
        <ViewPan
          {...this.props}
          size={size}
          onChangeStart={this._onChangeStart}
        />
        <Dots
          total={total}
          active={this.state.active}
          horizontal={horizontal}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  verticalWrapper: {
    flexDirection: 'column',
  },
  item: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});