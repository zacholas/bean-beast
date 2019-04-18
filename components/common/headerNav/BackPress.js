import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { goBack, CloseNavDrawer } from '../../../actions';

class BackPress extends Component {
  render() {
    const { isOpen } = this.props.navDrawer;
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (isOpen === true) {
        // console.log('BACKPRESS - hardware back btn pressed, but drawer is open, so close it.');
        this.props.CloseNavDrawer();
      } else {
        // console.log('BACKPRESS - hardware back btn pressed, but drawer is closed, so fire the goBack action');
        this.props.goBack();
      }
      return true;
    });
    return (
      <View />
    );
  }
}

const mapStateToProps = (state) => {
  const { navDrawer } = state;
  return { navDrawer };
};

export default connect(mapStateToProps, { goBack, CloseNavDrawer })(BackPress);
