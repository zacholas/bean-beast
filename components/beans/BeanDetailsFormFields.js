import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from 'react-native';
import _ from "lodash";
import { PickerField, TextField } from "../common/reduxForm";
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

  render() {
    const originFieldLabel = (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Origin:</Text>
        <TouchableOpacity onPress={() => this.addOriginModal.show()}>
          <BodyText style={textLink}>+ Add New Origin</BodyText>
        </TouchableOpacity>
      </View>
    );

    const beanProcessFieldLabel = (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Bean Process:</Text>
        <TouchableOpacity onPress={() => this.addBeanProcessModal.show()}>
          <BodyText style={textLink}>+ Add New Bean Process</BodyText>
        </TouchableOpacity>
      </View>
    );

    const coffeeSpeciesFieldLabel = (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...bodyText, ...styles.label, flex: 1 }}>Coffee Species:</Text>
        <TouchableOpacity onPress={() => this.addCoffeeSpeciesModal.show()}>
          <BodyText style={textLink}>+ Add New Coffee Species</BodyText>
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

    const orderedBeanProcesses = _.orderBy(this.props.beanProcesses, ['order'], ['asc']);
    const beanProcesses = _.map(orderedBeanProcesses, (beanProcess) => {
      let output = '';
      output = beanProcess.name ? output.concat(beanProcess.name) : output;

      return {
        id: beanProcess.id,
        name: output
      };
    });

    const orderedCoffeeSpecies = _.orderBy(this.props.coffeeSpecies, ['order'], ['asc']);
    const coffeeSpecies = _.map(orderedCoffeeSpecies, (coffeeSpecies) => {
      let output = '';
      output = coffeeSpecies.name ? output.concat(coffeeSpecies.name) : output;

      return {
        id: coffeeSpecies.id,
        name: output
      };
    });

    return (
      <View>
        <RoastLevelFormField
          origins={this.props.origins}
          roastLevels={this.props.roastLevels}
          navigation={this.props.navigation}
          formValues={this.props.formValues}
        />

        <Hr />

        <PickerField
          name="bean_process"
          label={beanProcessFieldLabel}
          options={beanProcesses}
        />

        <Hr />

        {/*<TextField*/}
          {/*name="origin_country"*/}
          {/*label={this.countryLabel()}*/}
          {/*validate={[required]}*/}
        {/*/>*/}

        <PickerField
          name="origin"
          label={originFieldLabel}
          options={origins}
          validate={[required]}
        />

        <TextField
          name="origin_region"
          label={this.regionLabel()}
        />

        <TextField
          name="origin_details"
          label={this.originDetailsLabel()}
        />

        <Hr />

        <PickerField
          name="coffee_species"
          label={coffeeSpeciesFieldLabel}
          options={coffeeSpecies}
        />

        <Modal ref={(ref) => { this.addBeanProcessModal = ref; }} headlineText="Add New Bean Process">
          <EditBeanProcessForm
            type="beanCreateModal"
            navigation={this.props.navigation}
            modal={this.addBeanProcessModal}
          />
        </Modal>
        <Modal ref={(ref) => { this.addCoffeeSpeciesModal = ref; }} headlineText="Add New Coffee Species">
          <EditCoffeeSpeciesForm
            type="beanCreateModal"
            navigation={this.props.navigation}
            modal={this.addCoffeeSpeciesModal}
          />
        </Modal>
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

BeanDetailsFormFields.propTypes = {};
