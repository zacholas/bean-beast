import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Button, ScrollContainer } from "../../components/common";
import RecipeList from '../../components/recipes/RecipeList';
import * as navRoutes from "../../constants/NavRoutes";
import { createRecipe } from "../../actions";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import ViewRecipeScreen from "./ViewRecipeScreen";
import { headerNavTextLink, textLink } from "../../constants/Styles";

class RecipeListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let headerRightOutput = <View />;
    // console.log('this props', this.props);
    const { params } = navigation.state;
    if(_.size(params) && params.onPress){
      headerRightOutput = (
        <TouchableOpacity onPress={params.onPress}>
          <Text style={headerNavTextLink}><Icon name="plus" size={16} style={textLink} /> Add New</Text>
        </TouchableOpacity>
      );
    }
    return {
      title: 'Recipes',
      headerRight: headerRightOutput
    }
  };

  componentWillMount(): void {
    this.props.navigation.setParams({
      // onPress: () => this._showActionSheet(),
      onPress: () => this._addNewRecipe(),
    })
  }

  render() {
    return (
      <ScrollContainer>
        <View>
          <ScrollView>
            <RecipeList navigation={this.props.navigation} />
          </ScrollView>
        </View>
        {/*<View style={{marginTop: 15}}>*/}
          {/*<Button onPress={() => { this._addNewRecipe() }} title="Add a new Recipe" />*/}
        {/*</View>*/}
      </ScrollContainer>
    );
  }

  _addNewRecipe(){
    this.props.createRecipe();
    this.props.navigation.navigate(navRoutes.EDIT_RECIPE, {
      type: 'create'
    })
  }

  //* NOTE Not currently in use. But it's all set up and working
  _showActionSheet = () => {
    const {
      withTitle,
      withMessage,
      withIcons,
      withSeparators,
      withCustomStyles,
      onSelection,
      showActionSheetWithOptions,
      recipe
    } = this.props;

    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    // const options = [
    //   'Delete',
    //   'Edit',
    //   'Clone',
    //   'Share',
    //   'Cancel'
    // ];
    // const cancelButtonIndex = 4;

    const options = [
      'Add New',
      'Cancel'
    ];
    const cancelButtonIndex = 1;



    const icons = withIcons
      ? [icon('delete'), icon('save'), icon('share'), icon('cancel')]
      : undefined;
    const title = withTitle ? 'Choose An Action' : undefined;
    const message = withMessage
      ? 'This library tries to mimic the native share sheets as close as possible.'
      : undefined;
    const destructiveButtonIndex = null;

    const textStyle: TextStyle | undefined = withCustomStyles
      ? {
        fontSize: 20,
        fontWeight: '500',
        color: 'blue',
      }
      : undefined;
    const titleTextStyle: TextStyle | undefined = withCustomStyles
      ? {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700',
        color: 'orange',
      }
      : undefined;
    const messageTextStyle: TextStyle | undefined = withCustomStyles
      ? {
        fontSize: 12,
        color: 'purple',
        textAlign: 'right',
      }
      : undefined;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title,
        message,
        icons,
        // Android only
        tintIcons: true,
        // Android only; default is true
        showSeparators: withSeparators,
        // Affects Android only; default is false
        textStyle,
        // Android only
        titleTextStyle,
        // Android only
        messageTextStyle, // Android only
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this._addNewRecipe();
            break;
          // case 1:
          //   // console.log('edit it');
          //   this._editRecipeButtonPress();
          //   break;
          // case 2:
          //   this._cloneRecipe(recipe);
          //   break;
          case 1: // cancel
          default:
            break;
        }
        // Do something here depending on the button index selected
        // console.log('buttonIndex: ', buttonIndex)
        // onSelection(buttonIndex);
      }
    );
  };
}

// const mapStateToProps = state => ({
//   recipes: state.recipes
// });

const mapStateToProps = state => ({});

RecipeListScreen = connectActionSheet(RecipeListScreen);
RecipeListScreen = connect(mapStateToProps, { createRecipe })(RecipeListScreen);
export default RecipeListScreen;
