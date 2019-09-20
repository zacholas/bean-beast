import React, {Component} from 'react';
import { View, Text } from 'react-native';
import DoseField from './fields/DoseField';

class RecipeFormField extends Component {
  render() {
    switch (this.props.name) {
      case 'dose':
        return <DoseField />
    }
  }
}

export default RecipeFormField;