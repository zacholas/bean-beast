import React, { Component } from 'react';
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



class ImageUploadComponent extends Component {
  // render() {
  //   const { input: { value, onChange } } = this.props;
  //   return (
  //     <div>
  //       <span>The current value is {value}.</span>
  //       <button type="button" onClick={() => onChange(value + 1)}>Inc</button>
  //       <button type="button" onClick={() => onChange(value - 1)}>Dec</button>
  //     </div>
  //   )
  // }

  constructor(props){
    super(props);

    this._galleryPickerButton = this._galleryPickerButton.bind(this);
    this._cameraButton = this._cameraButton.bind(this);

    this.state = {
      image: null,
      hasGalleryPermission: false,
      hasCameraPermission: false
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.getCameraPermissionAsync();
  }

  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this._galleryPickerButton()}
        {this._cameraButton()}
        {this._imageOutput()}
      </View>
    )
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

  _imageOutput(){
    if(this.props.input.value){
      return <Image source={{ uri: this.props.input.value }} style={{ width: 150, height: 200 }} />;
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
      this.props.input.onChange(result.uri);
      // this.hiddenTextField.setNativeProps({value: result.uri})
      // this.props.change('bean_image', result.uri);
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

const ImageUploadField = (props) => {
  return (
    <View style={{ alignItems: 'stretch' }}>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
      <Field name={props.name} validate={props.validate} component={ImageUploadComponent} />
    </View>
  );
};

export { ImageUploadField };

ImageUploadField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  validate: PropTypes.array
};

ImageUploadField.defaultProps = {
};
