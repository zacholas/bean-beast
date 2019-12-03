import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from 'react-native';
import _ from "lodash";
import { PickerField, PickerSelectField, SwitchField, TextField } from "../common/reduxForm";
import Modal from "../common/Modal";
import { bodyText, textLink } from "../../constants/Styles";
import * as styles from "../common/reduxForm/Styles";
import { BodyText, Hr } from "../common";
import EditOriginForm from "../origins/EditOriginForm";
import RoastLevelFormField from "./EditBeanFormSteps/RoastLevelFormField";
import EditBeanProcessForm from "../beanProcesses/EditBeanProcessForm";
import { required } from "../../helpers";
import EditCoffeeSpeciesForm from "../coffeeSpecies/EditCoffeeSpeciesForm";
// import { Container, BodyText } from "/components/common";

export default class BeanDetailsFormFields extends Component {
  constructor(props){
    super(props);
    this.addOriginModal = null;
    this.addBeanProcessModal = null;
    this.addCoffeeSpeciesModal = null;
  }

  countryLabel(){
    return (
      <View>
        <Text style={bodyText}>Origin Country, e.g. "Ethiopia":</Text>
        <Text style={{ ...bodyText, ...styles.label, fontSize: 13, fontStyle: 'italic', marginTop: 3 }}>(Note: For blends, I recommend just writing "Blend")</Text>
      </View>
    );
  }

  regionLabel(){
    return (
      <View>
        <Text style={bodyText}>Origin Region:</Text>
        <Text style={{ ...bodyText, ...styles.label, fontSize: 13, fontStyle: 'italic', marginTop: 3 }}>(e.g. "Yirga Chefe")</Text>
      </View>
    );
  }

  originDetailsLabel(){
    return (
      <View>
        <Text style={bodyText}>Origin Details:</Text>
        <Text style={{ ...bodyText, ...styles.label, fontSize: 13, fontStyle: 'italic', marginTop: 3 }}>(e.g. the name of the farm, estate, etc.)</Text>
      </View>
    );
  }

  elevationLabel(){
    return (
      <View>
        <Text style={bodyText}>Elevation:</Text>
        <Text style={{ ...bodyText, ...styles.label, fontSize: 13, fontStyle: 'italic', marginTop: 3 }}>Generally expressed in Meters Above Sea Level. (MASL)</Text>
      </View>
    );
  }

