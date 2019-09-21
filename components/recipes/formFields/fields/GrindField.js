import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";

class GrindField extends Component {
  render() {
    return (
      <View>
        <Text>You are currently looking at the grind field.</Text>
        <TextField
          name="grind"
          label="Grind"
          // validate={[required]}
        />
      </View>
    );
  }
}

export default GrindField;