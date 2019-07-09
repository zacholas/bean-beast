import React, { Component } from 'react';
import PropTypes from "prop-types";
import {ImageUploadField} from "../../common/reduxForm";
// import { View } from 'react-native';
// import { Container, BodyText } from "/components/common";

export default class BeanPhoto extends Component {
  render() {
    return (
      <ImageUploadField
        name="bean_image"
        label="Bean Image"
      />
    );
  }
}

BeanPhoto.propTypes = {};
