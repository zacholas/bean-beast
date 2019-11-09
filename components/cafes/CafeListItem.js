import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, TouchableOpacity } from 'react-native';
import { defaultMarginAmount } from "../../constants/Styles";
import { BodyText, Hr } from "../common";
import { Strong } from "../common/Text/Strong";

// import styles from './styles';

export default class CafeListItem extends Component {
  render() {
    const beansCount = _.size(this.props.beans);
    console.log('beans', this.props.beans)
    // console.log('cafe list item with id ' + this.props.id + 'selected? ', this.props.selected);
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.onPressItem(this.props.id)}
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: defaultMarginAmount }}
        >
          <BodyText noMargin><Strong>{this.props.title}</Strong> — {beansCount} Beans</BodyText>
        </TouchableOpacity>
        <Hr style={{ marginBottom: 0 }} />
      </View>
    );
  }
}
