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

class BloomDisplay extends Component {
  _bloom(values){
    const { length, water_amount } = values;
    if(length || water_amount){
      return (
        <BodyText style={{ ...recipeStepListItemSubText, ...this.props.style }}>
          {length ? `Bloom for ${secondsToTimeStringDisplay(length)}` : ''}
          {!length && water_amount ? `Bloom` : ''}
          {water_amount && ` with ${water_amount}g of Water`}
        </BodyText>
      );
    }
  }

  render() {
    const { values } = this.props;
    return (
      <View style={recipeStepListItemInnerTextContainer}>
        {this._bloom(values)}
        {values.notes && <BodyText style={{ ...recipeStepListItemSubText, ...this.props.style }}><Text style={recipeStepListItemSubTextNotesTitle}>Notes: </Text><Text style={recipeStepListItemSubTextNotesText}>{values.notes}</Text></BodyText>}
      </View>
    );
  }
}

BloomDisplay.propTypes = {
  values: PropTypes.object,
  style: PropTypes.object,
};

BloomDisplay.defaultProps = {
  values: {
    length: null,
    water_amount: null,
    notes: null
  },
  style: {}
};

export default BloomDisplay;
