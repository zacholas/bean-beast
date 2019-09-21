import React, {Component} from 'react';
import {FlatList, View, Text, TouchableOpacity} from "react-native";
import _ from 'lodash';
import { marginBottom } from "../../../constants/Styles";
import RecipeFormField from "../formFields/RecipeFormField";
import Modal from "../../common/Modal";
// import * as navRoutes from "../../../constants/NavRoutes";
// import CafeListItem from "../../cafes/CafeList";

class RecipeStepFieldPicker extends Component {
  constructor(props){
    super(props);
    this.editRecipeAttributeModal = null;
    this.state = {
      editingRecipeAttributeName: null,
    };
  }

  render() {
    if(this.state.editingRecipeAttributeName){
      return (
        <RecipeFormField name={this.state.editingRecipeAttributeName} />
      );
    }
    return (
      <View>
        <FlatList
          data={this._getRecipeStepFields()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={marginBottom}
        />
        {/*<Modal*/}
          {/*ref={(ref) => { this.editRecipeAttributeModal = ref; }}*/}
          {/*// showHeadline={!!this.state.editingRecipeAttributeName}*/}
          {/*// showHeadline=true*/}
          {/*dismissButtonText="Save & Continuze"*/}
          {/*headlineJSX={(<TouchableOpacity onPress={() => console.log('hi')}><Text>back</Text></TouchableOpacity>)}*/}
        {/*>*/}
          {/*<RecipeFormField name={this.state.editingRecipeAttributeName} />*/}
        {/*</Modal>*/}
      </View>
    );
  }

  _editFormFieldModal(fieldName){
    this.props.editItem();
    this.setState({ editingRecipeAttributeName: fieldName });
    // this.editRecipeAttributeModal.show();
    // console.log('_editFormFieldModal func hit');
    this.props.addRecipeStepFieldModal.hide();

    // console.log('_editFormFieldModal func hit', this.editRecipeAttributeModal);
    // const editRecipeAttributeModal = this.editRecipeAttributeModal;
    //
    // this.setState({ editingRecipeAttributeName: fieldName });
    // setTimeout(function(editRecipeAttributeModal){ console.log(this.editRecipeAttributeModal, editRecipeAttributeModal); this.editRecipeAttributeModal.show() }.bind(this), 1000);

    // if (this.options.destroyOnHide) {
    //   setTimeout(function(){ this.tip.destroy() }.bind(this), 1000);
    // }
  }

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _onAttributePress(item){
    //* Open the form field editor
    this.props.editNotes();
    // this.props.editItem(item);
    // this._editFormFieldModal(item.id);
    // console.log('attribute pressed', item);
  }

  _onStepPress(item){
    console.log('step pressed', item);
  }

  _renderItem = ({item}) => {
    const onPressFunction = item.type && item.type === 'attribute' ? () => this._onAttributePress(item) : () => this._onStepPress(item);
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