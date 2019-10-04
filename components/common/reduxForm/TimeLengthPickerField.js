import React, { Component } from 'react';
import {StyleSheet, Text, View, DatePickerAndroid, DatePickerIOS, Platform, Picker, TextInput} from 'react-native';
import _ from "lodash";
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";
import PropTypes from "prop-types";
import { colorGray400 } from "../Styles";

import { Headline } from "..";
import { isNumber } from "../../../helpers";

const thisStyles = StyleSheet.create({
  timeRow: {
    flexDirection: 'row'
  },
  timeBlockContainer: {
    flexDirection: 'row'
  },
  timeBlockContainerInner: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
  },
  number: {
    fontSize: 16,
    marginBottom: 4,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: colorGray400,
    textAlign: 'center',
    paddingHorizontal: 3,
    paddingVertical: 3
  },
  numberLabel: {
    fontSize: 12
  },
  colonContainer: {
    marginTop: 9,
    paddingHorizontal: 3
  },
  colonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});


class TimeLengthPickerComponent extends Component {
  constructor(props){
    super(props);

    //* Set initial field values based on input value
    if(props.input && props.input.value && typeof props.input.value == "number" && props.input.value > 0){
      this.state = this._setStateFromSeconds(props.input.value, true);
    }
    else {
      this.state = {
        hours: this._formatDoubleDigitNumberString(0),
        minutes: this._formatDoubleDigitNumberString(0),
        seconds: this._formatDoubleDigitNumberString(0)
      };
    }
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if(nextProps.input && nextProps.input.value){
      if(this.props.input.value !== nextProps.input.value){
        this._setStateFromSeconds(nextProps.input.value);
      }
    }
  }

  render(){
    const { input: { value, onChange } } = this.props;
    return (
      <View>
        <View style={thisStyles.timeRow}>
          {this._hoursOutput()}
          {this._minutesOutput()}
          {this._secondsOutput()}
        </View>
        {this.props.touched &&
        ((this.props.error && <Text style={styles.errorText}>{this.props.error}</Text>) ||
          (this.props.warning && <Text style={styles.warningText}>{this.props.warning}</Text>))}
      </View>
    );
  }

  _setStateFromSeconds(seconds, returnData = false){
    const d = Number(seconds);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    if(returnData === true){
      return {
        hours: this._formatDoubleDigitNumberString(h),
        minutes: this._formatDoubleDigitNumberString(m),
        seconds: this._formatDoubleDigitNumberString(s)
      }
    }
    else {
      this.setState({
        hours: this._formatDoubleDigitNumberString(h),
        minutes: this._formatDoubleDigitNumberString(m),
        seconds: this._formatDoubleDigitNumberString(s)
      })
    }
  }

  _colonDivider(){
    return (
      <View style={thisStyles.colonContainer}>
        <Text style={thisStyles.colonText}>:</Text>
      </View>
    )
  }

  _onBlur(item){
    //* Do validation for this field here before moving on. --- maybe not necessary since I am converting non-numbers to 0s
    const values = {
      hours: !isNaN(Number(this.state.hours)) ? Number(this.state.hours) : 0,
      minutes: !isNaN(Number(this.state.minutes)) ? Number(this.state.minutes) : 0,
      seconds: !isNaN(Number(this.state.seconds)) ? Number(this.state.seconds) : 0,
    };
    const { hours, minutes, seconds } = values;
    const totalSeconds = (parseFloat(hours) * 60 * 60) + (parseFloat(minutes) * 60) + parseFloat(seconds);
    this._setStateFromSeconds(totalSeconds);
    this.props.input.onChange(totalSeconds);

  }

  _formatDoubleDigitNumberString(number){
    return ("0" + number).slice(-2);
  }

  _hoursOutput(){
    if(this.props.parentProps.hours === true){
      return (
        <View style={thisStyles.timeBlockContainerInner}>
          <TextInput
            style={thisStyles.number}
            onBlur={(item) => this._onBlur(item)}
            onChangeText={(itemValue) => this.setState({hours: itemValue})}
            validate={[isNumber]}
            number
            placeholder={'00'}
            value={this.state.hours.toString()}
          />
          <Headline h5 style={thisStyles.numberLabel}>Hrs</Headline>
        </View>
      )
    }
  }

  _minutesOutput(){
    if(this.props.parentProps.minutes === true){
      return (
        <View style={thisStyles.timeBlockContainer}>
          {this.props.parentProps.hours === true && this._colonDivider()}
          <View style={thisStyles.timeBlockContainerInner}>
            <TextInput
              style={thisStyles.number}
              onBlur={(item) => this._onBlur(item)}
              onChangeText={(itemValue) => this.setState({minutes: itemValue})}
              validate={[isNumber]}
              number
              placeholder={'00'}
              value={this.state.minutes.toString()}
            />
            <Headline h5 style={thisStyles.numberLabel}>Min</Headline>
          </View>
        </View>
      )
    }
  }

  _secondsOutput(){
    const { input: { value, onChange } } = this.props;

    if(this.props.parentProps.seconds === true){
      return (
        <View style={thisStyles.timeBlockContainer}>
          {this.props.parentProps.minutes === true && this._colonDivider()}
          <View style={thisStyles.timeBlockContainerInner}>
            <TextInput
              style={thisStyles.number}
              onBlur={(item) => this._onBlur(item)}
              onChangeText={(itemValue) => this.setState({seconds: itemValue})}
              validate={[isNumber]}
              number
              placeholder={'00'}
              value={this.state.seconds.toString()}
            />
            <Headline h5 style={thisStyles.numberLabel}>Sec</Headline>
          </View>
        </View>
      )
    }
  }
}


const TimeLengthPickerField = (props) => {
  const { labels, hours, maxHours, minutes, maxMinutes, seconds, maxSeconds } = props;
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
      <Field
        name={props.name}
        validate={props.validate}
        component={TimeLengthPickerComponent}
        parentProps={{ labels, hours, maxHours, minutes, maxMinutes, seconds, maxSeconds }}
      />
    </View>
  );
};

export { TimeLengthPickerField };


TimeLengthPickerField.propTypes = {
  name: PropTypes.string.isRequired,
  labels: PropTypes.bool,
  hours: PropTypes.bool,
  maxHours: PropTypes.number,
  minutes: PropTypes.bool,
  maxMinutes: PropTypes.number,
  seconds: PropTypes.bool,
  maxSeconds: PropTypes.number,
};

TimeLengthPickerField.defaultProps = {
  labels: true,
  hours: false,
  maxHours: 72,
  minutes: true,
  maxMinutes: 60,
  seconds: true,
  maxSeconds: 60,
};