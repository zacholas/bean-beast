import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import { textLink, marginBottom, cardGray } from '../../common/Styles';
import colors from '../../../constants/Colors';
import {FieldArray} from "redux-form";
import * as styles from "../../common/reduxForm/Styles";
import { throwError } from "../../../helpers";
import {Headline} from "../../common";

export default class RecipeSteps extends Component {
  render() {
    return (
      <View style={cardGray}>
        <Text style={{ marginBottom: 15 }}>Recipe Steps:</Text>
        <FieldArray name="recipe_steps" component={this.renderRecipes} parentProps={this.props} />
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

  _moveItemUpArrow(thisRecipeStepField, index, recipeStepsSize){
    if(index > 0) {
      return (
        <TouchableOpacity style={{padding: 5, marginRight: 10}} onPress={() => {
          this.props.moveStepUp(thisRecipeStepField, index)
        }}>
          <Icon name="chevron-up" size={22}/>
        </TouchableOpacity>
      );
    }
  }

  _moveItemDownArrow(thisRecipeStepField, index, recipeStepsSize){
    if(index < (recipeStepsSize - 1) && recipeStepsSize > 1){
      return (
        <TouchableOpacity style={{padding: 5, marginRight: 10}} onPress={() => { this.props.moveStepDown( thisRecipeStepField, index ) }}>
          <Icon name="chevron-down" size={22}/>
        </TouchableOpacity>
      );
    }
  }

  _renderItem = (item, index, fields, itemValues, parentProps, recipeStepsValues) => {
    const id = itemValues.field_id;
    const { recipeSteps } = parentProps.recipeSteps;
    const thisRecipeStepField = _.size(recipeSteps) && recipeSteps[id] ? recipeSteps[id] : null;
    const recipeStepsSize = _.size(recipeStepsValues);
    if(thisRecipeStepField) {
      return (
        <View key={index} style={{...marginBottom, padding: 10, backgroundColor: '#eee'}}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={{ flex: 1, height: '50%', backgroundColor: '#f00' }}>
                {this._moveItemUpArrow(thisRecipeStepField, index, recipeStepsSize)}
              </View>
              <View style={{ flex: 1, height: '50%', backgroundColor: '#C0f' }}>
                {this._moveItemDownArrow(thisRecipeStepField, index, recipeStepsSize)}
              </View>
            </View>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Headline h5 noMargin>{thisRecipeStepField.name}</Headline>
                  {/*{this._beanName(itemValues, index)}*/}
                  {/*{this._beanSubtitle(itemValues)}*/}
                </View>
                <TouchableOpacity style={{padding: 5, marginRight: 10}} onPress={() => this.props.editStep(thisRecipeStepField, index)}>
                  <Text style={textLink}><Icon name="pencil" size={16}/> Edit</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity style={{ padding: 5, paddingRight: 10 }} onPress={() => this.props.array.remove('beans', null, 0 )}>*/}
                <TouchableOpacity style={{padding: 5, paddingRight: 10}} onPress={() => fields.remove(index)}>
                  <Icon name="close" size={18} style={{color: colors.colorDanger}}/>
                </TouchableOpacity>
              </View>
              <View>
                <Text>Details Row</Text>
              </View>
            </View>

          </View>
        </View>
      );
    }
    return null;
  };
}

RecipeSteps.propTypes = {
  editStep: PropTypes.func.isRequired,
  moveStepUp: PropTypes.func.isRequired,
  moveStepDown: PropTypes.func.isRequired,
};
