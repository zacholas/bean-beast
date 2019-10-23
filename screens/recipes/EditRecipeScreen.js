import React, { Component } from 'react';
import EditRecipeForm from '../../components/recipes/EditRecipeForm';
import { Headline, Container } from "../../components/common";
import PropTypes from "prop-types";

class EditRecipeScreen extends Component {
  constructor(props){
    super(props);
    this.type = props.navigation.getParam('type', 'create');
    this.recipe = props.navigation.getParam('recipe', null);
    if(this.type === 'create'){
      this.bean_id = props.navigation.getParam('bean_id', null);
    }
    else {
      console.log('setting bean id to', this.recipe.bean_id);
      this.bean_id = this.recipe.bean_id ? this.recipe.bean_id : null;
    }
  }

  render() {
    // console.log('edit recipe props', this.props);
    return (
      <EditRecipeForm
        type={this.type}
        navigation={this.props.navigation}
        bean_id={this.bean_id}
      />
    );
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
