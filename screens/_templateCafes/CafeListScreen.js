import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, ScrollContainer } from "../../components/common";
import CafeList from '../../components/cafes/CafeList';
import * as navRoutes from "../../constants/NavRoutes";
import { createCafe } from "../../actions";

class CafeListScreen extends Component {
  static navigationOptions = {
    title: 'Cafes / Roasters',
  };

  //* todo make the button at the bottom stay there even when the list is really long and goes off screen
  render() {
    return (
      <ScrollContainer>
        <View>
          <ScrollView>
            <CafeList navigation={this.props.navigation} />
          </ScrollView>
        </View>
        <View style={{marginTop: 15}}>
          <Button onPress={() => { this._addNewCafe() }} title="Add a new Cafe" />
        </View>
      </ScrollContainer>
    );
  }

  _addNewCafe(){
    this.props.createCafe();
    this.props.navigation.navigate(navRoutes.EDIT_CAFE, {
      type: 'create'
    })
  }
}

// const mapStateToProps = state => ({
//   cafes: state.cafes
// });

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { createCafe })(CafeListScreen);
