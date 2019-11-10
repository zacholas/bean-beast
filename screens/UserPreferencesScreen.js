import React, { Component } from 'react';
import { Headline, Container, Button } from "../components/common";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { saveUserPreferences } from "../actions";
import { PickerField, SwitchField } from "../components/common/reduxForm";

class UserPreferencesScreen extends Component {
  render() {
    const { handleSubmit, loading } = this.props;

    return (
      <Container>
        <Headline>Preferences</Headline>
        <PickerField name='global_temperatureMeasurement' options={[
          {
            id: 'c',
            name: 'Celsius'
          },
          {
            id: 'f',
            name: 'Fahrenheit'
          }
        ]}/>

        <SwitchField
          name='bean_roastLevelAdvancedMode'
          label='Roast Level Advanced Mode'
          valueLabelTrue='On'
          valueLabelFalse='Off'
        />
        <Button
          title="Save Preferences"
          onPress={handleSubmit((values) => this.props.saveUserPreferences(values))}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />
        {/*<UserPreferencesScreen type={this.type} navigation={this.props.navigation} />*/}
      </Container>
    );
  }
}

UserPreferencesScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

UserPreferencesScreen.defaultProps = {
};

const mapStateToProps = (state) => {
  return {
    initialValues: state.userPreferences,
    // loading: state.cafes.loading,
  }
};

UserPreferencesScreen = reduxForm({
  form: 'UserPreferencesForm',
  enableReinitialize: true,
})(UserPreferencesScreen);

UserPreferencesScreen = connect(mapStateToProps, { saveUserPreferences })(UserPreferencesScreen);

export default UserPreferencesScreen;
