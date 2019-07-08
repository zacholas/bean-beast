import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";
import PropTypes from "prop-types";

const TextFieldComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  multiline,
  placeholder
}) => {
  const multiLineHeight = multiline ? { height: 100 } : null;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={{...styles.textInput, ...multiLineHeight}}
        onChangeText={onChange}
        {...restInput}
        value={restInput.value.toString()}
        underlineColorAndroid="rgba(0,0,0,.2)"
        multiline={multiline}
        placeholder={placeholder}
      />
      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const TextField = (props) => {
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
        component={TextFieldComponent}
        multiline={props.multiline}
        placeholder={props.placeholder}
      />
    </View>
  );
};

export { TextField };

TextField.propTypes = {
  multiline: PropTypes.bool,
  placeholder: PropTypes.string
};

TextField.defaultProps = {
  multiline: false
};
