import React, { Component } from 'react';

import { View, Text } from 'react-native';

import { connect } from 'react-redux';
import {Headline, Hr, BodyText, Container, Button} from "../../components/common";
import * as navRoutes from "../../constants/NavRoutes";
import { deleteCafe } from "../../actions";
import PropTypes from "prop-types";


// import styles from './styles';

class ViewCafeScreen extends Component {
  // static navigationOptions = {
  //   title: 'Links',
  // };

  componentWillMount(): void {
    // const cafeID = this.props.navigation.getParam('id');
    //* TODO not working.
    // this.props.navigation.setParams({
    //   navigationOptions: {
    //     title: 'hi'
    //   }
    // })

  }

  constructor(props){
    super(props);

    this.cafeID = props.navigation.getParam('id');
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
        <Button
          onPress={() => this._deleteCafeButtonPress()}
          title="Delete Cafe"
          iconName="trash"
        />
      </Container>
    );
  }

  _deleteCafeButtonPress(){
    this.props.navigation.navigate(navRoutes.DELETE_CAFE_MODAL, {
      onPress: () => this.props.deleteCafe(this.cafeID, this.props.navigation)
    })
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

export default connect(mapStateToProps, { deleteCafe })(ViewCafeScreen);

ViewCafeScreen.propTypes = {
  cafe: PropTypes.object
};

ViewCafeScreen.defaultProps = {
  cafe: {
    name: ''
  }
};
