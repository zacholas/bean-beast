import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  whiteText,
  bodyText,
} from './Styles';

// const styles = StyleSheet.create({
//   errorText: {
//     width: '100%',
//   },
// });

const ErrorText = (props) => {
  return (
    <View>
      <Text style={StyleSheet.flatten([bodyText, whiteText])}>
        {props.children}
      </Text>
    </View>
  );
}

export { ErrorText };
