// @TODO -- DO DEEZ


// import React, { Component } from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import { connect } from 'react-redux';
// import { reduxForm } from 'redux-form';
// import PropTypes from "prop-types";
// import { saveOrigin } from "../../actions";
// import { TextField } from "../common/reduxForm";
// import { Button } from "../common";
// import { required } from "../../helpers";
// import {bodyText} from "../../constants/Styles";
// import * as styles from "../common/reduxForm/Styles";
// // import Modal from "../common/Modal";
//
// class EditOriginForm extends Component {
//   componentWillMount(): void {
//     this.props.change('navigation', this.props.navigation);
//     this.props.change('type', this.props.type);
//     this.props.change('modal', this.props.modal);
//   }
//
//   countryLabel(){
//     return (
//       <View>
//         <Text style={bodyText}>Origin Country, e.g. "Ethiopia":</Text>
//         <Text style={{ ...bodyText, ...styles.label, fontSize: 13, fontStyle: 'italic', marginTop: 3 }}>(Note: For blends, I recommend just writing "Blend")</Text>
//       </View>
//     );
//   }
//
//   regionLabel(){
//     return (
//       <View>
//         <Text style={bodyText}>Origin Region, e.g. "Yirga Chefe":</Text>
//         <Text style={{ ...bodyText, ...styles.label, fontSize: 13, fontStyle: 'italic', marginTop: 3 }}>(Note: For blends, I recommend writing the details of the blend, like "70% Brazil / 30% Ethiopia Yirga Chefe")</Text>
//       </View>
//     );
//   }
//
//   render() {
//     const { handleSubmit, loading } = this.props;
//     return (
//       <View>
//         <TextField
//           name="country"
//           label={this.countryLabel()}
//           validate={[required]}
//         />
//         <TextField
//           name="region"
//           label={this.regionLabel()}
//         />
//         <TextField
//           name="processing_method"
//           label="Processing Method (Natural, washed, etc.)"
//         />
//         <TextField
//           name="details"
//           label="Additional Origin Details (Farm / estate name, etc.)"
//         />
//         <Button
//           title="Save Origin"
//           onPress={handleSubmit((values) => this.props.saveOrigin(values))}
//           iconName="check"
//           backgroundColor="green"
//           spinner={loading}
//         />
//       </View>
//     );
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     initialValues: state.origins.currentlyEditingOrigin,
//     loading: state.origins.loading,
//   }
// };
//
// EditOriginForm = reduxForm({
//   form: 'EditOriginForm',
//   enableReinitialize: true,
// })(EditOriginForm);
//
// EditOriginForm = connect(mapStateToProps, { saveOrigin })(EditOriginForm);
//
// export default EditOriginForm;
//
// EditOriginForm.propTypes = {
//   navigation: PropTypes.object.isRequired,
//   modal: PropTypes.object
// };
//
// EditOriginForm.defaultProps = {
//   modal: {}
// };
