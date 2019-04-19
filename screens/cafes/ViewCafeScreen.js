import React, { Component } from 'react';

import { View, Text } from 'react-native';

import { connect } from 'react-redux';
import { Headline, Hr, BodyText, Container } from "../../components/common";

// import styles from './styles';

class ViewCafeScreen extends Component {
  // static navigationOptions = {
  //   title: 'Links',
  // };

  componentWillMount(): void {
    const cafeID = this.props.navigation.getParam('id');
    //* TODO not working.
    // this.props.navigation.setParams({
    //   navigationOptions: {
    //     title: 'hi'
    //   }
    // })

  }

  render() {
    const cafe = this.props.cafe;
    return (
      <Container>
        <Headline>{cafe.name}</Headline>
        <Hr />
        <BodyText>Details:</BodyText>
        <BodyText>{JSON.stringify(cafe)}</BodyText>
        <Hr />
        <BodyText>Delete, edit, clone (maybe)</BodyText>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => ({
  cafe: state.cafes.cafes[props.navigation.getParam('id')]
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCafeScreen);
