import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";

class DoseField extends Component {
  render() {
    return (
      <View>
        <Text>You are currently looking at the dose field.</Text>
        <TextField
          name="dose"
          label="Dose"
          // validate={[required]}
        />
      </View>
    );
  }
}

export default DoseField;