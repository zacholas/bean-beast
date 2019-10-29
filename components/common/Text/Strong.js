import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { boldBodyText } from '../Styles';
import PropTypes from "prop-types";

const Strong = (props) => {
  return (
    <Text style={{ ...boldBodyText, ...props.style }}>
      {props.children}
    </Text>
  );
};

export { Strong };

Strong.propTypes = {
  style: PropTypes.object,
};

Strong.defaultProps = {
  style: {}
};
