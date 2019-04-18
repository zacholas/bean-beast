import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  bodyText,
  marginBottom,
} from '../Styles';

const BodyText = (props) => {
  return (
    <View>
      <Text style={StyleSheet.flatten([bodyText, marginBottom, props.style])}>
        {props.children}
      </Text>
    </View>
  );
}

export { BodyText };
