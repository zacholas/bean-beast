import React, {Component} from 'react';
import { View, Text } from 'react-native';
import _ from "lodash";
import {PickerField, TextField} from "../../../common/reduxForm";
import { connect } from "react-redux";
import { BodyText } from "../../../common";

class BrewEquipmentField extends Component {
  render() {
    let brewEquipment = [];
    if(_.size(this.props.equipment)){
      brewEquipment = _.map(this.props.equipment, (equipment) => {
        return {
          id: equipment.id,
          name: equipment.name
        };
      });
    }

    return (
      <View>
        <PickerField
          name="brew_equipment"
          label="Brew Equipment"
          options={brewEquipment}
        />
        <BodyText>Note: You can add more brew equipment in the "More" tab of the app.</BodyText>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const brewEquipment = _.filter(state.equipment.equipment, (equipment) => {
    return equipment.equipmentType === 'default_brew_methods';
  });
  const orderedBrewEquipment = _.orderBy(brewEquipment, ['order'], ['asc']);
  return {
    equipment: orderedBrewEquipment,
  }
};

export default connect(mapStateToProps)(BrewEquipmentField);
