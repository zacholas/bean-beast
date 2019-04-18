import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  errorBox: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#870000',
    backgroundColor: '#f00',
  },
});

const Error = (props) => {
  return (
    <View style={styles.errorBox}>
      {props.children}
    </View>
  );
};

export { Error };
