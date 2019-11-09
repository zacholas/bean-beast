import React, { Component } from 'react';
import PropTypes from "prop-types";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { defaultMarginAmount, textLink } from "../../constants/Styles";
import { BodyText, Headline } from "../common";

export default class RecipeAttribute extends Component {
  render() {
    const { label, content, onEditPress } = this.props;
    return (
      <View style={styles.container}>
        {label ? <Headline h6 noMargin>{label}</Headline> : <View/>}
        <View style={styles.innerContainer}>
          <View style={{ flex: 1 }}>
            <BodyText noMargin>{content}</BodyText>
          </View>
          <View>
            <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
              <Icon name="pencil" size={16} style={styles.editIcon} />
              <BodyText noMargin style={textLink}>Edit</BodyText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: defaultMarginAmount
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  editButton: {
    ...textLink,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  editIcon: {
    ...textLink,
    marginRight: 7
  }
});

RecipeAttribute.propTypes = {
  label: PropTypes.string,
  content: PropTypes.string.isRequired,
  onEditPress: PropTypes.func.isRequired
};
