import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";
import PropTypes from "prop-types";

export const fieldDataDisplay = () => {

};

class PreInfusionField extends Component {
  render() {
    return (
      <View>
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.length`}
          label="Pre-Infusion Length"
          // validate={[required]}
        />
        <TextField
          name={`recipe_steps[${this.props.stepFieldIndex}].values.pressure`}
          label="Pressure (in bar)"
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