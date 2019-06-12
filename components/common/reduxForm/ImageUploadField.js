import React from 'react';
import { TextInput, StyleSheet, Text, View, Image } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import {ImagePicker, Permissions, Constants, Camera} from 'expo';
import { Button } from '../Button';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";
import PropTypes from "prop-types";
import {SliderField} from "./SliderField";

// const ImageUploadFieldComponent = ({
//   input: { onChange, ...restInput },
//   label,
//   type,
//   meta: { touched, error, warning },
// }) => {
//   const multiLineHeight = multiline ? { height: 100 } : null;
//   return (
//     <View style={styles.inputContainer}>
//       <TextInput
//         style={{...styles.textInput, ...multiLineHeight}}
//         onChangeText={onChange}
//         {...restInput}
//         value={restInput.value.toString()}
//         underlineColorAndroid="rgba(0,0,0,.2)"
//       />
//       {touched &&
//       ((error && <Text style={styles.errorText}>{error}</Text>) ||
//         (warning && <Text style={styles.warningText}>{warning}</Text>))}
//     </View>
//   );
// };
//
// const ImageUploadField = (props) => {
//   return (
//     <View style={{ alignItems: 'stretch' }}>
//       <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
//       <Field name={props.name} validate={props.validate} component={ImageUploadFieldComponent} />
//     </View>
//   );
// };
//
// export { ImageUploadField };
//
// ImageUploadField.propTypes = {
// };
//
// ImageUploadField.defaultProps = {
// };




export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    hasGalleryPermission: false,
    hasCameraPermission: false
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this._galleryPickerButton()}
        {this._cameraButton()}
        {image &&
        <Image source={{ uri: image }} style={{ width: 150, height: 200 }} />}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.getCameraPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasGalleryPermission: status === 'granted' });
  };

  getCameraPermissionAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
  };

  _cameraButton(){
    if(this.state.hasCameraPermission === true){
      return <Button
        title="Take a picture"
        onPress={this._takePicture}
      />;
    }
  }

  _galleryPickerButton() {
    if(this.state.hasCameraPermission === true){
      return <Button
        title="Pick an image from camera roll"
        onPress={this._pickImage}
      />;
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _takePicture = async() => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
}
