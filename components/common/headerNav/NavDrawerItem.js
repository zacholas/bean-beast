import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { OpenNavDrawer, CloseNavDrawer } from '../../../actions';

const styles = {
  itemContainer: {
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Raleway-ExtraBold',
  },
};

class NavDrawerItem extends Component {
  onItemPress() {
    this.props.CloseNavDrawer();
    this.props.onPress();
  }

  itemActiveStyle() {
    const {index, routes} = this.props.nav;
    if (this.props.routeName === routes[index].routeName) {
      return ({
        backgroundColor: '#ededed',
      });
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onItemPress.bind(this)}>
        <View style={StyleSheet.flatten([styles.itemContainer, this.itemActiveStyle()])}>
          <Text style={styles.itemText}>{ this.props.title }</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  const { navDrawer, nav } = state;
  return { navDrawer, nav };
};

export default connect(mapStateToProps, { OpenNavDrawer, CloseNavDrawer })(NavDrawerItem);
