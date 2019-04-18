import React, { Component } from 'react';
import _ from 'lodash';

import { View, FlatList } from 'react-native';

import { connect } from 'react-redux';

import CafeListItem from './CafeListItem';

// import styles from './styles';


class CafeList extends Component {

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _onPressItem = (id) => {
    console.log('item pressed with id: ', id);
    //* Navigate to the cafe
  };

  _renderItem = ({item}) => (
    <CafeListItem
      id={item.id}
      onPressItem={this._onPressItem}
      title={item.title}
    />
  );

  render() {
    const cafes = _.values(this.props.cafes.cafes);
    return (
      <FlatList
        data={cafes}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const mapStateToProps = state => ({
  cafes: state.cafes
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CafeList);
