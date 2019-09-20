import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from "prop-types";
import { saveRecipe } from "../../actions";
import { TextField, PickerField } from "../common/reduxForm";
import { Button, Hr } from "../common";
import { required } from "../../helpers";
import _ from "lodash";
import RecipeFormField from './formFields/RecipeFormField';
import RepeatableRecipeFields from './repeatableFields/RepeatableRecipeFields';
import Modal from "../common/Modal";

class EditRecipeForm extends Component {
  constructor(props){
    super(props);
    this.editRecipeFieldModal = null;
    this.state = {
      editingRecipeFieldName: null,
    };
  }

  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);
    this.props.change('modal', this.props.modal);
  }

  render() {
    // console.log(Object.keys(this.props.modal).length ? 'yes!': 'no');
    const orderedBrewMethods = _.orderBy(this.props.brewMethods.brewMethods, ['order'], ['asc']);
    const brewMethods = _.map(orderedBrewMethods, (brewMethod) => {
      return {
        id: brewMethod.id,
        name: brewMethod.name
      };
    });

    const { handleSubmit, loading } = this.props;
    return (
      <View>
        <PickerField
          // name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.bean_process` : 'bean_process'}
          name="brew_method"
          label="Brew Method"
          options={brewMethods}
        />
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
        <Button
          title="Edit Dose"
          onPress={() => { this._editFormFieldModal('dose') }}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />
        <TextField
          name="temperature"
          label="Temperature"
          // validate={[required]}
        />
        <Hr />

        <RepeatableRecipeFields
          repeatableRecipeFields={this.props.repeatableRecipeFields}
          formValues={this.props.formValues}
        />

        <Button
          title="Save Recipe"
          onPress={handleSubmit((values) => this.props.saveRecipe(values))}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />

        <Modal
          ref={(ref) => { this.editRecipeFieldModal = ref; }}
          showHeadline={false}
          dismissButtonText="Save & Continue"
        // headlineText="Edit Bean Blend Component"
        >
            <RecipeFormField name={this.state.editingRecipeFieldName} />
        {/*<BeanDetailsFormFields*/}
        {/*fieldIndex={this.state.editingRepeatableRecipeFieldIndex}*/}
        {/*fieldPrefix={this.state.editingRepeatableRecipeFieldPrefix}*/}
        {/*origins={this.props.origins}*/}
        {/*roastLevels={this.props.roastLevels}*/}
        {/*beanProcesses={this.props.beanProcesses}*/}
        {/*coffeeSpecies={this.props.coffeeSpecies}*/}
        {/*navigation={this.props.navigation}*/}
        {/*formValues={this.props.formValues}*/}
        {/*/>*/}
        </Modal>
      </View>
    );
  }

  _editFormFieldModal(fieldName){
    this.setState({ editingRecipeFieldName: fieldName });
    this.editRecipeFieldModal.show();
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.recipes.currentlyEditingRecipe,
    loading: state.recipes.loading,
    brewMethods: state.brewMethods,
    repeatableRecipeFields: state.repeatableRecipeFields,
    formValues: state.form,
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
