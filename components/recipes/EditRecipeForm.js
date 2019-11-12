import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { reduxForm, arrayPush, SubmissionError, getFormMeta } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { saveRecipe } from "../../actions";
import { TextField, PickerField, LabeledSliderField } from "../common/reduxForm";
import {BodyText, Button, Container, Headline, Hr} from "../common";
import {required, throwError} from "../../helpers";
import _ from "lodash";
import RecipeFormField from './formFields/RecipeFormField';
import RecipeStepFormField from './formFields/RecipeStepFormField';
import RecipeSteps from './recipeSteps/RecipeSteps';
import Modal from "../common/Modal";
import styles from "../../screens/recipes/styles";
import {colorGray800} from "../../constants/Colors";
import colors from "../../constants/Colors";
import { defaultMarginAmount, marginBottom, textLink } from "../../constants/Styles";
import RecipeStepFieldPicker from './recipeSteps/RecipeStepFieldPicker';
import RecipeAttributesFieldPicker from './RecipeAttributesFieldPicker';
import { generateRandomID, recipeStepFieldDefaultValues, recipeSteps_default_wait_length } from "../../helpers";
import { recipe_steps_validation } from "./recipeSteps/RecipeStepsFormValidation";
import {beanTitleDisplay, temperatureInOtherUnit} from "../../helpers/labels";
import { FavoriteField } from "./formFields/fields/FavoriteField";
import BrewMethodIcon from "./BrewMethodIcon";
import RecipeAttribute from "./RecipeAttribute";

class EditRecipeForm extends Component {
  constructor(props){
    super(props);
    this.editRecipeFieldModal = null;
    this.state = {
      editRecipeFieldModalAction: null,
      editingRecipeFieldName: null,
      showModalBackToFieldListButton: false,
      stepFieldIndex: null
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const { handleSubmit, loading } = this.props;
  //   const thisForm = _.size(this.props.formValues) && _.size(this.props.formValues.EditRecipeForm) ? this.props.formValues.EditRecipeForm : false;
  //   const values = thisForm && _.size(thisForm.values) ? thisForm.values : false;
  //   const { submitErrors } = thisForm;
  //   // console.log('receive props; old form: ', thisForm);
  //
  //   const newForm = _.size(nextProps.formValues) && _.size(nextProps.formValues.EditRecipeForm) ? nextProps.formValues.EditRecipeForm : false;
  //   const newValues = newForm && _.size(newForm.values) ? newForm.values : false;
  //   const formSubmitFailed = newForm && newForm.submitFailed ? newForm.submitFailed : false;
  //   // console.log('new form: ', newForm);
  //   console.log('submit failed?', formSubmitFailed);
  //   // If they've already failed to submit the form, validate the it so that we can remove errors that are no longer relevant.
  //   if(formSubmitFailed === true && newValues){
  //     console.log('newValues', newValues);
  //     // this._validateForm(newValues);
  //   };
  // }

  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);
    this.props.change('modal', this.props.modal);
    this.props.change('bean_id', this.props.bean_id);

    // this.props.change('recipe_steps', [
    //   {
    //     id: 'hij789',
    //     field_id: 'default_bloom',
    //     order: 10,
    //     values: {
    //       length: 70,
    //       water_amount: 30,
    //       notes: 'Stir after pouring'
    //     }
    //   },
    //   {
    //     id: 'def456',
    //     field_id: 'default_pour',
    //     order: 20,
    //     values: {
    //       water_amount: 100,
    //       duration: 30,
    //       notes: 'dont pour too fast'
    //     }
    //   },
    //   {
    //     id: 'abc123',
    //     field_id: 'default_pre_infusion',
    //     order: 30,
    //     values: {
    //       length: 213,
    //       pressure: 9,
    //       notes: 'slow ramp up'
    //     }
    //   },
    //   {
    //     id: 'defdddd456',
    //     field_id: 'default_primary_infusion',
    //     order: 40,
    //     values: {
    //       length: 130,
    //       pressure: 9,
    //       notes: 'fast ramp up'
    //     }
    //   },
    //   {
    //     id: 'defdddd456sdsdssd',
    //     field_id: 'default_taint',
    //     order: 50,
    //     values: {
    //       notes: 'add lotsa sugar and shit'
    //     }
    //   },
    //   {
    //     id: 'hdddij789',
    //     field_id: 'default_wait',
    //     order: 60,
    //     values: {
    //       length: 70,
    //       notes: 'Wait for it to drain'
    //     }
    //   },
    // ]);
  }

