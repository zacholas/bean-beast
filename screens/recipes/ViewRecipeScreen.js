import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {Headline, Hr, BodyText, Container, Button} from "../../components/common";
import Modal from "../../components/common/Modal";
import * as navRoutes from "../../constants/NavRoutes";
import { deleteRecipe, editRecipe } from "../../actions";


// import styles from './styles';

class ViewRecipeScreen extends Component {
  // static navigationOptions = {
  //   title: 'Links',
  // };

  componentWillMount(): void {
    // const recipeID = this.props.navigation.getParam('id');
    //* TODO not working.
    // this.props.navigation.setParams({
    //   navigationOptions: {
    //     title: 'hi'
    //   }
    // })

  }

  constructor(props){
    super(props);

    this.recipeID = props.navigation.getParam('id');
    this.deleteConfirmModal = null;
  }

  render() {
    const recipe = this.props.recipe;
    return (

      <Container>
        {this._recipeName()}
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

  _recipeName(){
    if(this.props.recipe.name !== undefined){
      return <Headline>{this.props.recipe.name}</Headline>;
    }
  }
}

const mapStateToProps = (state, props) => ({
  recipe: state.recipes.recipes[props.navigation.getParam('id')]
});

export default connect(mapStateToProps, { deleteRecipe, editRecipe })(ViewRecipeScreen);

ViewRecipeScreen.propTypes = {
  recipe: PropTypes.object
};

ViewRecipeScreen.defaultProps = {
  recipe: {
    name: ''
  }
};
