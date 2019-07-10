import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import { bodyText, textLink } from "../../../constants/Styles";
import * as styles from "../../common/reduxForm/Styles";
import { BodyText } from "../../common";
import _ from "lodash";
import { required } from "../../../helpers";
import { PickerField } from "../../common/reduxForm";
import EditCafeForm from "../../cafes/EditCafeForm";
import Modal from '../../common/Modal';
// import { View } from 'react-native';
// import { Container, BodyText } from "/components/common";

export default class Cafe extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
    };

    this.hideModal = this.hideModal.bind(this);
  }

  cafeFieldLabel() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={{...bodyText, ...styles.label, flex: 1}}>Roastery:</Text>
        <TouchableOpacity onPress={() => this.showModal()}>
          <BodyText style={textLink}>+ Add New Roastery</BodyText>
        </TouchableOpacity>
      </View>
    );
  };

  showModal(){
    this.setState({ modalVisible: true });
  }

  hideModal(){
    this.setState({ modalVisible: false });
  }

  render() {



    const cafes = _.orderBy(this.props.cafes, ['name'], ['asc']);
    console.log(this.hideModal);
    return (
      <View>
        <PickerField
          name="cafe"
          label={this.cafeFieldLabel()}
          options={cafes}
          validate={[required]}
        />
        <Modal visible={this.state.modalVisible} headlineText="Add New Cafe / Roastery">
          <EditCafeForm
            type="beanCreateModal"
            navigation={this.props.navigation}
            hideModal={() => this.hideModal}
          />
        </Modal>
      </View>
    );
  }
}

Cafe.propTypes = {
  navigation: PropTypes.object.isRequired,
  cafes: PropTypes.object.isRequired,
  addCafeModal: PropTypes.node
};
