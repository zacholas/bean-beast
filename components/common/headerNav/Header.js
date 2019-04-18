import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { OpenNavDrawer, CloseNavDrawer, goBack } from '../../../actions';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e74b3b',
    padding: 10,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Raleway-ExtraLight',
  },
});

class Header extends Component {
  backButtonOutput() {
    const index = this.props.navState.index;
    if (index) {
      return (
        <TouchableOpacity style={{width: 30}} onPress={() => this.props.goBack()}>
          <Icon name="chevron-left" size={22} color="#fff"/>
        </TouchableOpacity>
      );
    }
    return <View />;
  }

  drawerButtonOutput() {
    if(!this.props.hideMenu) {
      return (
        <TouchableOpacity style={{width: 30}} onPress={() => this.props.OpenNavDrawer()}>
          <Icon name="bars" size={26} color="#fff"/>
        </TouchableOpacity>
      );
    }
    return <View />;
  }

  titleOutput() {
    return (
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ height: 50 }}>
        <StatusBar hidden />
        <View style={styles.header}>
          {this.backButtonOutput()}
          {this.titleOutput()}
          {this.drawerButtonOutput()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { navDrawer } = state;
  // const navState = state.nav.state;
  const navState = state.nav;
  return { navDrawer, navState };
};

export default connect(mapStateToProps, { OpenNavDrawer, CloseNavDrawer, goBack })(Header);
