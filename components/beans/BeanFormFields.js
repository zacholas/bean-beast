import React from 'react';
import { View, Text } from 'react-native';
import { Field, FieldArray, reduxForm } from 'redux-form';
import * as styles from "../common/reduxForm/Styles";
import { Button } from "../common";
import BeanDetailsFormFields from "./BeanDetailsFormFields";

const renderBeans = ({ fields, meta: { touched, error, submitFailed }, parentProps }) => {
  //* For Single Origins, just add one and don't allow the adding/removal of em.
  if(parentProps.singleOrigin){
    if(fields.length === 0){
      fields.push({});
    }
  }
  return (
  <View>
    {touched &&
    ((error && <Text style={styles.errorText}>{error}</Text>) ||
      (warning && <Text style={styles.warningText}>{warning}</Text>))}
    {!parentProps.singleOrigin && <Button title="Add New" onPress={() => fields.push({})} />}

    {fields.map((bean, index) => {
      console.log('bean', bean);
      return (
        <View key={index}>
          {!parentProps.singleOrigin && <Button title="Remove this one" onPress={() => fields.remove(index)} />}
          <Text>Bean #{index + 1}</Text>

          <BeanDetailsFormFields
            fieldPrefix={bean}
            origins={parentProps.origins}
            roastLevels={parentProps.roastLevels}
            beanProcesses={parentProps.beanProcesses}
            coffeeSpecies={parentProps.coffeeSpecies}
            navigation={parentProps.navigation}
            formValues={parentProps.formValues}
          />
        </View>
      );
    })}
  </View>
  );
};

const BeanFormFields = props => {
  // const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <FieldArray name="beans" component={renderBeans} parentProps={props} />
  );
};

export { BeanFormFields };
