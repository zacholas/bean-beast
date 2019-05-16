import React from 'react';
import { StyleSheet, Text, View, DatePickerAndroid, DatePickerIOS, Platform } from 'react-native';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";


const DatePickerComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  mode
}) => {
  let datePicker;
  if(Platform.OS === 'ios'){
    datePicker = <DatePickerIOS
      style={StyleSheet.flatten([bodyText])}
      onDateChange={onChange}
      {...restInput}
      date={restInput.value ? restInput.value : new Date()}
      mode={mode}
    />
  }
  else {
    // TODO android datepicker
  }
  return (
    <View style={styles.inputContainer}>
      {datePicker}
      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const DatePicker = (props) => {
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
      <Field name={props.name} validate={props.validate} mode={props.mode} component={DatePickerComponent} />
    </View>
  );
};

// export default Button;
export { DatePicker };

DatePicker.defaultProps = {
  mode: 'date' // date, time, datetime
};
