import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";

class TemperatureField extends Component {
  render() {
    return (
      <View>
        <Text>You are currently looking at the temperature field.</Text>
        <TextField
          name="temperature"
          label="Temperature"
          // validate={[required]}
        />
      </View>
    );
  }
}

export default TemperatureField;