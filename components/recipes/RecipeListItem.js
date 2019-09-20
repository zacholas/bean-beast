import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

// import styles from './styles';

export default class RecipeListItem extends Component {
  render() {
    // console.log('recipe list item with id ' + this.props.id + 'selected? ', this.props.selected);
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.onPressItem(this.props.id)}>
          <View style={{ flexDirection: 'row' }}>
            <Text>Grind: {this.props.data.grind} </Text>
            <Text>Dose: {this.props.data.dose} </Text>
            <Text>Temp: {this.props.data.temperature} </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
