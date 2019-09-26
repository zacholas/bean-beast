import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  bodyText,
  marginBottom,
} from '../Styles';
import PropTypes from "prop-types";

const BodyText = (props) => {
  const style = props.noMargin ? StyleSheet.flatten([bodyText, props.style]) : StyleSheet.flatten([bodyText, marginBottom, props.style]);
  return (
    <View>
      <Text style={style}>
        {props.children}
      </Text>
    </View>
  );
};

export { BodyText };

BodyText.propTypes = {
  style: PropTypes.object,
  noMargin: PropTypes.bool,
  // smallText: PropTypes.bool
};