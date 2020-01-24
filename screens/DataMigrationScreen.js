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
import {AsyncStorage} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { BodyText, Button, Container, Headline, Hr, Li, ScrollContainer } from "../components/common";
import Logo from '../assets/images/beanbeast_logo.svg';
import {centerEverything} from "../constants/Styles";
import { connect } from "react-redux";

class DataMigrationScreen extends React.Component {
  static navigationOptions = {
    title: 'Data Migration',
  };

  async myTest(){
    console.log('in it');

    const testObject = {
      hi: {
        iam: 'here'
      },
      ok: {
        dascool: 'yep'
      }
    };

    try {
      await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'test.js', JSON.stringify(testObject))
      // console.log('Paused download operation, saving for future retrieval');
      // AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
    } catch (e) {
      console.error(e);
    }
  }



  componentWillMount(): void {
    this.myTest()
      .then((response) => {
          console.log('hi', response);

          FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'test.js')
            .then((response) => {
              console.log('response after reading was', response);
            })
        }
      )
  }

  render() {

    // const downloadResumable = FileSystem.createDownloadResumable(
    //   'http://techslides.com/demos/sample-videos/small.mp4',
    //   FileSystem.documentDirectory + 'small.mp4',
    //   {},
    //   callback
    // );




    return (
      <ScrollContainer contentContainerStyle={{...centerEverything}}>
        <Headline>Migrating your data from beta to live</Headline>
        <BodyText>If you are a beta user and want to use the live version of the app without losing your data, you'll need to use this migration utility.</BodyText>

        <Headline h4>Steps to follow to migrate your data:</Headline>
        <BodyText>1. Open the OLD version of the app (aka the beta version or alpha or whatever)</BodyText>
        <BodyText>2. In the old version of the app, click the "Export my data" button on this page. Your data has now been saved.</BodyText>
        <BodyText>3. Download the live version of Bean Beast.</BodyText>
        <BodyText>4. Navigate to this exact same screen in the newly-downloaded version of Bean Beast.</BodyText>
        <BodyText>5. Click the "Import my data" button on this page.</BodyText>
        <BodyText>6. Pat yourself on the back for being a tech-savvy mofo, cuz you all done boiiiiiiii!</BodyText>
      </ScrollContainer>
    );
  }
}


const mapStateToProps = (state) => {
  return state;
  // return {
  //   formValues: state.form,
  // }
};

DataMigrationScreen = connect(mapStateToProps)(DataMigrationScreen);

export default DataMigrationScreen;
