import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, Slider } from 'react-native';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import { inputContainer, errorText, warningText, label } from "./Styles";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  sliderOuterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderContainer: {
    flex: 1
  },
  sliderLeftLabelContainer: {
    minWidth: 50,
    paddingRight: 10,
  },
  sliderRightLabelContainer: {
    minWidth: 50,
    paddingLeft: 10,
  }
});

const getDecimalLength = (float) => {
  if(float && typeof float === 'number'){
    let myFloat = float.toString();
    let splitString = myFloat.split('.');
    return splitString[1] && Number.isInteger(splitString[1].length) ? splitString[1].length : 0;
  }
  return false;
};

const SliderComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  minimumValue,
  maximumValue,
  step,
  textLabelEnabled,
  textLabelPosition,
  textLabelInputEnabled
}) => {
  let textLabelLeft, textLabelRight;
  // const roundedValue = restInput.value ? _.round(restInput.value, getDecimalLength(step)) : null;
  const roundedValue = restInput.value;

  //* Non-editable text labels
  // if(textLabelEnabled && textLabelPosition === 'left' && textLabelInputEnabled === false) {
  //
  // }
  if(textLabelEnabled && textLabelPosition === 'right' && textLabelInputEnabled === false){
    textLabelRight = (
      <View style={styles.sliderRightLabelContainer}>
        <Text>{roundedValue}</Text>
      </View>
    );
  }
  else if(textLabelEnabled && textLabelInputEnabled === false){
    textLabelLeft = (
      <View style={styles.sliderLeftLabelContainer}>
        <Text>{roundedValue}</Text>
      </View>
    );
  }

  //* Editable text labels TODO create this functionality with validation
  if(textLabelEnabled && textLabelPosition === 'left' && textLabelInputEnabled === true) {

  }
  else if(textLabelEnabled && textLabelPosition === 'right' && textLabelInputEnabled === true){

  }
  else if(textLabelEnabled && textLabelInputEnabled === true){

  }


  return (
    <View style={inputContainer}>
      <View style={styles.sliderOuterContainer}>
        {textLabelLeft}
        <View style={styles.sliderContainer}>
          <Slider
            onValueChange={(val) => onChange(_.round(val, getDecimalLength(step)))}
            {...restInput}
            value={roundedValue}
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            step={step}
          />
        </View>
        {textLabelRight}
      </View>
      {touched &&
      ((error && <Text style={errorText}>{error}</Text>) ||
        (warning && <Text style={warningText}>{warning}</Text>))}
    </View>
  );
};

const SliderField = (props) => {
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Text style={StyleSheet.flatten([bodyText, label])}>{props.label}:</Text>
      <Field
        name={props.name}
        validate={props.validate}
        component={SliderComponent}
        minimumValue={props.minimumValue}
        maximumValue={props.maximumValue}
        step={props.step}
        textLabelEnabled={props.textLabelEnabled}
        textLabelPosition={props.textLabelPosition}
        textLabelInputEnabled={props.textLabelInputEnabled}
      />
    </View>
  );
};

export { SliderField };

SliderField.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.array,
  minimumValue: PropTypes.number,
  maximumValue: PropTypes.number,
  step: PropTypes.number,
  textLabelEnabled: PropTypes.bool,
  textLabelPosition: PropTypes.oneOf(['left', 'right']),
  textLabelInputEnabled: PropTypes.bool,
};

SliderField.defaultProps = {
  minimumValue: 0,
  maximumValue: 1,
  step: 0.1,
  textLabelEnabled: true,
  textLabelPosition: 'left', // left, right
  textLabelInputEnabled: false
};
