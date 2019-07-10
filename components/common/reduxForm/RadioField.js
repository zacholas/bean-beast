import React from 'react';
import { Slider, StyleSheet, Text, View, } from 'react-native';
import { Field } from 'redux-form';
import _ from 'lodash';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";
import PropTypes from "prop-types";
import colors from "../../../constants/Colors";

//* Note: This form field requires the npm package react-native-simple-radio-button

// const style = StyleSheet.create({
//   valueLabelStacked: {
//
//   },
//   valueLabelAside: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });

const RadioComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  radio_props
}) => {
  let selectedValueIndex = _.findIndex(radio_props, { 'value': restInput.value });

  return (
    <View style={styles.inputContainer}>
      <RadioForm
        buttonColor={colors.colorPrimary}
        formHorizontal={true}
        animation={true}
      >
        {radio_props.map((obj, i) => {
          return (
            <RadioButton labelHorizontal={true} key={i} >
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={selectedValueIndex === i}
                onPress={(value) => {onChange(value)}}
                // borderWidth={1}
                // buttonInnerColor={'#e74c3c'}
                // buttonOuterColor={selectedValueIndex === i ? '#2196f3' : '#000'}
                // buttonSize={40}
                // buttonOuterSize={80}
                // buttonStyle={{}}
                // buttonWrapStyle={{marginRight: 10}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={(value) => {onChange(value)}}
                labelStyle={{ marginRight: 10 }}
                // labelWrapStyle={{}}
              />
            </RadioButton>
          );
        })}

      </RadioForm>




      {/*<Switch onValueChange={onChange} {...restInput} value={restInput.value} />*/}
      {/*<RadioForm*/}
        {/*onPress={(value) => {onChange(value)}}*/}
        {/*{...restInput}*/}
        {/*radio_props={options}*/}
        {/*initial={2}*/}
        {/*formHorizontal={true}*/}
        {/*labelHorizontal={true}*/}
        {/*buttonColor={colors.colorPrimary}*/}
        {/*animation={true}*/}
        {/*style={{ marginRight: 10 }}*/}
      {/*>*/}
      {/*<RadioForm*/}
        {/*{...restInput}*/}
        {/*formHorizontal={true}*/}
        {/*labelHorizontal={true}*/}
        {/*buttonColor={colors.colorPrimary}*/}
        {/*animation={true}*/}
      {/*>*/}
        {/*{options.map((obj, i) => {*/}
          {/*{console.log(obj)}*/}
          {/*<RadioButton labelHorizontal={true} key={i} >*/}
            {/*<RadioButtonInput*/}
              {/*obj={obj}*/}
              {/*index={i}*/}
              {/*isSelected={selectedValueIndex === i}*/}
              {/*onPress={(value) => {onChange(value)}}*/}
              {/*borderWidth={1}*/}
              {/*buttonInnerColor={'#e74c3c'}*/}
              {/*buttonOuterColor={selectedValueIndex === i ? '#2196f3' : '#000'}*/}
              {/*buttonSize={40}*/}
              {/*buttonOuterSize={80}*/}
              {/*buttonStyle={{}}*/}
              {/*buttonWrapStyle={{marginLeft: 10}}*/}
            {/*/>*/}
            {/*<RadioButtonLabel*/}
              {/*obj={obj}*/}
              {/*index={i}*/}
              {/*labelHorizontal={true}*/}
              {/*onPress={(value) => {onChange(value)}}*/}
              {/*labelStyle={{fontSize: 20, color: '#2ecc71'}}*/}
              {/*labelWrapStyle={{}}*/}
            {/*/>*/}
          {/*</RadioButton>*/}
        {/*})}*/}

      {/*</RadioForm>*/}

      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const RadioField = (props) => {
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
      <Field
        name={props.name}
        validate={props.validate}
        component={RadioComponent}
        radio_props={props.options}
      />
    </View>
  );
};

export { RadioField };

RadioField.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.array,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

RadioField.defaultProps = {

};
