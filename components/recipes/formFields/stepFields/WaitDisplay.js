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
import { BodyText } from "../../../common";

class WaitDisplay extends Component {
  _waitTime(length){
    if(!isNaN(length) && length){
      return <BodyText style={{ ...recipeStepListItemSubText, ...this.props.style }}>Wait for {secondsToTimeStringDisplay(length)}</BodyText>;
    }
  }

  render() {
    const { values } = this.props;
    return (
      <View style={recipeStepListItemInnerTextContainer}>
        {this._waitTime(values.length)}
        {values.notes ? <BodyText style={{ ...recipeStepListItemSubText, ...this.props.style }}><Text style={recipeStepListItemSubTextNotesTitle}>Notes: </Text><Text style={recipeStepListItemSubTextNotesText}>{values.notes}</Text></BodyText> : <View />}
      </View>
    );
  }
}

WaitDisplay.propTypes = {
  values: PropTypes.object,
  style: PropTypes.object,
};

WaitDisplay.defaultProps = {
  values: {
    length: null,
    notes: null
  },
  style: {}
};

export default WaitDisplay;
