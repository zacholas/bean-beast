import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";

const SwitchComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning }
}) => {
  return (
    <View style={styles.inputContainer}>
      <Switch
        onValueChange={onChange}
        {...restInput}
        value={restInput.value}
      />
      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const SwitchField = (props) => {
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
      <Field name={props.name} validate={props.validate} component={SwitchComponent} />
    </View>
  );
};

export { SwitchField };
