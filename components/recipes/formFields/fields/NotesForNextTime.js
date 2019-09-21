import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";

class NotesForNextTimeField extends Component {
  render() {
    return (
      <View>
        <TextField
          name="notes_for_next_time"
          label="Notes for Next Time"
          multiline
          // validate={[required]}
        />
      </View>
    );
  }
}

export default NotesForNextTimeField;