import React from 'react';
import { View } from "react-native";
import { BodyText, Container } from "../components/common";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <Container>
        <BodyText>
          Yo.
        </BodyText>
      </Container>
    );
  }
}
