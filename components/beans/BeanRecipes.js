import React, { Component } from 'react';
import _ from 'lodash';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import * as navRoutes from '../../constants/NavRoutes';
import PropTypes from "prop-types";
import {BodyText, Button, Headline, Hr} from "../common";
import {marginBottomHalf} from "../../constants/Styles";

class BeanRecipes extends Component {

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _onPressItem = (id) => {
    // this.props.navigation.navigate(navRoutes.VIEW_RECIPE, {
    //   id
    // })
  };

  _renderItem = ({item}) => {
    console.log('this recipe', item);
    return (
      <View
        id={item.id}
        onPressItem={this._onPressItem}
        data={item}
        beanPage={this.props.beanPage}
      >
        <Text>hi</Text>
      </View>
      // <RecipeListItem
      //   id={item.id}
      //   onPressItem={this._onPressItem}
      //   data={item}
      //   beanPage={this.props.beanPage}
      // />
    );
  };

  render() {
    const { bean_id, favorites, recipes } = this.props;
    let theseRecipes = false;
    if(this.props.favorites === true){

    }
    else {
      theseRecipes = _.filter(recipes, (recipe) => { return recipe.bean_id === bean_id });
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
  recipes: state.recipes.recipes
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
