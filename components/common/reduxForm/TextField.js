import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import { Field } from 'redux-form';
import {
  bodyText,
  marginBottom,
} from '../../../Styles';

const styles = StyleSheet.create({
  input: {
    borderColor: 'rgba(0,0,0,.2)',
    borderWidth: 1,
    height: 47,
    width: 250,
    padding: 10,
    borderRadius: 2,
  },
  label: {
    marginBottom: 7,
  },
});

const TextFieldComponent = ({ input: { onChange, ...restInput } }) => {
  return (
    <TextInput
      style={StyleSheet.flatten([bodyText, marginBottom, styles.input])}
      onChangeText={onChange}
      {...restInput}
      value={restInput.value.toString()}
      underlineColorAndroid="rgba(0,0,0,.2)"
    />
  );
};

const TextField = (props) => {
  return (
    <View>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.name}:</Text>
      <Field name={props.name} component={TextFieldComponent} />
    </View>
  );
};

// export default Button;
export { TextField };
