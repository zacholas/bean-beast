import React, { Component } from 'react';
import { Field } from "redux-form";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BodyText, Headline } from "../../../common";
import { colorGray400 } from "../../../../constants/Colors";

const styles = StyleSheet.create({
  passiveIcon: {
    color: colorGray400,
  },
  activeIcon: {
    color: '#e74c3c'
  },
});

class FavoriteFieldComponent extends Component {
  render() {
    const iconStyle = this.props.input.value.is_favorite === true ? styles.activeIcon : styles.passiveIcon;
    return (
      <TouchableOpacity onPress={() => {this._onPress()}} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="heart" size={40} style={iconStyle} />
        <Headline h6 style={{ width: 80, textAlign: 'center' }}>{this.props.input.value.is_favorite === true ? 'Favorited' : 'Save as Favorite?'}</Headline>
      </TouchableOpacity>
    );
  }

  _onPress(){
    const isFavorite = typeof this.props.input.value.is_favorite !== 'undefined' ? !this.props.input.value.is_favorite : true;
    const favoriteDate = isFavorite === true ? new Date() : false;
    this.props.input.onChange({
      is_favorite: isFavorite,
      favorited_on: favoriteDate
    });
  }
}

//* Redux Component
export const FavoriteField = (props) => {
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Field
        name={props.name}
        validate={props.validate}
        component={FavoriteFieldComponent}
      />
    </View>
  );
};

FavoriteField.propTypes = {
  name: PropTypes.string.isRequired
};
