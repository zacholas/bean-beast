import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {Headline, Hr, BodyText, Container, Button} from "../../components/common";
import Modal from "../../components/common/Modal";
import * as navRoutes from "../../constants/NavRoutes";
import { deleteCafe, editCafe } from "../../actions";


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
    this.deleteConfirmModal = null;
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
        <BodyText>Delete, edit, clone (maybe)</BodyText>
        <Button
          onPress={() => this._editCafeButtonPress()}
          title="Edit Cafe"
          iconName="pencil"
          backgroundColor="gray"
        />

        <Button
          onPress={() => this.deleteConfirmModal.show()}
          title="Delete Cafe"
          iconName="trash"
        />
        <Modal ref={(ref) => { this.deleteConfirmModal = ref; }}>
          <Button
            onPress={() => {this._deleteCafe()}}
            title='Yes, delete'
            iconName='trash'
          />
        </Modal>
      </Container>
    );
  }

  _editCafeButtonPress(){
    this.props.editCafe(this.props.cafe);
    this.props.navigation.navigate(navRoutes.EDIT_CAFE, {
      type: 'edit',
      cafe: this.props.cafe
    })
  }

  _deleteCafe(){
    this.deleteConfirmModal.hide();
    this.props.deleteCafe(this.cafeID, this.props.navigation);
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

export default connect(mapStateToProps, { deleteCafe, editCafe })(ViewCafeScreen);

ViewCafeScreen.propTypes = {
  cafe: PropTypes.object
};

ViewCafeScreen.defaultProps = {
  cafe: {
    name: ''
  }
};
