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
  Linking, FlatList, StatusBar
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {BodyText, Button, Container, Headline, Hr, ScrollContainer} from "../components/common";
import Logo from '../assets/images/beanbeast_logo.svg';
import {centerEverything, textLink} from "../constants/Styles";
import * as navRoutes from "../constants/NavRoutes";
import RecipeListItem from "../components/recipes/RecipeListItem";
import { colorHeartRed } from "../constants/Colors";
import { ActionSheetOptions, connectActionSheet } from '@expo/react-native-action-sheet';
import { showMessage } from "react-native-flash-message";


class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  render() {
    return (
      <ScrollContainer contentContainerStyle={{...centerEverything}}>
        <View style={{ flexDirection: 'row', ...styles.logoContainer, ...centerEverything, marginTop: 20 }}>
          <Logo width={80} height={80} style={{ marginLeft: 10, }} />
          <View style={{ flex: 1, paddingLeft: 20 }}>
            <Headline noMargin wrapperStyle={{ justifyContent: 'center', width: '100%'}} style={{  }} h3>Welcome to Bean Beast!</Headline>
          </View>
        </View>

        <View style={{ centerEverything, marginTop: 20 }}>
          <BodyText>
            As of late January 2020, the app officially launched and you're one of the early trailblazers. Congrats! If you want to see the development roadmap, you can view that here:
            <Text onPress={() => { Linking.openURL('http://beanbeast.com/roadmap'); }}>http://beanbeast.com/roadmap</Text>
          </BodyText>
          <BodyText style={centerEverything}>
            If you have any feedback, bugs, etc. that you want to send me, you can email me at{` `}
            <Text onPress={() => { this._emailButtonPress() }} style={textLink}>zach@zachswinehart.com</Text>.</BodyText>
        </View>

        <View>
          <Button title="How to use this app" onPress={() => { this.props.navigation.navigate(navRoutes.HELP) }} backgroundColor="gray" />
        </View>

        {/*<View>*/}
          {/*<Button title='Click this button to break the app and throw an error' onPress={() => this.djsjj.kffkfk()}/>*/}
        {/*</View>*/}

        <Hr/>
        {this._favoriteRecipes()}
        {this._recentRecipes()}

        {/*<Headline h4 centered>Whatcha up to today?</Headline>*/}
        {/*<Button title="Buying new Beans" onPress={() => {}} />*/}
      </ScrollContainer>
    );
  }

  _emailButtonPress(){
    const url = `mailto:zach@zachswinehart.com?subject=Bean%20Beast%20Feedback`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
          showMessage({
            message: "Uh oh!",
            description: "Looks like you don't have a default email app that can open mail links. Guess you'll have to manually type in the email address. :'(",
            type: "warning",
            autoHide: false,
            icon: 'auto'
          });
        } else {
          return Linking.openURL(url);
        }
      })
      // .catch((err) => console.error('An error occurred', err));
  }

  _recentRecipes(){
    if(_.size(this.props.recipes) && _.size(this.props.recipes.recipes)) {
      let recipes = this.props.recipes.recipes;
      let i = 0;
      recipes = _.orderBy(recipes, ['modified'], ['desc']);
      recipes = _.filter(recipes, (recipe) => {
        i++;
        return i <= 3;
      });
      recipes = _.values(recipes);
      if(_.size(recipes)) {
        return (
          <View>
            <Headline h4 centered noMargin>Recent Recipes</Headline>
            <FlatList
              data={recipes}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              style={styles.recipesContainer}
            />
          </View>
        )
      }
    }
  }

  _favoriteRecipes(){
    if(_.size(this.props.recipes) && _.size(this.props.recipes.recipes)) {
      let recipes = this.props.recipes.recipes;
      let i = 1;
      recipes = _.orderBy(recipes, ['modified'], ['desc']);
      recipes = _.filter(recipes, (recipe) => {
        if (i > 3) {
          return false;
        }
        i++;
        return _.size(recipe.favorite_information) && recipe.favorite_information.is_favorite === true;
      });
      recipes = _.values(recipes);
      if(_.size(recipes)) {
        return (
          <View>
            <Headline h4 centered noMargin>Recent <Icon name="heart" size={20} style={{ color: colorHeartRed }} /> <Text style={{ color: colorHeartRed }}>Favorite</Text> Recipes</Headline>
            <FlatList
              data={recipes}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              style={{ ...styles.recipesContainer, marginBottom: 20 }}
            />
            {/*<Hr/>*/}
          </View>
        )
      }
    }
  }

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _onPressItem = (id) => {
    this.props.navigation.navigate(navRoutes.VIEW_RECIPE, {
      id
    })
  };

  _renderItem = ({item}) => {
    return (
      <RecipeListItem
        id={item.id}
        onPressItem={this._onPressItem}
        data={item}
        beanPage={this.props.beanPage}
      />
    );
  };
}

const styles = StyleSheet.create({
  logoContainer: {
    paddingTop: 30,
  },
  recipesContainer: {
    paddingTop: Platform.OS === 'ios' ? -12 : 0,
  }
});

// export default HomeScreen;

const mapStateToProps = state => ({
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({});

HomeScreen = connectActionSheet(HomeScreen);
HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default HomeScreen;
