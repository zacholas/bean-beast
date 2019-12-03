import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField, LabeledSliderField, TimeLengthPickerField } from "../../../common/reduxForm";
import PropTypes from "prop-types";
import { isNumber } from "../../../../helpers";
import { BodyText } from "../../../common";

export const fieldDataDisplay = () => {

};

class PrimaryInfusionField extends Component {
  render() {
    return (
      <View>
        <TimeLengthPickerField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.length`}
          label="Primary Infusion Length"
          hours={this.props.values && this.props.values.brew_method && this.props.values.brew_method === 'default_cold_brew'}
        />
        <BodyText noMargin>Extraction Amount:</BodyText>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ width: 90 }}>
            <TextField
              name={`recipe_steps[${this.props.stepFieldIndex}].values.water_amount`}
              keyboardType={'decimal-pad'}
              validate={[isNumber]}
              // validate={[required, isNumber]}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 6 }}>
            <BodyText>grams</BodyText>
          </View>
        </View>
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

export default PrimaryInfusionField;

PrimaryInfusionField.propTypes = {
  stepFieldIndex: PropTypes.number.isRequired
};
