import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField, TimeLengthPickerField } from "../../../common/reduxForm";
import PropTypes from "prop-types";

export const fieldDataDisplay = () => {

};

class PreInfusionField extends Component {
  render() {
    return (
      <View>
        <TimeLengthPickerField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.length`}
          label="Pre-Infusion Length"
          // validate={[required]}
        />
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.pressure`}
          label="Pressure (in bar)"
          // validate={[required]}
        />
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.notes`}
          label='Notes, e.g. "Slowly ramp up to 3 bars and hold."'
          multiline
          // validate={[required]}
        />
      </View>
    );
  }
}

export default PreInfusionField;

PreInfusionField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};
