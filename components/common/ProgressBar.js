import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, View } from 'react-native';
import colors from '../../constants/Colors';
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
      <View style={styles.progressBarBackground}>
        <View style={{ ...styles.progressBar, width: progressBarWidth + '%' }} />
      </View>
    );
  }
}

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired
};
