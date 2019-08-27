import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text } from 'react-native';
import {Container, BodyText, Headline} from "../../components/common";
import EditBeanForm from "../../components/beans/EditBeanForm";
import { headerNavTextLink, textLink } from "../../constants/Styles";
import * as navRoutes from "../../constants/NavRoutes";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EditBeanScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const bean = navigation.getParam('bean', false);
    const headerRightContent = navigation.getParam('type', 'create') === 'edit' && bean && bean.id ? (
      <TouchableOpacity onPress={() => {
        navigation.navigate(navRoutes.VIEW_BEAN, {
          id: bean.id,
          bean: bean
        })
      }}>
        <Text style={headerNavTextLink}><Icon name="close" size={16} style={textLink} /> Cancel</Text>
      </TouchableOpacity>
    ) : null;

    return {
      title: navigation.getParam('type', 'create') === 'create' ? 'Add New Bean' : 'Edit Bean',
      headerRight: headerRightContent
    }
  };

  constructor(props){
    super(props);
    this.type = props.navigation.getParam('type', 'create');
    this.bean = props.navigation.getParam('bean', null);
  }

  render() {
    // <Container scroll={true}></Container>
    return (
      <Container scroll={false} style={{ flex: 1 }}>
        {/*<View>{this._pageTitle()}</View>*/}
        <View style={{ flex: 1 }}>
          <EditBeanForm type={this.type} navigation={this.props.navigation} />
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
}

EditBeanScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
