import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import { BeanFormFields } from "./BeanFormFields";
import Modal from "../common/Modal";
import * as navRoutes from "../../constants/NavRoutes";
import { SliderField } from "../common/reduxForm";
import { textLink, marginBottom } from '../common/Styles';
import colors from '../../constants/Colors';
import { Button } from "../common";
// import { Container, BodyText } from "/components/common";


export default class BeanBlendFormLayout extends Component {
  constructor(props){
    super(props);
    this.editBeanBlendComponent = null;
  }

  _keyExtractor = (item, index) => {
    return `list-item-${index}`;
  };

  _editItem() {
    this.editBeanBlendComponent.show();
  }

  _renderItem = (item, index) => {
    console.log('item', item);
    console.log(this.props.array.remove);
    return (
      <View key={index} style={{ ...marginBottom, padding: 10, backgroundColor: '#eee'  }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text>Bean {item.index}</Text>
          </View>
          <TouchableOpacity style={{ padding: 5, marginRight: 10 }} onPress={() => this._editItem()}>
            <Text style={textLink}><Icon name="pencil" size={16}  /> Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 5, paddingRight: 10 }} onPress={() => this.props.array.remove('beans', null, 0 )}>
            <Icon name="close" size={18} style={{ color: colors.colorDanger }} />
          </TouchableOpacity>
        </View>
        <View>
          <SliderField
            name="blendPercent"
            label="Blend Percent"
            textLabelEnabled={true}
            textLabelPosition={"left"}
            // textLabelInputEnabled={true} //* TODO build this
            minimumValue={0}
            maximumValue={100}
            step={1}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        <Text>hii</Text>
        <FlatList
          data={this.props.formValues.EditBeanForm.values.beans}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <Modal ref={(ref) => { this.editBeanBlendComponent = ref; }} headlineText="Edit Bean Blend Component">
          <BeanFormFields
            singleOrigin={false}
            origins={this.props.origins}
            roastLevels={this.props.roastLevels}
            beanProcesses={this.props.beanProcesses}
            coffeeSpecies={this.props.coffeeSpecies}
            navigation={this.props.navigation}
            formValues={this.props.formValues}
          />
        </Modal>
        <Button title="Add New" onPress={() => this.props.array.push('beans', {
          roast_level_advanced_mode: true
        } )}/>

      </View>
    );
  }
}

BeanBlendFormLayout.propTypes = {};
