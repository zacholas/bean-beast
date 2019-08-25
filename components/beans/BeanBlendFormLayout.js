import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import Modal from "../common/Modal";
import * as navRoutes from "../../constants/NavRoutes";
import { SliderField } from "../common/reduxForm";
import {textLink, marginBottom} from '../common/Styles';
import colors from '../../constants/Colors';
import { Button, Headline } from "../common";
import {FieldArray} from "redux-form";
import * as styles from "../common/reduxForm/Styles";
import BeanDetailsFormFields from "./BeanDetailsFormFields";
import {getFirstCoffeeSpecies} from "../../helpers";
// import { Container, BodyText } from "/components/common";


export default class BeanBlendFormLayout extends Component {
  constructor(props){
    super(props);
    this.editBeanBlendComponent = null;
    this.state = {
      editingBeanBlendComponentIndex: null,
      editingBeanBlendComponentPrefix: null
    };
  }



  _keyExtractor = (item, index) => {
    return `list-item-${index}`;
  };

  _editItem(item, index) {
    this.setState({
      editingBeanBlendComponentIndex: index,
      editingBeanBlendComponentPrefix: item
    });
    this.editBeanBlendComponent.show();
  }

  _beanName(bean, index){
    if(bean && bean.origin && this.props.origins){
      return <Text>{this.props.origins[bean.origin].name} {bean.origin_region && `(${bean.origin_region})`}</Text>
    }
    return <Text>Bean #{index + 1}</Text>
  }

  _beanSubtitle(bean){
    if(bean.bean_process || bean.coffee_species){
      return (
        <Headline h6>
          {(bean.bean_process && this.props.beanProcesses) && this.props.beanProcesses[bean.bean_process].name}
          {(bean.coffee_species && bean.bean_process) && ` | `}
          {(bean.coffee_species && this.props.coffeeSpecies) && this.props.coffeeSpecies[bean.coffee_species].name}
        </Headline>
      );
    }
  }

  _renderItem = (item, index, fields, itemValues) => {
    // console.log('item', item);
    // console.log(this.props.array.remove);
    return (
      <View key={index} style={{ ...marginBottom, padding: 10, backgroundColor: '#eee'  }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            {this._beanName(itemValues, index)}
            {this._beanSubtitle(itemValues)}
          </View>
          <TouchableOpacity style={{ padding: 5, marginRight: 10 }} onPress={() => this._editItem(item, index)}>
            <Text style={textLink}><Icon name="pencil" size={16}  /> Edit</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity style={{ padding: 5, paddingRight: 10 }} onPress={() => this.props.array.remove('beans', null, 0 )}>*/}
          <TouchableOpacity style={{ padding: 5, paddingRight: 10 }} onPress={() => fields.remove(index)}>
            <Icon name="close" size={18} style={{ color: colors.colorDanger }} />
          </TouchableOpacity>
        </View>
        <View>
          <SliderField
            name={`${item}.blend_percent`}
            label="Blend Percent"
            textLabelEnabled={true}
            textLabelPosition={"left"}
            // textLabelInputEnabled={true} //* TODO build this
            minimumValue={0}
            maximumValue={100}
            step={5}
          />
        </View>
      </View>
    );
  };

  renderBeans = ({ fields, meta: { touched, error, submitFailed }, parentProps }) => {
    //* For Single Origins, just add one and don't allow the adding/removal of em.
    if(parentProps.singleOrigin){
      if(fields.length === 0){
        fields.push({});
      }
    }
    return (
      <View>
        {touched &&
        ((error && <Text style={styles.errorText}>{error}</Text>) ||
          (warning && <Text style={styles.warningText}>{warning}</Text>))}

        {fields.map((bean, index) => {
          const thisBeanValues = this.props.formValues.EditBeanForm.values.beanBlendComponents[index];
          return this._renderItem(bean, index, fields, thisBeanValues);
        })}

        {!parentProps.singleOrigin && <Button title="Add New" onPress={() => fields.push({
          //* Default props when adding a new empty item. Should more or less match what's defined in EditBeanForm.js
          coffee_species: getFirstCoffeeSpecies(this.props.coffeeSpecies),
          roast_level_advanced_mode: this.props.userPreferences.beanEntry.roastLevelAdvancedMode,
          basic_roast_level: 3
        })} />}
      </View>
    );
  };

  render() {
    return (
      <View>
        <FieldArray name="beanBlendComponents" component={this.renderBeans} parentProps={this.props} />
        <Modal
          ref={(ref) => { this.editBeanBlendComponent = ref; }}
          showHeadline={false}
          dismissButtonText="Save & Continue"
          // headlineText="Edit Bean Blend Component"
        >
          <BeanDetailsFormFields
            fieldIndex={this.state.editingBeanBlendComponentIndex}
            fieldPrefix={this.state.editingBeanBlendComponentPrefix}
            origins={this.props.origins}
            roastLevels={this.props.roastLevels}
            beanProcesses={this.props.beanProcesses}
            coffeeSpecies={this.props.coffeeSpecies}
            navigation={this.props.navigation}
            formValues={this.props.formValues}
          />
        </Modal>
      </View>
    );
  }
}

BeanBlendFormLayout.propTypes = {};
