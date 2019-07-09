import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Container, Headline } from "../../common";
import { ImageUploadField } from "../../common/reduxForm";
import { Button } from "../../common";
import { saveBean, clearBeanModalData } from "../../../actions";
import * as navRoutes from "../../../constants/NavRoutes";

class BeanPhotoStepScreen extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: navigation.getParam('type', 'create') === 'create' ? 'Add New Bean' : 'Edit Bean',
  //   }
  // };

  constructor(props){
    super(props);
    this.type = props.navigation.getParam('type', 'create');
    this.bean = props.navigation.getParam('bean', null);
  }

  render() {
    const { handleSubmit, loading } = this.props;

    return (
      <Container scroll={true}>
        {/*{this._pageTitle()}*/}
        {/*<EditBeanForm type={this.type} navigation={this.props.navigation} />*/}
        <View>
          <ImageUploadField
            name="bean_image"
            label="Bean Image"
          />

          {/*<Button*/}
            {/*title="Next Step"*/}
            {/*onPress={() => {*/}
              {/*this.props.navigation.navigate({*/}
                {/*routeName: navRoutes.EDIT_BEAN_ROAST_LEVEL_STEP*/}
              {/*});*/}
            {/*}}*/}
            {/*iconName="arrow-right"*/}
            {/*backgroundColor="gray"*/}
            {/*spinner={loading}*/}
          {/*/>*/}

          <Button
            title="Save Bean"
            onPress={handleSubmit((values) => {
              console.log('submitting with: ', values);
              // this.props.saveBean(values)
            })}
            iconName="check"
            backgroundColor="green"
            spinner={loading}
          />

          {/*<Button*/}
            {/*title="Save Bean"*/}
            {/*onPress={handleSubmit((values) => this.props.saveBean(values))}*/}
            {/*iconName="check"*/}
            {/*backgroundColor="green"*/}
            {/*spinner={loading}*/}
          {/*/>*/}
        </View>
      </Container>
    );
  }

  _pageTitle(){
    if(this.type === 'create'){
      return <Headline>Create New Bean</Headline>
    }
    else if(this.type === 'edit'){
      if(this.bean && this.bean.name){
        return <Headline>Edit {this.bean.name}</Headline>
      }
      return <Headline>Edit Bean</Headline>
    }
  }



  // render() {
  //
  //
  //   return (
  //     <View>
  //       <ImageUploadField
  //         name="bean_image"
  //         label="Bean Image"
  //       />
  //
  //       <Button
  //         title="Save Bean"
  //         onPress={handleSubmit((values) => this.props.saveBean(values))}
  //         iconName="check"
  //         backgroundColor="green"
  //         spinner={loading}
  //       />
  //     </View>
  //   );
  // }
}

const initializedValues = {

};

const mapStateToProps = (state) => {
  return {
    cafes: state.cafes.cafes,
    origins: state.origins.origins,
    initialValues: {
      ...initializedValues,
      ...state.beans.currentlyEditingBean,
    },
    loading: state.beans.loading,
    modalData: state.beans.modalData,
    formValues: state.form
  }
};

BeanPhotoStepScreen = reduxForm({
  form: 'EditBeanForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(BeanPhotoStepScreen);

BeanPhotoStepScreen = connect(mapStateToProps, { saveBean, clearBeanModalData })(BeanPhotoStepScreen);

export default BeanPhotoStepScreen;

BeanPhotoStepScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
