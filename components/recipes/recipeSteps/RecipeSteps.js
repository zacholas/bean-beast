import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import Modal from "../../common/Modal";
import * as navRoutes from "../../../constants/NavRoutes";
import { SliderField } from "../../common/reduxForm";
import { textLink, marginBottom, cardGray } from '../../common/Styles';
import colors from '../../../constants/Colors';
import { Button, Headline } from "../../common";
import {FieldArray} from "redux-form";
import * as styles from "../../common/reduxForm/Styles";
import RecipeStepFieldPicker from './RecipeStepFieldPicker';
// import { Container, BodyText } from "/components/common";


export default class RecipeSteps extends Component {
  constructor(props){
    super(props);
    this.editRecipeFieldModal = null;
    this.addRecipeStepFieldModal = null;
    this.state = {
      editingRecipeAttributeName: null,
      // editingRecipeStepFieldIndex: null,
      // editingRecipeStepFieldPrefix: null
    };
  }

  render() {
    return (
      <View style={cardGray}>
        <Text style={{ marginBottom: 15 }}>Recipe Steps:</Text>
        <FieldArray name="recipe_steps" component={this.renderRecipes} parentProps={this.props} />
      </View>
    );
  }

  renderRecipes = ({ fields, meta: { touched, error, submitFailed }, parentProps }) => {
    const { recipeSteps } = parentProps.recipeSteps;
    const recipeStepsArray = _.toArray(recipeSteps);
    return (
      <View>
        {touched &&
        ((error && <Text style={styles.errorText}>{error}</Text>) ||
          (warning && <Text style={styles.warningText}>{warning}</Text>))}

        {fields.map((recipe, index) => {
          // console.log(recipe);
          // console.log(parentProps.formValues.EditRecipeForm.values.recipe_steps[index]);
          const thisRecipeValues = parentProps.formValues.EditRecipeForm.values.recipe_steps[index];
          return this._renderItem(recipe, index, fields, thisRecipeValues, parentProps);
        })}

        {/*<Button title="Add New" onPress={() => fields.push({*/}
        {/*//* Default props when adding a new empty item. Should more or less match what's defined in EditRecipeForm.js*/}
        {/*// var item = items[Math.floor(Math.random()*items.length)];*/}
        {/*field_id: recipeStepsArray[Math.floor(Math.random() * recipeStepsArray.length)].id*/}
        {/*// field_id: 'default_wait',*/}
        {/*// zzzz: 'kkkkkkk'*/}
        {/*})} />*/}

      </View>
    );
  };


  _keyExtractor = (item, index) => {
    return `list-item-${index}`;
  };

  // _editItem(item, index) {
  //   console.log('hit edit item');
  //   // this.setState({
  //   //   editingRecipeStepFieldIndex: index,
  //   //   editingRecipeStepFieldPrefix: item
  //   // });
  //   this.editRecipeFieldModal.show();
  // }

  _editItem(item) {
    console.log(this.state);
    this.setState({ editingRecipeAttributeName: item.id });
    console.log('hit edit item', item);
    // this.setState({
    //   editingRecipeStepFieldIndex: index,
    //   editingRecipeStepFieldPrefix: item
    // });
    // this.editRecipeFieldModal.show();
  }

  _renderItem = (item, index, fields, itemValues, parentProps) => {
    // console.log('item', item);
    // console.log('itemValues', itemValues);
    // console.log(this.props.array.remove);
    const id = itemValues.field_id;
    // console.log(parentProps.recipeSteps);
    console.log(id);
    console.log(parentProps.recipeSteps.recipeSteps[id]);
    const { recipeSteps } = parentProps.recipeSteps
    const thisRecipeStepField = _.size(recipeSteps) && recipeSteps[id] ? recipeSteps[id] : null;
    if(thisRecipeStepField) {
      return (
        <View key={index} style={{...marginBottom, padding: 10, backgroundColor: '#eee'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{padding: 5, marginRight: 10}} onPress={() => {
            }}>
              <Icon name="arrows" size={16}/>
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text>{thisRecipeStepField.name}</Text>
              {/*{this._beanName(itemValues, index)}*/}
              {/*{this._beanSubtitle(itemValues)}*/}
            </View>
            <TouchableOpacity style={{padding: 5, marginRight: 10}} onPress={() => this._editItem(item, index)}>
              <Text style={textLink}><Icon name="pencil" size={16}/> Edit</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity style={{ padding: 5, paddingRight: 10 }} onPress={() => this.props.array.remove('beans', null, 0 )}>*/}
            <TouchableOpacity style={{padding: 5, paddingRight: 10}} onPress={() => fields.remove(index)}>
              <Icon name="close" size={18} style={{color: colors.colorDanger}}/>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };
}

RecipeSteps.propTypes = {};
