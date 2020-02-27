import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import {ScrollContainer, BodyText, Button} from "../../components/common";
import { createBean } from "../../actions";
import * as navRoutes from "../../constants/NavRoutes";
import Icon from 'react-native-vector-icons/FontAwesome';
import BeansList from "../../components/beans/BeansList";
import _ from "lodash";
import { headerNavTextLink, textLink } from "../../constants/Styles";

class BeansListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let headerRightOutput = <View />;
    const { params } = navigation.state;
    if(_.size(params) && params.onPress){
      headerRightOutput = (
        <TouchableOpacity onPress={params.onPress}>
          <Text style={headerNavTextLink}><Icon name="plus" size={16} style={textLink} /> Add New</Text>
        </TouchableOpacity>
      );
    }
    return {
      title: 'Beans',
      headerRight: headerRightOutput
    }
  };

  componentWillMount(): void {
    this.props.navigation.setParams({
      onPress: () => this._addNewBean(),
    })
  }

  render() {
    return (
      <ScrollContainer>
        {/*<View style={{marginBottom: 15}}>*/}
          {/*<Button onPress={() => { this._addNewBean() }} title="Add a new Bean" />*/}
        {/*</View>*/}
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
