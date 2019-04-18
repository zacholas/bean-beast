import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Animated,
  Button,
  TouchableHighlight,
  StatusBar,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import { OpenNavDrawer, CloseNavDrawer, navigate } from '../../../actions';
import NavTopArea from './NavTopArea';
import MenuInner from './_MenuInner';

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
  backdrop: {
    height: '100%',
    width: '80%',
    elevation: 10,
    backgroundColor: '#fff',
    // borderRightColor: '#7b7b7b',
    // borderRightWidth: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width: '100%',
  },
  menuTop: {
    marginBottom: 20,
  },
  menuInner: {
    padding: 0,
  },
  pageContentContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
};

class MenuSlider extends Component {
  constructor(props) {
    super(props);
    const { isOpen } = props.navDrawer;
    // console.log('nav drawer state:', props.navDrawer);
    if (isOpen === true) {
      this.state = {
        pan: new Animated.ValueXY({x: 0, y: 0}), // inits to zero
      };
    } else {
      this.state = {
        pan: new Animated.ValueXY({x: -400, y: 0}),
      };
    }
    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // console.log('moving', gestureState.dx);
        Animated.spring(
          this.state.pan,         // Auto-multiplexed
          { toValue: {
            x: gestureState.dx < 0 ? gestureState.dx : 0,
            y: 0,
          } }, // Back to zero
        ).start();
        // Animated.event([null, {
        //   dx: this.state.pan.x > 0 ? this.state.pan.x : this.state.pan.x, // x,y are Animated.Value
        //   dy: 0,
        // }]);
      },
      onPanResponderRelease: (e, gestureState) => {
        // console.log('velocity', gestureState.vx);
        if (gestureState.dx < -150 || gestureState.vx < -0.7){
          this.closeMenu(true);
        } else {
          this.openMenu();
        }
      },
    });
  }

  menuClosed(callRedux){
    if (callRedux === true) {
      this.props.CloseNavDrawer();
    }
  }

  closeMenu(callRedux){
    Animated.spring(
      this.state.pan,         // Auto-multiplexed
      {
        toValue: {x: -400, y: 0},
      } // Back to zero
    ).start(() => this.menuClosed(callRedux));
  }

  componentWillReceiveProps(props) {
    const { isOpen } = props.navDrawer;
    if (isOpen === true) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  // backdropClicked() {
  //   console.log('the menu backdrop was clicked');
  //   this.props.CloseNavDrawer();
  // }

  componentDidMount() {
    const { isOpen } = this.props.navDrawer;
    if (isOpen === true) {
      this.openMenu();
    }
  }

  componentDidUpdate() {
    const { isOpen } = this.props.navDrawer;
    if (isOpen === true) {
      this.openMenu();
    }
  }

  openMenu() {
    Animated.spring(
      this.state.pan,         // Auto-multiplexed
      {toValue: {x: 0, y: 0}} // Back to zero
    ).start();
  }

  render() {
    // console.log('menu slider props', this.props);
    return (
      <Animated.View
        {...this.state.panResponder.panHandlers}
        style={{
          ...styles.menuContainer,
          ...this.state.pan.getLayout(),
          width:'100%',
        }}>
        {/*<View style={styles.menuContainer}>*/}
        {/*<BoxShadow setting={shadowOpt} style={{ width: '100%', height: '100%' }}>*/}
          <View style={styles.backdrop}>
            <View style={styles.menuBackground}>
              <NavTopArea style={styles.menuTop}/>
              <View style={styles.menuInner}>
                <MenuInner />
                {/*<Button title="close nav drawer" onPress={() => this.closeMenu(true)}/>*/}
              </View>
            </View>
          </View>
        {/*</BoxShadow>*/}

          {/*<TouchableWithoutFeedback onPress={this.backdropClicked.bind(this)}>*/}
            {/*<View style={styles.backgroundOverlay}/>*/}
          {/*</TouchableWithoutFeedback>*/}
        {/*</View>*/}
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  const { navDrawer } = state;
  return { navDrawer };
};

export default connect(mapStateToProps, { OpenNavDrawer, CloseNavDrawer, navigate })(MenuSlider);
