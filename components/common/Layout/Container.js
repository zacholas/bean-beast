import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  container
} from '../Styles';

const Container = (props) => {
  if(props.scroll === true){
    return (
      <ScrollView style={StyleSheet.flatten([container, props.style])}>
        {props.children}
      </ScrollView>
    );
  }
  else {
    return (
      <View style={StyleSheet.flatten([container, props.style])}>
        {props.children}
      </View>
    );
  }
};

export { Container };

Container.defaultProps = {
  scroll: false,
};
