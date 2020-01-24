import React, {Component} from 'react';
import { View, Text } from 'react-native';
import _ from "lodash";
import { connect } from "react-redux";
import { PickerSelectField, TextField } from "../../../common/reduxForm";
import { required } from "../../../../helpers";
import { BodyText } from "../../../common";


class GrindField extends Component {
  render() {
    let grinders = [];
    if(_.size(this.props.grinders)){
      grinders = _.map(this.props.grinders, (equipment) => {
        return {
          value: equipment.id,
          key: equipment.id,
          label: equipment.name
        };
      });
    }

    return (
      <View>
        <TextField
          name="grind"
          label="Grind"
          validate={[required]}
        />
        <PickerSelectField
          name="grinder"
          label="Grinder"
          options={grinders}
        />
        <BodyText>Note: You can add/edit grinders in the "More" tab of the app.</BodyText>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  const grinders = _.filter(state.equipment.equipment, (equipment) => {
    return equipment.equipmentType === 'default_grinders';
  });
  const orderedGrinders = _.orderBy(grinders, ['order'], ['asc']);

  // console.log('theseGrinders', theseGrinders);

  return {
    grinders: orderedGrinders,
  }
};

export default connect(mapStateToProps)(GrindField);
