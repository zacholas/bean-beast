import React, { Component } from 'react';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
// import { Container, BodyText } from "/components/common";

export default class BrewMethodIcon extends Component {
  render() {
    return (
      <Icon name={this._getIconName()} size={this.props.size} style={{ ...styles.icon, ...this.props.style }} />
    );
  }

  _getIconName(){
    switch (this.props.brew_method_id) {
      default:
        return 'coffee';
    }
  }
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: 4
  }
});

BrewMethodIcon.propTypes = {
  brew_method_id: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object
};

BrewMethodIcon.defaultProps = {
  brew_method_id: '',
  size: 56,
  style: {}
};
