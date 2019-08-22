import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import PropTypes from "prop-types";
import { saveBeanProcess } from "../../actions";
import { TextField } from "../common/reduxForm";
import { BodyText, Button } from "../common";
import { required } from "../../helpers";
import {bodyText} from "../../constants/Styles";
import * as styles from "../common/reduxForm/Styles";
// import Modal from "../common/Modal";

class EditBeanProcessForm extends Component {
  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);
    this.props.change('fieldPrefix', this.props.fieldPrefix);
    this.props.change('modal', this.props.modal);
    this.props.change('order', this.props.beanProcessOrder);
  }

  render() {
    const { handleSubmit, loading } = this.props;
    return (
      <View>
        <TextField
          name="name"
          label="Bean Process Name"
          validate={[required]}
        />
        <BodyText>
          (Note: You can re-order your bean processes later in the app settings.)
        </BodyText>
        <Button
          title="Save Bean Process"
          onPress={handleSubmit((values) => this.props.saveBeanProcess(values))}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let beanProcessOrder = 0;
  if(_.size(state.beanProcesses.beanProcesses)){
    const sortedBeanProcesses = _.orderBy(state.beanProcesses.beanProcesses, ['order'], ['desc']);
    if(!isNaN(sortedBeanProcesses[0].order)){
      beanProcessOrder = sortedBeanProcesses[0].order + 10;
    }
  }

  return {
    initialValues: state.beanProcesses.currentlyEditingBeanProcess,
    loading: state.beanProcesses.loading,
    beanProcessOrder
  }
};

EditBeanProcessForm = reduxForm({
  form: 'EditBeanProcessForm',
  enableReinitialize: true,
})(EditBeanProcessForm);

EditBeanProcessForm = connect(mapStateToProps, { saveBeanProcess })(EditBeanProcessForm);

export default EditBeanProcessForm;

EditBeanProcessForm.propTypes = {
  navigation: PropTypes.object.isRequired,
  modal: PropTypes.object
};

EditBeanProcessForm.defaultProps = {
  modal: {}
};
