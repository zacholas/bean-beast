import React, { Component } from 'react';
import Modal from "../../components/common/Modal";

class DeleteCafeModalScreen extends Component {
  render() {
    return (
      <Modal
        headlineText="Are you sure you want to permanently delete this cafe?"
        bodyText={"(You'll never be able to get it back.)\n\nAll beans and tastes you have associated with this cafe will no longer be associated with it."}
        buttonText="Delete Cafe Permanently"
        onPress={this.props.navigation.getParam('onPress')}
        navigation={this.props.navigation}
      />
    );
  }
}


export default DeleteCafeModalScreen;
