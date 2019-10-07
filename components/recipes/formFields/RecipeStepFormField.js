import React, {Component} from 'react';
import { connect } from "react-redux";
import { View, Text } from 'react-native';
import _ from 'lodash';
import PropTypes from "prop-types";
import RecipeSteps from "../recipeSteps/RecipeSteps";

import PreInfusion from './stepFields/PreInfusion';
import PrimaryInfusion from './stepFields/PrimaryInfusion';
import Wait from './stepFields/Wait';


class RecipeFormField extends Component {
  render() {
    // console.log('form values', this.props.formValues);
    const { formValues } = this.props;
    const values = _.size(formValues.EditRecipeForm) && _.size(formValues.EditRecipeForm.values) ? formValues.EditRecipeForm.values : false;
    switch (this.props.name) {
      //* Universal
      case 'default_wait':
        return  <Wait stepFieldIndex={this.props.stepFieldIndex} values={values} />;
      case 'default_taint':
        return;

      //* Espresso Only
      case 'default_pre_infusion':
        return  <PreInfusion stepFieldIndex={this.props.stepFieldIndex} values={values} />;
      case 'default_primary_infusion':
        return  <PrimaryInfusion stepFieldIndex={this.props.stepFieldIndex} values={values} />;

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

const mapStateToProps = (state) => {
  return {
    formValues: state.form,
  }
};

RecipeFormField = connect(mapStateToProps)(RecipeFormField);

export default RecipeFormField;

RecipeFormField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};
