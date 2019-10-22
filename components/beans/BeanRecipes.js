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
import { cloneRecipe, deleteRecipe } from "../../actions";
import { generateRandomID } from "../../helpers";
import Modal from "../../components/common/Modal";
import Colors from '../../constants/Colors';

const Styles = {
  sideIcons: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: -15,
    marginLeft: 10,
    padding: 4
  },
  sideIcon: {
    padding: 8,
  }
};

class BeanRecipes extends Component {
  constructor(props){
    super(props);
    this.deleteConfirmModal = null;
    this.state = {
      recipe_id: null,
    }
  }

  render() {
    const { bean_id, favorites, recipes } = this.props;
    let theseRecipes = false;
    if(this.props.favorites === true){
      theseRecipes = _.filter(recipes, (recipe) => {
        return recipe.bean_id === bean_id && _.size(recipe.favorite_information) && recipe.favorite_information.is_favorite === true;
      });
      theseRecipes = _.orderBy(theseRecipes, ['modified'], ['desc']);
      theseRecipes = _.values(theseRecipes);
    }
    else {
      theseRecipes = _.filter(recipes, (recipe) => {
        return (
          recipe.bean_id === bean_id &&
          (
            !_.size(recipe.favorite_information) ||
            typeof recipe.favorite_information.is_favorite === 'undefined' ||
            recipe.favorite_information.is_favorite === false
          )
        );
      });
      theseRecipes = _.orderBy(theseRecipes, ['modified'], ['desc']);
      theseRecipes = _.values(theseRecipes);
    }
    //
    // console.log(this.props.favorites === true ? 'Favorite recipes' : 'Non fav recipes', theseRecipes);
    if(_.size(theseRecipes)) {
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
          <Modal ref={(ref) => { this.deleteConfirmModal = ref; }}>
            <Button
              onPress={() => {this._deleteRecipe()}}
              title='Yes, delete'
              iconName='trash'
            />
          </Modal>
        </View>
      );
    }

    return <View/>
  }

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
    // console.log('this recipe', item);
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
        <View style={Styles.sideIcons}>
          <TouchableOpacity onPress={() => this._cloneRecipe(item)} style={Styles.sideIcon}>
            <Icon name="copy" size={16} style={textLink} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPressDelete(item.id)} style={Styles.sideIcon}>
            <Icon name="trash" size={16} style={{ color: Colors.colorDanger }} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  _cloneRecipe(item){
    const id = generateRandomID('recipe');
    if(item.id && this.props.cloneRecipe){
      this.props.cloneRecipe(id, item.id);
      // console.log('done', this.props.recipes);
      // console.log('done', this.props.recipes[id]);
    }
  }

  _onPressDelete(recipe_id){
    this.setState({ recipe_id });
    this.deleteConfirmModal.show();
  }

  _deleteRecipe(){
    this.deleteConfirmModal.hide();
    this.props.deleteRecipe(this.state.recipe_id, false);
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  brewMethods: state.brewMethods,
  userPreferences: state.userPreferences
});

export default connect(mapStateToProps, { cloneRecipe, deleteRecipe })(BeanRecipes);

BeanRecipes.propTypes = {
  bean_id: PropTypes.string.isRequired,
  favorites: PropTypes.bool
};

BeanRecipes.defaultProps = {
  favorites: false,
  recipes: {}
};
