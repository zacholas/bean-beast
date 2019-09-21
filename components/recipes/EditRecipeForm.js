import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/FontAwesome';
import { saveRecipe } from "../../actions";
import { TextField, PickerField } from "../common/reduxForm";
import {BodyText, Button, Container, Headline, Hr} from "../common";
import { required } from "../../helpers";
import _ from "lodash";
import RecipeFormField from './formFields/RecipeFormField';
import RecipeSteps from './recipeSteps/RecipeSteps';
import Modal from "../common/Modal";
import styles from "../../screens/recipes/styles";
import {colorGray800} from "../../constants/Colors";

class EditRecipeForm extends Component {
  constructor(props){
    super(props);
    this.editRecipeFieldModal = null;
    this.state = {
      editingRecipeFieldName: null,
    };
  }

  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);
    this.props.change('modal', this.props.modal);
  }

  render() {
    // console.log(Object.keys(this.props.modal).length ? 'yes!': 'no');


    const { handleSubmit, loading } = this.props;

    return (
      <Container>
        {this._brewMethodArea()}

        <View style={styles.recipePrimaryInfoBar}>
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._editFormFieldModal('grind') }}>
            <Text>Grind</Text>
            <Text>{_.size(this.props.formValues.EditRecipeForm) && _.size(this.props.formValues.EditRecipeForm.values) && this.props.formValues.EditRecipeForm.values.grind ? this.props.formValues.EditRecipeForm.values.grind : '+ Add'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._editFormFieldModal('dose') }}>
            <Text>Dose</Text>
            <Text>{_.size(this.props.formValues.EditRecipeForm) && _.size(this.props.formValues.EditRecipeForm.values) && this.props.formValues.EditRecipeForm.values.dose ? this.props.formValues.EditRecipeForm.values.dose : '+ Add'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._editFormFieldModal('temperature') }}>
            <Text>Temp</Text>
            <Text>{_.size(this.props.formValues.EditRecipeForm) && _.size(this.props.formValues.EditRecipeForm.values) && this.props.formValues.EditRecipeForm.values.temperature ? this.props.formValues.EditRecipeForm.values.temperature : '+ Add'}</Text>
          </TouchableOpacity>
        </View>

        <Hr />

        <View style={styles.recipeRatingContainer}>
          <View style={styles.recipeOverallRatingBar}>
            <View style={styles.recipeOverallRatingSliderContainer}>
              <BodyText noMargin>Rating Slider</BodyText>
            </View>
            <View style={styles.recipeAddToFavoritesContainer}>
              <TouchableOpacity>
                <Icon name="heart" size={40} style={{ color: '#e74c3c'}} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.recipeCriteriaRatingContainer}>
            <TouchableOpacity style={StyleSheet.flatten([styles.recipeCriteriaRating, styles.recipeCriteriaRatingEmpty])}>
              <Icon name="plus" size={15} style={{ color: colorGray800, marginBottom: 4 }} />
              <Headline h6 style={{ marginBottom: 0, textAlign: 'center', color: colorGray800, fontSize: 9 }}>Add Rating</Headline>
            </TouchableOpacity>
          </View>
        </View>
        <Hr />

        <View>
          <BodyText>Non-sortable recipe options</BodyText>
        </View>
        <Hr />

        <View>
          <BodyText>sortable recipe steps</BodyText>
        </View>
        <Hr />

        <View>
          <BodyText>+ circle to add new</BodyText>
        </View>

        <View>
          <RecipeSteps
            recipeSteps={this.props.recipeSteps}
            formValues={this.props.formValues}
          />

          <Button
            title="Save Recipe"
            onPress={handleSubmit((values) => this.props.saveRecipe(values))}
            iconName="check"
            backgroundColor="green"
            spinner={loading}
          />

          <Modal
            ref={(ref) => { this.editRecipeFieldModal = ref; }}
            showHeadline={false}
            dismissButtonText="Save & Continue"
            // headlineText="Edit Bean Blend Component"
          >
            <RecipeFormField name={this.state.editingRecipeFieldName} />
            {/*<BeanDetailsFormFields*/}
            {/*fieldIndex={this.state.editingRepeatableRecipeFieldIndex}*/}
            {/*fieldPrefix={this.state.editingRepeatableRecipeFieldPrefix}*/}
            {/*origins={this.props.origins}*/}
            {/*roastLevels={this.props.roastLevels}*/}
            {/*beanProcesses={this.props.beanProcesses}*/}
            {/*coffeeSpecies={this.props.coffeeSpecies}*/}
            {/*navigation={this.props.navigation}*/}
            {/*formValues={this.props.formValues}*/}
            {/*/>*/}
          </Modal>
        </View>
      </Container>

    );
  }

  _editFormFieldModal(fieldName){
    this.setState({ editingRecipeFieldName: fieldName });
    this.editRecipeFieldModal.show();
  }

  //* Return True if values are set.
  _editRecipeFormValues(){
    return (_.size(this.props.formValues.EditRecipeForm) && _.size(this.props.formValues.EditRecipeForm.values));
  }

  _brewMethodArea(){
    let brewMethodOutput;

    //* Brew Method is set
    if(this._editRecipeFormValues() && this.props.formValues.EditRecipeForm.values.brew_method) {
      const thisBrewMethodID = this.props.formValues.EditRecipeForm.values.brew_method;
      const thisBrewMethod = thisBrewMethodID && _.size(this.props.brewMethods) && _.size(this.props.brewMethods.brewMethods) && this.props.brewMethods.brewMethods[thisBrewMethodID] ? this.props.brewMethods.brewMethods[thisBrewMethodID] : false;
      brewMethodOutput = (
        <TouchableOpacity style={styles.brewMethodInnerContainer} onPress={() => { this._editFormFieldModal('brew_method') }}>
          <Icon name="coffee" size={56} />
          {thisBrewMethod && thisBrewMethod.name && <Headline style={{ marginBottom: 0 }}>{thisBrewMethod.name}</Headline>}
          <BodyText>Probably should say something here about which bean it belongs to</BodyText>
        </TouchableOpacity>
      );
    }
    else {
      brewMethodOutput = (
        <TouchableOpacity style={styles.brewMethodInnerContainer} onPress={() => { this._editFormFieldModal('brew_method') }}>
          <Icon name="plus" size={56} />
          <Headline style={{ marginBottom: 0 }}>Select Brew Method</Headline>
          <BodyText>Probably should say something here about which bean it belongs to</BodyText>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.brewMethodContainer}>
        <View style={{ position: 'absolute', top: 0, left: 0 }}>
          <Text>Date (IDK if I want modified or created)</Text>
        </View>
        {brewMethodOutput}
      </View>
    );

  }

  _notesArea(){
    if(this._editRecipeFormValues() && this.props.formValues.EditRecipeForm.values.notes_for_next_time) {
      return (
        <View>
          <Headline h3>Notes for next time</Headline>
          <BodyText>this.props.formValues.EditRecipeForm.values.notes_for_next_time</BodyText>
          <TouchableOpacity onPress={() => { this._editFormFieldModal('notes_for_next_time') }}>
            <Icon name="plus" size={16} />
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.recipes.currentlyEditingRecipe,
    loading: state.recipes.loading,
    brewMethods: state.brewMethods,
    recipeSteps: state.recipeSteps,
    formValues: state.form,
  }
};

EditRecipeForm = reduxForm({
  form: 'EditRecipeForm',
  enableReinitialize: true,
})(EditRecipeForm);

EditRecipeForm = connect(mapStateToProps, { saveRecipe })(EditRecipeForm);

export default EditRecipeForm;

EditRecipeForm.propTypes = {
  navigation: PropTypes.object.isRequired,
  modal: PropTypes.object
};

EditRecipeForm.defaultProps = {
  modal: {}
};
