import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { connect } from "react-redux";

import DoseField from './fields/DoseField';
import YieldField from './fields/YieldField';
import GrindField from './fields/GrindField';
import TemperatureField from './fields/TemperatureField';
import BrewMethodField from './fields/BrewMethodField';
import BrewEquipmentField from './fields/BrewEquipmentField';
import { BeanPickerField } from './fields/BeanPickerField';

//* Popup Attributes
import NotesForNextTime from './fields/NotesForNextTime';
import RecipeNotes from './fields/RecipeNotes';
import RecipeObjectives from './fields/RecipeObjectives';
import NicknameField from './fields/Nickname';


class RecipeFormField extends Component {

  render() {
    switch (this.props.name) {
      case 'brew_method':
        return <BrewMethodField />;
      case 'brew_equipment':
        return <BrewEquipmentField />;
      case 'dose':
        return <DoseField />;
      case 'grind':
        return <GrindField />;
      case 'temperature':
        return <TemperatureField temperatureMeasurement={this.props.temperatureMeasurement} />;
      case 'bean_id':
        return <BeanPickerField name="bean_id" />;
      case 'yield':
        return <YieldField />;


      // case 'bean_idOLD':
      //   let beans = _.map(this.props.beans.beans, (bean) => {
      //     bean.name = beanTitleDisplay(bean, this.props.origins.origins, this.props.beanProcesses.beanProcesses);
      //     return bean;
      //   });
      //
      //   beans = _.orderBy(beans, ['name'], ['asc']);
      //
      //   return (
      //     <View>
      //       <PickerField
      //         name="bean_id"
      //         options={beans}
      //         placeholderText="–  Select a Bean  –"
      //       />
      //     </View>
      //   );


      case 'notes_for_next_time':
        return  <NotesForNextTime />;
      case 'recipe_notes':
        return  <RecipeNotes />;
      case 'recipe_objectives':
        return  <RecipeObjectives />;
      case 'nickname':
        return <NicknameField />;


      default:
        return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    beans: state.beans,
    origins: state.origins,
    beanProcesses: state.beanProcesses
  }
};

RecipeFormField = connect(mapStateToProps, { })(RecipeFormField);

export default RecipeFormField;
