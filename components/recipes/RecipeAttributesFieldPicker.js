import React, {Component} from 'react';
import {FlatList, View, Text, TouchableOpacity} from "react-native";
import _ from 'lodash';
import PropTypes from "prop-types";
import { marginBottom } from "../../constants/Styles";
import {Headline} from "../common";

class RecipeAttributesFieldPicker extends Component {
  render() {
    return (
      <View>
        <Headline noMargin h5>Recipe Attributes:</Headline>
        <FlatList
          data={this._getRecipeAttributes()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={marginBottom}
        />
      </View>
    );
  }

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.props.onAttributePress(item)} style={{ paddingVertical: 6 }}>
        <Text>{item.name}</Text>
        {item.description && <Text style={{ fontSize: 9 }}>{item.description}</Text>}
      </TouchableOpacity>
    );
  };

  _getRecipeAttributes(){
    // console.log(this.props.formValues.EditRecipeForm.values);
    const thisBrewMethodID = _.size(this.props.formValues.EditRecipeForm) && _.size(this.props.formValues.EditRecipeForm.values) && this.props.formValues.EditRecipeForm.values.brew_method ? this.props.formValues.EditRecipeForm.values.brew_method : null;;
    const thisBrewMethod = thisBrewMethodID && _.size(this.props.brewMethods) && _.size(this.props.brewMethods.brewMethods) && this.props.brewMethods.brewMethods[thisBrewMethodID] ? this.props.brewMethods.brewMethods[thisBrewMethodID] : false;
    const brewMethodLabel = thisBrewMethod ? `for ${thisBrewMethod.name}` : 'for this brew method';
    const recipeAttributes = [
      {
        type: 'attribute',
        id: 'nickname',
        name: 'Recipe Nickname',
        description: `A friendly name to help you remember this recipe.`,
        order: 1,
        repeatable: false,
        applicableForAllBrewMethods: true,
        applicableBrewMethodsDefault: [],
        // applicableBrewMethodsUser: [],
      },
      {
        type: 'attribute',
        id: 'recipe_notes',
        name: 'Misc Recipe Notes',
        description: 'Any misc notes you have about this recipe.',
        order: 2,
        repeatable: false,
        applicableForAllBrewMethods: true,
        applicableBrewMethodsDefault: [],
        // applicableBrewMethodsUser: [],
      },
      {
        type: 'attribute',
        id: 'recipe_objectives',
        name: 'Recipe Objectives',
        description: 'Recipe objectives are your "measuring stick" for you to know if a recipe is a success.',
        order: 3,
        repeatable: false,
        applicableForAllBrewMethods: true,
        applicableBrewMethodsDefault: [],
        // applicableBrewMethodsUser: [],
      },
      {
        type: 'attribute',
        id: 'notes_for_next_time',
        name: 'Notes For Next Time',
        description: `Things for you to keep in mind for the next time you use this bean ${brewMethodLabel}.`,
        order: 4,
        repeatable: false,
        applicableForAllBrewMethods: true,
        applicableBrewMethodsDefault: [],
        // applicableBrewMethodsUser: [],
      },
    ];

    return recipeAttributes;
  }
}

export default RecipeAttributesFieldPicker;

RecipeAttributesFieldPicker.propTypes = {
  onAttributePress: PropTypes.func,
};

RecipeAttributesFieldPicker.defaultProps = {
  onAttributePress: () => {},
};
