import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, ScrollContainer } from "../../components/common";
import RecipeList from '../../components/recipes/RecipeList';
import * as navRoutes from "../../constants/NavRoutes";
import { createRecipe } from "../../actions";

class RecipeListScreen extends Component {
  static navigationOptions = {
    title: 'Recipes',
  };

  render() {
    return (
      <ScrollContainer>
        <View>
          <ScrollView>
            <RecipeList navigation={this.props.navigation} />
          </ScrollView>
        </View>
        <View style={{marginTop: 15}}>
          <Button onPress={() => { this._addNewRecipe() }} title="Add a new Recipe" />
        </View>
      </ScrollContainer>
    );
  }

  _addNewRecipe(){
    this.props.createRecipe();
    this.props.navigation.navigate(navRoutes.EDIT_RECIPE, {
      type: 'create'
    })
  }
}

// const mapStateToProps = state => ({
//   recipes: state.recipes
// });

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { createRecipe })(RecipeListScreen);
