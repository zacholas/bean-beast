import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { connect } from 'react-redux';
import { Button } from "../../components/common";
import CafeList from '../../components/CafeList';
// import { demoBeanIncrement } from '../../actions';


// import styles from './styles';

class CafeListScreen extends Component {
  static navigationOptions = {
    title: 'Cafes / Roasters',
  };

  render() {
    return (
      <View>
        <ScrollView style={{padding:15}}>
          <CafeList navigation={this.props.navigation} />
        </ScrollView>
        <View style={{padding: 15}}>
          <Button onPress={() => { this._addNewCafe() }} title="Add a new Cafe" />
        </View>
      </View>
    );
  }

  _addNewCafe(){
    this.props.navigation.navigate('EditCafe', {
      type: 'create'
    })
  }
}

// const mapStateToProps = state => ({
//   cafes: state.cafes
// });

// export default connect(mapStateToProps, { demoBeanIncrement })(CafeListScreen);
export default CafeListScreen;
