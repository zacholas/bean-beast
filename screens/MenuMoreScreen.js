import React, { Component } from 'react';
import PropTypes from "prop-types";
import { TouchableOpacity, View } from 'react-native';
import { Container, BodyText } from "../components/common";
import MoreMenuLink from '../components/MoreMenuLink';
import * as navRoutes from '../constants/NavRoutes';

export default class MenuMoreScreen extends Component {
  static navigationOptions = {
    title: 'Additional Options',
    // headerLeft: (<View><BodyText>hi</BodyText></View>)
  };

  render() {
    return (
      <Container>
        {/*<MoreMenuLink*/}
          {/*title="Settings"*/}
          {/*onPress={() => this.props.navigation.navigate(navRoutes.SETTINGS)}*/}
        {/*/>*/}
        <MoreMenuLink
          title="Equipment"
          onPress={() => this.props.navigation.navigate(navRoutes.EQUIPMENT)}
        />
        <MoreMenuLink
          title="App Preferences"
          onPress={() => this.props.navigation.navigate(navRoutes.PREFERENCES)}
        />
        <MoreMenuLink
          title="Help / How to Use Bean Beast"
          onPress={() => this.props.navigation.navigate(navRoutes.HELP)}
        />
        <MoreMenuLink
          title="Data Migration"
          onPress={() => this.props.navigation.navigate(navRoutes.DATA_MIGRATION)}
        />
      </Container>
    );
  }
}

MenuMoreScreen.propTypes = {};
