import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField, LabeledSliderField, TimeLengthPickerField } from "../../../common/reduxForm";
import PropTypes from "prop-types";

export const fieldDataDisplay = () => {

};

class PreInfusionField extends Component {
  render() {
    return (
      <View>
        <TimeLengthPickerField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.length`}
          label="Primary Infusion Length"
          hours
        />
        {/*<TextField*/}
          {/*name={`recipe_steps[${this.props.stepFieldIndex}].values.length`}*/}
          {/*label="Primary Infusion Length"*/}
          {/*// validate={[required]}*/}
        {/*/>*/}
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.pressure`}
          label="Pressure (in bar)"
          keyboardType={'decimal-pad'}
          // validate={[required]}
        />
        {/*<LabeledSliderField*/}
          {/*name={`recipe_steps[${this.props.stepFieldIndex}].values.pressure`}*/}
          {/*label="Pressure (in bar)"*/}
          {/*minimumValue={1}*/}
          {/*maximumValue={15}*/}
          {/*step={0.5}*/}
          {/*tallNotches={[0, 14]}*/}
        {/*/>*/}
        {/*<LabeledSliderField*/}
          {/*name={`recipe_steps[${this.props.stepFieldIndex}].values.pressure`}*/}
          {/*label="Pressure (in bar)"*/}
          {/*step={1}*/}
          {/*minimumValue={1}*/}
          {/*maximumValue={5}*/}
          {/*tallNotches={[1, 3, 5]}*/}
          {/*bottomLabels={[*/}
            {/*{ content: 'Light' },*/}
            {/*{ content: 'Medium' },*/}
            {/*{ content: 'Dark' },*/}
          {/*]}*/}
        {/*/>*/}
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

export default PreInfusionField;

PreInfusionField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};