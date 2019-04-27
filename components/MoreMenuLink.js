import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, TouchableOpacity } from 'react-native';
import { Container, BodyText } from "./common";

export default class MoreMenuLink extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <BodyText>{this.props.title}</BodyText>
      </TouchableOpacity>
    );
  }
}

MoreMenuLink.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