  render() {
    const { handleSubmit, loading } = this.props;
    const thisForm = _.size(this.props.formValues) && _.size(this.props.formValues.EditRecipeForm) ? this.props.formValues.EditRecipeForm : false;
    const values = thisForm && _.size(thisForm.values) ? thisForm.values : false;
    const { submitErrors } = thisForm;
    const formMeta = this.props.fields;
    if(submitErrors){
      console.log('submit errors: ', submitErrors);
    }
    // console.log('form meta ', this.props.fields);

    // console.log(thisForm);

    let beans = _.map(this.props.beans.beans, (bean) => {
      bean.name = beanTitleDisplay(bean, this.props.origins.origins, this.props.beanProcesses.beanProcesses);
      return bean;
    });

    beans = _.orderBy(beans, ['name'], ['asc']);

    const tempInOtherUnit = temperatureInOtherUnit(values.temperature, values.temperatureMeasurement);

    return (
      <Container>
        <View style={{ flexDirection: 'row' }}>
          {/*<View style={{ position: 'absolute', top: 0, left: 0 }}>*/}
          {/*<View>*/}
            {/*<Text>Recipe Date</Text>*/}
          {/*</View>*/}
          <View style={{ flex: 1 }}>
            {/*<PickerField*/}
              {/*name="bean_id"*/}
              {/*options={beans}*/}
              {/*placeholderText="–  Select a Bean  –"*/}
            {/*/>*/}
          </View>
        </View>

        {this._brewMethodArea()}

        <View style={styles.recipePrimaryInfoBar}>
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._showEditFormFieldModal('grind') }}>
            <Headline h6 noMargin>Grind</Headline>
            <BodyText noMargin>{_.size(values) && values.grind ? values.grind : '+ Add'}</BodyText>
            {this._fieldErrorDisplay('grind')}
            {/*{submitErrors && submitErrors.grind && _.size(formMeta.grind) && formMeta.grind.touched && <Text style={{ color: '#f00' }}>{submitErrors.grind}</Text>}*/}
          </TouchableOpacity>
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._showEditFormFieldModal('dose') }}>
            <Headline h6 noMargin>Dose</Headline>
            <BodyText noMargin>{_.size(values) && values.dose ? `${values.dose}g` : '+ Add'}</BodyText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._showEditFormFieldModal('temperature') }}>
            <Headline h6 noMargin>Temp</Headline>
            <BodyText noMargin>{_.size(values) && values.temperature ? `${values.temperature}° ${values.temperatureMeasurement ? values.temperatureMeasurement.toString().toUpperCase() : 'C'}` : '+ Add'}</BodyText>
            {tempInOtherUnit ? <BodyText noMargin style={{ fontSize: 13 }}>({tempInOtherUnit})</BodyText> : <View />}
          </TouchableOpacity>
        </View>

        {/*<TextField*/}
          {/*name="grind2"*/}
          {/*label="Grind2"*/}
          {/*validate={[required]}*/}
        {/*/>*/}

        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ flex: 1 }}>
            <Headline h4 noMargin inline>Recipe Attributes:</Headline>
          </View>
          <View>
            <TouchableOpacity onPress={() => this._showModalAttributesMenu()}><BodyText noMargin style={{ ...textLink, marginBottom: 8 }}>+ Add New</BodyText></TouchableOpacity>
          </View>
        </View>

        <View>
          {this._hasRecipeAttributes() ? <View/> : <BodyText style={{ fontStyle: 'italic' }}>None yet. Press "Add New" to add recipe notes, nickname, etc.</BodyText>}
          {this._recipeNicknameArea()}
          {this._recipeNotesArea()}
          {this._recipeObjectivesArea()}
          {this._notesForNextTimeArea()}
        </View>



        <Hr />

        <View style={styles.recipeRatingContainer}>
          <View style={styles.recipeOverallRatingBar}>
            <View style={styles.recipeOverallRatingSliderContainer}>
              <LabeledSliderField
                name="overall_rating"
                // label="Overall Recipe Rating"
                step={1}
                minimumValue={0}
                maximumValue={10}
                tallNotches={[0, 5, 10]}
                topLabels={[
                  {
                    content: <Icon name="frown-o" size={30} />,
                    containerStyle: { marginLeft: 2 }
                  },
                  {
                    content: <Icon name="meh-o" size={30} />
                  },
                  {
                    content: <Icon name="smile-o" size={30} />,
                    containerStyle: { marginRight: 2 }
                  }
                ]}
                bottomLabels={[
                  { content: 'Hated it' },
                  { content: 'Meh' },
                  { content: 'Loved it' }
                ]}
              />
            </View>
            <View style={styles.recipeAddToFavoritesContainer}>
              <FavoriteField name="favorite_information" />
            </View>
          </View>

          {/*TODO CREATE THE RATING STUFF*/}
          {/*<View style={styles.recipeCriteriaRatingContainer}>*/}
            {/*<TouchableOpacity style={StyleSheet.flatten([styles.recipeCriteriaRating, styles.recipeCriteriaRatingEmpty])}>*/}
              {/*<Icon name="plus" size={15} style={{ color: colorGray800, marginBottom: 4 }} />*/}
              {/*<Headline h6 style={{ marginBottom: 0, textAlign: 'center', color: colorGray800, fontSize: 9 }}>Add Rating</Headline>*/}
            {/*</TouchableOpacity>*/}
          {/*</View>*/}
        </View>
        <Hr />



        <View>
          <RecipeSteps
            recipeSteps={this.props.recipeSteps}
            formValues={this.props.formValues}
            editStep={(step, index) => this._showEditStepModal(step, index)}
            moveStepUp={(step, index) => this._moveStepUp(step, index)}
            moveStepDown={(step, index) => this._moveStepDown(step, index)}
            removeStep={(index) => this._removeStep(index)}
            submitErrors={submitErrors}
          />

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this._showModalStepsMenu()} style={{ backgroundColor: colors.colorPrimary, borderRadius: 300, padding: 10, width: 70, height: 70, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="plus" size={40} style={{ color: colors.colorWhite }}/>
            </TouchableOpacity>
          </View>

          <Button
            title="Save Recipe"
            // onPress={handleSubmit((values) => this._submit(values))}
            onPress={handleSubmit((values) => this.props.saveRecipe(values))}
            iconName="check"
            backgroundColor="green"
            spinner={loading}
          />

          <Modal
            ref={(ref) => { this.editRecipeFieldModal = ref; }}
            showHeadline={!!this.state.showModalBackToFieldListButton}
            // onShow={() => { console.log('onshow')}}
            // onDismiss={() => { console.log('hidden')}}
            headlineJSX={this._modalBackButton()}
            showDismissButton={false}
            // headlineText="Edit Bean Blend Component"
          >
            {this._getModalContent()}
            {this._modalCloseButton()}
          </Modal>
        </View>
      </Container>

    );
  }

  _fieldErrorDisplay(fieldName){
    const thisForm = _.size(this.props.formValues) && _.size(this.props.formValues.EditRecipeForm) ? this.props.formValues.EditRecipeForm : false;
    const { submitErrors } = thisForm;
    const formMeta = this.props.fields;
    if(submitErrors && submitErrors[fieldName] && _.size(formMeta) && _.size(formMeta[fieldName]) && formMeta[fieldName].touched) {
      return (
        <Text style={{ color: '#f00' }}>{submitErrors[fieldName]}</Text>
      )
    }
    {/*submitErrors && submitErrors.grind && _.size(formMeta.grind) && formMeta.grind.touched && <Text style={{ color: '#f00' }}>{submitErrors.grind}</Text>}*/}
  }

  _modalBackButton(){
    if(this.state.showModalBackToFieldListButton === true){
      return (
        <TouchableOpacity onPress={() => this._modalGoBackToAttributesList()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="chevron-left" size={16} style={{ marginRight: 7 }} />
          <Text>Back</Text>
        </TouchableOpacity>
      );
    }
  }

  _showModalStepsMenu(){
    this.setState({
      editRecipeFieldModalAction: 'recipeStepsMenu',
      editingRecipeFieldName: null,
      showModalBackToFieldListButton: false,
      stepFieldIndex: null
    });
    this.editRecipeFieldModal.show();
  }

  _modalGoBackToAttributesList(){
    this.setState({
      editRecipeFieldModalAction: 'recipeAttributesMenu',
      editingRecipeFieldName: null,
      showModalBackToFieldListButton: false,
      stepFieldIndex: null
    });
  }

  _showModalAttributesMenu(){
    this.setState({
      editRecipeFieldModalAction: 'recipeAttributesMenu',
      editingRecipeFieldName: null,
      showModalBackToFieldListButton: false,
      stepFieldIndex: null
    });
    this.editRecipeFieldModal.show();
  }

  _showEditFormFieldModal(fieldName){
    this.setState({
      editRecipeFieldModalAction: 'editField',
      editingRecipeFieldName: fieldName,
      showModalBackToFieldListButton: false,
      stepFieldIndex: null
    });
    this.editRecipeFieldModal.show();
  }

  _showEditStepModal(step, index){
    this.setState({
      editRecipeFieldModalAction: 'editStep',
      editingRecipeFieldName: step.id,
      showModalBackToFieldListButton: false,
      stepFieldIndex: index
    });
    this.editRecipeFieldModal.show();
  }

  _orderStepsByOrderAttribute(stepsArray){
    return _.orderBy(stepsArray, ['order'], ['asc']);
  }

  _moveStepUp(step, index){
    if(index > 0) {
      const recipeStepsValues = _.size(this.props.formValues.EditRecipeForm) && _.size(this.props.formValues.EditRecipeForm.values) && _.size(this.props.formValues.EditRecipeForm.values.recipe_steps) ? this.props.formValues.EditRecipeForm.values.recipe_steps : null;
      let newRecipeStepsValues = recipeStepsValues;
      if(newRecipeStepsValues){
        const thisStep = recipeStepsValues[index];
        const prevStep = recipeStepsValues[index - 1];
        if(typeof thisStep.order !== 'undefined' && typeof prevStep.order !== 'undefined'){
          newRecipeStepsValues[index].order -= 10;
          newRecipeStepsValues[index - 1].order += 10;
          newRecipeStepsValues = this._orderStepsByOrderAttribute(newRecipeStepsValues);
          this.props.change('recipe_steps', newRecipeStepsValues);
        }
      }
    }
    else {
      throwError('move step up function being called for item with index 0.', 'components/recipes/EditRecipeForm.js', '_moveStepUp');
    }
  }

  _moveStepDown(step, index){
    const recipeStepsValues = _.size(this.props.formValues.EditRecipeForm) && _.size(this.props.formValues.EditRecipeForm.values) && _.size(this.props.formValues.EditRecipeForm.values.recipe_steps) ? this.props.formValues.EditRecipeForm.values.recipe_steps : null;
    const recipeStepsSize = _.size(recipeStepsValues);
    if(index < (recipeStepsSize - 1) && recipeStepsSize > 1) {
      let newRecipeStepsValues = recipeStepsValues;
      if(newRecipeStepsValues){
        const thisStep = recipeStepsValues[index];
        const nextStep = recipeStepsValues[index + 1];
        if(typeof thisStep.order !== 'undefined' && typeof nextStep.order !== 'undefined'){
          newRecipeStepsValues[index].order += 10;
          newRecipeStepsValues[index + 1].order -= 10;
          newRecipeStepsValues = this._orderStepsByOrderAttribute(newRecipeStepsValues);
          this.props.change('recipe_steps', newRecipeStepsValues);
        }
      }
    }
    else {
      throwError('move step down function being called for item with last index in array.', 'components/recipes/EditRecipeForm.js', '_moveStepDown');
    }
  }

  _removeStep(index){
    let recipeStepsValues = _.size(this.props.formValues.EditRecipeForm) && _.size(this.props.formValues.EditRecipeForm.values) && _.size(this.props.formValues.EditRecipeForm.values.recipe_steps) ? this.props.formValues.EditRecipeForm.values.recipe_steps : null;
    if(recipeStepsValues){
      recipeStepsValues.splice(index, 1);
      for( let i = 0; i < recipeStepsValues.length; i++){
        recipeStepsValues[i].order = i * 10 + 10;
      }
      this.props.change('recipe_steps', recipeStepsValues);
    }
  }

  _modalCloseButton(){
    let buttonText;
    let buttonColor = 'gray';

    switch (this.state.editRecipeFieldModalAction){
      case 'recipeStepsMenu':
      case 'recipeAttributesMenu':
        buttonText = 'Cancel';
        break;
      default:
        buttonText = 'Save & Continue';
        buttonColor = 'green';
        break;
    }
    return (
      <Button
        title={buttonText}
        onPress={() => this._modalSubmit()}
        backgroundColor={buttonColor}
      />
    )
  }

  // _submitOLD(values) {
  //   console.log(values);
  //   throw new SubmissionError('hi');
  //   return sleep(1000).then(() => {
  //     // simulate server latency
  //     if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
  //       throw new SubmissionError({
  //         username: 'User does not exist',
  //         _error: 'Login failed!'
  //       })
  //     } else if (values.password !== 'redux-form') {
  //       throw new SubmissionError({
  //         password: 'Wrong password',
  //         _error: 'Login failed!'
  //       })
  //     } else {
  //       window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
  //     }
  //   })
  // }

  _stepFieldToValidate(subfields, field, values){
    let error = undefined;
    _.forEach(subfields, (subfield) => {
      const result = recipe_steps_validation[field][subfield](values && values[subfield]);
      error = !error && result ? result : error;
    });
    return error;
  }

  _validateForm(values){
    let errorsToThrow = {};
    let recipeStepErrors = [];
    if (!values.grind) {
      errorsToThrow.grind = 'You need to specify a grind setting.';
    }
    //* Not sure if I want to wrap this in a function or just do it here.
    // this._recipeFieldToValidate('grind', values, errorsToThrow);

    //* Validate each recipe step
    if(values.recipe_steps){
      values.recipe_steps.forEach((recipe_step, index) => {
        const { values } = recipe_step;
        // let recipe_step_subfields;
        let subfieldValidation;
        switch (recipe_step.field_id) {
          case 'default_wait':
            subfieldValidation = this._stepFieldToValidate([ 'length', 'notes' ], recipe_step.field_id, values);
            if(subfieldValidation){
              recipeStepErrors[index] = subfieldValidation;
            }
            break;
          case 'default_taint':
            subfieldValidation = this._stepFieldToValidate([ 'notes' ], recipe_step.field_id, values);
            if(subfieldValidation){
              recipeStepErrors[index] = subfieldValidation;
            }
            break;
          case 'default_pre_infusion':
            break;
          case 'default_primary_infusion':
            break;
          case 'default_bloom':
            break;
          case 'default_pour':
            break;
        }
      })
    }

    //* Append recipe step errors to main errors
    if(_.size(recipeStepErrors)){
      errorsToThrow.recipeSteps = [];
      recipeStepErrors.forEach((error, index) => {
        errorsToThrow.recipeSteps[index] = error;
      });
    }

    //* Throw the mega error
    if(_.size(errorsToThrow)){
      throw new SubmissionError(errorsToThrow);
    }
  }

  _submit(values) {
    // console.log('form submitted with', values);
    // console.log('props on form submit', this.props);
    const errors = this._validateForm(values);
    console.log('ezzrrors', errors);

    if(_.size(errors)){
      // throw new SubmissionError(errorsToThrow);
    }
    //* No errors; submit the form.
    else {
      this.props.saveRecipe(values);
    }
  }



  _modalSubmit(){
    //* Note: I am tabling validation for now, so not worrying about all this bulllllshit
    this.editRecipeFieldModal.hide();



    // //* Validate the fields that are currently showing in the modal
    // // console.log('this props', this.props);
    // console.log('valid', this.props.valid);
    // // console.log('submit pressed', this.props);
    //
    //
    // const {
    //   formValues: {EditRecipeForm: { syncErrors }},
    //   submitFailed,
    //   touch,
    //   valid
    // } = this.props;
    //
    // //* TODO get this all working
    // if(!valid){
    //   console.log('form is not valid. ', syncErrors);
    //   // this.props.touch()
    //   // this.props.touch(...Object.keys( this.props.formValues.EditRecipeForm.syncErrors));
    //
    //   const toTouch = [];
    //
    //   for (const key in syncErrors) {
    //     syncErrors.hasOwnProperty(key) && toTouch.push(key)
    //   }
    //   touch(...toTouch)
    //
    //   // console.log(this.props.formErrors);
    //   // this.props.touch(...Object.keys(this.props.formErrors))
    // }
    // else {
    //   this.editRecipeFieldModal.hide();
    // }
    // // this.props.touch();
    //
    // // this.props.handleSubmit(this._submit);
    // // this.editRecipeFieldModal.hide();
  }

  _getModalContent(){
    switch (this.state.editRecipeFieldModalAction){
      case 'recipeStepsMenu':
        return (
          <RecipeStepFieldPicker
            recipeSteps={this.props.recipeSteps}
            formValues={this.props.formValues}
            onStepPress={(step) => this._modalSelectStep(step)}
            brewMethods={this.props.brewMethods}
          />
        );

      case 'recipeAttributesMenu':
        return (
          <RecipeAttributesFieldPicker
            formValues={this.props.formValues}
            onAttributePress={(attribute) => this._modalSelectAttribute(attribute)}
            brewMethods={this.props.brewMethods}
          />
        );

      case 'editField':
        return (
          <RecipeFormField name={this.state.editingRecipeFieldName} />
        );

      case 'editStep':
        return (
          <RecipeStepFormField
            name={this.state.editingRecipeFieldName}
            stepFieldIndex={this.state.stepFieldIndex}
          />
        );
    }
  }

  _modalSelectAttribute(attribute){
    console.log('selected attribute: ', attribute);
    this.setState({
      editRecipeFieldModalAction: 'editField',
      editingRecipeFieldName: attribute.id,
      showModalBackToFieldListButton: true,
      stepFieldIndex: null
    });
    this.editRecipeFieldModal.show();
  }

  _modalSelectStep(step){
    const stepFieldIndex = _.size(this.props.formValues.EditRecipeForm.values) && _.size(this.props.formValues.EditRecipeForm.values.recipe_steps) ? _.size(this.props.formValues.EditRecipeForm.values.recipe_steps) : 0;
    const newItemOrder = stepFieldIndex * 10 + 10;
    // console.log('newItemOrder', newItemOrder);
    this.props.dispatch(arrayPush('EditRecipeForm', 'recipe_steps', {
      id: generateRandomID('step'),
      field_id: step.id,
      order: newItemOrder,
      values: recipeStepFieldDefaultValues(step.id)
    }));
    this.setState({
      editRecipeFieldModalAction: 'editStep',
      editingRecipeFieldName: step.id, // prob gonna have to grab its index instead
      showModalBackToFieldListButton: false,
      stepFieldIndex: stepFieldIndex
    });
  }

  //* Return True if values are set.
  _editRecipeFormValues(){
    return (_.size(this.props.formValues.EditRecipeForm) && _.size(this.props.formValues.EditRecipeForm.values));
  }

  _brewMethodArea(){
    let brewMethodOutput;

    //* Brew Method is set
    if(this._editRecipeFormValues() && this.props.formValues.EditRecipeForm.values.brew_method) {
      const thisBrewMethodID = _.size(this.props.formValues.EditRecipeForm) && _.size(this.props.formValues.EditRecipeForm.values) && this.props.formValues.EditRecipeForm.values.brew_method ? this.props.formValues.EditRecipeForm.values.brew_method : null;
      const thisBrewMethod = thisBrewMethodID && _.size(this.props.brewMethods) && _.size(this.props.brewMethods.brewMethods) && this.props.brewMethods.brewMethods[thisBrewMethodID] ? this.props.brewMethods.brewMethods[thisBrewMethodID] : false;
      brewMethodOutput = (
        <TouchableOpacity style={styles.brewMethodInnerContainer} onPress={() => { this._showEditFormFieldModal('brew_method') }}>
          {/*<Icon name="coffee" size={56} />*/}
          <BrewMethodIcon brew_method={thisBrewMethod.id} />
          {thisBrewMethod && thisBrewMethod.name && <Headline style={{ marginBottom: 0 }}>{thisBrewMethod.name}</Headline>}
        </TouchableOpacity>
      );
    }
    else {
      brewMethodOutput = (
        <TouchableOpacity style={styles.brewMethodInnerContainer} onPress={() => { this._showEditFormFieldModal('brew_method') }}>
          <Icon name="plus" size={56} />
          <Headline style={{ marginBottom: 0 }}>Select Brew Method</Headline>
        </TouchableOpacity>
      );
    }

    const thisForm = _.size(this.props.formValues) && _.size(this.props.formValues.EditRecipeForm) ? this.props.formValues.EditRecipeForm : false;
    const values = thisForm && _.size(thisForm.values) ? thisForm.values : false;

    const thisBean = _.size(this.props.beans) && _.size(this.props.beans.beans) && this.props.beans.beans[values.bean_id] ? this.props.beans.beans[values.bean_id] : false;
    const thisBeanCafe = _.size(this.props.cafes) && _.size(this.props.cafes.cafes) && thisBean && thisBean.cafe && this.props.cafes.cafes[thisBean.cafe] ? this.props.cafes.cafes[thisBean.cafe] : false;


    return (
      <View style={styles.brewMethodContainer}>
        {brewMethodOutput}

        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { this._showEditFormFieldModal('bean_id') }}>
          <BodyText noMargin>{_.size(values) && values.bean_id && thisBean ? `${thisBeanCafe && thisBeanCafe.name ? `Roaster: ${thisBeanCafe.name} | ` : ''}Bean: ${thisBean.name}` : '» Press Here to Choose Bean'}</BodyText>
          {this._fieldErrorDisplay('bean_id')}
          {/*{submitErrors && submitErrors.grind && _.size(formMeta.grind) && formMeta.grind.touched && <Text style={{ color: '#f00' }}>{submitErrors.grind}</Text>}*/}
        </TouchableOpacity>
      </View>
    );
  }

  _hasRecipeAttributes(){
    return (
      this._editRecipeFormValues() &&
      (
        this.props.formValues.EditRecipeForm.values.notes_for_next_time ||
        this.props.formValues.EditRecipeForm.values.nickname ||
        this.props.formValues.EditRecipeForm.values.recipe_notes ||
        this.props.formValues.EditRecipeForm.values.recipe_objectives
      )
    );
  }

  _notesForNextTimeArea(){
    if(this._editRecipeFormValues() && this.props.formValues.EditRecipeForm.values.notes_for_next_time) {
      return (
        <RecipeAttribute
          label="Notes for Next Time:"
          content={this.props.formValues.EditRecipeForm.values.notes_for_next_time}
          onEditPress={() => { this._showEditFormFieldModal('notes_for_next_time') }}
        />
      );
    }
  }

  _recipeNicknameArea(){
    if(this._editRecipeFormValues() && this.props.formValues.EditRecipeForm.values.nickname) {
      return (
        <RecipeAttribute
          label="Recipe Nickname:"
          content={this.props.formValues.EditRecipeForm.values.nickname}
          onEditPress={() => { this._showEditFormFieldModal('nickname') }}
        />
      );
    }
  }

  _recipeNotesArea(){
    if(this._editRecipeFormValues() && this.props.formValues.EditRecipeForm.values.recipe_notes) {
      return (
        <RecipeAttribute
          label="Recipe Notes:"
          content={this.props.formValues.EditRecipeForm.values.recipe_notes}
          onEditPress={() => { this._showEditFormFieldModal('recipe_notes') }}
        />
      );
    }
  }

  _recipeObjectivesArea(){
    if(this._editRecipeFormValues() && this.props.formValues.EditRecipeForm.values.recipe_objectives) {
      return (
        <RecipeAttribute
          label="Recipe Objectives:"
          content={this.props.formValues.EditRecipeForm.values.recipe_objectives}
          onEditPress={() => { this._showEditFormFieldModal('recipe_objectives') }}
        />
      );
    }
  }
}

const initializedValues = {
  overall_rating: 5,
};

const mapStateToProps = (state) => {
  return {
    initialValues: {
      ...initializedValues,
      ...state.recipes.currentlyEditingRecipe
    },
    loading: state.recipes.loading,
    brewMethods: state.brewMethods,
    recipeSteps: state.recipeSteps,
    formValues: state.form,
    beans: state.beans,
    origins: state.origins,
    beanProcesses: state.beanProcesses,
    fields: getFormMeta('EditRecipeForm')(state),
    cafes: state.cafes,
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
