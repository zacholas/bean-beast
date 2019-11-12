import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";
import PropTypes from "prop-types";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...bodyText,
  },
  inputAndroid: {
    ...bodyText,
  },
});


const SelectComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  options,
  placeholderText,
  defaultValue
}) => {
  let selectedValue = undefined;
  if(restInput.value.toString()){
    selectedValue = restInput.value.toString();
  }
  if(defaultValue && !restInput.value.toString()){
    selectedValue = defaultValue;
  }
  return (
    <View style={styles.inputContainer}>
      {/*<RNPickerSelect*/}
        {/*onValueChange={(value) => console.log(value)}*/}
        {/*items={options}*/}
      {/*/>*/}
      <RNPickerSelect
        onValueChange={onChange}
        items={options}
        placeholder={{
          value: null,
          label: placeholderText
        }}
        itemKey={selectedValue}

        {...restInput}
        style={{
          ...pickerSelectStyles,
          fontFamily: 'avenir-next-400'
        }}
      />
      {/*<Picker selectedValue={restInput.value.toString()} onValueChange={onChange} {...restInput}>*/}
        {/*<Picker.Item key='default' value='' label={placeholderText} />*/}
        {/*{pickerOptions}*/}
      {/*</Picker>*/}
      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const PickerSelectField = (props) => {
  let label = props.label;
  if(typeof(props.label) === 'string'){
    label = <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>;
  }
  return (
    <View style={{ alignItems: 'stretch' }}>
      {label}
      <Field
        name={props.name}
        validate={props.validate}
        component={SelectComponent}
        options={props.options}
        placeholderText={props.placeholderText}
        defaultValue={props.defaultValue}
        containerStyle={props.containerStyle}
      />
    </View>
  );
};

export { PickerSelectField };

PickerSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.array,
  options: PropTypes.array.isRequired,
  placeholderText: PropTypes.string,
  defaultValue: PropTypes.string,
  containerStyle: PropTypes.object,
};

PickerSelectField.defaultProps = {
  placeholderText: '–  Select an Option  –',
};

