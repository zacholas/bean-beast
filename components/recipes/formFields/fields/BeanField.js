import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
} from 'react-native';
import { connect } from "react-redux";
import _ from "lodash";
import { beanTitleDisplay } from "../../../../helpers/labels";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
});

class BeanField extends Component {
  render() {
    let beans = _.map(this.props.beans.beans, (bean) => {
      bean.name = beanTitleDisplay(bean, this.props.origins.origins, this.props.beanProcesses.beanProcesses);
      return bean;
    });

    beans = _.orderBy(beans, ['name'], ['asc']);

    let cafes = false;
    if(_.size(this.props.cafes.cafes)){
      cafes = _.map(this.props.cafes.cafes, (cafe) => {
        let cafeBeans = [];
        if(cafe.id){
          const allCafeBeans = _.filter(this.props.beans.beans, (bean) => {
            return bean.cafe && bean.cafe === cafe.id;
          });
          if(_.size(allCafeBeans)){
            cafeBeans = allCafeBeans;
            cafeBeans = _.orderBy(cafeBeans, ['name'], ['asc']);
            cafe.data = cafeBeans;
            return cafe;
          }
        }
      });
      cafes = _.filter(cafes, (cafe) => {
        return typeof cafe !== 'undefined';
      });
      cafes = _.orderBy(cafes, ['name'], ['asc']);
    }

    console.log('all cafes', cafes);


    return (
      <SectionList
        sections={cafes}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => this._renderItem(item)}
        renderSectionHeader={({section}) => this._renderSectionHeader(section)}
      />
    );
  }

  _renderItem(item){
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name && item.name}</Text>
        <Text style={styles.title}>{typeof item === 'string' && item}</Text>
      </View>
    );
  }

  _renderSectionHeader(section){
    return (
      <Text style={styles.header}>{section.name ? section.name : 'Unnamed Roaster'}</Text>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    beans: state.beans,
    origins: state.origins,
    beanProcesses: state.beanProcesses,
    cafes: state.cafes
  }
};

BeanField = connect(mapStateToProps, { })(BeanField);

export default BeanField;

BeanField.propTypes = {};
