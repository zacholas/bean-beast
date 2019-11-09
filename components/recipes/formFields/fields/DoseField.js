import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";
import { BodyText, Headline } from "../../../common";
import { isNumber } from "../../../../helpers";

class DoseField extends Component {
  render() {
    return (
      <View>
        <Headline h4>Dose</Headline>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          {/*<Text>You are currently looking at the temperature field.</Text>*/}
          <View style={{ width: 90 }}>
            <TextField
              name="dose"
              number
              keyboardType="numeric"
              validate={[isNumber]}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 6 }}>
            <BodyText>grams</BodyText>
          </View>
        </View>
      </View>
    );
  }
}

export default DoseField;
