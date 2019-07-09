import React, { Component } from 'react';
import PropTypes from "prop-types";
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { TextField, DatePickerField } from "../common/reduxForm";
import { Button } from "../common";
import { saveBean, clearBeanModalData } from "../../actions";
import BeanPhoto from "./EditBeanFormSteps/BeanPhoto";
import Origin from "./EditBeanFormSteps/Origin";
import RoastLevel from "./EditBeanFormSteps/RoastLevel";
import BeanName from "./EditBeanFormSteps/BeanName";
import Cafe from "./EditBeanFormSteps/Cafe";
import * as navRoutes from "../../constants/NavRoutes";

class EditBeanForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      formStep: this.props.navigation.getParam('formStep', 1),
      totalFormSteps: 5 // TODO dont have this hard-coded
    }
  }

  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);

    //* If this is in "create" mode, and there are no initial values already, set them.
    if(!this.props.initialValues && this.props.type === 'create'){
      this.props.change('roast_date', new Date());
    }
  }

  //* If the user adds a new cafe, origin, etc. in a modal, we then want to select that option on the form
  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if(nextProps.modalData && nextProps.modalData.cafe){
      this.props.change('cafe', nextProps.modalData.cafe);
      this.props.clearBeanModalData(); // Necessary in order for the field to be changeable afterwards
    }

    if(nextProps.modalData && nextProps.modalData.origin){
      this.props.change('origin', nextProps.modalData.origin);
      this.props.clearBeanModalData(); // Necessary in order for the field to be changeable afterwards
    }
  }

  //* Output "Submit" button on last step and "Next Step" for all others
  submitButton(){
    const { handleSubmit, loading } = this.props;

    if(this.state.formStep < this.state.totalFormSteps) {
      return (
        <Button
          title="Next Step"
          onPress={handleSubmit((values) => {
            this.props.navigation.push(navRoutes.EDIT_BEAN, {
              formStep: this.state.formStep + 1,
            });
            // console.log('next step with ', values);
          })}
          iconName="arrow-right"
          backgroundColor="gray"
          spinner={loading}
        />
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
            this.props.saveBean(values)
            this.props.destroy();
            // console.log('save bean with ', values);
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
      <BeanPhoto />
    );
  }

  formStepTwo(){
    return (
      <RoastLevel />
    );
  }

  formStepThree(){
    return (
      <Origin origins={this.props.origins} navigation={this.props.navigation} />
    );
  }

  formStepFour(){
    return (
      <BeanName formValues={this.props.formValues} origins={this.props.origins} />
    );
  }

  formStepFive(){
    return (
      <View>
        <DatePickerField
          name="roast_date"
          label="Roast Date"
          mode="date"
        />
        <Cafe navigation={this.props.navigation} cafes={this.props.cafes}/>
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
    switch (this.state.formStep) {
      case 1:
        return this.formStepOne();
      case 2:
        return this.formStepTwo();
      case 3:
        return this.formStepThree();
      case 4:
        return this.formStepFour();
      case 5:
        return this.formStepFive();
      default:
        console.log('error in EditBeanForm.js @ getFormStep() -- hitting switch statement default');
        return this.formStepOne();
    }
  }

  render() {
    const { handleSubmit, loading } = this.props;
    // this.setState('formStep', this.props.navigation.getParam('formStep', 1));

    return (
      <View>
        {this.getFormStep()}
        {this.submitButton()}
      </View>
    );
  }
}

const initializedValues = {
  roast_level: 3,
};

const mapStateToProps = (state) => {
  return {
    cafes: state.cafes.cafes,
    origins: state.origins.origins,
    initialValues: {
      ...initializedValues,
      ...state.beans.currentlyEditingBean,
    },
    loading: state.beans.loading,
    modalData: state.beans.modalData,
    formValues: state.form
  }
};

EditBeanForm = reduxForm({
  form: 'EditBeanForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(EditBeanForm);

EditBeanForm = connect(mapStateToProps, { saveBean, clearBeanModalData })(EditBeanForm);

export default EditBeanForm;

EditBeanForm.propTypes = {
  navigation: PropTypes.object.isRequired
};
