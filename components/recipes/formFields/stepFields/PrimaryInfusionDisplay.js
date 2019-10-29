import React, {Component} from 'react';
import { View, Text } from 'react-native';
import PropTypes from "prop-types";
import { secondsToTimeStringDisplay } from "../../../../helpers/labels";
import {
  recipeStepListItemInnerTextContainer,
  recipeStepListItemSubText,
  recipeStepListItemSubTextNotesText,
  recipeStepListItemSubTextNotesTitle
} from "../../../../constants/styles/RecipeSteps";
import { BodyText } from "../../../common";

class PrimaryInfusionDisplay extends Component {
  _primaryInfusion(values){
    const { length, pressure } = values;
    if(length || pressure){
      return (
        <Text style={recipeStepListItemSubText}>
          Extract
          {pressure ? ` at ${pressure} Bar Pressure` : ''}
          {length ? ` for ${secondsToTimeStringDisplay(length)}` : null}
        </Text>
      );
    }
  }

  render() {
    const { values } = this.props;
    return (
      <View style={recipeStepListItemInnerTextContainer}>
        {this._primaryInfusion(values)}
        {values.notes && <BodyText style={recipeStepListItemSubText}><Text style={recipeStepListItemSubTextNotesTitle}>Notes: </Text><Text style={recipeStepListItemSubTextNotesText}>{values.notes}</Text></BodyText>}
      </View>
    );
  }
}

PrimaryInfusionDisplay.propTypes = {
  values: PropTypes.object,
};

PrimaryInfusionDisplay.defaultProps = {
  values: {
    length: null,
    pressure: null,
    notes: null
  }
};

export default PrimaryInfusionDisplay;
