import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from 'react-native';
import { Headline } from "../common";
import {connect} from "react-redux";
import { grayCardBG } from "../../constants/Colors";


// import styles from './styles';

class RecipeListItem extends Component {
  render() {
    // console.log('recipe list item with id ' + this.props.id + 'selected? ', this.props.selected);
    return (
      <View style={{ marginVertical: 10, backgroundColor: grayCardBG}}>
        <TouchableOpacity onPress={() => this.props.onPressItem(this.props.id)} style={{ padding: 10 }}>
          {this._brewMethod()}

          <View style={{ flexDirection: 'row' }}>
            <Text>Grind: {this.props.data.grind} </Text>
            <Text>Dose: {this.props.data.dose} </Text>
            <Text>Temp: {this.props.data.temperature} </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  _brewMethod(){
    if(this.props.data.brew_method && _.size(this.props.brew_method)){
      // const thisBrewMethod = this.props.brewMethods[this.props.data.brew_method];
      return (
        <View>
          <Headline style={{ marginBottom: 2 }} h4>{this.props.brew_method.name}</Headline>
        </View>
      );
    }
  }
}

// const mapStateToProps = state => ({
//   brewMethods: state.brewMethods.brewMethods
// });
const mapStateToProps = (state, props) => {
  const brew_method = props.data.brew_method && _.size(state.brewMethods.brewMethods[props.data.brew_method]) ? state.brewMethods.brewMethods[props.data.brew_method] : null;
  return {
    brew_method
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListItem);

RecipeListItem.propTypes = {
  data: PropTypes.object.isRequired
};

RecipeListItem.defaultProps = {
  data: {
    grind: null,
    dose: null,
    temperature: null,
    brew_method: null
  }
};
