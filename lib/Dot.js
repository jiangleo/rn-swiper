import React, {Component, PropTypes} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

export default class Dot extends Component {
  static propTypes = {
    style: View.propTypes.style,
  };

  render() {
    const {activeColor, style} = this.props;

    return (
      <View
        style={ [
          styles.dot,
          style]}
      />
    );
  }
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: '#ccc',
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  }
});