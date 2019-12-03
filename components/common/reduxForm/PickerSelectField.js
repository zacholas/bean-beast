import React from 'react';
import { StyleSheet, Text, View, Picker, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';
import { Field } from 'redux-form';
import {
  bodyText,
} from '../Styles';
import * as styles from "./Styles";
import PropTypes from "prop-types";
import Colors from "../../../constants/Colors";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...bodyText,
  },
  inputAndroid: {
    ...bodyText,
  },
  viewContainer: {
    flexDirection: 'row',
  },
  placeholder: {
    color: '#000'
  }
});

const conditionalPickerSelectStyles = {
  normal: {
    iconContainer: {
      top: 0,
      right: 0,
      position: 'relative',
      paddingTop: Platform.OS === 'ios' ? 3 : 7,
      paddingLeft: 7,
      flex: 0,
      textAlign: 'right',
      marginLeft: 'auto'
    },
    inputIOSContainer: {
      flexDirection: 'row',
      flex: 1
    },
    inputAndroidContainer: {
      flexDirection: 'row',
      flex: 1
    },
  },
  inline: {
    iconContainer: {
      top: 0,
      right: 0,
      position: 'relative',
      paddingTop: Platform.OS === 'ios' ? 3 : 7,
      paddingLeft: 7,
    },
    inputIOSContainer: {
      flexDirection: 'row',
    },
    inputAndroidContainer: {
      flexDirection: 'row',
    },
  }
};

const fieldLayoutStyles = {
  normal: {
    outerContainer: {
    },
    mainContainer: {
      borderRadius: 2,
      borderWidth: 1,
      borderColor: Colors.colorGray800,
      paddingVertical: 9,
      paddingHorizontal: 14
    },
    spacerItem: {
      display: 'none'
    },
  },
  inline: {
    outerContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    mainContainer: {
      borderRadius: 2,
      borderWidth: 1,
      borderColor: Colors.colorGray800,
      paddingVertical: 3,
      paddingHorizontal: 6
    },
    spacerItem: {
      flex: 1,
    },
  }
};

const SelectComponent = ({
  input: { onChange, ...restInput },
  label,
  type,
  meta: { touched, error, warning },
  options,
  placeholderText,
  defaultValue,
  containerStyle,
  fieldLayout,
  pickerStyle
}) => {
  let selectedValue = undefined;
  if(restInput.value.toString()){
    selectedValue = restInput.value.toString();
  }
  if(defaultValue && !restInput.value.toString()){
    selectedValue = defaultValue;
  }
  return (
    <View style={{ ...styles.inputContainer, ...containerStyle }}>
      <View style={fieldLayout === 'normal' ? {...fieldLayoutStyles.normal.outerContainer} : {...fieldLayoutStyles.inline.outerContainer}}>
        <View style={fieldLayout === 'normal' ? {...fieldLayoutStyles.normal.mainContainer} : {...fieldLayoutStyles.inline.mainContainer}}>
          <RNPickerSelect
            onValueChange={onChange}
            items={options}
            placeholder={{
              value: null,
              label: placeholderText
            }}
            itemKey={selectedValue}
            {...restInput}
            useNativeAndroidPickerStyle={false}
            style={
              fieldLayout === 'normal' ? {
                ...pickerSelectStyles,
                ...conditionalPickerSelectStyles.normal,
                ...pickerStyle
              } :
              {
                ...pickerSelectStyles,
                ...conditionalPickerSelectStyles.inline,
                ...pickerStyle
              }
            }
            Icon={() => {
              return <Icon name="chevron-down" size={14} style={{ color: Colors.colorGray1200, margin: 0 }} />;
            }}
          />
        </View>
        <View style={fieldLayout === 'normal' ? {...fieldLayoutStyles.normal.spacerItem} : {...fieldLayoutStyles.inline.spacerItem}} />
      </View>
      {/*<Picker selectedValue={restInput.value.toString()} onValueChange={onChange} {...restInput}>*/}
        {/*<Picker.Item key='default' value='' label={placeholderText} />*/}
        {/*{pickerOptions}*/}
      {/*</Picker>*/}
      {touched &&
      ((error && <Text style={styles.errorText}>{error}</Text>) ||
        (warning && <Text style={styles.warningText}>{warning}</Text>))}
    </View>
  );
};

const PickerSelectField = (props) => {
  let label = props.label;
  if(typeof(props.label) === 'string'){
    label = <Text style={StyleSheet.flatten([bodyText, styles.label])}>{props.label}:</Text>;
  }
  return (
    <View style={{ alignItems: 'stretch' }}>
      {label}
      <Field
        name={props.name}
        validate={props.validate}
        component={SelectComponent}
        options={props.options}
        placeholderText={props.placeholderText}
        defaultValue={props.defaultValue}
        containerStyle={props.containerStyle}
        fieldLayout={props.fieldLayout}
        pickerStyle={props.pickerStyle}
      />
    </View>
  );
};

export { PickerSelectField };

PickerSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.array,
  options: PropTypes.array.isRequired,
  placeholderText: PropTypes.string,
  defaultValue: PropTypes.string,
  containerStyle: PropTypes.object,
  pickerStyle: PropTypes.object,
  fieldLayout: PropTypes.oneOf(['normal', 'inline']),
};

PickerSelectField.defaultProps = {
  placeholderText: '–  Select an Option  –',
  defaultValue: null,
  fieldLayout: 'normal',
  containerStyle: {},
  pickerStyle: {}
};

