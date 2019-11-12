import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BodyText, Headline } from "../common";
import PropTypes from "prop-types";
import _ from 'lodash';
import {secondsToTimeStringDisplay, temperatureInOtherUnit, temperatureInUserPreference} from "../../helpers/labels";
import WaitDisplay from "./formFields/stepFields/WaitDisplay";
import TaintDisplay from "./formFields/stepFields/TaintDisplay";
import PreInfusionDisplay from "./formFields/stepFields/PreInfusionDisplay";
import PrimaryInfusionDisplay from "./formFields/stepFields/PrimaryInfusionDisplay";
import BloomDisplay from "./formFields/stepFields/BloomDisplay";
import PourDisplay from "./formFields/stepFields/PourDisplay";
import { connect } from "react-redux";
import { Strong } from "../common/Text/Strong";

class ViewRecipeStepRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      hoursEnabled: _.size(props.parentProps) && _.size(props.parentProps.brew_method) && props.parentProps.brew_method.id && props.parentProps.brew_method.id === 'default_cold_brew',
      crossedOut: false,
    };
  }

  render() {
    const { step } = this.props;
    if(this.props.headerRow === true){
      return (
        <View style={{ ...styles.row, marginBottom: 0 }}>
          <View style={styles.stepCol}><Headline h6 inline noMargin wrapperStyle={styles.th}>Step</Headline></View>
          <View style={styles.timeCol}><Headline h6 inline noMargin wrapperStyle={styles.th}>Total Time</Headline></View>
          <View style={styles.weightCol}><Headline h6 inline noMargin wrapperStyle={styles.th}>Total Weight</Headline></View>
        </View>
      );
    }
    return (
      <View style={styles.row}>
        <View style={styles.stepCol}>
          {/*{this._numberOutput()}*/}
          <TouchableOpacity onPress={() => this._toggleItemCrossedOut()}>
            {this._stepOutput()}
          </TouchableOpacity>
        </View>
        <View style={styles.timeCol}><BodyText noMargin style={styles.smallText}>{this._timeOutput()}</BodyText></View>
        <View style={styles.weightCol}><BodyText noMargin style={styles.smallText}>{this._weightOutput()}</BodyText></View>
      </View>
    );
  }

  _toggleItemCrossedOut(){
    this.setState({ crossedOut: !this.state.crossedOut });
  }

  _style(){
    return {
      textDecorationLine: this.state.crossedOut === true ? 'line-through' : 'none'
    }
  }

  _numberOutput(){
    if(typeof this.props.index !== 'undefined'){
      return (
        <BodyText>{this.props.index + 1}</BodyText>
      )
    }
  }

  _stepOutput(){
    const { field, field: { field_id, values } } = this.props.step;
    const { bean, roaster } = this.props;
    // console.log('this field', field);
    switch (field_id) {
      //* Pseudo
      case 'temperature':
        if(values.temperature){
          return <BodyText noMargin style={this._style()}>Heat water to {temperatureInUserPreference(values.temperature, this.props.userPreferences, values.temperatureMeasurement)} ({temperatureInOtherUnit(values.temperature, values.temperatureMeasurement)})</BodyText>;
        }
        break;
      case 'dose':
        let doseContent = String('');
        let roasterContent = String('');
        if(bean && bean.name){
          doseContent += ` of ${bean.name}`;
          if(roaster && roaster.name) {
            roasterContent = <Text style={{ fontStyle: 'italic' }}> (Roasted by {roaster.name})</Text>;
          }
        }
        if(values.dose){
          return <BodyText noMargin style={this._style()}>Weigh {values.dose}g{doseContent}{roasterContent}</BodyText>;
          // return <BodyText noMargin style={this._style()}><Strong>Weigh {values.dose}g</Strong>{doseContent}{roasterContent}</BodyText>;
        }
        break;
      case 'grind':
        if(typeof values.grind !== 'undefined'){
          return <BodyText noMargin style={this._style()}>Grind the beans at setting "{values.grind}"</BodyText>;
        }
        break;

      //* Universal
      case 'default_wait':
        return  <WaitDisplay values={values} style={this._style()} />;
      case 'default_taint':
        return  <TaintDisplay values={values} style={this._style()} />;

      //* Espresso Only
      case 'default_pre_infusion':
        return  <PreInfusionDisplay values={values} style={this._style()} />;
      case 'default_primary_infusion':
        return  <PrimaryInfusionDisplay values={values} style={this._style()} />;

      //* Everything Else
      case 'default_bloom':
        return  <BloomDisplay values={values} style={this._style()} />;
      case 'default_pour':
        return  <PourDisplay values={values} style={this._style()} />;
      default:
        // return <BodyText noMargin style={this._style()}>{field_id}</BodyText>;
    }
  }

  _formatDoubleDigitNumberString(number){
    if(this.state.hoursEnabled === true){
      return ("0" + number).slice(-2);
    }
    else {
      if(number.toString().length >= 2){
        return number;
      }
      return ("0" + number);
    }
  }

  _timeOutput(){
    const d = Number(this.props.step.totalTime);
    const h = this.state.hoursEnabled === false ? 0 : Math.floor(d / 3600);
    const m = this.state.hoursEnabled === false ? Math.floor(d / 60) : Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    let timeString;

    if(this.state.hoursEnabled === true){
      timeString = `${h}:${this._formatDoubleDigitNumberString(m)}:${this._formatDoubleDigitNumberString(s)}`;
    }
    else {
      timeString = `${m}:${this._formatDoubleDigitNumberString(s)}`;
    }

    return this.props.step.totalTime > 0 ? timeString : '-';
  }

  _weightOutput(){
    const weight = this.props.step.totalWeight;
    const displayWeight = weight ? `${weight}g` : '-';
    return  displayWeight;
  }
}

const styles = StyleSheet.create({
  headingItem: {
    // flex: 1,
    // backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginBottom: 25
  },
  th: {
    justifyContent: 'flex-end',
  },
  stepCol: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingRight: 20
  },
  timeCol: {
    width: 60,
    marginRight: 10
  },
  weightCol: {
    width: 70
  },
  smallText: {
    fontSize: 14,
  }
});

const mapStateToProps = (state, props) => {
  const beanID = _.size(props.parentProps) && _.size(props.parentProps.recipe) && props.parentProps.recipe.bean_id ? props.parentProps.recipe.bean_id : false;
  const roasterID = _.size(state.beans) && _.size(state.beans.beans) && state.beans.beans[beanID] && state.beans.beans[beanID].cafe ? state.beans.beans[beanID].cafe : false;
  return {
    userPreferences: state.userPreferences,
    bean: beanID && _.size(state.beans) && _.size(state.beans.beans) && state.beans.beans[beanID] ? state.beans.beans[beanID] : false,
    roaster: roasterID && _.size(state.cafes) && _.size(state.cafes.cafes) && state.cafes.cafes[roasterID] ? state.cafes.cafes[roasterID] : false
  }
};

export default connect(mapStateToProps, {})(ViewRecipeStepRow);

ViewRecipeStepRow.propTypes = {
  step: PropTypes.object,
  parentProps: PropTypes.object.isRequired,
  headerRow: PropTypes.bool,
};

ViewRecipeStepRow.defaultProps = {
  step: {},
  headerRow: false,
  bean: false,
  roaster: false,
};
