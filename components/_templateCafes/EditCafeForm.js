import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from "prop-types";
import { saveCafe } from "../../actions";
import { TextField } from "../common/reduxForm";
import { Button } from "../common";
import { required } from "../../helpers";
// import Modal from "../common/Modal";

class EditCafeForm extends Component {
  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);
    this.props.change('modal', this.props.modal);
  }

  render() {
    // console.log(Object.keys(this.props.modal).length ? 'yes!': 'no');
    const { handleSubmit, loading } = this.props;
    return (
      <View>
        <TextField
          name="name"
          label="Cafe / Roaster Name"
          validate={[required]}
        />
        <Button
          title="Save Cafe"
          onPress={handleSubmit((values) => this.props.saveCafe(values))}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.cafes.currentlyEditingCafe,
    loading: state.cafes.loading,
  }
};

EditCafeForm = reduxForm({
  form: 'EditCafeForm',
  enableReinitialize: true,
})(EditCafeForm);

EditCafeForm = connect(mapStateToProps, { saveCafe })(EditCafeForm);

export default EditCafeForm;

EditCafeForm.propTypes = {
  navigation: PropTypes.object.isRequired,
  modal: PropTypes.object
};

EditCafeForm.defaultProps = {
  modal: {}
};
