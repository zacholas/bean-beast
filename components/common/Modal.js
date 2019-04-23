import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, Alert, SafeAreaView, StyleSheet} from 'react-native';
import { BlurView } from 'expo';
import {
  bodyText,
  defaultPadding
} from './Styles';
import Icon from "react-native-vector-icons/FontAwesome";
import {Headline} from "./Text/Headline";
import {BodyText} from "./Text/BodyText";
import {Button} from "./Button";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  backdrop: {
    padding: 25,
    backgroundColor: 'rgba(0,0,0,.9)',
    flex: 1,
    paddingTop: 100,
    // justifyContent: 'center'
  },
  modalContainer: {
    ...defaultPadding,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  modalHeaderContainer: {
    flexDirection: 'row',
  },
  modalHeader: {
    flex: 1,
  },
  iconContainer: {
    marginLeft: 10,
  },
  icon: {
    padding: 5
  }
});

class zModal extends Component {
  state = {
    visible: true,
  };

  setVisible(visible) {
    this.setState({
      visible
    });
  }

  toggle(){
    this.setState({
      visible: !this.state.visible
    });
  }

  show(){
    this.setState({
      visible: true
    });
  }

  hide(){
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {
            this.hide()
          }}>
          <BlurView tint="dark" intensity={90} style={styles.backdrop}>
            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, }} onPress={() => this.hide()} />
            <View style={styles.modalContainer}>
              <View style={styles.modalHeaderContainer}>
                <View style={styles.modalHeader}>
                  {this._modalTitle()}
                </View>
                {this._closeIcon()}
              </View>

              <View>
                {this._modalContent()}
                {this.props.children}
                <View>
                  {this._dismissButton()}
                </View>
              </View>
            </View>
          </BlurView>
        </Modal>
      </SafeAreaView>
    );
  }

  _modalTitle(){
    if(this.props.headlineText){
      return <Headline>{this.props.headlineText}</Headline>;
    }
  }

  _modalContent(){
    if(this.props.bodyText){
      return <BodyText>{this.props.bodyText}</BodyText>
    }
  }

  _closeIcon(){
    if(this.props.showCloseIcon){
      return (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => this.hide()}>
            <Icon name='times' size={22} color="#000" style={styles.icon} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  _dismissButton(){
    if(this.props.showDismissButton){
      return (
        <Button
          onPress={() => this.hide() }
          title={this.props.dismissButtonText}
          backgroundColor="gray"
        />
      )
    }
  }
}

export default zModal;


zModal.propTypes = {
  headlineText: PropTypes.string,
  showCloseIcon: PropTypes.bool,
  showDismissButton: PropTypes.bool,
  dismissButtonText: PropTypes.string
};

zModal.defaultProps = {
  headlineText: 'Are you sure?',
  showCloseIcon: true,
  showDismissButton: true,
  dismissButtonText: 'Cancel'
};
