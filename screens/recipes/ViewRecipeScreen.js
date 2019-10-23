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
import { headerNavTextLink, textLink } from "../../constants/Styles";
import styles from './styles';
import {colorGray400, colorGray800} from "../../constants/Colors";
import { isDefined } from "../../helpers";
import { LabeledSliderField } from "../../components/common/reduxForm";

class ViewRecipeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let headerRightOutput = <View />;
    const { params } = navigation.state;
    if(params.recipe && params.onPress){
      headerRightOutput = (
        <TouchableOpacity onPress={params.onPress}>
          <Text style={headerNavTextLink}><Icon name="pencil" size={16} style={textLink} /> Edit</Text>
        </TouchableOpacity>
      );
    }
    return {
      title: 'View Recipe',
      headerRight: headerRightOutput
    }
  };

  constructor(props){
    super(props);
    this.recipeID = props.navigation.getParam('id');
    this.deleteConfirmModal = null;
  }

  componentDidMount(): void {
    const recipe = this.props.recipe;
    if(recipe){
      this.props.navigation.setParams({
        onPress: () => this._editRecipeButtonPress(recipe),
        recipe
      })
    }
  }

  render() {
    const recipe = this.props.recipe;
    // console.log(recipe);
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
            <Text>{recipe.grind}</Text>
          </View>
          <View style={styles.recipePrimaryInfo}>
            <Text>Dose</Text>
            <Text>{recipe.dose}</Text>
          </View>
          <View style={styles.recipePrimaryInfo}>
            <Text>Temp</Text>
            <Text>{recipe.temperature}</Text>
          </View>
        </View>

        <Hr />

        <View style={styles.recipeRatingContainer}>
          <View style={styles.recipeOverallRatingBar}>
            <View style={styles.recipeOverallRatingSliderContainer}>
              <LabeledSliderField
                name="overall_rating"
                value={recipe.overall_rating}
                step={1}
                disabled
                minimumValue={0}
                maximumValue={10}
                tallNotches={[0, 5, 10]}
                topLabels={[
                  {
                    content: <Icon name="frown-o" size={30} />,
                    containerStyle: { marginLeft: 2 }
                  },
                  {
                    content: <Icon name="meh-o" size={30} />
                  },
                  {
                    content: <Icon name="smile-o" size={30} />,
                    containerStyle: { marginRight: 2 }
                  }
                ]}
                bottomLabels={[
                  { content: 'Hated it' },
                  { content: 'Meh' },
                  { content: 'Loved it' }
                ]}
              />
            </View>
            <View style={styles.recipeAddToFavoritesContainer}>
              {this._favoriteOutput()}
              {/*<FavoriteField name="favorite_information" />*/}
            </View>
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

  _favoriteOutput(){
    const recipe = this.props.recipe;
    if(recipe && recipe.favorite_information){
      if(recipe.favorite_information.is_favorite === true){
        return (
          <TouchableOpacity onPress={() => { }} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="heart" size={40} style={{ color: '#e74c3c' }} />
            <Headline h6 style={{ width: 80, textAlign: 'center' }}>Favorited</Headline>
          </TouchableOpacity>
        )
      }

      return (
        <TouchableOpacity onPress={() => { }} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="heart" size={40} style={{ color: colorGray400 }} />
          <Headline h6 style={{ width: 80, textAlign: 'center' }}>Save as Favorite?</Headline>
        </TouchableOpacity>
      );
    }
  }

  _editRecipeButtonPress(recipe = this.props.recipe){
    this.props.editRecipe(recipe);
    this.props.navigation.navigate(navRoutes.EDIT_RECIPE, {
      type: 'edit',
      recipe: recipe
    })
  }

  _deleteRecipe(){
    this.deleteConfirmModal.hide();
    this.props.deleteRecipe(this.recipeID, this.props.navigation);
  }
}

const mapStateToProps = (state, props) => {
  const recipe = state.recipes.recipes[props.navigation.getParam('id')];
  const brew_method = isDefined(recipe) && recipe && isDefined(recipe.brew_method) && _.size(state.brewMethods.brewMethods[recipe.brew_method]) ? state.brewMethods.brewMethods[recipe.brew_method] : null;
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
