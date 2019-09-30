import React from 'react';
import {StyleSheet, Text, View, DatePickerAndroid, DatePickerIOS, Platform, Picker, TextInput} from 'react-native';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";
import PropTypes from "prop-types";
import _ from "lodash";
import { Headline } from "..";

const thisStyles = StyleSheet.create({
  timeRow: {
    flexDirection: 'row'
  },
  timeBlockContainer: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 5
  },
  number: {
    fontSize: 16,
    marginBottom: 4
  },
  numberLabel: {
    fontSize: 12
  }
});

const parseNumberIntoHrsMinsSecs = (seconds) => {
  const d = Number(seconds);
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);

  return {
    hours: h,
    minutes: m,
    seconds: s
  }

  // const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  // const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  // const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  // return hDisplay + mDisplay + sDisplay;
};

const TimeLengthPickerComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  parentProps
}) => {
  const { labels, hours, maxHours, minutes, maxMinutes, seconds, maxSeconds } = parentProps;

  const parsedTime = parseNumberIntoHrsMinsSecs(restInput.value);

  const colonDivider = () => {
    return(
      <View>
        <Text>:</Text>
      </View>
    );
  };

  const hoursOutput = () => {
    if(hours === true){
      return (
        <View style={thisStyles.timeBlockContainer}>
          <Text style={thisStyles.number}>00</Text>
          <Headline h5 style={thisStyles.numberLabel}>Hours</Headline>
        </View>
      )
    }
  };

  const minutesOutput = () => {
    if(minutes === true){
      return (
        <View>
          {hours === true && colonDivider()}
          <View style={thisStyles.timeBlockContainer}>
            <Text style={thisStyles.number}>00</Text>
            <Headline h5 style={thisStyles.numberLabel}>Min</Headline>
          </View>
        </View>
      )
    }
  };

  const secondsNumbers = [...Array(60+1).keys()].slice(1);
  let secondsPickerOptions = _.map(secondsNumbers, (option, i ) => {
    return <Picker.Item key={option} value={option} label={option} />
  });

  console.log(restInput);

  let language = 'java';

  const secondsOutput = () => {
    if(seconds === true){
      return (
        <View style={thisStyles.timeBlockContainer}>
          {/*<Picker selectedValue={restInput.value.toString()} onValueChange={onChange} {...restInput}>*/}
          <Picker
            selectedValue={language}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              language = itemValue
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          {/*onValueChange={(val) => onChange(_.round(val, getDecimalLength(step)))}*/}
          <Picker selectedValue='20' onValueChange={onChange} >
            <Picker.Item key='default' value='' label='–  Select an Option  –' />
            <Picker.Item key='20' value='20' label="20" />
            <Picker.Item key='60' value='60' label="60" />
            {secondsPickerOptions}
          </Picker>
          <Text style={thisStyles.number}>00</Text>
          <Headline h5 style={thisStyles.numberLabel}>Sec</Headline>
        </View>
      )
    }
  };

  // onValueChange={(val) => onChange(_.round(val, getDecimalLength(step)))}

  return (
    <View style={thisStyles.timeRow}>
      {hoursOutput()}
      {minutesOutput()}
      {secondsOutput()}
    </View>
  );

  return (
    <View style={styles.inputContainer}>
      {/*{datePicker}*/}
      <Picker
        {...restInput}
        style={{width: 100}}
        date={restInput.value ? restInput.value : new Date()}
        mode={mode}
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={onChange}
      />
      <Picker selectedValue={restInput.value.toString()} onValueChange={onChange} {...restInput}>
        <Picker.Item key='default' value='' label='–  Select an Option  –' />
        {pickerOptions}
      </Picker>
      <TextInput
        style={{...styles.textInput, ...multiLineHeight}}
        onChangeText={onChange}
        {...restInput}
        value={restInput.value.toString()}
        underlineColorAndroid="rgba(0,0,0,.2)"
        multiline={multiline}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />


      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

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
