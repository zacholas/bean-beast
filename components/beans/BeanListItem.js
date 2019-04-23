import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

// import styles from './styles';

export default class BeanListItem extends Component {
  render() {
    // console.log('bean list item with id ' + this.props.id + 'selected? ', this.props.selected);
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.onPressItem(this.props.id)}>
          <Text>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
