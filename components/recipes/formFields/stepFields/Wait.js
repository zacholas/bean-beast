import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField, LabeledSliderField, TimeLengthPickerField } from "../../../common/reduxForm";
import PropTypes from "prop-types";
import { recipe_steps_validation } from "../../recipeSteps/RecipeStepsFormValidation";

class WaitField extends Component {
  render() {
    return (
      <View>
        <TimeLengthPickerField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.length`}
          label="Wait Time"
          hours={this.props.values && this.props.values.brew_method && this.props.values.brew_method === 'default_cold_brew'}
          validate={[recipe_steps_validation.default_wait.length]}
        />
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.notes`}
          label='Notes, e.g. "Wait for the water to drain completely."'
          validate={[recipe_steps_validation.default_wait.notes]}
          multiline
        />
      </View>
    );
  }
}

export default WaitField;

WaitField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired,
};

WaitField.defaultProps = {
};
