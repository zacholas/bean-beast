import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Container, BodyText, Headline, Button, Spinner} from "./index";
import {bodyText, centeredContainer, container} from "./Styles";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  iconContainer: {
  },
  icon: {
    marginRight: 10,
  },
});

export default class Modal extends Component {
  constructor(props){
    super(props);


  }

  render() {
    // console.log('modal common component', this.props);
    return (
      <Container style={container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name='window-close' size={22} color="#000" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View>
          {this._modalTitle()}
          {this._modalContent()}
          <View>
            {this._modalButton()}
            {this._dismissButton()}
          </View>
        </View>
      </Container>
    );
  }

  _modalTitle(){
    if(this.props.showHeadline){
      return <Headline>{this.props.headlineText}</Headline>;
    }
  }

  _modalContent(){
    if(this.props.bodyText){
      return <BodyText>{this.props.bodyText}</BodyText>
    }
  }

  _modalButton(){
    if(this.props.onPress && this.props.buttonText){
      return (
        <Button
          onPress={this.props.onPress}
          title={this.props.buttonText}
          iconName={this.props.buttonIcon !== undefined ? this.props.buttonIcon : undefined}
        />
      )
    }
  }

  _dismissButton(){
    if(this.props.showDismissButton){
      return (
        <Button
          onPress={() => this.props.navigation.goBack() }
          title={this.props.cancelButtonText}
          backgroundColor="gray"
        />
      )
    }
  }
}

Modal.propTypes = {
  navigation: PropTypes.object.isRequired,

  showHeadline: PropTypes.bool,
  headlineText: PropTypes.string,
  bodyText: PropTypes.string,
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.string,
  showDismissButton: PropTypes.bool,
  cancelButtonText: PropTypes.string
};

Modal.defaultProps = {
  showHeadline: true,
  headlineText: 'Are you sure?',
  bodyText: null,
  onPress: false,
  buttonText: null,
  buttonIcon: null,
  showDismissButton: true,
  cancelButtonText: 'Cancel'
};

// Modal.propTypes = {
//   text: PropTypes.string.isRequired,
//   content: PropTypes.array.isRequired,
//   onPress: PropTypes.func.isRequired,
//   size: PropTypes.number.isRequired,
//   navigation: PropTypes.object.isRequired,
//   isReady: PropTypes.bool.isRequired,
// };

// Default values for props
// MyComponent.defaultProps = {
//   text: 'Sample Deafult Text',
//   content: [],
//   size: 0,
//   onPress: () => {},
//   isReady: false
// }
