import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import _ from 'lodash';

import PropTypes from "prop-types";

import { textLink, marginBottom, cardGray } from '../../common/Styles';
import colors from '../../../constants/Colors';
import {FieldArray} from "redux-form";
import * as styles from "../../common/reduxForm/Styles";
import { throwError } from "../../../helpers";
import {Headline} from "../../common";
import RecipeStepItem from './RecipeStepItem';




export default class RecipeSteps extends Component {
  render() {
    return (
      <View style={cardGray}>
        <Text style={{ marginBottom: 15 }}>Recipe Steps:</Text>
        <FieldArray name="recipe_steps" component={this.renderRecipes} parentProps={this.props} />
        {/*<FieldArray name="recipe_steps" component={<RecipeStepItem />} parentProps={this.props} />*/}
      </View>
    );
  }

  renderRecipes = ({ fields, meta: { touched, error, submitFailed }, parentProps }) => {
    return (
      <View>
        {touched &&
        ((error && <Text style={styles.errorText}>{error}</Text>) ||
          (warning && <Text style={styles.warningText}>{warning}</Text>))}

        {fields.map((recipe, index) => {
          const thisRecipeValues = _.size(parentProps.formValues.EditRecipeForm) && _.size(parentProps.formValues.EditRecipeForm.values) && _.size(parentProps.formValues.EditRecipeForm.values.recipe_steps) && parentProps.formValues.EditRecipeForm.values.recipe_steps[index] ? parentProps.formValues.EditRecipeForm.values.recipe_steps[index] : null;
          if(thisRecipeValues){
            return this._renderItem(recipe, index, fields, thisRecipeValues, parentProps, parentProps.formValues.EditRecipeForm.values.recipe_steps);
          }
          else {
            throwError(error, 'components/recipes/recipeSteps/RecipeSteps.js', 'renderRecipes');
          }
        })}
      </View>
    );
  };



  _renderItem = (item, index, fields, itemValues, parentProps, recipeStepsValues) => {
    return (
      <RecipeStepItem
        key={index}
        item={item}
        index={index}
        fields={fields}
        itemValues={itemValues}
        parentProps={parentProps}
        recipeStepsValues={recipeStepsValues}
        editStep={this.props.editStep}
        moveStepUp={this.props.moveStepUp}
        moveStepDown={this.props.moveStepDown}
      />
    );
  };
}

RecipeSteps.propTypes = {
  editStep: PropTypes.func.isRequired,
  moveStepUp: PropTypes.func.isRequired,
  moveStepDown: PropTypes.func.isRequired,
};
