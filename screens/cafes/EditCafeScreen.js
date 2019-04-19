import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import EditCafeForm from '../../components/EditCafeForm';
import { Headline, Container } from "../../components/common";

// import styles from './styles';

class EditCafeScreen extends Component {
  constructor(props){
    super(props);
    this.type = props.navigation.getParam('type', 'create');
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    //* If there's a redirect set, redirect them.
    const { navigation, redirect } = this.props;
    if(redirect && redirect.routeName){
      navigation.replace({
        routeName: redirect.routeName,
        params: redirect.params
      });
    }
  }

  render() {
    return (
      <Container>
        {this._pageTitle()}
        <EditCafeForm type={this.type} />
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

const mapStateToProps = (state) => {
  return {
    redirect: state.cafes.redirect,
  }
};
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(EditCafeScreen);
