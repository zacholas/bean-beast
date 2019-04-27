import React, { Component } from 'react';
import PropTypes from "prop-types";
import { TouchableOpacity, View } from 'react-native';
import { Container, BodyText } from "../components/common";
import MoreMenuLink from '../components/MoreMenuLink';

export default class MenuMoreScreen extends Component {
  static navigationOptions = {
    title: 'Additional Options',
    // headerLeft: (<View><BodyText>hi</BodyText></View>)
  };

  render() {
    return (
      <Container>
        <MoreMenuLink
          title="Settings"
          onPress={}
        />
      </Container>
    );
  }
}

MenuMoreScreen.propTypes = {};
