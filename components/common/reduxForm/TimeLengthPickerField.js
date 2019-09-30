import React, { Component } from 'react';
import {StyleSheet, Text, View, DatePickerAndroid, DatePickerIOS, Platform, Picker, TextInput} from 'react-native';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";
import PropTypes from "prop-types";
import _ from "lodash";
import { Headline } from "..";

const thisStyles = StyleSheet.create({
  timeRow: {
    flexDirection: 'row'
  },
  timeBlockContainer: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 5
  },
  number: {
    fontSize: 16,
    marginBottom: 4
  },
  numberLabel: {
    fontSize: 12
  }
});


class TimeLengthPickerComponent extends Component {
  // render() {
  //   const { input: { value, onChange } } = this.props;
  //   return (
  //     <div>
  //       <span>The current value is {value}.</span>
  //       <button type="button" onClick={() => onChange(value + 1)}>Inc</button>
  //       <button type="button" onClick={() => onChange(value - 1)}>Dec</button>
  //     </div>
  //   )
  // }

  constructor(props){
    super(props);

    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
  //   if(_.isEqual(nextState, this.state)){
  //     this.props.input.onChange(this._getSecondsFromState(nextState));
  //   }
  // }

  render(){
    console.log('value', this.props.input.value);
    const { input: { value, onChange } } = this.props;
    return (
      <View>
        <View style={thisStyles.timeRow}>
          {this._hoursOutput()}
          {this._minutesOutput()}
          {this._secondsOutput()}
        </View>
        {this.props.touched &&
        ((this.props.error && <Text style={styles.errorText}>{this.props.error}</Text>) ||
          (this.props.warning && <Text style={styles.warningText}>{this.props.warning}</Text>))}
      </View>
    );
  }

  // render() {
  //   const { input: { value, onChange } } = this.props;
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       {this._galleryPickerButton()}
  //       {this._cameraButton()}
  //       {this._imageOutput()}
  //     </View>
  //   )
  // }

  _parseNumberIntoHrsMinsSecs(seconds) {
    const d = Number(seconds);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    return {
      hours: Number(h),
      minutes: Number(m),
      seconds: Number(s)
    }
  };



  _setStateFromSeconds(seconds){
    const d = Number(seconds);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    this.setState({
      hours: h,
      minutes: m,
      seconds: s
    })

    // return {
    //   hours: h,
    //   minutes: m,
    //   seconds: s
    // }
  }

  _getSecondsFromState(nextState){
    const state = nextState ? nextState : this.state;
    const hourSeconds = state.hours * 60 * 60;
    const minuteSeconds = state.minutes * 60;
    const seconds = state.seconds;

    return hourSeconds + minuteSeconds + seconds;
  }

  // _onChange(){
  //   // console.log(this.props);
  //   this.props.input.onChange(this._getSecondsFromState())
  // }

  _hoursOutput(){
    if(this.props.parentProps.hours === true){
      return (
        <View style={thisStyles.timeBlockContainer}>
          <Text style={thisStyles.number}>00</Text>
          <Headline h5 style={thisStyles.numberLabel}>Hours</Headline>
        </View>
      )
    }
  }

  _minutesOnChange(itemValue){
    const totalSeconds = (Number(this.state.hours) * 60 * 60) + (Number(itemValue) * 60) + Number(this.state.seconds);
    this.props.input.onChange(totalSeconds);
    this.setState({
      minutes: Number(itemValue)
    });
  }

  _minutesOutput(){
    if(this.props.parentProps.minutes === true){
      return (
        <View style={styles.inputContainer}>
          {this.props.parentProps.hours === true && colonDivider()}
          <View style={thisStyles.timeBlockContainer}>
            <TextInput
              onChangeText={(itemValue) => this._minutesOnChange(itemValue)}
            />
            <Text style={thisStyles.number}>00</Text>
            <Headline h5 style={thisStyles.numberLabel}>Min</Headline>
          </View>
        </View>
      )
    }
  }

  _secondsOnChange(itemValue){
    const totalSeconds = (parseFloat(this.state.hours) * 60 * 60) + (parseFloat(this.state.minutes) * 60) + parseFloat(itemValue);
    console.log('totalSeconds', totalSeconds);
    this.props.input.onChange(totalSeconds);
    // this._onChange();
    this.setState({
      seconds: Number(itemValue)
    });
  }

  _secondsOutput(){
    // const secondsNumbers = [...Array(60+1).keys()].slice(1);
    // let secondsPickerOptions = _.map(secondsNumbers, (option, i ) => {
    //   return <Picker.Item key={option} value={option} label={option} />
    // });

    const { input: { value, onChange } } = this.props;

    if(this.props.parentProps.seconds === true){
      return (
        <View style={thisStyles.timeBlockContainer}>
          {/*<Picker selectedValue={restInput.value.toString()} onValueChange={onChange} {...restInput}>*/}
          {/*<Picker*/}
            {/*selectedValue={language}*/}
            {/*style={{height: 50, width: 100}}*/}
            {/*onValueChange={(itemValue, itemIndex) =>*/}
              {/*language = itemValue*/}
            {/*}>*/}
            {/*<Picker.Item label="Java" value="java" />*/}
            {/*<Picker.Item label="JavaScript" value="js" />*/}
          {/*</Picker>*/}
          {/*onValueChange={(val) => onChange(_.round(val, getDecimalLength(step)))}*/}
          {/*<Picker selectedValue='20' onValueChange={(itemValue, itemIndex) => this._secondsOnChange(itemValue, itemIndex)} >*/}
            {/*<Picker.Item key='default' value='' label='–  Select an Option  –' />*/}
            {/*<Picker.Item key='20' value='20' label="20" />*/}
            {/*<Picker.Item key='60' value='60' label="60" />*/}
            {/*/!*{secondsPickerOptions}*!/*/}
          {/*</Picker>*/}
          <TextInput
            onChangeText={(itemValue) => this._secondsOnChange(itemValue)}
          />
          <Text style={thisStyles.number}>00</Text>
          <Headline h5 style={thisStyles.numberLabel}>Sec</Headline>
        </View>
      )
    }
  }


  // _cameraButton(){
  //   if(this.state.hasCameraPermission === true){
  //     return <Button
  //       title="Take a picture"
  //       onPress={this._takePicture}
  //     />;
  //   }
  // }
  //
  // _galleryPickerButton() {
  //   if(this.state.hasCameraPermission === true){
  //     return <Button
  //       title="Pick an image from camera roll"
  //       onPress={this._pickImage}
  //     />;
  //   }
  // }
  //
  // _imageOutput(){
  //   if(this.props.input.value){
  //     return <Image source={{ uri: this.props.input.value }} style={{ width: 150, height: 200 }} />;
  //   }
  // }
  //
  // _pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [3, 4],
  //   });
  //
  //   if (!result.cancelled) {
  //     this.setState({ image: result.uri });
  //     this.props.input.onChange(result.uri);
  //     // this.hiddenTextField.setNativeProps({value: result.uri})
  //     // this.props.change('bean_image', result.uri);
  //   }
  // };
  //
  // _takePicture = async() => {
  //   let result = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     aspect: [3, 4],
  //   });
  //
  //   if (!result.cancelled) {
  //     this.setState({ image: result.uri });
  //     this.props.input.onChange(result.uri);
  //   }
  // }
}


const TimeLengthPickerField = (props) => {
  const { labels, hours, maxHours, minutes, maxMinutes, seconds, maxSeconds } = props;
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
      <Field
        name={props.name}
        validate={props.validate}
        component={TimeLengthPickerComponent}
        parentProps={{ labels, hours, maxHours, minutes, maxMinutes, seconds, maxSeconds }}
      />
    </View>
  );
};

export { TimeLengthPickerField };


TimeLengthPickerField.propTypes = {
  name: PropTypes.string.isRequired,
  labels: PropTypes.bool,
  hours: PropTypes.bool,
  maxHours: PropTypes.number,
  minutes: PropTypes.bool,
  maxMinutes: PropTypes.number,
  seconds: PropTypes.bool,
  maxSeconds: PropTypes.number,
};

TimeLengthPickerField.defaultProps = {
  labels: true,
  hours: false,
  maxHours: 72,
  minutes: true,
  maxMinutes: 60,
  seconds: true,
  maxSeconds: 60,
};