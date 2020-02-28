import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";
import { BodyText, Headline } from "../../../common";
import { isNumber } from "../../../../helpers";

class DoseField extends Component {
  render() {
    return (
      <View>
        <Headline h4 noMargin>Yield</Headline>
        <BodyText>The total amount of liquid coffee produced by this recipe.</BodyText>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ width: 90 }}>
            <TextField
              name="yield"
              number
              keyboardType="numeric"
              validate={[isNumber]}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 6 }}>
            <BodyText>grams</BodyText>
          </View>
        </View>
        <BodyText>Note: if left blank, dynamically-calculated fields (like coffee:water ratio) will be calculated based off the total liquid from the recipe steps fields.</BodyText>
      </View>
    );
  }
}

export default DoseField;
