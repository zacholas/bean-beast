import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { BodyText, Button, Headline } from "../components/common";
import Modal from "../components/common/Modal";
import EditEquipmentForm from "../components/equipment/EditEquipmentForm";
import Icon from 'react-native-vector-icons/FontAwesome';
import { centerEverything, textLink } from "../constants/Styles";
import Colors, { grayCardBG } from "../constants/Colors";
import { deleteEquipment, editEquipment, createEquipment } from "../actions";

const Styles = {
  sideIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: -15,
    marginLeft: 10,
    marginRight: -7,
    padding: 4
  },
  sideIcon: {
    padding: 8,
  }
};

class EquipmentScreen extends Component {
  static navigationOptions = {
    title: 'Equipment',
  };

  constructor(props) {
    super(props);
    this.addEquipmentModal = null;
    this.deleteConfirmModal = null;
    this.state = {
      mounted: false,
      modalFormType: 'createModal'
    }
  }

  equipmentOutput(){
    const { equipment, equipmentTypes } = this.props;
    let output = null;

    if(_.size(equipmentTypes)){
      output = _.map(equipmentTypes, (equipmentType) => {
        const heading = equipmentType.name_plural ? equipmentType.name_plural : equipmentType.name ? equipmentType.name : 'Misc Equipment';
        let equipmentOfThisType = _.filter(equipment, ['equipmentType', equipmentType.id]);
        equipmentOfThisType = _.orderBy(equipmentOfThisType, ['order'], ['asc']);
        let piecesOfEquipmentOutput = <BodyText>None Yet!</BodyText>;

        if(_.size(equipmentOfThisType)){
          piecesOfEquipmentOutput = _.map(equipmentOfThisType, (equipmentItem) => {
            const equipmentItemName = equipmentItem.name ? equipmentItem.name : 'Unnamed Piece of Equipment';

            return (
              <View key={equipmentItem.id}>
                <View style={{ marginBottom: 10, backgroundColor: grayCardBG, padding: 10, flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <BodyText noMargin>{equipmentItemName}</BodyText>
                  </View>
                  <View style={Styles.sideIcons}>
                    <TouchableOpacity onPress={() => this._onPressEdit(equipmentItem)} style={Styles.sideIcon}>
                      <Icon name="pencil" size={16} style={textLink} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._onPressDelete(equipmentItem.id)} style={Styles.sideIcon}>
                      <Icon name="trash" size={16} style={{ color: Colors.colorDanger }} />
                    </TouchableOpacity>
                  </View>
                </View>
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
            <Button onPress={() => { this._onPressCreate() }} title="Add new Equipment" />
          </View>

          {this.equipmentOutput()}

        </ScrollView>

        <Modal ref={(ref) => { this.addEquipmentModal = ref; }} headlineText="Add New Equipment">
          <EditEquipmentForm
            type={this.state.modalFormType}
            navigation={this.props.navigation}
            modal={this.addEquipmentModal}
          />
        </Modal>
        <Modal ref={(ref) => { this.deleteConfirmModal = ref; }}>
          <Button
            onPress={() => {this._deleteRecipe()}}
            title='Yes, delete'
            iconName='trash'
          />
        </Modal>
      </View>
    );
  }

  _onPressCreate() {
    this.setState({ modalFormType: 'createModal' });
    this.props.createEquipment();
    this.addEquipmentModal.show();
  }

  _onPressEdit(equipment){
    this.setState({ modalFormType: 'edit' });
    this.props.editEquipment(equipment);
    this.addEquipmentModal.show();
  }

  _onPressDelete(equipment_id){
    this.setState({ equipment_id });
    this.deleteConfirmModal.show();
  }

  _deleteRecipe(){
    this.deleteConfirmModal.hide();
    this.props.deleteEquipment(this.state.equipment_id, false);
  }
}

const mapStateToProps = state => {
  return {
    equipment: state.equipment.equipment,
    equipmentTypes: state.equipment.equipmentTypes
  };
};

export default connect(mapStateToProps, { deleteEquipment, editEquipment, createEquipment })(EquipmentScreen);

EquipmentScreen.propTypes = {
  equipment: PropTypes.object,
  equipmentTypes: PropTypes.object
};

EquipmentScreen.defaultProps = {
  equipment: {},
  equipmentTypes: {}
};
