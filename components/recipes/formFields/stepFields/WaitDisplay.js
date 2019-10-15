import React, {Component} from 'react';
import { View, Text } from 'react-native';
import PropTypes from "prop-types";
import { isDefined } from "../../../../helpers";
import { secondsToTimeStringDisplay } from "../../../../helpers/labels";

class WaitDisplay extends Component {
  _waitTime(length){
    if(!isNaN(length)){
      return <Text>Wait for {secondsToTimeStringDisplay(length)}</Text>;
    }
  }

  render() {
    const { values } = this.props;
    return (
      <View>
        {this._waitTime(values.length)}
        {values.notes && <Text>Notes: <Text style={{ fontStyle: 'italic' }}>{values.notes}</Text></Text>}
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
