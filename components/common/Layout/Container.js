import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  container
} from '../Styles';

const Container = (props) => {
  return (
    <View style={StyleSheet.flatten([container, props.style])}>
      {props.children}
    </View>
  );
}

export { Container };
