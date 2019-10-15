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

class PreInfusionDisplay extends Component {
  _preinfusion(values){
    const { length, pressure } = values;
    if(length || pressure){
      return (
        <Text style={recipeStepListItemSubText}>
          Pre-Infuse
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
        {this._preinfusion(values)}
        {values.notes && <Text style={recipeStepListItemSubText}><Text style={recipeStepListItemSubTextNotesTitle}>Notes: </Text><Text style={recipeStepListItemSubTextNotesText}>{values.notes}</Text></Text>}
      </View>
    );
  }
}

PreInfusionDisplay.propTypes = {
  values: PropTypes.object,
};

PreInfusionDisplay.defaultProps = {
  values: {
    length: null,
    pressure: null,
    notes: null
  }
};

export default PreInfusionDisplay;
