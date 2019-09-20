import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from "prop-types";
import { saveRecipe } from "../../actions";
import { TextField } from "../common/reduxForm";
import { Button } from "../common";
import { required } from "../../helpers";
// import Modal from "../common/Modal";

class EditRecipeForm extends Component {
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
          name="grind"
          label="Grind"
          // validate={[required]}
        />
        <TextField
          name="dose"
          label="Dose"
          // validate={[required]}
        />
        <TextField
          name="temperature"
          label="Temperature"
          // validate={[required]}
        />
        <Button
          title="Save Recipe"
          onPress={handleSubmit((values) => this.props.saveRecipe(values))}
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
    initialValues: state.recipes.currentlyEditingRecipe,
    loading: state.recipes.loading,
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
