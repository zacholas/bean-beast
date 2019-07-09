import React, { Component } from 'react';
import PropTypes from "prop-types";
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { BodyText } from "../common";
import { TextField, PickerField, DatePickerField, SliderField, LabeledSliderField, SwitchField, ImageUploadField } from "../common/reduxForm";
import { Button } from "../common";
import { required, futureDate, alwaysError } from "../../helpers";
import { saveBean, clearBeanModalData } from "../../actions";
import Modal from '../common/Modal';
import EditCafeForm from '../cafes/EditCafeForm';
import {bodyText, textLink} from "../../constants/Styles";
import * as styles from "../common/reduxForm/Styles";
import EditOriginForm from "../origins/EditOriginForm";
import {roastLevelDisplay} from "../../helpers/labels";

class EditBeanForm extends Component {
  constructor(props){
    super(props);
    this.addCafeModal = null;
    this.addOriginModal = null;
  }

  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);

    //* If this is in "create" mode, and there are no initial values already, set them.
    if(!this.props.initialValues && this.props.type === 'create'){
      this.props.change('roast_date', new Date());
    }
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if(nextProps.modalData.cafe){
      this.props.change('cafe', nextProps.modalData.cafe);
      this.props.clearBeanModalData();
    }

    if(nextProps.modalData.origin){
      this.props.change('origin', nextProps.modalData.origin);
      this.props.clearBeanModalData();
    }
  }

  beanNamePlaceholder(){
    if(this.props.formValues.EditBeanForm !== undefined && this.props.formValues.EditBeanForm.values !== undefined){
      const { roast_level } = this.props.formValues.EditBeanForm.values;
      const originID = this.props.formValues.EditBeanForm.values.origin;
      const origin = originID ? this.props.origins[originID] : null;

      let output = '';
      output = origin && origin.country ? output.concat(origin.country + ' ') : output;
      output = origin && origin.region ? output.concat(origin.region + ' ') : output;
      output = roast_level ? output.concat(roastLevelDisplay(roast_level)) : output;

      return output;
    }

    return null;
  }

  render() {
    const cafeFieldLabel = (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Roastery:</Text>
        <TouchableOpacity onPress={() => this.addCafeModal.show()}>
          <BodyText style={textLink}>+ Add New Roastery</BodyText>
        </TouchableOpacity>
      </View>
    );

    const originFieldLabel = (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Origin:</Text>
        <TouchableOpacity onPress={() => this.addOriginModal.show()}>
          <BodyText style={textLink}>+ Add New Origin</BodyText>
        </TouchableOpacity>
      </View>
    );

    const { handleSubmit, loading } = this.props;
    const cafes = _.orderBy(this.props.cafes, ['name'], ['asc']);
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
      <View>
        <ImageUploadField
          name="bean_image"
          label="Bean Image"
        />
        <PickerField
          name="origin"
          label={originFieldLabel}
          options={origins}
          validate={[required]}
        />
        <LabeledSliderField
          name="roast_level"
          label="Roast Level"
          step={1}
          minimumValue={1}
          maximumValue={5}
          tallNotches={[1, 3, 5]}
          bottomLabels={[
            { content: 'Light' },
            { content: 'Medium' },
            { content: 'Dark' },
          ]}
        />
        {/*<SliderField*/}
          {/*name="roast_levelz"*/}
          {/*label="Roast Level"*/}
          {/*step={0.01}*/}
          {/*textLabelEnabled={true}*/}
          {/*textLabelPosition="right"*/}
        {/*/>*/}
        <DatePickerField
          name="roast_date"
          label="Roast Date"
          mode="date"
        />
        <TextField
          name="name"
          label="Bean Name"
          placeholder={this.beanNamePlaceholder()}
        />

        <PickerField
          name="cafe"
          label={cafeFieldLabel}
          options={cafes}
          validate={[required]}
        />
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
        <Button
          title="Save Bean"
          onPress={handleSubmit((values) => this.props.saveBean(values))}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />

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
  enableReinitialize: true,
})(EditBeanForm);

EditBeanForm = connect(mapStateToProps, { saveBean, clearBeanModalData })(EditBeanForm);

export default EditBeanForm;

EditBeanForm.propTypes = {
  navigation: PropTypes.object.isRequired
};
