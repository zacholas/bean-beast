import React, { Component } from 'react';
import _ from 'lodash';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import CafeListItem from './CafeListItem';
import * as navRoutes from '../../constants/NavRoutes';

class CafeList extends Component {

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _onPressItem = (id) => {
    this.props.navigation.navigate(navRoutes.VIEW_CAFE, {
      id
    })
  };

  _renderItem = ({item}) => {
    const cafeBeans = _.filter(this.props.beans.beans, (bean) => {
      return bean.cafe && bean.cafe === item.id;
    });
    return (
      <CafeListItem
        id={item.id}
        onPressItem={this._onPressItem}
        title={item.name}
        beans={cafeBeans}
      />
    );
  };

  render() {
    const cafes = _.values(this.props.cafes.cafes);
    // console.log(cafes);
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
  cafes: state.cafes,
  beans: state.beans
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CafeList);
