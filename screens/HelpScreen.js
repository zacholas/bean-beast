import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';

import { BodyText, Button, Container, Headline, Hr, Li, ScrollContainer } from "../components/common";
import Logo from '../assets/images/beanbeast_logo.svg';
import {centerEverything} from "../constants/Styles";

class HelpScreen extends React.Component {
  static navigationOptions = {
    title: 'Help',
  };

  render() {
    // console.log('home state', this.props);
    return (
      <ScrollContainer contentContainerStyle={{...centerEverything}}>
        <View style={{ flexDirection: 'row', ...centerEverything, marginBottom: 20 }}>
          <Logo width={80} height={80} style={{ marginLeft: 10, }} />
          <View style={{ flex: 1, paddingLeft: 20 }}>
            <Headline noMargin wrapperStyle={{ justifyContent: 'center', width: '100%'}} h3>How to Use Bean Beast</Headline>
          </View>
        </View>

        <Hr/>

        <Headline h4 noMargin>Too Long; Didn't Read</Headline>
        <BodyText>1. Add your equipment in the "More" tab.</BodyText>
        <BodyText>2. Add a new bean.</BodyText>
        <BodyText>3. Add a new recipe to it.</BodyText>
        <BodyText>4. Tweak the recipe & repeat.</BodyText>

        <Hr />

        <Headline h4 noMargin>How it Works</Headline>
        <BodyText>I've tried to design the app to be flexible and accommodate both newbies and super-coffee-nerds alike.</BodyText>
        <BodyText>When you create a new recipe, you can either keep it super simple, with grind, dose, etc., or click the expandable menus to go in depth with more detail.</BodyText>

        <Headline h4 noMargin>Pro Tips</Headline>
        <BodyText>If you're wanting to use the app most effectively, keep these tips in mind...</BodyText>
        <Li>You can mark a recipe as a favorite once you find one that's working really well for you.</Li>
        <Li>When dialing in your recipe, it can be a big time saver to duplicate existing recipes rather than starting totally from scratch.</Li>

        <BodyText></BodyText>
      </ScrollContainer>
    );
  }
}

export default HelpScreen;
