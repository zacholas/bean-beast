import React, { Component } from 'react';
import PropTypes from "prop-types";
// import _ from "lodash";
// import {required} from "../../../helpers";
// import {PickerField} from "../../common/reduxForm";
// import { Hr } from "../../common";
import {Text, TouchableOpacity, View} from "react-native";
// import {bodyText, textLink} from "../../../constants/Styles";
// import * as styles from "../../common/reduxForm/Styles";
// import {BodyText} from "../../common";
// import Modal from '../../common/Modal';
// import EditOriginForm from "../../origins/EditOriginForm";
import { RadioField } from "../../common/reduxForm/RadioField";
import Modal from "../../common/Modal";
import BeanDetailsFormFields from "../BeanDetailsFormFields";
// import BeanBlendFormFields from "../BeanBlendFormFields";
import { BeanFormFields } from "../BeanFormFields";
import BeanBlendFormLayout from '../BeanBlendFormLayout';
// import RoastLevelFormField from "./RoastLevelFormField";
// import { View } from 'react-native';
// import { Container, BodyText } from "/components/common";



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
        <BeanFormFields
          singleOrigin={beanType === 'single_origin'}
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
        />
      );
    }


    // if(beanType === 'single_origin'){
    //   return (
    //     <BeanDetailsFormFields
    //       origins={this.props.origins}
    //       roastLevels={this.props.roastLevels}
    //       beanProcesses={this.props.beanProcesses}
    //       coffeeSpecies={this.props.coffeeSpecies}
    //       navigation={this.props.navigation}
    //       formValues={this.props.formValues}
    //     />
    //   );
    // }
    // else if(beanType === 'blend'){
    //   return (
    //     <BeanFormFields
    //       origins={this.props.origins}
    //       roastLevels={this.props.roastLevels}
    //       beanProcesses={this.props.beanProcesses}
    //       coffeeSpecies={this.props.coffeeSpecies}
    //       navigation={this.props.navigation}
    //       formValues={this.props.formValues}
    //     />
    //   );
    // }
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
