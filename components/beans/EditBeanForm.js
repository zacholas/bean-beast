import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { BodyText } from "../common";
import { TextField, Select } from "../common/reduxForm";
import { Button } from "../common";
import { required } from "../../helpers";
import { saveBean } from "../../actions";

class EditBeanForm extends Component {
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
          label="Bean Name"
          validate={[required]}
        />
        <Select
          name="cafe"
          label="Roastery"
          options={this.props.cafes}
          // validate={{required}}
        />
        <Button
          title="Save Bean"
          onPress={handleSubmit((values) => this.props.saveBean(values))}
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
    cafes: state.cafes.cafes,
    initialValues: state.beans.currentlyEditingBean,
    loading: state.beans.loading,
  }
};

EditBeanForm = reduxForm({
  form: 'EditBeanForm',
  enableReinitialize: true,
})(EditBeanForm);

EditBeanForm = connect(mapStateToProps, { saveBean })(EditBeanForm);

export default EditBeanForm;

EditBeanForm.propTypes = {
  navigation: PropTypes.object.isRequired
};
