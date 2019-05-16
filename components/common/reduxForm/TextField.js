import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";

const TextFieldComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning }
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChange}
        {...restInput}
        value={restInput.value.toString()}
        underlineColorAndroid="rgba(0,0,0,.2)"
      />
      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const TextField = (props) => {
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
      <Field name={props.name} validate={props.validate} component={TextFieldComponent} />
    </View>
  );
};

// export default Button;
export { TextField };
