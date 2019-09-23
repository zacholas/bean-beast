import React, { Component } from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {Headline, Hr, BodyText, Container, Button} from "../../components/common";
import Modal from "../../components/common/Modal";
import * as navRoutes from "../../constants/NavRoutes";
import { deleteRecipe, editRecipe } from "../../actions";
import {textLink} from "../../constants/Styles";
import styles from './styles';
import {colorGray400, colorGray800} from "../../constants/Colors";

class ViewRecipeScreen extends Component {
  static navigationOptions = {
    title: 'View Recipe',
  };

  constructor(props){
    super(props);
    this.recipeID = props.navigation.getParam('id');
    this.deleteConfirmModal = null;
  }

  render() {
    const recipe = this.props.recipe;
    console.log(recipe);
    return (
      <Container>
        <View style={styles.brewMethodContainer}>
          <View style={{ position: 'absolute', top: 0, left: 0 }}>
            <Text>Date (IDK if I want modified or created)</Text>
          </View>
          <Icon name="coffee" size={56} />
          <Headline style={{ marginBottom: 0 }}>{_.size(this.props.brew_method) && this.props.brew_method.name ? this.props.brew_method.name : null}</Headline>
          <BodyText>Probably should say something here about which bean it belongs to</BodyText>
        </View>

        <View style={styles.recipePrimaryInfoBar}>
          <View style={styles.recipePrimaryInfo}>
            <Text>Grind</Text>
            <Text>{this.props.recipe.grind}</Text>
          </View>
          <View style={styles.recipePrimaryInfo}>
            <Text>Dose</Text>
            <Text>{this.props.recipe.dose}</Text>
          </View>
          <View style={styles.recipePrimaryInfo}>
            <Text>Temp</Text>
            <Text>{this.props.recipe.temperature}</Text>
          </View>
        </View>

        <Hr />

        <View style={styles.recipeRatingContainer}>
          <View style={styles.recipeOverallRatingBar}>
            <View style={styles.recipeOverallRatingSliderContainer}>
              <BodyText noMargin>Rating Slider</BodyText>
            </View>
            <View style={styles.recipeAddToFavoritesContainer}>
              <TouchableOpacity>
                <Icon name="heart" size={40} style={{ color: '#e74c3c'}} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.recipeCriteriaRatingContainer}>
            <TouchableOpacity style={StyleSheet.flatten([styles.recipeCriteriaRating, styles.recipeCriteriaRatingEmpty])}>
              <Icon name="plus" size={15} style={{ color: colorGray800, marginBottom: 4 }} />
              <Headline h6 style={{ marginBottom: 0, textAlign: 'center', color: colorGray800, fontSize: 9 }}>Add Rating</Headline>
            </TouchableOpacity>
          </View>
        </View>
        <Hr />

        <View>
          <BodyText>Non-sortable recipe options</BodyText>
        </View>
        <Hr />

        <View>
          <BodyText>sortable recipe steps</BodyText>
        </View>
        <Hr />

        <View>
          <BodyText>+ circle to add new</BodyText>
        </View>

        <BodyText>Details:</BodyText>
        <BodyText>{JSON.stringify(recipe)}</BodyText>
        <Hr />
        <BodyText>Delete, edit, clone (maybe)</BodyText>
        <Button
          onPress={() => this._editRecipeButtonPress()}
          title="Edit Recipe"
          iconName="pencil"
          backgroundColor="gray"
        />

        <Button
          onPress={() => this.deleteConfirmModal.show()}
          title="Delete Recipe"
          iconName="trash"
        />
        <Modal ref={(ref) => { this.deleteConfirmModal = ref; }}>
          <Button
            onPress={() => {this._deleteRecipe()}}
            title='Yes, delete'
            iconName='trash'
          />
        </Modal>
      </Container>
    );
  }

  _editRecipeButtonPress(){
    this.props.editRecipe(this.props.recipe);
    this.props.navigation.navigate(navRoutes.EDIT_RECIPE, {
      type: 'edit',
      recipe: this.props.recipe
    })
  }

  _deleteRecipe(){
    this.deleteConfirmModal.hide();
    this.props.deleteRecipe(this.recipeID, this.props.navigation);
  }
}

const mapStateToProps = (state, props) => {
  const recipe = state.recipes.recipes[props.navigation.getParam('id')];
  const brew_method = _.size(state.brewMethods.brewMethods[recipe.brew_method]) ? state.brewMethods.brewMethods[recipe.brew_method] : null;
  return {
    recipe,
    brew_method
  };
};

export default connect(mapStateToProps, { deleteRecipe, editRecipe })(ViewRecipeScreen);

ViewRecipeScreen.propTypes = {
  recipe: PropTypes.object
};

ViewRecipeScreen.defaultProps = {
  recipe: {
    name: ''
  }
};
