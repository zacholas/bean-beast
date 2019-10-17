import React, { Component } from 'react';
import _ from 'lodash';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as navRoutes from '../../constants/NavRoutes';
import PropTypes from "prop-types";
import {BodyText, Button, Headline, Hr} from "../common";
import {cardGray, marginBottomHalf, textLink} from "../../constants/Styles";
import {prettyDate, temperatureInUserPreference} from "../../helpers/labels";

class BeanRecipes extends Component {

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _onPressItem = (id) => {
    this.props.navigation.navigate(navRoutes.VIEW_RECIPE, {
      id
    })
  };

  _itemTexts(item){
    const thisBrewMethodID = item.brew_method ? item.brew_method : false;
    const thisBrewMethod = thisBrewMethodID && _.size(this.props.brewMethods) && _.size(this.props.brewMethods.brewMethods) && this.props.brewMethods.brewMethods[thisBrewMethodID] ? this.props.brewMethods.brewMethods[thisBrewMethodID] : false;

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

  _renderItem = ({item}) => {
    console.log('this recipe', item);
    //* TODO show rating info here once I create it
    return (
      <TouchableOpacity
        id={item.id}
        onPress={() => { this._onPressItem(item.id) }}
        data={item}
        beanPage={this.props.beanPage}
        style={{ ...cardGray, flexDirection: 'row' }}
      >
        <View style={{ flex: 1 }}>
          {this._itemTexts(item)}
        </View>
        {/*<View style={{ marginLeft: 10 }}>*/}
          {/*<TouchableOpacity>*/}
            {/*<Icon name="copy" size={16} style={textLink} />*/}
          {/*</TouchableOpacity>*/}
        {/*</View>*/}
      </TouchableOpacity>
    );
  };

  render() {
    const { bean_id, favorites, recipes } = this.props;
    let theseRecipes = false;
    if(this.props.favorites === true){

    }
    else {
      theseRecipes = _.filter(recipes, (recipe) => { return recipe.bean_id === bean_id });
      theseRecipes = _.orderBy(theseRecipes, ['modified'], ['desc']);
      theseRecipes = _.values(theseRecipes);
    }
    //
    // console.log(recipes);
    if(theseRecipes) {
      return (
        <View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Headline h5 inline style={marginBottomHalf}>Your {this.props.favorites === true && 'Favorite '}Recipes with
                this Bean:</Headline>
              <Text>Filter & Sort</Text>
            </View>
            <FlatList
              data={theseRecipes}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </View>
          <Hr />
        </View>
      );
    }

    return <View/>
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  brewMethods: state.brewMethods,
  userPreferences: state.userPreferences
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BeanRecipes);

BeanRecipes.propTypes = {
  bean_id: PropTypes.string.isRequired,
  favorites: PropTypes.bool
};

BeanRecipes.defaultProps = {
  favorites: false,
  recipes: {}
};
