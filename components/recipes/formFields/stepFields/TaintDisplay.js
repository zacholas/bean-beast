import React, {Component} from 'react';
import { View, Text } from 'react-native';
import PropTypes from "prop-types";
import {
  recipeStepListItemSubText,
  recipeStepListItemSubTextNotesText,
  recipeStepListItemSubTextNotesTitle,
  recipeStepListItemInnerTextContainer
} from "../../../../constants/styles/RecipeSteps";
import { BodyText } from "../../../common";

class TaintDisplay extends Component {
  render() {
    const { values } = this.props;
    return (
      <View style={recipeStepListItemInnerTextContainer}>
        {values.notes && <BodyText style={recipeStepListItemSubText}><Text style={recipeStepListItemSubTextNotesText}>{values.notes}</Text></BodyText>}
      </View>
    );
  }
}

TaintDisplay.propTypes = {
  values: PropTypes.object,
};

TaintDisplay.defaultProps = {
  values: {
    length: null,
    notes: null
  }
};

export default TaintDisplay;
