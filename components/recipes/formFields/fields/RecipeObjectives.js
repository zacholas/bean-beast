import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";
import {BodyText, Li} from "../../../common";


class RecipeObjectives extends Component {
  render() {
    return (
      <View>
        <TextField
          name="recipe_objectives"
          label="Recipe Objectives"
          multiline
          // validate={[required]}
        />
        <BodyText>Recipe objectives are your "measuring stick" for you to know if a recipe is a success. Common objectives are things like...</BodyText>

        <Li>30g of espresso extracted in ~27 seconds</Li>
        <Li>Coffee should drain out of pour-over filter in XYZ seconds</Li>
        <Li style={{ marginBottom: 15 }}>Aim for a TDS of 8-10%</Li>
      </View>
    );
  }
}

export default RecipeObjectives;