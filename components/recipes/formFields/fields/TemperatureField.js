import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TextField } from "../../../common/reduxForm";
import { isNumber, required } from "../../../../helpers";
import { BodyText, Headline } from "../../../common";

class TemperatureField extends Component {
  render() {
    return (
      <View>
        <Headline h4>Temperature</Headline>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          {/*<Text>You are currently looking at the temperature field.</Text>*/}
          <View style={{ width: 90 }}>
            <TextField
              name="temperature"
              number
              keyboardType="numeric"
              validate={[isNumber]}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 6 }}>
            <BodyText>Degrees</BodyText>
          </View>
        </View>
      </View>
    );
  }
}

export default TemperatureField;
