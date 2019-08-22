import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import PropTypes from "prop-types";
import { saveCoffeeSpecies } from "../../actions";
import { TextField } from "../common/reduxForm";
import { BodyText, Button } from "../common";
import { required } from "../../helpers";
import {bodyText} from "../../constants/Styles";
import * as styles from "../common/reduxForm/Styles";
// import Modal from "../common/Modal";

class EditCoffeeSpeciesForm extends Component {
  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);
    this.props.change('fieldPrefix', this.props.fieldPrefix);
    this.props.change('modal', this.props.modal);
    this.props.change('order', this.props.coffeeSpeciesOrder);
  }

  render() {
    const { handleSubmit, loading } = this.props;
    return (
      <View>
        <TextField
          name="name"
          label="Coffee Species Name"
          validate={[required]}
        />
        <BodyText>
          (Note: You can re-order your coffee species later in the app settings.)
        </BodyText>
        <Button
          title="Save Coffee Species"
          onPress={handleSubmit((values) => this.props.saveCoffeeSpecies(values))}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let coffeeSpeciesOrder = 0;
  if(_.size(state.coffeeSpecies.coffeeSpecies)){
    const sortedCoffeeSpecies = _.orderBy(state.coffeeSpecies.coffeeSpecies, ['order'], ['desc']);
    if(!isNaN(sortedCoffeeSpecies[0].order)){
      coffeeSpeciesOrder = sortedCoffeeSpecies[0].order + 10;
    }
  }

  return {
    initialValues: state.coffeeSpecies.currentlyEditingCoffeeSpecies,
    loading: state.coffeeSpecies.loading,
    coffeeSpeciesOrder
  }
};

EditCoffeeSpeciesForm = reduxForm({
  form: 'EditCoffeeSpeciesForm',
  enableReinitialize: true,
})(EditCoffeeSpeciesForm);

EditCoffeeSpeciesForm = connect(mapStateToProps, { saveCoffeeSpecies })(EditCoffeeSpeciesForm);

export default EditCoffeeSpeciesForm;

EditCoffeeSpeciesForm.propTypes = {
  navigation: PropTypes.object.isRequired,
  modal: PropTypes.object
};

EditCoffeeSpeciesForm.defaultProps = {
  modal: {}
};
