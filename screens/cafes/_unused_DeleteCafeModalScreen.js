import React, { Component } from 'react';
import ModalScreen from "../../components/common/ModalScreen";

class _unused_DeleteCafeModalScreen extends Component {
  render() {
    return (
      <ModalScreen
        headlineText="Are you sure you want to permanently delete this cafe?"
        bodyText={"(You'll never be able to get it back.)\n\nAll beans and tastes you have associated with this cafe will no longer be associated with it."}
        buttonText="Delete Cafe Permanently"
        onPress={this.props.navigation.getParam('onPress')}
        navigation={this.props.navigation}
      />
    );
  }
}


export default _unused_DeleteCafeModalScreen;
