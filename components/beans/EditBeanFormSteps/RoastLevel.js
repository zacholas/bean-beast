import React, { Component } from 'react';
import PropTypes from "prop-types";
import { LabeledSliderField } from "../../common/reduxForm";
// import { View } from 'react-native';
// import { Container, BodyText } from "/components/common";

export default class RoastLevel extends Component {
  render() {
    return (
      <LabeledSliderField
        name="roast_level"
        label="Roast Level"
        step={1}
        minimumValue={1}
        maximumValue={5}
        tallNotches={[1, 3, 5]}
        bottomLabels={[
          { content: 'Light' },
          { content: 'Medium' },
          { content: 'Dark' },
        ]}
      />
    );
  }
}

RoastLevel.propTypes = {};
