import React, { Component } from 'react';
import EditCafeForm from '../../components/cafes/EditCafeForm';
import { Headline, Container } from "../../components/common";
import PropTypes from "prop-types";

class EditCafeScreen extends Component {
  constructor(props){
    super(props);
    this.type = props.navigation.getParam('type', 'create');
    this.cafe = props.navigation.getParam('cafe', null);
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
    else if(this.type === 'edit'){
      if(this.cafe && this.cafe.name){
        return <Headline>Edit {this.cafe.name}</Headline>
      }
      return <Headline>Edit Cafe</Headline>
    }
  }
}

export default EditCafeScreen;

EditCafeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
