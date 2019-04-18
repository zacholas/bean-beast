import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  headline,
  marginBottom,
} from '../Styles';

const Headline = (props) => {
  return (
    <View>
      <Text style={StyleSheet.flatten([headline, marginBottom, props.style])}>
        {props.children}
      </Text>
    </View>
  );
}

export { Headline };
