import React, { Component } from 'react';
import PropTypes from "prop-types";
import _ from "lodash";
import {required} from "../../../helpers";
import {PickerField} from "../../common/reduxForm";
import {Text, TouchableOpacity, View} from "react-native";
import {bodyText, textLink} from "../../../constants/Styles";
import * as styles from "../../common/reduxForm/Styles";
import {BodyText} from "../../common";
import Modal from '../../common/Modal';
import EditOriginForm from "../../origins/EditOriginForm";
import { RadioField } from "../../common/reduxForm/RadioField";
import BeanDetailsFormFields from "../BeanDetailsFormFields";
// import { View } from 'react-native';
// import { Container, BodyText } from "/components/common";

export default class BeanDetails extends Component {
  beanDetailsForm(){
    return (
      <BeanDetailsFormFields
        origins={this.props.origins}
        navigation={this.props.navigation}
      />
    )
  }

  render() {
    const radioOptions = [
      { label: 'Skip', value: false },
      { label: 'Single Origin', value: 'single_origin' },
      { label: 'Blend', value: 'blend' },
    ];

    return (
      <View>
        <RadioField name="origin_type" label="Bean Type" options={radioOptions} />
        {this.beanDetailsForm()}
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
