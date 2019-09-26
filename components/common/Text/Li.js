import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from "prop-types";
import {
  bodyText,
} from '../Styles';
import { BodyText } from "./BodyText";

const styles = StyleSheet.create({
  liStyle: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  bulletStyle: {
    paddingRight: 7,
  },
  textStyle: {
    ...bodyText,
    flex: 1
  },
});


const Li = (props) => {
  let bulletOutput;
  if(typeof props.listIcon === 'string'){
    bulletOutput = <Text style={styles.bulletStyle}>{props.listIcon}</Text>;
  }
  else {
    bulletOutput = <View style={styles.bulletStyle}>{props.listIcon}</View>;
  }
  return (
    <View style={StyleSheet.flatten([styles.liStyle, props.style])}>
      {bulletOutput}
      <Text style={styles.textStyle}>
        {props.children}
      </Text>
    </View>
  );
};

export { Li };

Li.propTypes = {
  style: PropTypes.object,
  listIcon: PropTypes.node
};

Li.defaultProps = {
  style: {},
  listIcon: '»'
};