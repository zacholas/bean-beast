import React, {Component} from 'react';
import { View, Text } from 'react-native';
import PropTypes from "prop-types";
import { secondsToTimeStringDisplay } from "../../../../helpers/labels";

class PreInfusionDisplay extends Component {
  _preinfusion(values){
    const { length, pressure } = values;
    if(length || pressure){
      return (
        <Text>
          Pre-Infuse
          {pressure && ` at ${pressure} Bar of Pressure`}
          {length && ` for ${secondsToTimeStringDisplay(length)}`}
        </Text>
      );
    }
  }

  render() {
    const { values } = this.props;
    return (
      <View>
        {this._preinfusion(values)}
        {values.notes && <Text>Notes: <Text style={{ fontStyle: 'italic' }}>{values.notes}</Text></Text>}
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
