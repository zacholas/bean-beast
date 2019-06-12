import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { BodyText } from "../common";
import { TextField, PickerField, DatePickerField, SliderField, LabeledSliderField, SwitchField } from "../common/reduxForm";
import { Button } from "../common";
import { required, futureDate, alwaysError } from "../../helpers";
import { saveBean } from "../../actions";
import Modal from '../common/Modal';
import EditCafeForm from '../cafes/EditCafeForm';

class EditBeanForm extends Component {
  constructor(props){
    super(props);
    this.addCafeModal = null;
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
    }
  }

  render() {
    // console.log(this.props);
    const { handleSubmit, loading } = this.props;
    const cafes = _.orderBy(this.props.cafes, ['name'], ['asc']);
    return (
      <View>
        <LabeledSliderField
          name="roast_level"
          label="Roast Level"
          step={1}
          minimumValue={0}
          maximumValue={4}
          tallNotches={[0, 2, 4]}
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
          validate={[required]}
        />
        <TouchableOpacity onPress={() => this.addCafeModal.show()}>
          <BodyText>Add New Roastery</BodyText>
        </TouchableOpacity>
        <PickerField
          name="cafe"
          label="Roastery"
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

        <Modal
          ref={(ref) => { this.addCafeModal = ref; }}
          headlineText="Add New Cafe / Roastery"
        >
          <EditCafeForm

            // type="create"
            type="beanCreateModal"
            navigation={this.props.navigation}
            modal={this.addCafeModal}
          />
        </Modal>
      </View>
    );
  }
}

const initializedValues = {
  roast_level: 2,
  rating: 5,
};

const mapStateToProps = (state) => {
  return {
    cafes: state.cafes.cafes,
    initialValues: {
      ...initializedValues,
      ...state.beans.currentlyEditingBean,
    },
    loading: state.beans.loading,
    modalData: state.beans.modalData,
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
