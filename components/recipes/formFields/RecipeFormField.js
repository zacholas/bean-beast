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
import NicknameField from './fields/Nickname';
import { PickerField } from "../../common/reduxForm";
import _ from "lodash";
import { beanTitleDisplay } from "../../../helpers/labels";
import { connect } from "react-redux";

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
      case 'bean_id':
        let beans = _.map(this.props.beans.beans, (bean) => {
          bean.name = beanTitleDisplay(bean, this.props.origins.origins, this.props.beanProcesses.beanProcesses);
          return bean;
        });

        beans = _.orderBy(beans, ['name'], ['asc']);

        return (
          <View>
            <PickerField
              name="bean_id"
              options={beans}
              placeholderText="–  Select a Bean  –"
            />
          </View>
        );


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
