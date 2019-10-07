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
          label="Wait Time"
          hours={this.props.values.brew_method === 'default_cold_brew'}
          // validate={[required]}
        />
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.notes`}
          label='Notes, e.g. "Wait for the water to drain completely."'
          multiline
        />
      </View>
    );
  }
}

export default WaitField;

WaitField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};
