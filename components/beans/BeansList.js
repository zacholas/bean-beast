import React, { Component } from 'react';
import _ from 'lodash';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import BeanListItem from './BeanListItem';
import * as navRoutes from '../../constants/NavRoutes';

class BeanList extends Component {

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _onPressItem = (id) => {
    this.props.navigation.navigate(navRoutes.VIEW_BEAN, {
      id
    })
  };

  _renderItem = ({item}) => (
    <BeanListItem
      id={item.id}
      onPressItem={this._onPressItem}
      title={item.name ? item.name : 'Unnamed Bean'}
    />
  );

  render() {
    const orderedBeans = _.orderBy(this.props.beans.beans, ['modified'], ['desc']);
    // const beans = _.values(this.props.beans.beans);
    const beans = _.values(orderedBeans);

    // console.log(beans);
    return (
      <FlatList
        data={beans}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const mapStateToProps = state => ({
  beans: state.beans
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BeanList);
