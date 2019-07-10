import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from 'react-native';
import colors from '../../constants/Colors';
import { SliderField } from "./reduxForm";
// import { Container, BodyText } from "/components/common";

const styles = StyleSheet.create({
  progressBarBackground: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    height: 10,
  },
  progressBar: {
    flex: 1,
    backgroundColor: colors.colorPrimary
  }
});

export default class ProgressBar extends Component {
  render() {
    const progressBarWidth = (this.props.currentStep / this.props.totalSteps) * 100;
    return (
      <View>
        <View style={styles.progressBarBackground}>
          <View style={{ ...styles.progressBar, width: progressBarWidth + '%' }} />
        </View>
        { this.props.textDisplay === true && this.props.currentStep && this.props.totalSteps &&
        <View style={{ marginTop: 5 }}>
          <Text style={{textAlign: 'center'}}>Step {this.props.currentStep} / {this.props.totalSteps}</Text>
        </View>
        }
      </View>
    );
  }
}

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  textDisplay: PropTypes.bool,
  // textDisplayPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
};

ProgressBar.defaultProps = {
  // textDisplayPosition: 'bottom'
};
