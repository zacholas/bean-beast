import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Spinner } from './Spinner';
import {
  bodyText,
} from './Styles';

const styles = StyleSheet.create({
  overallContainer: {
    flexDirection: 'row',
  },
  buttonContainerStyle: {
    backgroundColor: '#f95c32',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 16,
    paddingHorizontal: 30,
  },
  textOuterContainer: {
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {
  },
  icon: {
    marginRight: 10,
  },
  textStyle: {
    ...bodyText,
    justifyContent: 'center',
    color: '#fff'
  },
  buttonBackgroundStyle: {
    position: 'relative',
  },
  borderBottom: {
    height: 4,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.15)',
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
});

const buttonBackgroundColor = (props) => {
  let backgroundColor;
  if (props.backgroundColor) {
    switch (props.backgroundColor) {
      case 'black':
        backgroundColor = '#273247';
        break;
      case 'gray':
        backgroundColor = '#989898';
        break;
      case 'blue':
        backgroundColor = '#3255d1';
        break;
      case 'blue_alt':
        backgroundColor = '#7397c9';
        break;
      case 'purple':
        backgroundColor = '#ab31d3';
        break;
      case 'turquoise':
        backgroundColor = '#2cbfb4';
        break;
      case 'yellow':
        backgroundColor = '#98c919';
        break;
      case 'green':
        backgroundColor = '#98c919';
        break;
      default:
        backgroundColor = '#e93639';
        break;
    }
  } else {
    backgroundColor = '#e93639';
  }
  return ({
    backgroundColor,
  });
};

const buttonIcon = (props) => {
  const { iconName, spinner } = props;
  if (spinner) {
    return (
      <View style={styles.iconContainer}>
        <Spinner
          size="small"
          color="#fff"
        />
      </View>
    );
  } else if (iconName) {
    return (
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={22} color="#fff" style={styles.icon} />
      </View>
    );
  }
  return undefined;
};

const Button = (props) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.buttonContainerStyle, buttonBackgroundColor(props)])}
      onPress={props.onPress}
    >
      <View style={styles.textOuterContainer}>
        {buttonIcon(props)}
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>
            {props.title ? props.title.toUpperCase() : undefined}
          </Text>
        </View>
      </View>
      <View style={styles.borderBottom} />
    </TouchableOpacity>
  );
};

// export default Button;
export { Button };