  render() {
    const originFieldLabel = (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Origin Country:</Text>
        <TouchableOpacity onPress={() => this.addOriginModal.show()}>
          {/*<BodyText style={textLink}>+ Add New Origin</BodyText>*/}
          <BodyText style={textLink}>+ Add New</BodyText>
        </TouchableOpacity>
      </View>
    );

    const beanProcessFieldLabel = (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Bean Process:</Text>
        <TouchableOpacity onPress={() => this.addBeanProcessModal.show()}>
          {/*<BodyText style={textLink}>+ Add New Bean Process</BodyText>*/}
          <BodyText style={textLink}>+ Add New</BodyText>
        </TouchableOpacity>
      </View>
    );

    const coffeeSpeciesFieldLabel = (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Coffee Species:</Text>
        <TouchableOpacity onPress={() => this.addCoffeeSpeciesModal.show()}>
          {/*<BodyText style={textLink}>+ Add New Coffee Species</BodyText>*/}
          <BodyText style={textLink}>+ Add New</BodyText>
        </TouchableOpacity>
      </View>
    );

    //* Origins options
    //* TODO probably have them ordered by number at some point
    // const orderedOrigins = _.orderBy(this.props.origins, ['country', 'region'], ['asc', 'asc']);
    const orderedOrigins = _.orderBy(this.props.origins, ['name'], ['asc']);
    let origins = [];
    if(_.size(orderedOrigins)){
      origins = _.map(orderedOrigins, (origin) => {
        return {
          key: origin.id,
          value: origin.id,
          label: origin.name
        };
      });
    }
    // const origins = _.map(orderedOrigins, (origin) => {
    //   return {
    //     id: origin.id,
    //     name: origin.name
    //   };
    // });



    //* Bean Process Picker Items
    const orderedBeanProcesses = _.orderBy(this.props.beanProcesses, ['order'], ['asc']);
    // const beanProcessesOld = _.map(orderedBeanProcesses, (beanProcess) => {
    //   let output = '';
    //   output = beanProcess.name ? output.concat(beanProcess.name) : output;
    //
    //   return {
    //     id: beanProcess.id,
    //     name: output
    //   };
    // });
    let beanProcesses = [];
    if(_.size(orderedBeanProcesses)){
      beanProcesses = _.map(orderedBeanProcesses, (beanProcess) => {
        let output = '';
        output = beanProcess.name ? output.concat(beanProcess.name) : output;

        return {
          key: beanProcess.id,
          value: beanProcess.id,
          label: output
        };
      });
    }


    //* Species Options
    const orderedCoffeeSpecies = _.orderBy(this.props.coffeeSpecies, ['order'], ['asc']);
    let coffeeSpecies = [];
    if(_.size(orderedCoffeeSpecies)){
      coffeeSpecies = _.map(orderedCoffeeSpecies, (coffeeSpecies) => {
        let output = '';
        output = coffeeSpecies.name ? output.concat(coffeeSpecies.name) : output;

        return {
          key: coffeeSpecies.id,
          value: coffeeSpecies.id,
          label: output
        };
      });
    }
    // const coffeeSpecies = _.map(orderedCoffeeSpecies, (coffeeSpecies) => {
    //   let output = '';
    //   output = coffeeSpecies.name ? output.concat(coffeeSpecies.name) : output;
    //
    //   return {
    //     id: coffeeSpecies.id,
    //     name: output
    //   };
    // });



    return (
      <View>
        <RoastLevelFormField
          fieldIndex={this.props.fieldIndex}
          fieldPrefix={this.props.fieldPrefix}
          origins={this.props.origins}
          roastLevels={this.props.roastLevels}
          navigation={this.props.navigation}
          formValues={this.props.formValues}
        />

        <Hr />

        {/*<PickerField*/}
          {/*name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.bean_process` : 'bean_process'}*/}
          {/*// name="bean_process"*/}
          {/*label={beanProcessFieldLabel}*/}
          {/*options={beanProcesses}*/}
        {/*/>*/}

        {beanProcessFieldLabel}
        <PickerSelectField
          name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.bean_process` : 'bean_process'}
          options={beanProcesses}
        />

        <Hr />
        {/*<PickerField*/}
          {/*// name="origin"*/}
          {/*name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.origin` : 'origin'}*/}
          {/*label={originFieldLabel}*/}
          {/*options={origins}*/}
          {/*// validate={[required]}*/}
        {/*/>*/}
        {originFieldLabel}
        <PickerSelectField
          name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.origin` : 'origin'}
          options={origins}
        />
        <Hr/>

        <TextField
          // name="origin_region"
          name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.origin_region` : 'origin_region'}
          label={this.regionLabel()}
        />

        <TextField
          // name="origin_details"
          name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.origin_details` : 'origin_details'}
          label={this.originDetailsLabel()}
        />

        <TextField
          name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.elevation` : 'elevation'}
          label={this.elevationLabel()}
          // validate={[required]}
        />

        <Hr />

        {/*<PickerField*/}
          {/*// name="coffee_species"*/}
          {/*name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.coffee_species` : 'coffee_species'}*/}
          {/*label={coffeeSpeciesFieldLabel}*/}
          {/*options={coffeeSpecies}*/}
        {/*/>*/}
        {coffeeSpeciesFieldLabel}
        <PickerSelectField
          name={this.props.fieldPrefix ? `${this.props.fieldPrefix}.coffee_species` : 'coffee_species'}
          options={coffeeSpecies}
        />

        <Modal ref={(ref) => { this.addBeanProcessModal = ref; }} headlineText="Add New Bean Process">
          <EditBeanProcessForm
            type="beanCreateModal"
            navigation={this.props.navigation}
            modal={this.addBeanProcessModal}
            fieldPrefix={this.props.fieldPrefix ? this.props.fieldPrefix : false}
          />
        </Modal>
        <Modal ref={(ref) => { this.addCoffeeSpeciesModal = ref; }} headlineText="Add New Coffee Species">
          <EditCoffeeSpeciesForm
            type="beanCreateModal"
            navigation={this.props.navigation}
            modal={this.addCoffeeSpeciesModal}
            fieldPrefix={this.props.fieldPrefix ? this.props.fieldPrefix : false}
          />
        </Modal>
        <Modal ref={(ref) => { this.addOriginModal = ref; }} headlineText="Add New Origin">
          <EditOriginForm
            type="beanCreateModal"
            navigation={this.props.navigation}
            modal={this.addOriginModal}
            fieldPrefix={this.props.fieldPrefix ? this.props.fieldPrefix : false}
          />
        </Modal>
      </View>
    );
  }
}

BeanDetailsFormFields.propTypes = {
  fieldIndex: PropTypes.number
};

BeanDetailsFormFields.defaultProps = {
  fieldIndex: 0
};
