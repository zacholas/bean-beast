import React from 'react';
import { StyleSheet, Text, View, DatePickerAndroid, DatePickerIOS, Platform } from 'react-native';
import { Field } from 'redux-form';
import DatePicker from 'react-native-datepicker';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";

const openDatePickerAndroid = async() => {
  try {
    const {action, year, month, day} = await DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      date: new Date(2020, 4, 25),
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      // Selected year, month (0-11), day
    }
  } catch ({code, message}) {
    console.warn('Cannot open date picker', message);
  }
}

const DatePickerComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  mode
}) => {
  let datePicker;
  // if(Platform.OS === 'ios'){
  //   datePicker = <DatePickerIOS
  //     style={StyleSheet.flatten([bodyText])}
  //     onDateChange={onChange}
  //     {...restInput}
  //     date={restInput.value ? restInput.value : new Date()}
  //     mode={mode}
  //   />
  // }
  // else {
  //   // TODO android datepicker
  // }

  const colorScheme = Appearance.getColorScheme();
  return (
    <View style={styles.inputContainer}>
      {/*{datePicker}*/}
      <DatePicker
        {...restInput}
        style={{width: 200}}
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
          },
          datePicker: {
            color: '#fff',
            backgroundColor: colorScheme === 'dark' ? '#222' : 'white'
          },
          datePickerCon: {
            color: '#000',
            backgroundColor: colorScheme === 'dark' ? '#333' : 'white'
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={onChange}
      />
      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const DatePickerField = (props) => {
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
      <Field name={props.name} validate={props.validate} mode={props.mode} component={DatePickerComponent} />
    </View>
  );
};

// export default Button;
export { DatePickerField };

DatePickerField.defaultProps = {
  mode: 'date' // date, time, datetime
};
