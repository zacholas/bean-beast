import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  headline,
  marginBottom,
  h1, h2, h3, h4, h5, h6
} from '../Styles';
import PropTypes from "prop-types";
import {centerEverything} from "../../../constants/Styles";

const Headline = (props) => {
  let specialHeadingStyle = headline;
  let output = props.children;
  if(props.h1 === true){ specialHeadingStyle = h1 }
  else if(props.h2 === true){ specialHeadingStyle = h2 }
  else if(props.h3 === true){ specialHeadingStyle = h3 }
  else if(props.h4 === true){ specialHeadingStyle = h4 }
  else if(props.h5 === true){
    specialHeadingStyle = h5;
    if(typeof props.children === 'string'){
      output = props.children.toUpperCase();
    }
  }
  else if(props.h6 === true){
    specialHeadingStyle = h6;
    if(typeof props.children === 'string'){
      output = props.children.toUpperCase();
    }
  }

  const wrapperStyle = props.inline === true ? { ...props.wrapperStyle, flex: 1 } : props.wrapperStyle ;
  const centeredStyle = props.centered === true ? centerEverything : null;

  return (
    <View style={{ ...wrapperStyle, ...centeredStyle }}>
      <Text style={StyleSheet.flatten([specialHeadingStyle, !props.noMargin && marginBottom, centeredStyle, props.style])}>
        {output}
      </Text>
    </View>
  );
};

export { Headline };

Headline.propTypes = {
  style: PropTypes.object,
  wrapperStyle: PropTypes.object,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  noMargin: PropTypes.bool,
  inline: PropTypes.bool, // allow it to wrap
  centered: PropTypes.bool
};

Headline.defaultProps = {
  style: {},
  wrapperStyle: {},
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  inline: true,
  centered: false,
};
