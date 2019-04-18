import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  marginBottom,
} from '../Styles';

const styles = StyleSheet.create({
  hrStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});


const Hr = (props) => {
  return (
    <View style={StyleSheet.flatten([marginBottom, styles.hrStyle, props.style])} />
  );
};

export { Hr };
