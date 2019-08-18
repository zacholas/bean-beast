import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from 'react-native';
import _ from "lodash";
import { ImageUploadField, LabeledSliderField, PickerField, SwitchField } from "../../common/reduxForm";
import Modal from "../../common/Modal";
import { bodyText, textLink } from "../../../constants/Styles";
import * as styles from "../../common/reduxForm/Styles";
import { BodyText } from "../../common";
import EditRoastLevelForm from "../../roastLevels/EditRoastLevelForm";
// import EditRoastLevelForm from "../../roastLevels/EditRoastLevelForm";
// import { Container, BodyText } from "/components/common";

export default class RoastLevelFormField extends Component {
  constructor(props){
    super(props);
    this.addRoastLevelModal = null;
  }

  roastLevelOutput() {
    console.log('hi');
    console.log(this.props.formValues.EditBeanForm.values);
    let roastLevelAdvancedMode = false;
    if(
      this.props.formValues &&
      this.props.formValues.EditBeanForm &&
      this.props.formValues.EditBeanForm.values &&
      this.props.formValues.EditBeanForm.values.beans
    ){

      if(this.props.fieldPrefix){
        const regex = /\[(.*?)\]/;
        const prefixKey = regex.exec(this.props.fieldPrefix.toString())[1];
        roastLevelAdvancedMode = this.props.formValues.EditBeanForm.values.beans[prefixKey].roast_level_advanced_mode;
      }
      else if(
        _.size(this.props.formValues.EditBeanForm.values.beans) &&
        this.props.formValues.EditBeanForm.values.beans[0] &&
        this.props.formValues.EditBeanForm.values.beans[0].roast_level_advanced_mode
      ) {
        roastLevelAdvancedMode = this.props.formValues.EditBeanForm.values.beans[0].roast_level_advanced_mode;
      }
    }
    // if( roastLevelAdvancedMode === undefined ){
    //   console.log('it is undefined');
    //   if(this.props.fieldPrefix){
    //     console.log('there is a field prefix', this.props.fieldPrefix);
    //     console.log(this.props.change);
    //     this.props.change(`${this.props.fieldPrefix}.roast_level_advanced_mode`, true);
    //   }
    //   else {
    //     this.props.change('roast_level_advanced_mode', true);
    //   }
    // }
    if( roastLevelAdvancedMode === false ){
      return (
        <LabeledSliderField
          // name="roast_level"
          name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.roast_level` : 'roast_level'}
          label={false}
          step={1}
          minimumValue={1}
          maximumValue={5}
          tallNotches={[1, 3, 5]}
          bottomLabels={[
            { content: 'Light' },
            { content: 'Medium' },
            { content: 'Dark' },
          ]}
        />
      );
    }
    else {
      const roastLevelFieldLabel = (
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Roast Level:</Text>
          <TouchableOpacity onPress={() => this.addRoastLevelModal.show()}>
            <BodyText style={textLink}>+ Add New Roast Level</BodyText>
          </TouchableOpacity>
        </View>
      );



      const orderedRoastLevels = _.orderBy(this.props.roastLevels, ['order'], ['asc']);
      // console.log(orderedRoastLevels);
      const roastLevels = _.map(orderedRoastLevels, (roastLevel) => {
        let output = '';
        output = roastLevel.name ? output.concat(roastLevel.name) : output;

        return {
          id: roastLevel.id,
          name: output
        };
      });

      // TODO decide whether I want to require the roast level or not below.
      return (
        <PickerField
          name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.roast_level` : 'roast_level'}
          // name="roast_level"
          label={roastLevelFieldLabel}
          options={roastLevels}
          // validate={[required]}
        />
      )
    }
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Roast Level:</Text>
          <SwitchField
            // name="roast_level_advanced_mode"
            name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.roast_level_advanced_mode` : 'roast_level_advanced_mode'}
            label="Advanced Mode"
            valueLabelPosition="right"
            containerStyle={{ flexDirection: 'row' }}
            valueLabelTrue="On"
            valueLabelFalse="Off"
          />
          {/*<TouchableOpacity onPress={() => this.addRoastLevelModal.show()}>*/}
            {/*<BodyText style={textLink}>+ Add New roastLevel</BodyText>*/}
          {/*</TouchableOpacity>*/}
        </View>
        {this.roastLevelOutput()}

        <Modal ref={(ref) => { this.addRoastLevelModal = ref; }} headlineText="Add New Roast Level">
          <EditRoastLevelForm
            type="beanCreateModal"
            navigation={this.props.navigation}
            modal={this.addRoastLevelModal}
          />
        </Modal>
      </View>
    );
  }
}

RoastLevelFormField.propTypes = {};
