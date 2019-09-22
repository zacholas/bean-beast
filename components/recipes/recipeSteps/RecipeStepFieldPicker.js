import React, {Component} from 'react';
import {FlatList, View, Text, TouchableOpacity} from "react-native";
import _ from 'lodash';
import { marginBottom } from "../../../constants/Styles";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {saveRecipe} from "../../../actions";
import PropTypes from "prop-types";
import zModal from "../../common/Modal";

class RecipeStepFieldPicker extends Component {
  render() {
    return (
        <FlatList
          data={this._getRecipeStepFields()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={marginBottom}
        />
    );
  }

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _renderItem = ({item}) => {
    const onPressFunction = item.type && item.type === 'attribute' ? () => this.props.onAttributePress(item) : () => this.props.onStepPress(item);
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  _getRecipeStepFields(){
    const recipeAttributes = {
      notes_for_next_time: {
        type: 'attribute',
        id: 'notes_for_next_time',
        name: 'Notes For Next Time',
        order: 2,
        repeatable: false,
        applicableForAllBrewMethods: true,
        applicableBrewMethodsDefault: [],
        // applicableBrewMethodsUser: [],
      },
    };

    let recipeStepsChoices = recipeAttributes;

    if(_.size(this.props.recipeSteps) && _.size(this.props.recipeSteps.recipeSteps)){
      const recipeSteps = _.merge(recipeAttributes, this.props.recipeSteps.recipeSteps);
      recipeStepsChoices = _.orderBy(recipeSteps, ['order'], ['asc']);
    }

    return recipeStepsChoices;
  }
}

export default RecipeStepFieldPicker;

RecipeStepFieldPicker.propTypes = {
  onAttributePress: PropTypes.func,
  onStepPress: PropTypes.func,
};

RecipeStepFieldPicker.defaultProps = {
  onAttributePress: () => {},
  onStepPress: () => {},
};

// const mapStateToProps = (state) => {
//   return {
//     recipeSteps: state.recipeSteps.recipeSteps,
//   }
// };
//
// export default connect(mapStateToProps)(RecipeStepFieldPicker);