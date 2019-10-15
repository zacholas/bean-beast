import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField, LabeledSliderField, TimeLengthPickerField } from "../../../common/reduxForm";
import PropTypes from "prop-types";
import { isNumber, required } from "../../../../helpers";

export const fieldDataDisplay = () => {

};

class BloomField extends Component {
  render() {
    return (
      <View>
        <TimeLengthPickerField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.length`}
          label="Bloom Length"
        />
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.water_amount`}
          label="How much water? (in grams)"
          keyboardType={'decimal-pad'}
          // validate={[required, isNumber]}
          // validate={[required]}
        />
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.notes`}
          label='Notes, e.g. "Be sure not to pour too quickly."'
          multiline
          // validate={[required]}
        />
      </View>
    );
  }
}

export default BloomField;

BloomField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};
