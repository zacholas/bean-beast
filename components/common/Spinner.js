// Import libraries for making a component
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

// Styles
const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

// Make a component
const Spinner = ({ size, color }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} color={color || 'gray'} />
    </View>
  );
};

// Make the component available to other parts of the app
export { Spinner };
