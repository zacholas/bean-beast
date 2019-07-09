import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  container,
  defaultPaddingAmount
} from '../Styles';

const Container = (props) => {
  if(props.scroll === true){
    return (
      <View>
        <ScrollView style={StyleSheet.flatten([container, props.style])}>
          <View style={{ height: defaultPaddingAmount }} />
          {props.children}
          <View style={{ height: defaultPaddingAmount }} />
        </ScrollView>
      </View>
    );
  }
  else {
    return (
      <View style={StyleSheet.flatten([container, props.style])}>
        <View style={{ height: defaultPaddingAmount }} />
        {props.children}
        <View style={{ height: 5 }} />
      </View>
    );
  }
};

export { Container };

Container.defaultProps = {
  scroll: true,
};
