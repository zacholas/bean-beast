import React from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, Picker} from 'react-native';
// import { Slider } from 'react-native';
import Slider from "react-native-slider";
import { Field } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  bodyText,
} from '../Styles';
import { inputContainer, errorText, warningText, label } from "./Styles";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  sliderOuterContainer: {
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  sliderContainer: {
    flex: 1,
    position: 'relative',
  },
  notchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14.5,
    paddingRight: 14.5,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  notch: {
    height: 15,
    width: 1,
    backgroundColor: '#000',
    opacity: 0.3
  },
  tallNotch: {
    height: 32,
  },
  topLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // paddingLeft: 2,
    // paddingRight: 2
  },
  bottomLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelItem: {
    flex: 1,
    textAlign: 'center'
  },
  firstLabelItem: {
    textAlign: 'left'
  },
  lastLabelItem: {
    textAlign: 'right'
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

const Notch = (props) => {
  let thisStyle = styles.notch;
  if(props.tall){
    thisStyle = StyleSheet.flatten([styles.notch, styles.tallNotch, props.style]);
  }
  return (
    <View style={thisStyle} />
  );
};

const LabeledSliderDisplayComponent = ({
  label,
  type,
  minimumValue,
  maximumValue,
  step,
  showNotches,
  tallNotches,
  topLabels,
  bottomLabels,
  value
}) => {
  let topLabelOutput, bottomLabelOutput, notchesOutput;

  if(topLabels && topLabels.length){
    const topLabelItems = _.map(topLabels, (topLabel, i ) => {
      let labelItemStyle = { ...styles.labelItem, ...topLabel.containerStyle };
      if(i === 0){
        labelItemStyle = { ...styles.labelItem, ...styles.firstLabelItem, ...topLabel.containerStyle }
      }
      else if(i === (topLabels.length - 1)){
        labelItemStyle = { ...styles.labelItem, ...styles.lastLabelItem, ...topLabel.containerStyle }
      }
      return (
        <Text style={labelItemStyle} key={i}>
          {topLabel.content}
        </Text>
      );
    });
    topLabelOutput = <View style={styles.topLabelsContainer}>{topLabelItems}</View>;
  }

  if(bottomLabels && bottomLabels.length){
    const bottomLabelItems = _.map(bottomLabels, (bottomLabel, i ) => {
      let labelItemStyle = { ...styles.labelItem, ...bottomLabel.containerStyle };
      if(i === 0){
        labelItemStyle = { ...styles.labelItem, ...styles.firstLabelItem, ...bottomLabel.containerStyle }
      }
      else if(i === (bottomLabels.length - 1)){
        labelItemStyle = { ...styles.labelItem, ...styles.lastLabelItem, ...bottomLabel.containerStyle }
      }
      return (
        <Text style={labelItemStyle} key={i}>
          {bottomLabel.content}
        </Text>
      );
    });
    bottomLabelOutput = <View style={styles.bottomLabelsContainer}>{bottomLabelItems}</View>;
  }

  if(showNotches === true){
    const totalSteps = (maximumValue - minimumValue) / step + 1;
    let notches = [];
    for(let i = 0; i < totalSteps; i++){
      const tall = tallNotches.includes(i);
      notches.push(<Notch key={i} tall={tall} />);
    }
    notchesOutput = <View style={styles.notchContainer}>{notches}</View>;
  }

  // console.log('value', restInput.value);
  // console.log('value', parseFloat(restInput.value));
  const minVal = !isNaN(parseFloat(minimumValue)) ? parseFloat(minimumValue) : 0;
  const maxVal = !isNaN(parseFloat(maximumValue)) ? parseFloat(maximumValue) : 1;
  const zStep = !isNaN(parseFloat(step)) ? parseFloat(step) : 0.1;
  const displayValue = !isNaN(parseFloat(value)) ? parseFloat(value) : minVal;

  return (
    <View style={inputContainer}>
      <View style={styles.sliderOuterContainer}>
        {topLabelOutput}
        <View style={styles.sliderContainer}>
          <Slider
            // onSlidingComplete={(val) => onChange(_.round(val, getDecimalLength(step)))}
            // {...restInput}
            value={displayValue}
            minimumValue={minVal}
            maximumValue={maxVal}
            step={zStep}
            style={{zIndex: 2, position: 'relative', marginHorizontal: 5}}
            disabled
            // thumbTouchSize={{width: 60, height: 60}}
          />
          {notchesOutput}
        </View>
        {bottomLabelOutput}
      </View>
    </View>
  );
};

const LabeledSliderComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  minimumValue,
  maximumValue,
  step,
  showNotches,
  tallNotches,
  topLabels,
  bottomLabels
}) => {
  let topLabelOutput, bottomLabelOutput, notchesOutput;

  if(topLabels && topLabels.length){
    const topLabelItems = _.map(topLabels, (topLabel, i ) => {
      let labelItemStyle = { ...styles.labelItem, ...topLabel.containerStyle };
      if(i === 0){
        labelItemStyle = { ...styles.labelItem, ...styles.firstLabelItem, ...topLabel.containerStyle }
      }
      else if(i === (topLabels.length - 1)){
        labelItemStyle = { ...styles.labelItem, ...styles.lastLabelItem, ...topLabel.containerStyle }
      }
      return (
        <Text style={labelItemStyle} key={i}>
          {topLabel.content}
        </Text>
      );
    });
    topLabelOutput = <View style={styles.topLabelsContainer}>{topLabelItems}</View>;
  }

  if(bottomLabels && bottomLabels.length){
    const bottomLabelItems = _.map(bottomLabels, (bottomLabel, i ) => {
      let labelItemStyle = { ...styles.labelItem, ...bottomLabel.containerStyle };
      if(i === 0){
        labelItemStyle = { ...styles.labelItem, ...styles.firstLabelItem, ...bottomLabel.containerStyle }
      }
      else if(i === (bottomLabels.length - 1)){
        labelItemStyle = { ...styles.labelItem, ...styles.lastLabelItem, ...bottomLabel.containerStyle }
      }
      return (
        <Text style={labelItemStyle} key={i}>
          {bottomLabel.content}
        </Text>
      );
    });
    bottomLabelOutput = <View style={styles.bottomLabelsContainer}>{bottomLabelItems}</View>;
  }

  if(showNotches === true){
    const totalSteps = (maximumValue - minimumValue) / step + 1;
    let notches = [];
    for(let i = 0; i < totalSteps; i++){
      const tall = tallNotches.includes(i);
      notches.push(<Notch key={i} tall={tall} />);
    }
    notchesOutput = <View style={styles.notchContainer}>{notches}</View>;
  }

  // console.log('value', restInput.value);
  // console.log('value', parseFloat(restInput.value));
  const minVal = !isNaN(parseFloat(minimumValue)) ? parseFloat(minimumValue) : 0;
  const maxVal = !isNaN(parseFloat(maximumValue)) ? parseFloat(maximumValue) : 1;
  const zStep = !isNaN(parseFloat(step)) ? parseFloat(step) : 0.1;
  const value = !isNaN(parseFloat(restInput.value)) ? parseFloat(restInput.value) : minVal;

  return (
    <View style={inputContainer}>
      <View style={styles.sliderOuterContainer}>
        {topLabelOutput}
        <View style={styles.sliderContainer}>
          <Slider
            onSlidingComplete={(val) => onChange(_.round(val, getDecimalLength(step)))}
            {...restInput}
            value={value}
            minimumValue={minVal}
            maximumValue={maxVal}
            step={zStep}
            style={{zIndex: 2, position: 'relative', marginHorizontal: 5}}
            // thumbTouchSize={{width: 60, height: 60}}
          />
          {notchesOutput}
        </View>
        {bottomLabelOutput}
      </View>
      {touched &&
      ((error && <Text style={errorText}>{error}</Text>) ||
        (warning && <Text style={warningText}>{warning}</Text>))}
    </View>
  );
};

