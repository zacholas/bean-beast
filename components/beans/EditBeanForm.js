import React, { Component } from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { TextField, DatePickerField, PickerField } from "../common/reduxForm";
import { BodyText, Button, Headline, ScrollContainer } from "../common";
import { saveBean, clearBeanModalData } from "../../actions";
import BeanPhoto from "./EditBeanFormSteps/BeanPhoto";
import BeanDetails from "./EditBeanFormSteps/BeanDetails";
import RoastLevel from "./EditBeanFormSteps/RoastLevel";
import BeanName from "./EditBeanFormSteps/BeanName";
import Cafe from "./EditBeanFormSteps/Cafe";
import * as navRoutes from "../../constants/NavRoutes";
import ProgressBar from "../common/ProgressBar";
import { bodyText, defaultMarginAmount, defaultPaddingAmount, textLink } from "../../constants/Styles";
import {getDefaultRoastLevel, getFirstCoffeeSpecies} from "../../helpers";

// import EditCafeForm from "../cafes/EditCafeForm";
// import Modal from "../common/Modal";
// import EditOriginForm from "../origins/EditOriginForm";
// import * as styles from "../common/reduxForm/Styles";
// import { required } from "../../helpers";

class EditBeanForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      formStep: this.props.navigation.getParam('formStep', 1),
      formSteps: 5
    };
  }

  componentWillMount(): void {
    if(this.state.formStep === 1){
      this.props.change('type', this.props.type);
      this.props.change('navigation', this.props.navigation);
    }
    // else {
    //   this.props.change('type', this.props.navigation.getParam('type', 'create'));
    // }

    //* If this is in "create" mode, and there are no initial values already, set them. -- commented out to have in the initialize function
    // if(!this.props.initialValues && this.props.type === 'create'){
    //   this.props.change('roast_date', new Date());
    // }
  }

  _changeFieldOnPropsReceived(nextProps, modalDataFieldName, formFieldName){
    // console.log('~~~~~~~~~~ New style: ~~~~~~~~~~~~~~');
    // console.log('nextProps.modalData[modalDataFieldName]: ', nextProps.modalData[modalDataFieldName]);
    // console.log('`${nextProps.modalData.fieldPrefix}[${formFieldName}]`', `${nextProps.modalData.fieldPrefix}[${formFieldName}]`);
    if(_.size(nextProps.modalData) && nextProps.modalData[modalDataFieldName]){
      if(nextProps.modalData.fieldPrefix){
        this.props.change(`${nextProps.modalData.fieldPrefix}[${formFieldName}]`, nextProps.modalData[modalDataFieldName]);
      }
      this.props.change(formFieldName, nextProps.modalData[modalDataFieldName]);
      this.props.clearBeanModalData(); // Necessary in order for the field to be changeable afterwards
    }
  }

  //* If the user adds a new cafe, origin, etc. in a modal, we then want to select that option on the form
  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if(_.size(nextProps.modalData)){
      console.log('EditBeanForm.js — incoming modal data: ', nextProps.modalData);
    }

    this._changeFieldOnPropsReceived(nextProps, 'beanProcess', 'bean_process');
    this._changeFieldOnPropsReceived(nextProps, 'origin', 'origin');
    this._changeFieldOnPropsReceived(nextProps, 'roastLevel', 'roast_level');
    this._changeFieldOnPropsReceived(nextProps, 'cafe', 'cafe');
    this._changeFieldOnPropsReceived(nextProps, 'coffeeSpecies', 'coffee_species');
  }

  //* Output "Submit" button on last step and "Next Step" for all others
  submitButton(){
    const { handleSubmit, loading } = this.props;

    if(this.state.formStep < this.state.formSteps) {
      return (
        <View>
          <Button
            title="Next Step"
            onPress={handleSubmit((values) => {
              this.props.navigation.push(navRoutes.EDIT_BEAN, {
                ...this.props.navigation.state.params,
                formStep: this.state.formStep + 1,
              });
              // console.log('next step with ', values);
            })}
            iconName="arrow-right"
            backgroundColor="gray"
            spinner={loading}
          />
          { this.props.type === 'edit' &&
            <Button
              title="Save & Exit"
              onPress={handleSubmit((values) => {
                // this.props.navigation.navigate({
                //   routeName: navRoutes.EDIT_BEAN_PHOTO_STEP
                // });
                this.props.saveBean(values);
                this.props.destroy();
                // console.log('save bean with ', values);
              })}
              iconName="check"
              backgroundColor="green"
              spinner={loading}
            />
          }
        </View>
      );
    }
    else {
      return (
        <Button
          title="Save Bean"
          onPress={handleSubmit((values) => {
            // this.props.navigation.navigate({
            //   routeName: navRoutes.EDIT_BEAN_PHOTO_STEP
            // });
            this.props.saveBean(values);
            this.props.destroy();
            console.log('save bean with ', values);
          })}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />
      );
    }
  }

  formStepOne(){
    return (
      <View>
        {this._pageTitle()}
        <BeanPhoto />
      </View>
    );
  }

  formStepTwo(){
    return (
      <BeanDetails
        origins={this.props.origins}
        roastLevels={this.props.roastLevels}
        beanProcesses={this.props.beanProcesses}
        coffeeSpecies={this.props.coffeeSpecies}
        navigation={this.props.navigation}
        formValues={this.props.formValues}
        array={this.props.array}
        userPreferences={this.props.userPreferences}
      />
    );
  }

  formStepThree(){
    return (
      <BeanName
        formValues={this.props.formValues}
        origins={this.props.origins}
        beanProcesses={this.props.beanProcesses}
      />
    );
  }

  formStepFour(){
    return (
      <View>
        <DatePickerField
          name="roast_date"
          label="Roast Date"
          mode="date"
        />
        <Cafe navigation={this.props.navigation} cafes={this.props.cafes} />
      </View>
    );
  }

  formStepFive(){
    return (
      <View>
        <TextField
          name="tasting_notes"
          label="Tasting Notes"
          multiline
        />
        <TextField
          name="comments"
          label="Comments / Misc. Notes"
          multiline
        />
      </View>
    );
  }

  getFormStep(){
    switch (this.state.formStep){
      case 1:
      default:
        return this.formStepOne();
      case 2:
        return this.formStepTwo();
      case 3:
        return this.formStepThree();
      case 4:
        return this.formStepFour();
      case 5:
        return this.formStepFive();
    }
  }

  render() {
    // console.log('Edit Bean Form', this.props.initialValues.beanBlendComponents);
    if(
      this.props.formValues.EditBeanForm &&
      this.props.formValues.EditBeanForm.values &&
      this.props.formValues.EditBeanForm.values.beanBlendComponents
    ){
      // console.log('form values for all beans', this.props.formValues.EditBeanForm.values.beanBlendComponents);
    }
    return (
      <View style={{ flex: 1, paddingBottom: defaultPaddingAmount }}>
        <ScrollView style={{ flex: 1 }}>
          {this.getFormStep()}
        </ScrollView>
        <View style={{ marginTop: defaultPaddingAmount }}>
          {this.submitButton()}
          <ProgressBar currentStep={this.state.formStep} totalSteps={this.state.formSteps} textDisplay={true} />
        </View>
      </View>
    );
  }

  _pageTitle(){
    if(this.props.type === 'create'){
      return <Headline>Create New Bean</Headline>
    }
    else if(this.props.type === 'edit'){
      return <Headline>Edit Bean</Headline>
    }
  }
}

