import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Container } from "../../components/common";

// import styles from './styles';

class EditCafeScreen extends Component {
  constructor(props){
    super(props);
    this.type = props.navigation.getParam('type', 'create');
  }

  pageTitle(){
    if(this.type === 'create'){
      return <Headline>Create New Cafe / Roaster</Headline>
    }
    // else if(this.type === 'edit'){
    //   return <Headline>Edit xyz cafe/roaster</Headline>
    // }
  }

  render() {
    return (
      <Container>
        {this.pageTitle()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditCafeScreen);
