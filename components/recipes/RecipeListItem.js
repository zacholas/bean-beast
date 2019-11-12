import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from 'react-native';
import { BodyText, Headline } from "../common";
import {connect} from "react-redux";
import { grayCardBG } from "../../constants/Colors";
import { cardGray, centerEverything, textLink } from "../../constants/Styles";
import Icon from "../beans/BeanRecipes";
import Colors from "../../constants/Colors";
import {
  beanTitleDisplay,
  getMonthFromTimestamp,
  prettyDate,
  temperatureInUserPreference,
} from "../../helpers/labels";
import styles from "../../screens/recipes/styles";
import { Strong } from "../common/Text/Strong";


// import styles from './styles';

class RecipeListItem extends Component {
  render() {
    // console.log('data', this.props);
    const itemTexts = this._itemTexts();
    const beanInfo = this._beanInfo();
    // console.log('recipe list item with id ' + this.props.id + 'selected? ', this.props.selected);


    const item = this.props.data;
    return (
      <View style={{ marginVertical: 10, backgroundColor: grayCardBG}}>
        <TouchableOpacity onPress={() => this.props.onPressItem(this.props.id)} style={{ padding: 10, flexDirection: 'row' }}>
          {item.modified ? (
            <View style={{ ...centerEverything, paddingRight: 16, paddingLeft: 3 }}>
              <BodyText noMargin style={{ marginBottom: -6, fontSize: 20, marginTop: 3 }}>{new Date(item.modified).getDate()}</BodyText>
              <Headline noMargin h6>{getMonthFromTimestamp(item.modified, true)}</Headline>
            </View>
          ) : <View/> }
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <BodyText noMargin>
              {/*{this._itemTexts()}*/}
              {itemTexts}
              {itemTexts && beanInfo ? ' — ' : ''}
              {beanInfo}
            </BodyText>
            {item.grind || item.dose || item.temperature ? (
              <BodyText noMargin>
                {item.grind && `Grind: ${item.grind}` || ''}
                {item.grind && (item.dose || item.temperature) ? '; ' : ''}
                {item.dose && `${item.dose}g ` || ''}
                {item.temperature ? `@ ${temperatureInUserPreference(item.temperature, this.props.userPreferences, item.temperatureMeasurement)}` : ''}
                {/*{item.temperature && `@ ${item.temperature}° ` || ''}*/}
              </BodyText>
            ) : <View/>}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _itemTexts(item = this.props.data){
    const { bean, roaster } = this.props;
    const thisBrewMethodID = item.brew_method ? item.brew_method : false;
    // const thisBrewMethod = thisBrewMethodID && _.size(this.props.brewMethods) && _.size(this.props.brewMethods.brewMethods) && this.props.brewMethods.brewMethods[thisBrewMethodID] ? this.props.brewMethods.brewMethods[thisBrewMethodID] : false;
    const thisBrewMethod = this.props.brew_method ? this.props.brew_method : false;
    let itemTexts = [];
    // if( item.modified ){ itemTexts.push(prettyDate(item.modified)); }
    if( item.nickname ){ itemTexts.push(`“${item.nickname}”`); }
    if( thisBrewMethod && thisBrewMethod.name ){ itemTexts.push(thisBrewMethod.name); }
    // if( item.grind ){ itemTexts.push(`Grind: ${item.grind}`); }
    // if( item.dose ){ itemTexts.push(`Dose: ${item.dose}g`); }
    // if( item.temperature ){ itemTexts.push(`Temp: ${temperatureInUserPreference(item.temperature, this.props.userPreferences, item.temperatureMeasurement)}`); }

    let output = '';

    for(let i = 0; i < itemTexts.length; i++){
      output += itemTexts[i];
      output += i < (itemTexts.length - 1) ? ' — ' : '';
    }

    if(output) {
      return <Text>{output}</Text>;
    }
  }

  _beanInfo(){
    const { bean, roaster } = this.props;
    // console.log('bean', beanTitleDisplay(bean, this.props.origins, this.props.beanProcesses));
    // console.log('bean', bean);
    if(bean){
      let beanContent = String('');
      let roasterContent = String('');
      if(bean){
        beanContent += `${beanTitleDisplay(bean, this.props.origins, this.props.beanProcesses)}`;
        if(roaster && roaster.name) {
          roasterContent = <Text style={{ fontStyle: 'italic' }}> (Roasted by {roaster.name})</Text>;
        }
      }

      return (
        <Text><Strong>Bean:</Strong> {beanContent}{roasterContent}</Text>
      );
    }
  }
}

// const mapStateToProps = state => ({
//   brewMethods: state.brewMethods.brewMethods
// });
const mapStateToProps = (state, props) => {
  const recipe = props.data;
  const brew_method = props.data.brew_method && _.size(state.brewMethods.brewMethods[props.data.brew_method]) ? state.brewMethods.brewMethods[props.data.brew_method] : null;
  const beanID = recipe.bean_id ? recipe.bean_id : false;
  const roasterID = _.size(state.beans) && _.size(state.beans.beans) && state.beans.beans[beanID] && state.beans.beans[beanID].cafe ? state.beans.beans[beanID].cafe : false;
  return {
    brew_method,
    bean: beanID && _.size(state.beans) && _.size(state.beans.beans) && state.beans.beans[beanID] ? state.beans.beans[beanID] : false,
    roaster: roasterID && _.size(state.cafes) && _.size(state.cafes.cafes) && state.cafes.cafes[roasterID] ? state.cafes.cafes[roasterID] : false,
    origins: state.origins.origins,
    beanProcesses: state.beanProcesses.beanProcesses,
    userPreferences: state.userPreferences
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
