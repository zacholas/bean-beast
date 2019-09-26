import React, {Component} from 'react';
import { View, Text } from 'react-native';
import DoseField from './fields/DoseField';
import GrindField from './fields/GrindField';
import TemperatureField from './fields/TemperatureField';
import BrewMethodField from './fields/BrewMethodField';

//* Popup Attributes
import NotesForNextTime from './fields/NotesForNextTime';
import RecipeNotes from './fields/RecipeNotes';
import RecipeObjectives from './fields/RecipeObjectives';

//* Recipe Steps
import PreInfusion from './stepFields/PreInfusion';

class RecipeFormField extends Component {
  render() {
    switch (this.props.name) {
      case 'brew_method':
        return <BrewMethodField />;
      case 'dose':
        return <DoseField />;
      case 'grind':
        return <GrindField />;
      case 'temperature':
        return <TemperatureField />;


      case 'notes_for_next_time':
        return  <NotesForNextTime />;
      case 'recipe_notes':
        return  <RecipeNotes />;
      case 'recipe_objectives':
        return  <RecipeObjectives />;


      case 'pre_infusion':
        return  <PreInfusion />;
      default:
        return null;
    }
  }
}

export default RecipeFormField;