import React, { Component } from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { TextField, DatePickerField, PickerField } from "../common/reduxForm";
import { BodyText, Button, ScrollContainer } from "../common";
import { saveBean, clearBeanModalData } from "../../actions";
import BeanPhoto from "./EditBeanFormSteps/BeanPhoto";
// import Origin from "./EditBeanFormSteps/Origin";
import RoastLevel from "./EditBeanFormSteps/RoastLevel";
import BeanName from "./EditBeanFormSteps/BeanName";
// import Cafe from "./EditBeanFormSteps/Cafe";
import * as navRoutes from "../../constants/NavRoutes";
import ProgressBar from "../common/ProgressBar";
import { bodyText, defaultMarginAmount, defaultPaddingAmount, textLink } from "../../constants/Styles";
import EditCafeForm from "../cafes/EditCafeForm";
import Modal from "../common/Modal";
import EditOriginForm from "../origins/EditOriginForm";
import * as styles from "../common/reduxForm/Styles";
import { required } from "../../helpers";

class EditBeanForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      formStep: this.props.navigation.getParam('formStep', 1),
      formSteps: 6
    };

    this.addCafeModal = null;
    this.addOriginModal = null;
  }

  componentWillMount(): void {
    // console.log('this props is ', this.props);
    // console.log('this type is', this.props.type);
    // console.log('initial vals: ', this.props.initialValues);



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

  //* If the user adds a new cafe, origin, etc. in a modal, we then want to select that option on the form
  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if(nextProps.modalData && nextProps.modalData.cafe){
      console.log('New cafe was set', nextProps.modalData);
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
      <View>
        {this._cafePickerField()}
        {/*<Cafe navigation={this.props.navigation} cafes={this.props.cafes} addCafeModal={this.addCafeModal} />*/}
        <BeanPhoto />
      </View>
    );
  }

  formStepTwo(){
    return (
      <RoastLevel />
    );
  }

  formStepThree(){
    return this._originPickerField();
    // return (
    //   <Origin origins={this.props.origins} navigation={this.props.navigation} />
    // );
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

      </View>
    );
  }

  formStepSix(){
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
      case 6:
        return this.formStepSix();
    }
  }

  _cafePickerField(){
    console.log('cafes');
    const cafeFieldLabel = (
      <View style={{flexDirection: 'row'}}>
        <Text style={{...bodyText, ...styles.label, flex: 1}}>Roastery:</Text>
        <TouchableOpacity onPress={() => this.addCafeModal.show()}>
          <BodyText style={textLink}>+ Add New Roastery</BodyText>
        </TouchableOpacity>
      </View>
    );
    const cafes = _.orderBy(this.props.cafes, ['name'], ['asc']);

    return (
      <PickerField
        name="cafe"
        label={cafeFieldLabel}
        options={cafes}
        validate={[required]}
      />
    );
  }

  _originPickerField(){
    const originFieldLabel = (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Origin:</Text>
        <TouchableOpacity onPress={() => this.addOriginModal.show()}>
          <BodyText style={textLink}>+ Add New Origin</BodyText>
        </TouchableOpacity>
      </View>
    );

    const orderedOrigins = _.orderBy(this.props.origins, ['country', 'region'], ['asc', 'asc']);
    const origins = _.map(orderedOrigins, (origin) => {
      let output = '';
      output = origin.country ? output.concat(origin.country) : output;
      output = origin.country && origin.region ? output.concat(' — ') : output;
      output = origin.region ? output.concat(origin.region) : output;

      return {
        id: origin.id,
        name: output
      };
    });

    return (
      <PickerField
        name="origin"
        label={originFieldLabel}
        options={origins}
        // validate={[required]}
      />
    )
  }

  modals(){
    return (
      <View>
        <Modal ref={(ref) => { this.addCafeModal = ref; }} headlineText="Add New Cafe / Roastery">
          <EditCafeForm
            type="beanCreateModal"
            navigation={this.props.navigation}
            modal={this.addCafeModal}
          />
        </Modal>
        <Modal ref={(ref) => { this.addOriginModal = ref; }} headlineText="Add New Origin">
          <EditOriginForm
            type="beanCreateModal"
            navigation={this.props.navigation}
            modal={this.addOriginModal}
          />
        </Modal>
      </View>
    )
  }

  render() {
    // console.log('edit bean form modal ref parent', this.addCafeModal);
    return (
      <View style={{ flex: 1, paddingBottom: defaultPaddingAmount }}>
        <ScrollView style={{ flex: 1 }}>
          {this.getFormStep()}
        </ScrollView>
        <View style={{ marginTop: defaultPaddingAmount }}>
          {this.submitButton()}
          <ProgressBar currentStep={this.state.formStep} totalSteps={this.state.formSteps}/>
        </View>
        {this.modals()}
      </View>
    );
  }
}

const initializedValues = {
  roast_level: 3,
  roast_date: new Date()
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
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(EditBeanForm);

EditBeanForm = connect(mapStateToProps, { saveBean, clearBeanModalData })(EditBeanForm);

export default EditBeanForm;

EditBeanForm.propTypes = {
  navigation: PropTypes.object.isRequired
};
