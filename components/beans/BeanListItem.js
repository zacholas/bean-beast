import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from "prop-types";
import { beanTitleDisplay, roastLevelDisplay } from "../../helpers/labels";
import { defaultMarginAmount } from "../../constants/Styles";
import { Hr } from "../common";

// import styles from './styles';

export default class BeanListItem extends Component {
  render() {
    // console.log('bean list item with id ' + this.props.id + 'selected? ', this.props.selected);
    // console.log('bean cafe info', this.props.cafe);
    // console.log('bean props', this.props.bean);
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.onPressItem(this.props.id)}
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: defaultMarginAmount / 2 }}
        >
          {this._beanImage()}
          <View>
            {this._beanTitle()}
            {this._roasterName()}
          </View>

        </TouchableOpacity>
        <Hr style={{ marginBottom: 0 }} />
      </View>
    );
  }

  _beanTitle(){
    const output = beanTitleDisplay(this.props.bean, this.props.origins.origins, this.props.beanProcesses.beanProcesses);
    console.log(output);

    if(output){
      return <Text>{output}</Text>;
    }
    // const { name, roast_level } = this.props.bean;
    // const cafeName = this.props.cafe && this.props.cafe.name ? this.props.cafe.name : null;
    //
    // let output = null;
    //
    // if( name ){
    //   output = name;
    // }
    // else if ( roast_level ){
    //   output = roastLevelDisplay(roast_level);
    // }
    // // else if ( roast_level && cafeName ){
    // //   output = '' + roastLevelDisplay(roast_level) + ' by ' + cafeName;
    // // }
    // else {
    //   output = 'Unnamed Bean';
    // }
    // return <Text>{output}</Text>;
  }

  _roasterName(){
    if(this.props.cafe && this.props.cafe.name) {
      return (
        <Text>By {this.props.cafe.name}</Text>
      )
    }
  }

  _beanImage(){
    const beanImage = this.props.bean.bean_image;
    return (
      <View style={{ width: 50, marginRight: 10 }}>
        <Image source={{ uri: beanImage }} style={{ width: 50, height: 50, marginRight: 15 }} />
      </View>
    );
  }
}

BeanListItem.propTypes = {
  bean: PropTypes.object.isRequired,
  cafe: PropTypes.object
};

BeanListItem.defaultProps = {
  cafe: {}
};
