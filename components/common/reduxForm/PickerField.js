import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import _ from 'lodash';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";

const SelectComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  options
}) => {
  let pickerOptions = _.map(options, (option, i ) => {
    return <Picker.Item key={option.id} value={option.id} label={option.name} />
  });

  return (
    <View style={styles.inputContainer}>
      <Picker selectedValue={restInput.value.toString()} onValueChange={onChange} {...restInput}>
        <Picker.Item key='default' value='' label='–  Select an Option  –' />
        {pickerOptions}
      </Picker>
      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const PickerField = (props) => {
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
      <Field name={props.name} validate={props.validate} options={props.options} component={SelectComponent} />
    </View>
  );
};

export { PickerField as Picker };
