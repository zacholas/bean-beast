import React, { Component } from 'react';
import _ from 'lodash';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import BeanListItem from './BeanListItem';
import * as navRoutes from '../../constants/NavRoutes';
import { editBean } from "../../actions";

class BeanList extends Component {

  _keyExtractor = (item, index) => {
    return item.id;
  };

  _onPressItem = (id, bean, editBeanAction) => {
    this.props.navigation.navigate(navRoutes.VIEW_BEAN, {
      id,
      bean,
      editBeanAction
    })
  };

  _renderItem = ({item}) => (
    <BeanListItem
      id={item.id}
      onPressItem={this._onPressItem}
      bean={item}
      cafe={item.cafe ? this.props.cafes.cafes[item.cafe] : null}
      origins={this.props.origins}
      beanProcesses={this.props.beanProcesses}
      editBeanAction={this.props.editBean}
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
  beans: state.beans,
  cafes: state.cafes,
  origins: state.origins,
  beanProcesses: state.beanProcesses
});


export default connect(mapStateToProps, { editBean })(BeanList);
