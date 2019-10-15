import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField, LabeledSliderField, TimeLengthPickerField } from "../../../common/reduxForm";
import PropTypes from "prop-types";
import { required, isNumber } from "../../../../helpers";

export const fieldDataDisplay = () => {

};

class PourField extends Component {
  render() {
    return (
      <View>
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.water_amount`}
          label="How much water? (in grams)"
          keyboardType={'decimal-pad'}
          // validate={[required, isNumber]}
        />
        <TimeLengthPickerField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.duration`}
          label="Pour over the course of how long? (optional)"
        />
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.notes`}
          label='Notes, e.g. "Pour straight down, NOT in the usual spiral."'
          multiline
          // validate={[required]}
        />
      </View>
    );
  }
}

export default PourField;

PourField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};
