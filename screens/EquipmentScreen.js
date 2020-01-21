import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { BodyText, Button, Headline } from "../components/common";
import Modal from "../components/common/Modal";
import EditEquipmentForm from "../components/equipment/EditEquipmentForm";

class EquipmentScreen extends Component {
  static navigationOptions = {
    title: 'Equipment',
  };

  constructor(props) {
    super(props);
    this.addEquipmentModal = null;
    this.state = {
      mounted: false
    }
  }

  equipmentOutput(){
    const { equipment, equipmentTypes } = this.props;
    let output = null;

    if(_.size(equipmentTypes)){
      output = _.map(equipmentTypes, (equipmentType) => {
        const heading = equipmentType.name ? equipmentType.name : 'Misc Equipment';
        let equipmentOfThisType = _.filter(equipment, ['type', equipmentType.id]);
        equipmentOfThisType = _.orderBy(equipmentOfThisType, ['order'], ['asc']);
        let piecesOfEquipmentOutput = <BodyText>None Yet!</BodyText>;

        if(_.size(equipmentOfThisType)){
          piecesOfEquipmentOutput = _.map(equipmentOfThisType, (equipmentItem) => {
            return (
              <View key={equipmentItem.id}>
                {equipmentItem.name ? <BodyText>{equipmentItem.name}</BodyText> : <View/>}
              </View>
            );
          });
        }

        return (
          <View key={equipmentType.id}>
            <Headline noMargin>{heading}</Headline>
            <View>
              {piecesOfEquipmentOutput}
            </View>
          </View>
        );
      })
    }

    return output;
  }

  //* Need to force the component to re-render in order for the equipment form to be able to access the modal ref.
  componentDidMount(): void {
    this.setState({ mounted: true });
  }

  render() {
    return (
      <View>
        <ScrollView style={{padding:15}}>
          <View >
            <Button onPress={() => { this.addEquipmentModal.show() }} title="Add new Equipment" />
          </View>

          {this.equipmentOutput()}

        </ScrollView>

        <Modal ref={(ref) => { this.addEquipmentModal = ref; }} headlineText="Add New Equipment">
          <EditEquipmentForm
            type="createModal"
            navigation={this.props.navigation}
            modal={this.addEquipmentModal}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    equipment: state.equipment.equipment,
    equipmentTypes: state.equipment.equipmentTypes
  };
};

export default connect(mapStateToProps, {})(EquipmentScreen);

EquipmentScreen.propTypes = {
  equipment: PropTypes.object,
  equipmentTypes: PropTypes.object
};

EquipmentScreen.defaultProps = {
  equipment: {},
  equipmentTypes: {}
};
