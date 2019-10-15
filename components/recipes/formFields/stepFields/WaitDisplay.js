import React, {Component} from 'react';
import { View, Text } from 'react-native';
import PropTypes from "prop-types";
import { isDefined } from "../../../../helpers";
import { secondsToTimeStringDisplay } from "../../../../helpers/labels";
import {
  recipeStepListItemSubText,
  recipeStepListItemSubTextNotesText,
  recipeStepListItemSubTextNotesTitle,
  recipeStepListItemInnerTextContainer
} from "../../../../constants/styles/RecipeSteps";

class WaitDisplay extends Component {
  _waitTime(length){
    if(!isNaN(length) && length){
      return <Text style={recipeStepListItemSubText}>Wait for {secondsToTimeStringDisplay(length)}</Text>;
    }
  }

  render() {
    const { values } = this.props;
    return (
      <View style={recipeStepListItemInnerTextContainer}>
        {this._waitTime(values.length)}
        {values.notes && <Text style={recipeStepListItemSubText}><Text style={recipeStepListItemSubTextNotesTitle}>Notes: </Text><Text style={recipeStepListItemSubTextNotesText}>{values.notes}</Text></Text>}
      </View>
    );
  }
}

WaitDisplay.propTypes = {
  values: PropTypes.object,
};

WaitDisplay.defaultProps = {
  values: {
    length: null,
    notes: null
  }
};

export default WaitDisplay;
