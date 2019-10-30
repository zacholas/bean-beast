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

class PourDisplay extends Component {
  _pour(values){
    const { duration, water_amount } = values;
    if(duration){
      // console.log('duration is true as ', duration);
    }
    if(duration || water_amount){
      return (
        <BodyText style={{ ...recipeStepListItemSubText, ...this.props.style }}>
          {`Pour `}
          {water_amount ? `${water_amount}g of Water` : ''}
          {(water_amount && duration) ? ' ' : ''}
          {duration ? `over the course of ${secondsToTimeStringDisplay(duration)}` : ''}
        </BodyText>
      );
    }
  }

  render() {
    const { values } = this.props;
    return (
      <View style={recipeStepListItemInnerTextContainer}>
        {this._pour(values)}
        {values.notes && <BodyText style={{ ...recipeStepListItemSubText, ...this.props.style }}><Text style={recipeStepListItemSubTextNotesTitle}>Notes: </Text><Text style={recipeStepListItemSubTextNotesText}>{values.notes}</Text></BodyText>}
      </View>
    );
  }
}

PourDisplay.propTypes = {
  values: PropTypes.object,
  style: PropTypes.object,
};

PourDisplay.defaultProps = {
  values: {
    duration: null,
    water_amount: null,
    notes: null
  },
  style: {}
};

export default PourDisplay;
