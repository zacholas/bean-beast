import React, { Component } from 'react';
import EditCafeForm from '../../components/EditCafeForm';
import { Headline, Container } from "../../components/common";
import PropTypes from "prop-types";

class EditCafeScreen extends Component {
  constructor(props){
    super(props);
    this.type = props.navigation.getParam('type', 'create');
  }

  render() {
    return (
      <Container>
        {this._pageTitle()}
        <EditCafeForm type={this.type} navigation={this.props.navigation} />
      </Container>
    );
  }

  _pageTitle(){
    if(this.type === 'create'){
      return <Headline>Create New Cafe / Roaster</Headline>
    }
    // else if(this.type === 'edit'){
    //   return <Headline>Edit xyz cafe/roaster</Headline>
    // }
  }
}

export default EditCafeScreen;

EditCafeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
