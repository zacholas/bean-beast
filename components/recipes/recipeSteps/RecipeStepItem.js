import PropTypes from "prop-types";
import React, { Component } from "react";
import _ from "lodash";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {marginBottom, textLink} from "../../../constants/Styles";
import {Headline} from "../../common";
import colors from "../../../constants/Colors";
import { isDefined } from "../../../helpers";

const containerBackgroundColor = colors.colorWhite;
const styles = StyleSheet.create({
  container: {
    ...marginBottom,
    backgroundColor: containerBackgroundColor,
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  moveButtonsContainer: {
    // marginRight: 7,
    // alignItems: 'stretch',
    // flexWrap: 'wrap'
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // flex: 1,
  },
  moveButtonContainer: {
    flex: 1,
    height: 40,
  },
  moveButton: {
    padding: 10,
    flex: 1,
    backgroundColor: colors.colorGray800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveButtonDown: {
    borderTopWidth: 1,
    borderTopColor: containerBackgroundColor,
  },
  mainContentContainer: {
    flex: 1,
    padding: 10,
  },
  stepHeadlineRowContainer: {
    flexDirection: 'row'
  },
  stepDetailsRowContainer: {

  }
});

export default class RecipeStepItem extends Component {
  constructor(props){
    super(props);
    const id = this.props.itemValues.field_id;
    const { recipeSteps } = props.parentProps.recipeSteps;
    const thisRecipeStepField = _.size(recipeSteps) && recipeSteps[id] ? recipeSteps[id] : null;


    this.state = {
      thisRecipeStepField: thisRecipeStepField,
      index: props.index,
      zIndex: 1,
    };
  }

  handleViewRef = (ref) => {
    this.view = ref;
  };

  animateItemUp = () => {
    this.setState({ zIndex: 999 });
    this.view.slideOutUp(200).then(endState => {
      this.props.moveStepUp(this.state.thisRecipeStepField, this.state.index);
      this.setState({ zIndex: 1 });
      this.view.bounceIn(300);
    })
  };

  animateItemDown = () => {
    this.setState({ zIndex: 999 });
    this.view.slideOutDown(200).then(endState => {
      this.props.moveStepDown(this.state.thisRecipeStepField, this.state.index);
      this.setState({ zIndex: 1 });
      this.view.bounceIn(300);
    })
  };

  render() {
    const id = this.props.itemValues.field_id;
    const { recipeSteps } = this.props.parentProps.recipeSteps;
    const thisRecipeStepField = _.size(recipeSteps) && recipeSteps[id] ? recipeSteps[id] : null;
    const recipeStepsSize = _.size(this.props.recipeStepsValues);
    if(thisRecipeStepField) {
      return (
        <Animatable.View
          ref={this.handleViewRef}
          key={this.props.index}
          style={{...styles.container, zIndex: this.state.zIndex}}
          easing='ease-in'
        >
          <View style={{flexDirection: 'row'}}>
            <View style={styles.moveButtonsContainer}>
              <View style={styles.moveButtonContainer}>
                {this._moveItemUpArrow(thisRecipeStepField, this.props.index, recipeStepsSize)}
              </View>
              <View style={styles.moveButtonContainer}>
                {this._moveItemDownArrow(thisRecipeStepField, this.props.index, recipeStepsSize)}
              </View>
            </View>

            <View style={styles.mainContentContainer}>
              <View style={styles.stepHeadlineRowContainer}>
                <View style={{flex: 1}}>
                  <Headline h5 noMargin>{thisRecipeStepField.name}</Headline>
                  {/*{this._beanName(itemValues, index)}*/}
                  {/*{this._beanSubtitle(itemValues)}*/}
                </View>
                <TouchableOpacity style={{padding: 5, marginRight: 10}} onPress={() => this.props.editStep(thisRecipeStepField, this.props.index)}>
                  <Text style={textLink}><Icon name="pencil" size={16}/> Edit</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity style={{ padding: 5, paddingRight: 10 }} onPress={() => this.props.array.remove('beans', null, 0 )}>*/}
                <TouchableOpacity style={{padding: 5, paddingRight: 10}} onPress={() => this._removeField()}>
                  <Icon name="close" size={18} style={{color: colors.colorDanger}}/>
                </TouchableOpacity>
              </View>
              <View>
                {this.getFieldDisplay()}
              </View>
            </View>
          </View>
        </Animatable.View>
      );
    }
    return null;
  }

  _removeField(){
    this.props.removeStep(this.props.index);
    // this.props.fields.remove(this.props.index).then(() => {
    //   this.props.recalculateStepOrders();
    // });
  }

  _moveItemUpArrow(thisRecipeStepField, index, recipeStepsSize){
    if(index > 0) {
      return (
        <TouchableOpacity style={styles.moveButton} onPress={this.animateItemUp}>
        {/*<TouchableOpacity style={styles.moveButton} onPress={() => this.props.moveStepUp(this.state.thisRecipeStepField, this.state.index)}>*/}
          <Icon name="chevron-up" size={22}/>
        </TouchableOpacity>
      );
    }
  }

  _moveItemDownArrow(thisRecipeStepField, index, recipeStepsSize){
    if(index < (recipeStepsSize - 1) && recipeStepsSize > 1){
      return (
        <TouchableOpacity style={{ ...styles.moveButton, ...styles.moveButtonDown }} onPress={this.animateItemDown}>
        {/*<TouchableOpacity style={{ ...styles.moveButton, ...styles.moveButtonDown }} onPress={() => this.props.moveStepDown(this.state.thisRecipeStepField, this.state.index)}>*/}
          <Icon name="chevron-down" size={22}/>
        </TouchableOpacity>
      );
    }
  }

  getFieldDisplay(){
    const thisStep = _.size(this.props.recipeStepsValues) && this.props.recipeStepsValues[this.props.index] ? this.props.recipeStepsValues[this.props.index] : null;
    // console.log(thisStep);
    if(thisStep){
      const { field_id, id, order, values } = thisStep;
      const valuesSize = _.size(values);
      if(field_id){
        switch (field_id){
          case 'default_pre_infusion':
            return this._preinfusionFieldDisplay(values, valuesSize);
        }
      }
    }
  }

  _preinfusionFieldDisplay(values, valuesSize){
    if(valuesSize){
      return (
        <View>
          {isDefined(values.length) && <Text>Length {values.length}</Text>}
          {isDefined(values.pressure) && <Text>Pressure {values.pressure}</Text>}
        </View>
      )
    }
  }
}

RecipeStepItem.propTypes = {
  editStep: PropTypes.func.isRequired,
  moveStepUp: PropTypes.func.isRequired,
  moveStepDown: PropTypes.func.isRequired,
  itemValues: PropTypes.object.isRequired,
  recipeStepsValues: PropTypes.array,
  index: PropTypes.number.isRequired,
  removeStep: PropTypes.func.isRequired
};

RecipeStepItem.defaultProps = {
  recipeStepsValues: []
};