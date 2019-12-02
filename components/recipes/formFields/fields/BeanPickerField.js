import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList, TextInput, TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import _ from "lodash";
import { beanTitleDisplay } from "../../../../helpers/labels";
import { isNumber } from "../../../../helpers";
import { BodyText, Headline } from "../../../common";
import { bodyText } from "../../../../constants/Styles";
import { Field } from "redux-form";
import { colorGray100, colorGray200, colorGray600, colorGray800 } from "../../../../constants/Colors";
import Colors from '../../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  heading: {
    marginBottom: 6,
    marginTop: 9,
  },
  item: {
    backgroundColor: colorGray100,
    padding: 10,
    marginBottom: 7,
  },
  activeItem: {
    backgroundColor: Colors.activeItemBackground,
  },
  activeItemText: {
    color: Colors.activeItemColor
  }
});

class BeanFieldComponent extends Component {
  constructor(props){
    super(props);

    //* Set initial field values based on input value
    if(props.input && props.input.value){
      this.state = {
        activeItem: props.input.value
      }
    }
    else {
      this.state = {
        activeItem: null
      };
    }
  }

  render() {
    let cafes = [];
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

      if(_.size(cafes)){
        return (
          <SectionList
            sections={cafes}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => this._renderItem(item)}
            renderSectionHeader={({section}) => this._renderSectionHeader(section)}
          />
        );
      }
    }
    return (
      <View>
        <Headline h3 noMargin>
          Uh oh!
        </Headline>
        <BodyText>
          You'll need to add some beans before you can select them here.
        </BodyText>
      </View>
    );

  }

  _renderItem(item){
    const activeStyle = this.state.activeItem === item.id ? styles.activeItem : null;
    const textStyle = this.state.activeItem === item.id ? styles.activeItemText : null;
    return (
      <TouchableOpacity style={{ ...styles.item, ...activeStyle }} onPress={() => this._selectItem(item.id)}>
        <BodyText noMargin style={textStyle}>{item.name && `» ${item.name}`}</BodyText>
      </TouchableOpacity>
    );
  }

  _selectItem(beanID){
    this.setState({ activeItem: beanID });
    this.props.input.onChange(beanID);
  }

  _renderSectionHeader(section){
    return (
      <Headline h4 noMargin style={styles.heading}>{section.name ? section.name : 'Unnamed Roaster'}</Headline>
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
BeanFieldComponent = connect(mapStateToProps, { })(BeanFieldComponent);

//* Redux Component
export const BeanPickerField = (props) => {
  // const { labels, hours, maxHours, minutes, maxMinutes, seconds, maxSeconds } = props;
  return (
    <View style={{ alignItems: 'stretch' }}>
      {/*<Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>*/}
      <Field
        name={props.name}
        validate={props.validate}
        component={BeanFieldComponent}
        // parentProps={{ labels, hours, maxHours, minutes, maxMinutes, seconds, maxSeconds }}
      />
    </View>
  );
};

BeanPickerField.propTypes = {
  name: PropTypes.string.isRequired
};

//
//
// TimeLengthPickerField.propTypes = {
//   name: PropTypes.string.isRequired,
//   labels: PropTypes.bool,
//   hours: PropTypes.bool,
//   maxHours: PropTypes.number,
//   minutes: PropTypes.bool,
//   maxMinutes: PropTypes.number,
//   seconds: PropTypes.bool,
//   maxSeconds: PropTypes.number,
// };
//
// TimeLengthPickerField.defaultProps = {
//   labels: true,
//   hours: false,
//   maxHours: 72,
//   minutes: true,
//   maxMinutes: 60,
//   seconds: true,
//   maxSeconds: 60,
// };
