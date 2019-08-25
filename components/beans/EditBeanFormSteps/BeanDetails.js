import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import { RadioField } from "../../common/reduxForm/RadioField";
import BeanDetailsFormFields from "../BeanDetailsFormFields";
import BeanBlendFormLayout from '../BeanBlendFormLayout';

export default class BeanDetails extends Component {
  _beanDetailsDisplay(){
    // console.log(this.props.formValues.EditBeanForm.values.bean_type);
    let beanType = false;
    if(
      this.props.formValues &&
      this.props.formValues.EditBeanForm &&
      this.props.formValues.EditBeanForm.values &&
      this.props.formValues.EditBeanForm.values.bean_type
    ){
      beanType = this.props.formValues.EditBeanForm.values.bean_type;
    }
    if(beanType === 'single_origin'){
      return (
        <BeanDetailsFormFields
          fieldIndex={0}
          fieldPrefix='beanBlendComponents[0]'
          origins={this.props.origins}
          roastLevels={this.props.roastLevels}
          beanProcesses={this.props.beanProcesses}
          coffeeSpecies={this.props.coffeeSpecies}
          navigation={this.props.navigation}
          formValues={this.props.formValues}
        />
      );
    }
    else if(beanType === 'blend'){
      return (
        <BeanBlendFormLayout
          origins={this.props.origins}
          roastLevels={this.props.roastLevels}
          beanProcesses={this.props.beanProcesses}
          coffeeSpecies={this.props.coffeeSpecies}
          navigation={this.props.navigation}
          formValues={this.props.formValues}
          array={this.props.array}
          userPreferences={this.props.userPreferences}
        />
      );
    }
  }

  render() {
    const radioOptions = [
      { label: 'Skip', value: false },
      { label: 'Single Origin', value: 'single_origin' },
      { label: 'Blend', value: 'blend' },
    ];

    return (
      <View>
        <RadioField name="bean_type" label="Bean Type" options={radioOptions} />
        {this._beanDetailsDisplay()}
      </View>
    );
  }
}

BeanDetails.propTypes = {
  origins: PropTypes.object
};

BeanDetails.defaultProps = {
  origins: {}
};
