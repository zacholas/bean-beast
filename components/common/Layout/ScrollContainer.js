import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import {
  container
} from '../Styles';

const ScrollContainer = (props) => {
  return (
    <ScrollView style={StyleSheet.flatten([container, props.style])}>
      {props.children}
    </ScrollView>
  );
};

export { ScrollContainer };
