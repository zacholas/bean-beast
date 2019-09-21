import React, {Component} from 'react';
import { View, Text } from 'react-native';
import _ from "lodash";
import {PickerField, TextField} from "../../../common/reduxForm";
import { connect } from "react-redux";

class BrewMethodField extends Component {
  render() {
    const orderedBrewMethods = _.orderBy(this.props.brewMethods.brewMethods, ['order'], ['asc']);
    const brewMethods = _.map(orderedBrewMethods, (brewMethod) => {
      return {
        id: brewMethod.id,
        name: brewMethod.name
      };
    });

    return (
      <View>
        <PickerField
          // name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.bean_process` : 'bean_process'}
          name="brew_method"
          label="Brew Method"
          options={brewMethods}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brewMethods: state.brewMethods,
  }
};

export default connect(mapStateToProps)(BrewMethodField);