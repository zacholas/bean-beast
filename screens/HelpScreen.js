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

import {BodyText, Button, Container, Headline, ScrollContainer} from "../components/common";
import Logo from '../assets/images/beanbeast_logo.svg';
import {centerEverything} from "../constants/Styles";

class HelpScreen extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };

  render() {
    // console.log('home state', this.props);
    return (
      <ScrollContainer contentContainerStyle={{...centerEverything}}>
        <View style={{ flexDirection: 'row', ...styles.logoContainer, ...centerEverything }}>
          <Logo width={70} height={70} style={{ marginLeft: 10, flex: 1, }} />
          <View style={{ flex: 1, paddingLeft: 20 }}>
            <Headline noMargin wrapperStyle={centerEverything} h3>Welcome to Bean Beast!</Headline>
          </View>
        </View>

        <View style={{...centerEverything, ...styles.logoContainer}}>
          <Logo width={100} height={100} />
        </View>
        <Headline h1>Welcome to Bean Beast!</Headline>
        <BodyText>Thanks so much for participating in the BBBeta. If you have any feedback, bugs, etc. that you want to send me, you can email me at zach@zachswinehart.com.</BodyText>

        <Headline h2>Welcome to Bean Beast!</Headline>
        <BodyText>Thanks so much for participating in the BBBeta. If you have any feedback, bugs, etc. that you want to send me, you can email me at zach@zachswinehart.com.</BodyText>
        <Headline h3>Welcome to Bean Beast!</Headline>
        <BodyText>Thanks so much for participating in the BBBeta. If you have any feedback, bugs, etc. that you want to send me, you can email me at zach@zachswinehart.com.</BodyText>
        <Headline h4>Welcome to Bean Beast!</Headline>
        <BodyText>Thanks so much for participating in the BBBeta. If you have any feedback, bugs, etc. that you want to send me, you can email me at zach@zachswinehart.com.</BodyText>
        <Headline h5>Welcome to Bean Beast!</Headline>
        <BodyText>Thanks so much for participating in the BBBeta. If you have any feedback, bugs, etc. that you want to send me, you can email me at zach@zachswinehart.com.</BodyText>
        <Headline h6>Welcome to Bean Beast!</Headline>
        <BodyText>Thanks so much for participating in the BBBeta. If you have any feedback, bugs, etc. that you want to send me, you can email me at zach@zachswinehart.com.</BodyText>
      </ScrollContainer>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    paddingTop: 30,
  },
});

export default HelpScreen;
