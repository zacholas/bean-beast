import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logOutUser, CloseNavDrawer } from '../../../actions';

const styles = {
  logOutStyle: {
    color: '#fee801',
  },
};

class NavUserInfo extends Component {
  onLogOutPress() {
    this.props.CloseNavDrawer();
    this.props.logOutUser();
  }

  // TODO - refactor all of this with google user details (currently all fields are from api)
  render() {
    // console.log('nav user info props:', this.props.userDetails)
    if (this.props.user) {
      const { created_at, email, id, name, updated_at } = this.props.user;
      return (
        <View>
          <Text>{ name }</Text>
          <Text>{ email }</Text>
          <TouchableOpacity onPress={() => this.onLogOutPress()}>
            <Text style={styles.logOutStyle}>Log out</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <View />;
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps, { logOutUser, CloseNavDrawer })(NavUserInfo);
