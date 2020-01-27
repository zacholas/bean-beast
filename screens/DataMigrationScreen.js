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
import { showMessage } from "react-native-flash-message";
import { importReduxStateData } from "../actions";

class DataMigrationScreen extends React.Component {
  static navigationOptions = {
    title: 'Data Migration',
  };

  async exportState(){
    try {
      await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'BeanBeastDataExport.js', JSON.stringify(this.props.state))
      // console.log('Paused download operation, saving for future retrieval');
      // AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
    } catch (e) {
      console.error(e);
    }
  }

  exportButtonOnPress(){
    this.exportState()
      .then((response) => {
          showMessage({
            message: "Success!",
            description: "Data export saved. You can now go install the live version of the app and import the data there.",
            type: "success",
            autoHide: false,
            icon: 'auto'
          });
        }
      )
  }

  importButtonOnPress(){
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'BeanBeastDataExport.js')
      .then((response) => {
        // console.log('response after reading was', JSON.parse(response));
        this.props.importReduxStateData(JSON.parse(response));
        showMessage({
          message: "Success!",
          description: "Data imported successfully.",
          type: "success",
          autoHide: true,
          icon: 'auto'
        });
      })
      .catch((error, type) => {
        showMessage({
          message: "Error",
          description: "There was an error importing your data. Are you sure that you already exported it from the beta app?",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      })
  }

  render() {
    return (
      <ScrollContainer contentContainerStyle={{...centerEverything}}>
        <Headline noMargin>Migrating your data from beta to live</Headline>
        <BodyText>If you are a beta user and want to use the live version of the app without losing your data, you'll need to use this migration utility.</BodyText>
        <Button title="Export Data" onPress={() => { this.exportButtonOnPress() }} backgroundColor='gray' />
        <Button title="Import Data" onPress={() => { this.importButtonOnPress() }} backgroundColor='gray' />
        <Headline h4>Steps to follow to migrate your data:</Headline>
        <BodyText>1. Open the OLD version of the app (aka the beta version or alpha or whatever)</BodyText>
        <BodyText>2. In the old version of the app, click the "Export my data" button on this page. Your data has now been saved.</BodyText>
        <BodyText>3. Download the live version of Bean Beast.</BodyText>
        <BodyText>4. Navigate to this exact same screen in the newly-downloaded version of Bean Beast.</BodyText>
        <BodyText>5. Click the "Import my data" button.</BodyText>
        <BodyText>6. Pat yourself on the back for being a tech-savvy mofo, cuz you all done boiiiiiiii!</BodyText>
      </ScrollContainer>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    state
  }
};

DataMigrationScreen = connect(mapStateToProps, { importReduxStateData })(DataMigrationScreen);

export default DataMigrationScreen;
