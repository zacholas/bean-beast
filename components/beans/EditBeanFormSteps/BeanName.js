import React, { Component } from 'react';
import PropTypes from "prop-types";
import { TextField } from "../../common/reduxForm";
import { roastLevelDisplay } from "../../../helpers/labels";
// import { View } from 'react-native';
// import { Container, BodyText } from "/components/common";

export default class BeanName extends Component {
  beanNamePlaceholder(){
    if(this.props.formValues.EditBeanForm !== undefined && this.props.formValues.EditBeanForm.values !== undefined){
      const { roast_level } = this.props.formValues.EditBeanForm.values;
      const originID = this.props.formValues.EditBeanForm.values.origin;
      const origin = originID ? this.props.origins[originID] : null;

      let output = '';
      output = origin && origin.country ? output.concat(origin.country + ' ') : output;
      output = origin && origin.region ? output.concat(origin.region + ' ') : output;
      output = roast_level ? output.concat(roastLevelDisplay(roast_level)) : output;

      return output;
    }

    return null;
  }

  render() {
    return (
      <TextField
        name="name"
        label="Bean Name"
        placeholder={this.beanNamePlaceholder()}
      />
    );
  }
}

BeanName.propTypes = {
  formValues: PropTypes.object.isRequired,
  origins: PropTypes.object.isRequired
};
