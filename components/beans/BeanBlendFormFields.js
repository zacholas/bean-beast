import React from 'react';
import { View, Text } from 'react-native';
import { Field, FieldArray, reduxForm } from 'redux-form';
import * as styles from "../common/reduxForm/Styles";
import { Button } from "../common";
import BeanDetailsFormFields from "./BeanDetailsFormFields";
// import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderMembers = ({ fields, meta: { touched, error, submitFailed }, parentProps }) => {
  // console.log('render members', zprops);
  return (
  <View>
    {touched &&
    ((error && <Text style={styles.errorText}>{error}</Text>) ||
      (warning && <Text style={styles.warningText}>{warning}</Text>))}
    {/*<li>*/}
      {/*<button type="button" onClick={() => fields.push({})}>Add Member</button>*/}
    {/*</li>*/}
    <Button title="Add New" onPress={() => fields.push({})} />


    {fields.map((member, index) => (
      <View key={index}>
        {/*<button*/}
          {/*type="button"*/}
          {/*title="Remove Member"*/}
          {/*onClick={() => fields.remove(index)}*/}
        {/*/>*/}
        <Button title="Remove this one" onPress={() => fields.remove(index)} />
        <Text>Member #{index + 1}</Text>

        <BeanDetailsFormFields
          fieldPrefix={member}
          origins={parentProps.origins}
          roastLevels={parentProps.roastLevels}
          beanProcesses={parentProps.beanProcesses}
          coffeeSpecies={parentProps.coffeeSpecies}
          navigation={parentProps.navigation}
          formValues={parentProps.formValues}
        />

        {/*<Field*/}
          {/*name={`${member}.firstName`}*/}
          {/*type="text"*/}
          {/*component={renderField}*/}
          {/*label="First Name"*/}
        {/*/>*/}
        {/*<Field*/}
          {/*name={`${member}.lastName`}*/}
          {/*type="text"*/}
          {/*component={renderField}*/}
          {/*label="Last Name"*/}
        {/*/>*/}
      </View>
    ))}
  </View>
  );
};

const FieldArraysForm = props => {
  // console.log(props);
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <FieldArray name="members" component={renderMembers} parentProps={props} />
  );
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <Field
  //       name="clubName"
  //       type="text"
  //       component={renderField}
  //       label="Club Name"
  //     />
  //     <FieldArray name="members" component={renderMembers} />
  //     <div>
  //       <button type="submit" disabled={submitting}>Submit</button>
  //       <button type="button" disabled={pristine || submitting} onClick={reset}>
  //         Clear Values
  //       </button>
  //     </div>
  //   </form>
  // );
};

export { FieldArraysForm };

// export default reduxForm({
//   form: 'fieldArrays', // a unique identifier for this form
//   // validate,
// })(FieldArraysForm);
