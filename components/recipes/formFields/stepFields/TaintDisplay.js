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
        {values.notes ? <BodyText style={{ ...recipeStepListItemSubText, ...this.props.style }}><Text style={recipeStepListItemSubTextNotesText}>{values.notes}</Text></BodyText> : <View />}
      </View>
    );
  }
}

TaintDisplay.propTypes = {
  values: PropTypes.object,
  style: PropTypes.object,
};

TaintDisplay.defaultProps = {
  values: {
    length: null,
    notes: null
  },
  style: {}
};

export default TaintDisplay;
