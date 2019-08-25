import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";
import { TextField } from "../../common/reduxForm";
import { beanTitleDisplay, roastLevelDisplay } from "../../../helpers/labels";
// import { View } from 'react-native';
// import { Container, BodyText } from "/components/common";

export default class BeanName extends Component {
  beanNamePlaceholder(){
    if(this.props.formValues.EditBeanForm !== undefined && this.props.formValues.EditBeanForm.values !== undefined){
      return beanTitleDisplay(this.props.formValues.EditBeanForm.values, this.props.origins, this.props.beanProcesses);
      // const { bean_type, beanBlendComponents } = this.props.formValues.EditBeanForm.values;
      //
      // if(bean_type === 'single_origin'){
      //   const originID = beanBlendComponents[0].origin;
      //   const origin = originID ? this.props.origins[originID] : false;
      //   const region = beanBlendComponents[0].origin_region !== undefined ? beanBlendComponents[0].origin_region : false;
      //   const process = (beanBlendComponents[0].bean_process !== undefined && _.size(this.props.beanProcesses) && this.props.beanProcesses[beanBlendComponents[0].bean_process] !== undefined) ? this.props.beanProcesses[beanBlendComponents[0].bean_process] : false;
      //
      //   let output = '';
      //   output = origin && origin.name !== undefined ? output.concat(origin.name + ' ') : output;
      //   output = region ? output.concat(region + ' ') : output;
      //   output = process ? output.concat(`(${process})`) : output;
      //   // output = roast_level ? output.concat(roastLevelDisplay(roast_level)) : output;
      //
      //   return output;
      // }
      // else if(bean_type === 'blend' && _.size(beanBlendComponents)){
      //   //* Maybe call it something like, "Ethiopia / Brazil / Peru Blend"
      //   //* Order by blend percentage
      //   const orderedBeanBlendComponents = _.orderBy(beanBlendComponents, ['blend_percent'], ['desc']);
      //   let name = '';
      //   _.forEach(orderedBeanBlendComponents, (value, key) => {
      //     const prefix = key > 0 ? ' / ' : '';
      //     const output = ( _.size(this.props.origins) && this.props.origins[value.origin] !== undefined && this.props.origins[value.origin].name !== undefined ) ? this.props.origins[value.origin].name : false;
      //     // return output ? `${prefix} ${output}` : false;
      //     name = output ? name.concat(`${prefix}${output}`) : name;
      //   });
      //
      //   console.log('name', name);
      //
      //   return `${name} Blend`;
      // }


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
