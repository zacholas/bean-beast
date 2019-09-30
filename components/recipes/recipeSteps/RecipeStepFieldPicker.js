import React, {Component} from 'react';
import {FlatList, View, Text, TouchableOpacity} from "react-native";
import _ from 'lodash';
import PropTypes from "prop-types";
import { marginBottom } from "../../../constants/Styles";
import {Headline} from "../../common";

class RecipeStepFieldPicker extends Component {
  render() {
    return (
      <View>
        <Headline noMargin h5>Recipe Steps:</Headline>
        <FlatList
          data={this._getRecipeStepFields()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={marginBottom}
        />
      </View>
    );
  }

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _renderItem = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity onPress={() => this.props.onStepPress(item)} style={{ paddingVertical: 10 }}>
        <Text>{item.name}</Text>
        {item.description && <Text style={{ fontSize: 9 }}>{item.description}</Text>}
      </TouchableOpacity>
    );
  };

  _getRecipeStepFields(){
    let recipeStepsChoices;

    if(_.size(this.props.recipeSteps) && _.size(this.props.recipeSteps.recipeSteps)){
      // const recipeSteps = _.merge(recipeAttributes, this.props.recipeSteps.recipeSteps);
      const recipeSteps = this.props.recipeSteps.recipeSteps;
      recipeStepsChoices = _.orderBy(recipeSteps, ['order'], ['asc']);
    }

    return recipeStepsChoices;
  }
}

export default RecipeStepFieldPicker;

RecipeStepFieldPicker.propTypes = {
  onStepPress: PropTypes.func,
};

RecipeStepFieldPicker.defaultProps = {
  onStepPress: () => {},
};
