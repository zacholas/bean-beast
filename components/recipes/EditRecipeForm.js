import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { reduxForm, arrayPush, SubmissionError, getFormMeta } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { saveRecipe } from "../../actions";
import { TextField, PickerField, LabeledSliderField } from "../common/reduxForm";
import {BodyText, Button, Container, Headline, Hr} from "../common";
import { getBrewRatio, getDaysOffRoast, isDefined, isNumeric, required, throwError } from "../../helpers";
import _ from "lodash";
import RecipeFormField from './formFields/RecipeFormField';
import RecipeStepFormField from './formFields/RecipeStepFormField';
import RecipeSteps from './recipeSteps/RecipeSteps';
import Modal from "../common/Modal";
import styles from "../../screens/recipes/styles";
import {
  colorGray100,
  colorGray1200,
  colorGray400,
  colorGray600,
  colorGray800,
  colorWhite
} from "../../constants/Colors";
import colors from "../../constants/Colors";
import { bodyText, defaultMarginAmount, marginBottom, textLink } from "../../constants/Styles";
import RecipeStepFieldPicker from './recipeSteps/RecipeStepFieldPicker';
import RecipeAttributesFieldPicker from './RecipeAttributesFieldPicker';
import { generateRandomID, recipeStepFieldDefaultValues, recipeSteps_default_wait_length } from "../../helpers";
import { recipe_steps_validation } from "./recipeSteps/RecipeStepsFormValidation";
import {
  beanTitleDisplay,
  temperatureInOtherUnit,
  temperatureInRecipePreference,
  temperatureInUserPreference
} from "../../helpers/labels";
import { FavoriteField } from "./formFields/fields/FavoriteField";
import BrewMethodIcon from "./BrewMethodIcon";
import RecipeAttribute from "./RecipeAttribute";
import { Strong } from "../common/Text/Strong";

const thisStyles = StyleSheet.create({
  gridDynamicItem: {
    ...styles.recipePrimaryInfo,
    backgroundColor: colorWhite,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorGray400
  }
});

