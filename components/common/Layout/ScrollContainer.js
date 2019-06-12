import React, { Component } from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import {
  container, defaultPaddingAmount
} from '../Styles';

const ScrollContainer = (props) => {
  return (
    <ScrollView style={StyleSheet.flatten([container, props.style])}>
      <View style={{ height: defaultPaddingAmount }} />
      {props.children}
      <View style={{ height: 5 }} />
    </ScrollView>
  );
};

export { ScrollContainer };
