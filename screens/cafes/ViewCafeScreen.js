import React, { Component } from 'react';

import { View, Text } from 'react-native';

import { connect } from 'react-redux';
import {Headline, Hr, BodyText, Container, Button} from "../../components/common";

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
        {this._cafeName()}
        <Hr />
        <BodyText>Details:</BodyText>
        <BodyText>{JSON.stringify(cafe)}</BodyText>
        <Hr />
        {/*<Button*/}
          {/*title="Save Cafe"*/}
          {/*onPress={(cafe) => this.props.deleteCafe(cafe)}*/}
          {/*iconName="x"*/}
          {/*backgroundColor="green"*/}
          {/*spinner={loading}*/}
        {/*/>*/}
        <BodyText>Delete, edit, clone (maybe)</BodyText>
      </Container>
    );
  }

  _cafeName(){
    if(this.props.cafe.name !== undefined){
      return <Headline>{this.props.cafe.name}</Headline>;
    }
  }
}

const mapStateToProps = (state, props) => ({
  cafe: state.cafes.cafes[props.navigation.getParam('id')]
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCafeScreen);
