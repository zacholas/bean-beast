import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField, LabeledSliderField, TimeLengthPickerField } from "../../../common/reduxForm";
import PropTypes from "prop-types";

export const fieldDataDisplay = () => {

};

class TaintField extends Component {
  render() {
    return (
      <View>
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.notes`}
          label='What should they do? e.g. "Add steamed milk & sugar"'
          multiline
        />
      </View>
    );
  }
}

export default TaintField;

TaintField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};
