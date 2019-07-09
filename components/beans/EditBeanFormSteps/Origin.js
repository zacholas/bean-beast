import React, { Component } from 'react';
import PropTypes from "prop-types";
import _ from "lodash";
import {required} from "../../../helpers";
import {PickerField} from "../../common/reduxForm";
import {Text, TouchableOpacity, View} from "react-native";
import {bodyText, textLink} from "../../../constants/Styles";
import * as styles from "../../common/reduxForm/Styles";
import {BodyText} from "../../common";
import Modal from '../../common/Modal';
import EditOriginForm from "../../origins/EditOriginForm";
// import { View } from 'react-native';
// import { Container, BodyText } from "/components/common";

export default class Origin extends Component {
  constructor(props){
    super(props);
    this.addOriginModal = null;
  }

  render() {
    const originFieldLabel = (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Origin:</Text>
        <TouchableOpacity onPress={() => this.addOriginModal.show()}>
          <BodyText style={textLink}>+ Add New Origin</BodyText>
        </TouchableOpacity>
      </View>
    );

    const orderedOrigins = _.orderBy(this.props.origins, ['country', 'region'], ['asc', 'asc']);
    const origins = _.map(orderedOrigins, (origin) => {
      let output = '';
      output = origin.country ? output.concat(origin.country) : output;
      output = origin.country && origin.region ? output.concat(' — ') : output;
      output = origin.region ? output.concat(origin.region) : output;

      return {
        id: origin.id,
        name: output
      };
    });

    return (
      <View>
        <PickerField
          name="origin"
          label={originFieldLabel}
          options={origins}
          validate={[required]}
        />

        <Modal ref={(ref) => { this.addOriginModal = ref; }} headlineText="Add New Origin">
          <EditOriginForm
            type="beanCreateModal"
            navigation={this.props.navigation}
            modal={this.addOriginModal}
          />
        </Modal>
      </View>
    );
  }
}

Origin.propTypes = {
  origins: PropTypes.object
};

Origin.defaultProps = {
  origins: {}
};
