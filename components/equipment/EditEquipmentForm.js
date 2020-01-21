import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import PropTypes from "prop-types";
import { saveEquipment } from "../../actions";
import { PickerSelectField, TextField } from "../common/reduxForm";
import { BodyText, Button } from "../common";
import { required } from "../../helpers";
import {bodyText} from "../../constants/Styles";
import * as styles from "../common/reduxForm/Styles";
// import Modal from "../common/Modal";

class EditEquipmentForm extends Component {
  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);
    this.props.change('modal', this.props.modal);
    this.props.change('order', this.props.equipmentOrder);
  }

  render() {
    const orderedEquipmentTypes = _.orderBy(this.props.equipmentTypes, ['order'], ['asc']);
    let equipment = [];
    if(_.size(orderedEquipmentTypes)){
      equipment = _.map(orderedEquipmentTypes, (equipmentType) => {
        let output = '';
        output = equipmentType.name ? output.concat(equipmentType.name) : output;

        return {
          key: equipmentType.id,
          value: equipmentType.id,
          label: output
        };
      });
    }

    const { handleSubmit, loading } = this.props;
    return (
      <View>
        <TextField
          name="name"
          label="Equipment Name"
          validate={[required]}
        />

        <PickerSelectField
          label="Equipment Type"
          name="equipmentType"
          validate={[required]}
          options={equipment}
        />

        <Button
          title="Save Equipment"
          onPress={handleSubmit((values) => this.props.saveEquipment(values))}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let equipmentOrder = 0;
  if(_.size(state.equipment.equipment)){
    const sortedEquipment = _.orderBy(state.equipment.equipment, ['order'], ['desc']);
    if(!isNaN(sortedEquipment[0].order)){
      equipmentOrder = sortedEquipment[0].order + 10;
    }
  }

  return {
    initialValues: state.equipment.currentlyEditingEquipment,
    loading: state.equipment.loading,
    equipmentOrder,
    equipmentTypes: state.equipment.equipmentTypes
  }
};

EditEquipmentForm = reduxForm({
  form: 'EditEquipmentForm',
  enableReinitialize: true,
})(EditEquipmentForm);

EditEquipmentForm = connect(mapStateToProps, { saveEquipment })(EditEquipmentForm);

export default EditEquipmentForm;

EditEquipmentForm.propTypes = {
  navigation: PropTypes.object.isRequired,
  modal: PropTypes.object
};

EditEquipmentForm.defaultProps = {
  modal: {}
};
