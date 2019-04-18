import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import NavDrawerItem from './NavDrawerItem';
import { navigate } from '../../../actions';

class MenuInner extends Component {
  render() {
    return (
      <View>
        <NavDrawerItem
          title="Dashboard"
          onPress={() => this.props.navigate('MainScreen')}
          routeName="MainScreen"
        />
        <NavDrawerItem
          title="All Bags of Beans"
          onPress={() => this.props.navigate('BeanListScreen')}
          routeName="BeanListScreen"
        />
        <NavDrawerItem
          title="Add a New Bag of Beans"
          onPress={() => this.props.navigate('EditBeanScreen')}
          routeName="EditBeanScreen"
        />
      </View>
    );
  }
}

// export default MenuInner;
export default connect(null, { navigate })(MenuInner);
