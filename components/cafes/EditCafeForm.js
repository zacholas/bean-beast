import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from "prop-types";
import { saveCafe } from "../../actions";
import { TextField } from "../common/reduxForm";
import { Button } from "../common";
import { required } from "../../helpers";

class EditCafeForm extends Component {
  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);
  }

  render() {
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

// const mapStateToProps = state => ({});
// const mapDispatchToProps = dispatch => ({});
// export default connect(mapStateToProps, mapDispatchToProps)(EditCafeForm);

const mapStateToProps = (state) => {
  // const initialValues = state.beans.bean;
  // const { beans } = state;
  return {
    initialValues: state.cafes.cafe,
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
  navigation: PropTypes.object.isRequired
};
