import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Container, Headline } from "../../common";
import {ImageUploadField, LabeledSliderField} from "../../common/reduxForm";
import { Button } from "../../common";
import { saveBean, clearBeanModalData } from "../../../actions";
import * as navRoutes from "../../../constants/NavRoutes";

class BeanRoastLevelStepScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('type', 'create') === 'create' ? 'Add New Bean' : 'Edit Bean',
    }
  };

  constructor(props){
    super(props);
    this.type = props.navigation.getParam('type', 'create');
    this.bean = props.navigation.getParam('bean', null);
  }

  render() {
    const { handleSubmit, loading } = this.props;

    console.log(this.props.navigation);
    const itemId = this.props.navigation.getParam('itemId', 'NO-ID');

    return (
      <Container scroll={true}>
        {this._pageTitle()}
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        {/*<EditBeanForm type={this.type} navigation={this.props.navigation} />*/}
        <View>
          <LabeledSliderField
            name="roast_level"
            label="Roast Level"
            step={1}
            minimumValue={1}
            maximumValue={5}
            tallNotches={[1, 3, 5]}
            bottomLabels={[
              { content: 'Light' },
              { content: 'Medium' },
              { content: 'Dark' },
            ]}
          />

          <Button
            title="Navigate here again"
            onPress={() => this.props.navigation.push(navRoutes.EDIT_BEAN_ROAST_LEVEL_STEP, {
              itemId: Math.floor(Math.random() * 100),
            })}
          />

          <Button
            title="Next Step"
            onPress={handleSubmit((values) => {

              this.props.navigation.navigate({
                routeName: navRoutes.EDIT_BEAN_PHOTO_STEP
              });
              // this.props.saveBean(values)
              console.log('next step with ', values);
            })}
            iconName="arrow-right"
            backgroundColor="gray"
            spinner={loading}
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
  roast_level: 3
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

BeanRoastLevelStepScreen = reduxForm({
  form: 'EditBeanForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(BeanRoastLevelStepScreen);

BeanRoastLevelStepScreen = connect(mapStateToProps, { saveBean, clearBeanModalData })(BeanRoastLevelStepScreen);

export default BeanRoastLevelStepScreen;

BeanRoastLevelStepScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
