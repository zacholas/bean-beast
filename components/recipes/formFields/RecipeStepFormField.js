import React, {Component} from 'react';
import { View, Text } from 'react-native';
import PropTypes from "prop-types";
import RecipeSteps from "../recipeSteps/RecipeSteps";

import PreInfusion from './stepFields/PreInfusion';
import PrimaryInfusion from './stepFields/PrimaryInfusion';

class RecipeFormField extends Component {
  render() {
    switch (this.props.name) {
      //* Universal
      case 'default_wait':
        return;
      case 'default_taint':
        return;

      //* Espresso Only
      case 'default_pre_infusion':
        return  <PreInfusion stepFieldIndex={this.props.stepFieldIndex} />;
      case 'default_primary_infusion':
        return  <PrimaryInfusion stepFieldIndex={this.props.stepFieldIndex} />;

      //* Everything Else
      case 'default_bloom':
        return;
      case 'default_pour':
        return;
      default:
        return null;
    }
  }
}

export default RecipeFormField;

RecipeFormField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};