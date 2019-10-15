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
    // console.log('data', this.props.data);
    // console.log('recipe list item with id ' + this.props.id + 'selected? ', this.props.selected);
    return (
      <View style={{ marginVertical: 10, backgroundColor: grayCardBG}}>
        <TouchableOpacity onPress={() => this.props.onPressItem(this.props.id)} style={{ padding: 10 }}>
          {this._title()}

          <View style={{ flexDirection: 'row' }}>
            <Text>Grind: {this.props.data.grind} </Text>
            <Text>Dose: {this.props.data.dose} </Text>
            <Text>Temp: {this.props.data.temperature} </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _title(){
    const { brew_method, data: { nickname } } = this.props;
    const name = brew_method && brew_method.name ? brew_method.name : null;
      // const thisBrewMethod = this.props.brewMethods[this.props.data.brew_method];
    if(name || nickname) {
      return (
        <View>
          <Headline style={{marginBottom: 2}} h4>
            {nickname ? nickname : ''}
            {nickname && name ? ` (${name})` : ''}
            {!nickname && name ? name : ''}
          </Headline>
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

RecipeListItem = connect(mapStateToProps, mapDispatchToProps)(RecipeListItem);

RecipeListItem.propTypes = {
  data: PropTypes.object.isRequired
};

RecipeListItem.defaultProps = {
  data: {
    grind: null,
    dose: null,
    temperature: null,
    brew_method: null,
    nickname: null,
  }
};

export default RecipeListItem;
