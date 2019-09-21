import React, { Component } from 'react';
import EditRecipeForm from '../../components/recipes/EditRecipeForm';
import { Headline, Container } from "../../components/common";
import PropTypes from "prop-types";

class EditRecipeScreen extends Component {
  constructor(props){
    super(props);
    this.type = props.navigation.getParam('type', 'create');
    this.recipe = props.navigation.getParam('recipe', null);
  }

  render() {
    return <EditRecipeForm type={this.type} navigation={this.props.navigation} />;
    // return (
    //   <Container>
    //     {this._pageTitle()}
    //     <EditRecipeForm type={this.type} navigation={this.props.navigation} />
    //   </Container>
    // );
  }

  _pageTitle(){
    if(this.type === 'create'){
      return <Headline>Create New Recipe</Headline>
    }
    else if(this.type === 'edit'){
      if(this.recipe && this.recipe.name){
        return <Headline>Edit {this.recipe.name}</Headline>
      }
      return <Headline>Edit Recipe</Headline>
    }
  }
}

export default EditRecipeScreen;

EditRecipeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
