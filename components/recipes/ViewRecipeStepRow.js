import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { BodyText } from "../common";
import PropTypes from "prop-types";
import _ from 'lodash';

class ViewRecipeStepRow extends Component {
  render() {
    const { step } = this.props;
    if(this.props.headerRow === true){
      return (
        <View style={styles.row}>
          <View style={styles.stepCol}><BodyText noMargin>Step</BodyText></View>
          <View style={styles.timeCol}><BodyText noMargin>Total Time</BodyText></View>
          <View style={styles.weightCol}><BodyText noMargin>Total Weight</BodyText></View>
        </View>
      );
    }
    return (
      <View style={styles.row}>
        <View style={styles.stepCol}><BodyText noMargin>{this._stepOutput()}</BodyText></View>
        <View style={styles.timeCol}><BodyText noMargin>{this._timeOutput()}</BodyText></View>
        <View style={styles.weightCol}><BodyText noMargin>{this._weightOutput()}</BodyText></View>
      </View>
    );
  }

  _stepOutput(){
    return (
      this.props.step.field.field_id
    )
  }

  _timeOutput(){
    return this.props.step.totalTime;
  }

  _weightOutput(){
    return this.props.step.totalWeight;
  }
}

const styles = StyleSheet.create({
  headingItem: {
    // flex: 1,
    // backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  stepCol: {
    flex: 1,
    alignSelf: 'stretch'
  },
  timeCol: {
    width: 60
  },
  weightCol: {
    width: 70
  }
});

export default ViewRecipeStepRow;

ViewRecipeStepRow.propTypes = {
  step: PropTypes.object,
  headerRow: PropTypes.bool
};

ViewRecipeStepRow.defaultProps = {
  step: {},
  headerRow: false,
};
