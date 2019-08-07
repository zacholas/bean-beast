import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import PropTypes from "prop-types";
import { saveRoastLevel } from "../../actions";
import { TextField } from "../common/reduxForm";
import { BodyText, Button } from "../common";
import { required } from "../../helpers";
import {bodyText} from "../../constants/Styles";
import * as styles from "../common/reduxForm/Styles";
// import Modal from "../common/Modal";

class EditRoastLevelForm extends Component {
  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
    this.props.change('type', this.props.type);
    this.props.change('modal', this.props.modal);
    this.props.change('order', this.props.roastLevelOrder);
  }

  render() {
    const { handleSubmit, loading } = this.props;
    return (
      <View>
        <TextField
          name="name"
          label="Roast Level Name"
          validate={[required]}
        />
        <BodyText>
          (Note: You can re-order your roast levels later in the app settings.)
        </BodyText>
        <Button
          title="Save Roast Level"
          onPress={handleSubmit((values) => this.props.saveRoastLevel(values))}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let roastLevelOrder = 0;
  if(_.size(state.roastLevels.roastLevels)){
    const sortedRoastLevels = _.orderBy(state.roastLevels.roastLevels, ['order'], ['desc']);
    if(!isNaN(sortedRoastLevels[0].order)){
      roastLevelOrder = sortedRoastLevels[0].order + 10;
    }
  }

  return {
    initialValues: state.roastLevels.currentlyEditingRoastLevel,
    loading: state.roastLevels.loading,
    roastLevelOrder
  }
};

EditRoastLevelForm = reduxForm({
  form: 'EditRoastLevelForm',
  enableReinitialize: true,
})(EditRoastLevelForm);

EditRoastLevelForm = connect(mapStateToProps, { saveRoastLevel })(EditRoastLevelForm);

export default EditRoastLevelForm;

EditRoastLevelForm.propTypes = {
  navigation: PropTypes.object.isRequired,
  modal: PropTypes.object
};

EditRoastLevelForm.defaultProps = {
  modal: {}
};
