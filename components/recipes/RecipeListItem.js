import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from 'react-native';
import { Headline } from "../common";
import {connect} from "react-redux";
import { grayCardBG } from "../../constants/Colors";
import { cardGray, textLink } from "../../constants/Styles";
import Icon from "../beans/BeanRecipes";
import Colors from "../../constants/Colors";
import { prettyDate, temperatureInUserPreference } from "../../helpers/labels";


// import styles from './styles';

class RecipeListItem extends Component {
  render() {
    // console.log('data', this.props);
    // console.log('recipe list item with id ' + this.props.id + 'selected? ', this.props.selected);
    return (
      <View style={{ marginVertical: 10, backgroundColor: grayCardBG}}>
        <TouchableOpacity onPress={() => this.props.onPressItem(this.props.id)} style={{ padding: 10 }}>
          {this._itemTexts()}
        </TouchableOpacity>
      </View>
    );
  }

  _itemTexts(item = this.props.data){
    const thisBrewMethodID = item.brew_method ? item.brew_method : false;
    // const thisBrewMethod = thisBrewMethodID && _.size(this.props.brewMethods) && _.size(this.props.brewMethods.brewMethods) && this.props.brewMethods.brewMethods[thisBrewMethodID] ? this.props.brewMethods.brewMethods[thisBrewMethodID] : false;
    const thisBrewMethod = this.props.brew_method ? this.props.brew_method : false;
    let itemTexts = [];
    if( item.modified ){ itemTexts.push(prettyDate(item.modified)); }
    if( item.nickname ){ itemTexts.push(`“${item.nickname}”`); }
    if( thisBrewMethod && thisBrewMethod.name ){ itemTexts.push(thisBrewMethod.name); }
    if( item.grind ){ itemTexts.push(`Grind: ${item.grind}`); }
    if( item.dose ){ itemTexts.push(`Dose: ${item.dose}g`); }
    if( item.temperature ){ itemTexts.push(`Temp: ${temperatureInUserPreference(item.temperature, this.props.userPreferences)}`); }

    let output = '';

    for(let i = 0; i < itemTexts.length; i++){
      output += itemTexts[i];
      output += i < (itemTexts.length - 1) ? ' — ' : '';
    }

    return <Text>{output}</Text>;
  }
}

// const mapStateToProps = state => ({
//   brewMethods: state.brewMethods.brewMethods
// });
const mapStateToProps = (state, props) => {
  const brew_method = props.data.brew_method && _.size(state.brewMethods.brewMethods[props.data.brew_method]) ? state.brewMethods.brewMethods[props.data.brew_method] : null;
  return {
    brew_method
  };
};

const mapDispatchToProps = dispatch => ({});

RecipeListItem = connect(mapStateToProps, mapDispatchToProps)(RecipeListItem);

RecipeListItem.propTypes = {
  data: PropTypes.object.isRequired,
  beanPage: PropTypes.bool
};

RecipeListItem.defaultProps = {
  data: {
    grind: null,
    dose: null,
    temperature: null,
    brew_method: null,
    nickname: null,
  },
  beanPage: false
};

export default RecipeListItem;
