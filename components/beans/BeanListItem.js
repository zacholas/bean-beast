import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from "prop-types";
import { beanTitleDisplay, roastLevelDisplay } from "../../helpers/labels";
import { defaultMarginAmount } from "../../constants/Styles";
import { BodyText, Hr } from "../common";
import { grayCardBG } from "../../constants/Colors";

// import styles from './styles';

export default class BeanListItem extends Component {
  render() {
    // console.log('bean list item with id ' + this.props.id + 'selected? ', this.props.selected);
    // console.log('bean cafe info', this.props.cafe);
    // console.log('bean props', this.props.bean);
    return (
      <View style={{ backgroundColor: grayCardBG, marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => this.props.onPressItem(this.props.id, this.props.bean, this.props.editBeanAction)}
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
        >
          {this._beanImage()}
          <View>
            <BodyText noMargin>
              {this._beanTitle()}
              {this._roasterName()}
            </BodyText>
          </View>

        </TouchableOpacity>
        <Hr style={{ marginBottom: 0 }} />
      </View>
    );
  }

  _beanTitle(){
    const output = beanTitleDisplay(this.props.bean, this.props.origins.origins, this.props.beanProcesses.beanProcesses);

    if(output){
      return <Text>{output} </Text>;
    }
  }

  _roasterName(){
    if(this.props.cafe && this.props.cafe.name) {
      return (
        <Text>By {this.props.cafe.name}</Text>
      )
    }
  }

  _beanImage(){
    const beanImage = _.size(this.props.bean) && this.props.bean.bean_image ? this.props.bean.bean_image : null;
    if(beanImage) {
      return (
        <View style={{width: 50, marginRight: 10}}>
          <Image source={{uri: beanImage}} style={{width: 50, height: 50, marginRight: 15}} />
        </View>
      );
    }
  }
}

BeanListItem.propTypes = {
  bean: PropTypes.object.isRequired,
  cafe: PropTypes.object
};

BeanListItem.defaultProps = {
  cafe: {}
};
