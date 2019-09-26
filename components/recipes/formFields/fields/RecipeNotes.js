import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";

class RecipeNotes extends Component {
  render() {
    return (
      <View>
        <TextField
          name="recipe_notes"
          label="Misc Recipe Notes"
          multiline
          // validate={[required]}
        />
      </View>
    );
  }
}

export default RecipeNotes;