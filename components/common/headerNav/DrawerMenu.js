import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
} from 'react-native';
import { OpenNavDrawer, CloseNavDrawer } from '../../../actions';
import BackPress from './BackPress';
import Header from './Header';
import MenuSlider from './MenuSlider';

const styles = {
  pageContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    zIndex: 999999,
    flexDirection: 'row',
  },
  backgroundOverlay: {
    height: '100%',
    width: '30%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuBackground: {
    backgroundColor: '#fff',
    height: '100%',
    width: '70%',
  },
  menuTop: {
    marginBottom: 20,
  },
  menuInner: {
    padding: 20,
  },
  pageContentContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
};

class DrawerMenu extends Component {
  render() {
    return (
      <View style={styles.pageContainer}>
        <BackPress />
        <Header title={this.props.title} hideMenu={this.props.hideMenu ?
          true :
          undefined}
        />
        <MenuSlider />
        <View style={StyleSheet.flatten([styles.pageContentContainer, this.props.style])}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { navDrawer } = state;
  return { navDrawer };
};

export default connect(mapStateToProps, { OpenNavDrawer, CloseNavDrawer })(DrawerMenu);
// export default DrawerMenu;
