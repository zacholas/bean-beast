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
        <View style={{ flexDirection: 'row', ...styles.logoContainer, ...centerEverything, marginTop: 20 }}>
          <Logo width={80} height={80} style={{ marginLeft: 10, }} />
          <View style={{ flex: 1, paddingLeft: 20 }}>
            <Headline noMargin wrapperStyle={{ justifyContent: 'center', width: '100%'}} style={{  }} h3>Welcome to Bean Beast!</Headline>
          </View>
        </View>

        <View style={{ centerEverything, marginTop: 20 }}>
          <BodyText style={centerEverything}>
            Thanks so much for participating in the BBBeta. If you have any feedback, bugs, etc. that you want to send me, you can email me at{` `}
            <Text onPress={() => { Linking.openURL(`mailto:zach@zachswinehart.com?subject=Bean%20Beast%20Feedback`)}} style={textLink}>zach@zachswinehart.com</Text>.</BodyText>
        </View>

        <Hr/>
        {this._favoriteRecipes()}

        <Headline h4 centered>Whatcha up to today?</Headline>
        <Button title="Buying new Beans" onPress={() => {}}/>
      </ScrollContainer>
    );
  }

  _favoriteRecipes(){
    return (
      <Headline h4 centered>Your Favorite Recipes</Headline>
    )
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    paddingTop: 30,
  },
});

// export default HomeScreen;

const mapStateToProps = state => ({
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
