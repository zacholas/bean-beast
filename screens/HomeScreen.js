import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Linking
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { SvgUri } from 'react-native-svg';

import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import Modal from '../components/common/Modal';
import {BodyText, Button, Container, Headline, Hr, ScrollContainer} from "../components/common";
import Logo from '../assets/images/beanbeast_logo.svg';
import {centerEverything, textLink} from "../constants/Styles";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

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

        <View style={{ centerEverything, marginTop: 20 }}>
          <BodyText style={centerEverything}>
            Thanks so much for participating in the BBBeta. If you have any feedback, bugs, etc. that you want to send me, you can email me at{` `}
            <Text onPress={() => { Linking.openURL(`mailto:zach@zachswinehart.com?subject=Bean%20Beast%20Feedback`)}} style={textLink}>zach@zachswinehart.com</Text>.</BodyText>
        </View>

        <Hr/>
        <Headline h4 centered>Your Favorite Recipes</Headline>

          <Headline h4 centered>Whatcha up to today?</Headline>
          <Button title="Buying new Beans" onPress={() => {}}/>
      </ScrollContainer>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    paddingTop: 30,
  },
});

export default HomeScreen;

// const mapStateToProps = state => ({
//   state
// });
//
// const mapDispatchToProps = dispatch => ({});
//
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
