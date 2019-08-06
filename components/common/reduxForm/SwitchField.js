import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";
import PropTypes from "prop-types";

const style = StyleSheet.create({
  valueLabelStacked: {

  },
  valueLabelAside: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const SwitchComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  valueLabelDisplay,
  valueLabelPosition,
  valueLabelTrue,
  valueLabelFalse
}) => {
  const field = <Switch onValueChange={onChange} {...restInput} value={restInput.value} />
  const displayedValue = valueLabelDisplayOutput(restInput.value, valueLabelTrue, valueLabelFalse);
  let output;

  if(valueLabelDisplay && valueLabelDisplay === true){
    if(valueLabelPosition === 'left'){
      output = (
        <View style={style.valueLabelAside}>
          <Text style={{ paddingRight: 10 }}>{displayedValue}</Text>
          {field}
        </View>
      );
    }
    else if(valueLabelPosition === 'right'){
      output = (
        <View style={style.valueLabelAside}>
          {field}
          <Text style={{ paddingLeft: 10 }}>{displayedValue}</Text>
        </View>
      );
    }
    else if(valueLabelPosition === 'top'){
      output = (
        <View style={style.valueLabelStacked}>
          <Text style={{ paddingBottom: 4 }}>{displayedValue}</Text>
          {field}
        </View>
      );
    }
    else if(valueLabelPosition === 'bottom'){
      output = (
        <View style={style.valueLabelStacked}>
          {field}
          <Text style={{ paddingTop: 4 }}>{displayedValue}</Text>
        </View>
      );
    }
  }
  else {
    output = field;
  }

  return (
    <View style={styles.inputContainer}>
      {output}
      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const valueLabelDisplayOutput = (switchValue, trueText, falseText) => {
  if(switchValue === true){
    return trueText;
  }
  else if (switchValue === false){
    return falseText;
  }

  return false;
};

const SwitchField = (props) => {
  return (
    <View style={{ alignItems: 'stretch', ...props.containerStyle }}>
      <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>
      <Field
        name={props.name}
        validate={props.validate}
        component={SwitchComponent}
        valueLabelDisplay={props.valueLabelDisplay}
        valueLabelPosition={props.valueLabelPosition}
        valueLabelTrue={props.valueLabelTrue}
        valueLabelFalse={props.valueLabelFalse}
      />
    </View>
  );
};

export { SwitchField };

SwitchField.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.array,
  label: PropTypes.string,
  valueLabelDisplay: PropTypes.bool,
  valueLabelPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  valueLabelTrue: PropTypes.string,
  valueLabelFalse: PropTypes.string,
  containerStyle: PropTypes.object,
};

SwitchField.defaultProps = {
  valueLabelDisplay: true,
  valueLabelPosition: 'right', // left, right, top, bottom,
  valueLabelTrue: 'Yes',
  valueLabelFalse: 'No',
  containerStyle: null
};
