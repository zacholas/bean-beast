import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField, LabeledSliderField, TimeLengthPickerField } from "../../../common/reduxForm";
import PropTypes from "prop-types";

export const fieldDataDisplay = () => {

};

class WaitField extends Component {
  render() {
    return (
      <View>
        <TimeLengthPickerField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.length`}
          label="Primary Infusion Length"
          hours
        />
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.pressure`}
          label="Pressure (in bar)"
          keyboardType={'decimal-pad'}
          // validate={[required]}
        />
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.notes`}
          label='Notes, e.g. "Slowly ramp up the pressure over the course of 10 seconds after pre-infusion."'
          multiline
          // validate={[required]}
        />
      </View>
    );
  }
}

export default WaitField;

WaitField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};