class EditRecipeForm extends Component {
  constructor(props){
    super(props);
    this.editRecipeFieldModal = null;
    this.state = {
      editRecipeFieldModalAction: null,
      editingRecipeFieldName: null,
      showModalBackToFieldListButton: false,
      stepFieldIndex: null,
      loaded: false
    };
  }

  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);
    this.props.change('modal', this.props.modal);
    this.props.change('bean_id', this.props.bean_id);

    console.log('temperatureMeasurement when mounting: ', this.props.initialValues.temperatureMeasurement);
    if(!this.props.initialValues.temperatureMeasurement || this.props.initialValues.temperatureMeasurement === ''){
      console.log('no temp!', this.props.userPreferences.global_temperatureMeasurement);
      const tempPreference = _.size(this.props) && _.size(this.props.userPreferences) && this.props.userPreferences.global_temperatureMeasurement ? this.props.userPreferences.global_temperatureMeasurement : false;
      if(tempPreference){
        this.props.change('temperatureMeasurement', tempPreference);
      }
    }
  }

  componentDidMount(): void {
    // const thisForm = _.size(this.props.formValues) && _.size(this.props.formValues.EditRecipeForm) ? this.props.formValues.EditRecipeForm : false;
    // const values = thisForm && _.size(thisForm.values) ? thisForm.values : false;
    // console.log('values when mounting: ', this.props.initialValues);
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    const currentBeanID = _.size(this.props) && _.size(this.props.formValues) && _.size(this.props.formValues.EditRecipeForm) && _.size(this.props.formValues.EditRecipeForm.values) && this.props.formValues.EditRecipeForm.values.bean_id ? this.props.formValues.EditRecipeForm.values.bean_id : null;
    const nextBeanID = _.size(nextProps) && _.size(nextProps.formValues) && _.size(nextProps.formValues.EditRecipeForm) && _.size(nextProps.formValues.EditRecipeForm.values) && nextProps.formValues.EditRecipeForm.values.bean_id ? nextProps.formValues.EditRecipeForm.values.bean_id : null;
    const daysOffRoast = _.size(nextProps) && _.size(nextProps.formValues) && _.size(nextProps.formValues.EditRecipeForm) && _.size(nextProps.formValues.EditRecipeForm.values) && nextProps.formValues.EditRecipeForm.values.days_off_roast ? nextProps.formValues.EditRecipeForm.values.days_off_roast : undefined;

    //* Bean has changed, so re-set the time off roast.
    if(nextBeanID && nextBeanID !== currentBeanID && this.state.loaded === true){
      console.log('next bean is different than prev')
      const nextBean = _.size(this.props.beans) && _.size(this.props.beans.beans) && this.props.beans.beans[nextBeanID] ? this.props.beans.beans[nextBeanID] : false;
      const daysOffRoast = getDaysOffRoast(nextBean);
      if(daysOffRoast && daysOffRoast.diffDays){
        this.props.change('days_off_roast', daysOffRoast.diffDays);
      }
      else {
        this.props.change('days_off_roast', null); // For if they switch to a bean that doesn't have the roast date enabled
      }
    }
    //* For cloning a recipe initial setting
    else if(this.state.loaded === false && nextBeanID && !isDefined(daysOffRoast)){
      console.log('doing the initial setting of the time off roast');
      const nextBean = _.size(this.props.beans) && _.size(this.props.beans.beans) && this.props.beans.beans[nextBeanID] ? this.props.beans.beans[nextBeanID] : false;
      const daysOffRoast = getDaysOffRoast(nextBean);
      if(daysOffRoast && daysOffRoast.diffDays){
        this.props.change('days_off_roast', daysOffRoast.diffDays);
      }
    }

    this.setState({ loaded: true }); // Using this to make sure we're comparing to the nextProps AFTER the component has been initialized
  }

  render() {
    const { handleSubmit, loading } = this.props;
    const thisForm = _.size(this.props.formValues) && _.size(this.props.formValues.EditRecipeForm) ? this.props.formValues.EditRecipeForm : false;
    const values = thisForm && _.size(thisForm.values) ? thisForm.values : false;
    const thisBean = _.size(this.props.beans) && _.size(this.props.beans.beans) && this.props.beans.beans[values.bean_id] ? this.props.beans.beans[values.bean_id] : false;
    const thisBeanCafe = _.size(this.props.cafes) && _.size(this.props.cafes.cafes) && thisBean && thisBean.cafe && this.props.cafes.cafes[thisBean.cafe] ? this.props.cafes.cafes[thisBean.cafe] : false;
    const { submitErrors } = thisForm;
    const formMeta = this.props.fields;
    if(submitErrors){
      console.log('submit errors: ', submitErrors);
    }

    let beans = _.map(this.props.beans.beans, (bean) => {
      bean.name = beanTitleDisplay(bean, this.props.origins.origins, this.props.beanProcesses.beanProcesses);
      return bean;
    });

    beans = _.orderBy(beans, ['name'], ['asc']);

    // let temperature = null;
    // if(values.temperature && values.temperatureMeasurement){
    //
    // }
    const temperature = _.size(values) && values.temperature ? temperatureInRecipePreference(values.temperature, this.props.userPreferences, values.temperatureMeasurement) : false;
    const tempInOtherUnit = temperatureInOtherUnit(values.temperature, values.temperatureMeasurement);

    //* Brew equipment
    const thisBrewEquipmentName = _.size(values) && values.brew_equipment && _.size(this.props.equipment) && _.size(this.props.equipment.equipment) && _.size(this.props.equipment.equipment[values.brew_equipment]) && this.props.equipment.equipment[values.brew_equipment].name ? this.props.equipment.equipment[values.brew_equipment].name : null;
    const thisGrinderName = _.size(values) && values.grinder && _.size(this.props.equipment) && _.size(this.props.equipment.equipment) && _.size(this.props.equipment.equipment[values.grinder]) && this.props.equipment.equipment[values.grinder].name ? this.props.equipment.equipment[values.grinder].name : null;

    const brewRatio = getBrewRatio(values);
    const daysOffRoast = _.size(values) && values.days_off_roast ? values.days_off_roast : undefined;

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

        {/* Choose Bean */}
        <View style={{ ...styles.recipePrimaryInfoBar, marginBottom: 0 }}>
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._showEditFormFieldModal('bean_id') }}>
            <Headline h6 noMargin>Bean</Headline>
            <BodyText noMargin>{_.size(values) && values.bean_id && thisBean ? `${thisBeanCafe && thisBeanCafe.name ? `Roaster: ${thisBeanCafe.name} | ` : ''}Bean: ${thisBean.name}` : '» Select'}</BodyText>
            {this._fieldErrorDisplay('bean_id')}
          </TouchableOpacity>
        </View>

        {/* Brewing Equipment & Accessories */}
        <View style={{ ...styles.recipePrimaryInfoBar, marginBottom: 0 }}>
          {/*Grind*/}
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._showEditFormFieldModal('grind') }}>
            <Headline h6 noMargin>Grind</Headline>
            <BodyText noMargin>{_.size(values) && values.grind ? values.grind : '+ Add'}</BodyText>
            {_.size(values) && values.grind && thisGrinderName ? <BodyText style={{ fontSize: 12 }} noMargin>({thisGrinderName})</BodyText> : <View />}
            {this._fieldErrorDisplay('grind')}
            {/*{submitErrors && submitErrors.grind && _.size(formMeta.grind) && formMeta.grind.touched && <Text style={{ color: '#f00' }}>{submitErrors.grind}</Text>}*/}
          </TouchableOpacity>

          {/*Equipment*/}
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._showEditFormFieldModal('brew_equipment') }}>
            <Headline h6 noMargin>Brew Equipment</Headline>
            <BodyText noMargin>{_.size(values) && values.brew_equipment && thisBrewEquipmentName ? thisBrewEquipmentName : '» Select'}</BodyText>
          </TouchableOpacity>
        </View>

        {/* Grind, Dose, Temp */}
        <View style={{ ...styles.recipePrimaryInfoBar, marginBottom: 0 }}>

          {/*Dose*/}
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._showEditFormFieldModal('dose') }}>
            <Headline h6 noMargin>Dose</Headline>
            <BodyText noMargin>{_.size(values) && values.dose ? `${values.dose}g` : '+ Add'}</BodyText>
          </TouchableOpacity>

          {/* Yield */}
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._showEditFormFieldModal('yield') }}>
            <Headline h6 noMargin>Yield</Headline>
            <BodyText noMargin>{_.size(values) && values.yield ? `${values.yield}g` : '+ Add'}</BodyText>
            {/*{this._fieldErrorDisplay('grind')}*/}
            {/*{submitErrors && submitErrors.grind && _.size(formMeta.grind) && formMeta.grind.touched && <Text style={{ color: '#f00' }}>{submitErrors.grind}</Text>}*/}
          </TouchableOpacity>

          {/*Temp*/}
          <TouchableOpacity style={styles.recipePrimaryInfo} onPress={() => { this._showEditFormFieldModal('temperature') }}>
            <Headline h6 noMargin>Temp</Headline>
            {/*<BodyText noMargin>{_.size(values) && values.temperature ? `${values.temperature}° ${values.temperatureMeasurement ? values.temperatureMeasurement.toString().toUpperCase() : 'C'}` : '+ Add'}</BodyText>*/}
            <BodyText noMargin>{temperature ? temperature : '+ Add'}</BodyText>
            {tempInOtherUnit ? <BodyText noMargin style={{ fontSize: 13 }}>({tempInOtherUnit})</BodyText> : <View />}
          </TouchableOpacity>


        </View>

        {/*<TextField*/}
          {/*name="grind2"*/}
          {/*label="Grind2"*/}
          {/*validate={[required]}*/}
        {/*/>*/}

        {/*<View style={{ flexDirection: 'row', alignItems: 'space-between' }}>*/}
          {/*{this._getDaysOffRoast()}*/}
          {/*{brewRatio ? <View style={{ flex: 1 }}><BodyText><Strong>Brew ratio: </Strong>{brewRatio}</BodyText></View> : <View/>}*/}
        {/*</View>*/}

        <View style={{ ...styles.recipePrimaryInfoBar }}>
          {isDefined(daysOffRoast) && isNumeric(daysOffRoast) ? (
            <View style={thisStyles.gridDynamicItem}>
              <BodyText noMargin style={{ fontSize: 21 }}>{daysOffRoast}</BodyText>
              <Headline h6 noMargin style={{ ...bodyText, fontSize: 12 }}>Days off Roast</Headline>
            </View>
          ) : <View/>}

          {brewRatio ? (
            <View style={thisStyles.gridDynamicItem}>
              <BodyText noMargin style={{ fontSize: 21 }}>{brewRatio}</BodyText>
              <Headline h6 noMargin style={{ ...bodyText, fontSize: 12 }}>Brew Ratio</Headline>
            </View>
          ) : <View/>}
        </View>

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
    const thisForm = _.size(this.props.formValues) && _.size(this.props.formValues.EditRecipeForm) ? this.props.formValues.EditRecipeForm : false;
    const values = thisForm && _.size(thisForm.values) ? thisForm.values : false;
    // console.log('values', values);

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
          <RecipeFormField
            name={this.state.editingRecipeFieldName}
            temperatureMeasurement={values.temperatureMeasurement}
          />
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
          <Headline h4 noMargin>Select Brew Method</Headline>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.brewMethodContainer}>
        {brewMethodOutput}
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

  _getDaysOffRoast() {
    const thisForm = _.size(this.props.formValues) && _.size(this.props.formValues.EditRecipeForm) ? this.props.formValues.EditRecipeForm : false;
    const values = thisForm && _.size(thisForm.values) ? thisForm.values : false;
    if(values.days_off_roast){
      return <View style={{ flex: 1 }}><BodyText><Strong>Days off roast: </Strong>{values.days_off_roast}</BodyText></View>
    }
    // else {
    //   const thisBean = _.size(this.props.beans) && _.size(this.props.beans.beans) && this.props.beans.beans[values.bean_id] ? this.props.beans.beans[values.bean_id] : false;
    //   const daysOffRoast = getDaysOffRoast(thisBean);
    //   if (thisBean && daysOffRoast && daysOffRoast.output) {
    //     return <View><BodyText>{daysOffRoast.output}</BodyText></View>
    //   }
    //   return <View />;
    // }
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
    equipment: state.equipment,
    userPreferences: state.userPreferences,
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
