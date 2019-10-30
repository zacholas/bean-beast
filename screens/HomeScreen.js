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
  Linking, FlatList
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {BodyText, Button, Container, Headline, Hr, ScrollContainer} from "../components/common";
import Logo from '../assets/images/beanbeast_logo.svg';
import {centerEverything, textLink} from "../constants/Styles";
import * as navRoutes from "../constants/NavRoutes";
import RecipeListItem from "../components/recipes/RecipeListItem";
import { colorHeartRed } from "../constants/Colors";
import { ActionSheetOptions, connectActionSheet } from '@expo/react-native-action-sheet';


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
          <BodyText style={centerEverything}>
            Thanks so much for participating in the BBBeta. If you have any feedback, bugs, etc. that you want to send me, you can email me at{` `}
            <Text onPress={() => { Linking.openURL(`mailto:zach@zachswinehart.com?subject=Bean%20Beast%20Feedback`)}} style={textLink}>zach@zachswinehart.com</Text>.</BodyText>
        </View>

        <Hr/>
        {this._favoriteRecipes()}
        {this._recentRecipes()}

        {/*<Headline h4 centered>Whatcha up to today?</Headline>*/}
        {/*<Button title="Buying new Beans" onPress={() => {}} />*/}
      </ScrollContainer>
    );
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
              style={{marginTop: -12}}
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
              style={{marginTop: -12, marginBottom: 20 }}
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
});

// export default HomeScreen;

const mapStateToProps = state => ({
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({});

HomeScreen = connectActionSheet(HomeScreen);
HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default HomeScreen;
