import React, { Component } from 'react';
import {ScrollView, View} from 'react-native';
import { connect } from 'react-redux';
import {ScrollContainer, BodyText, Button} from "../../components/common";
import { createBean } from "../../actions";
import * as navRoutes from "../../constants/NavRoutes";
import BeansList from "../../components/beans/BeansList";

class BeansListScreen extends Component {
  static navigationOptions = {
    title: 'Beans',
  };

  render() {
    return (
      <ScrollContainer>
        <View style={{marginBottom: 15}}>
          <Button onPress={() => { this._addNewBean() }} title="Add a new Bean" />
        </View>
        <View>
          <ScrollView>
            <BeansList navigation={this.props.navigation} />
          </ScrollView>
        </View>
      </ScrollContainer>
    );
  }

  _addNewBean(){
    this.props.createBean();
    this.props.navigation.navigate(navRoutes.EDIT_BEAN, {
      type: 'create'
    })
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { createBean })(BeansListScreen);
