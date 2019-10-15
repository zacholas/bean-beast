import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";

class NicknameField extends Component {
  render() {
    return (
      <View>
        <TextField
          name="nickname"
          label="Recipe Nickname"
          // validate={[required]}
        />
      </View>
    );
  }
}

export default NicknameField;