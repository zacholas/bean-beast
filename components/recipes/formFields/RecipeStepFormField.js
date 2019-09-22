import React, {Component} from 'react';
import { View, Text } from 'react-native';
import PreInfusion from './stepFields/PreInfusion';
import PropTypes from "prop-types";
import RecipeSteps from "../recipeSteps/RecipeSteps";

class RecipeFormField extends Component {
  render() {
    switch (this.props.name) {
      case 'default_pre_infusion':
        return  <PreInfusion stepFieldIndex={this.props.stepFieldIndex} />;
      default:
        return null;
    }
  }
}

export default RecipeFormField;

RecipeFormField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};