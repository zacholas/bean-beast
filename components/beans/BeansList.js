import React, { Component } from 'react';
import _ from 'lodash';
import { View, FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import BeanListItem from './BeanListItem';
import * as navRoutes from '../../constants/NavRoutes';
import { editBean } from "../../actions";
import { Headline } from "../common";

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
    let theseBeans = this.props.beans.beans;

    if(this.props.cafe){
      theseBeans = _.filter(theseBeans, (bean) => {
        return bean.cafe && bean.cafe === this.props.cafe;
      });
    }



    if(_.size(theseBeans)){
      const orderedBeans = _.orderBy(theseBeans, ['modified'], ['desc']);
      const beans = _.values(orderedBeans);

      return (
        <View>
          {this.props.cafe && <Headline h3 inline style={{ marginBottom: Platform.OS === 'ios' ? -20 : 0 }}>Beans by this Roaster:</Headline>}
          <FlatList
            data={beans}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      );
    }
    return <View />
  }
}

const mapStateToProps = (state, props) => {
  return {
    beans: state.beans,
    cafes: state.cafes,
    origins: state.origins,
    beanProcesses: state.beanProcesses
  }
};


export default connect(mapStateToProps, { editBean })(BeanList);