const initializedValues = {
  roast_date: new Date(),
  bean_type: 'single_origin',
};

const mapStateToProps = (state) => {
  return {
    cafes: state.cafes.cafes,
    origins: state.origins.origins,
    roastLevels: state.roastLevels.roastLevels,
    beanProcesses: state.beanProcesses.beanProcesses,
    coffeeSpecies: state.coffeeSpecies.coffeeSpecies,
    initialValues: {
      ...initializedValues,
      beanBlendComponents: [{
        //* NOTE: When updating the initial bean values here, be sure to update them in \components\beans\BeanBlendFormLayout.js @ ~line 101
        coffee_species: getFirstCoffeeSpecies(state.coffeeSpecies.coffeeSpecies),
        roast_level_advanced_mode: state.userPreferences.beanEntry.roastLevelAdvancedMode,
        basic_roast_level: 3
      }],
      ...state.beans.currentlyEditingBean,
    },
    loading: state.beans.loading,
    modalData: state.beans.modalData,
    formValues: state.form,
    userPreferences: state.userPreferences
  }
};

EditBeanForm = reduxForm({
  form: 'EditBeanForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(EditBeanForm);

EditBeanForm = connect(mapStateToProps, { saveBean, clearBeanModalData })(EditBeanForm);

export default EditBeanForm;

EditBeanForm.propTypes = {
  navigation: PropTypes.object.isRequired
};