const LabeledSliderField = (props) => {
  //* Function to display a read-only field
  if(props.disabled === true){
    return (
      <View style={{ alignItems: 'stretch' }}>
        { props.label && <Text style={StyleSheet.flatten([bodyText, label])}>{props.label}:</Text> }
        <View>
          <LabeledSliderDisplayComponent
            name={props.name}
            validate={props.validate}
            minimumValue={props.minimumValue}
            maximumValue={props.maximumValue}
            step={props.step}
            showNotches={props.showNotches}
            tallNotches={props.tallNotches}
            topLabels={props.topLabels}
            bottomLabels={props.bottomLabels}
            value={props.value}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ alignItems: 'stretch' }}>
      { props.label && <Text style={StyleSheet.flatten([bodyText, label])}>{props.label}:</Text> }
      <View>
        <Field
          name={props.name}
          validate={props.validate}
          component={LabeledSliderComponent}
          minimumValue={props.minimumValue}
          maximumValue={props.maximumValue}
          step={props.step}
          showNotches={props.showNotches}
          tallNotches={props.tallNotches}
          topLabels={props.topLabels}
          bottomLabels={props.bottomLabels}
        />
      </View>
    </View>
  );
};

export { LabeledSliderField };

LabeledSliderField.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.array,
  minimumValue: PropTypes.number,
  maximumValue: PropTypes.number,
  step: PropTypes.number,
  showNotches: PropTypes.bool,
  tallNotches: PropTypes.arrayOf(PropTypes.number).isRequired,
  topLabels: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.node,
    containerStyle: PropTypes.object
  })),
  bottomLabels: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.node,
    containerStyle: PropTypes.object
  })),
  disabled: PropTypes.bool,
  value: PropTypes.number,
};

LabeledSliderField.defaultProps = {
  minimumValue: 0,
  maximumValue: 1,
  step: 0.1,
  showNotches: true,
  disabled: false
};
