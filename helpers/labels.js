import _ from "lodash";
import {connect} from "react-redux";
import React from "react";

export const  roastLevelDisplay = (roast_level) => {
  switch (roast_level) {
    case 1:
      return 'Light Roast';
    case 2:
      return 'Medium-Light Roast';
    case 3:
      return 'Medium Roast';
    case 4:
      return 'Medium-Dark Roast';
    case 5:
      return 'Dark Roast';
  }
};

export const beanTitleDisplay = (bean, origins, beanProcesses) => {
  const { bean_type, beanBlendComponents, name } = bean;

  if( name ){
    return name;
  }
  if(bean_type === 'single_origin'){
    const originID = beanBlendComponents[0].origin;
    const origin = originID ? origins[originID] : false;
    const region = beanBlendComponents[0].origin_region !== undefined && beanBlendComponents[0].origin_region ? beanBlendComponents[0].origin_region : false;
    const process = (beanBlendComponents[0].bean_process !== undefined && _.size(beanProcesses) && beanProcesses[beanBlendComponents[0].bean_process] !== undefined && beanProcesses[beanBlendComponents[0].bean_process].name) ? beanProcesses[beanBlendComponents[0].bean_process].name : false;

    let output = '';
    output = origin && origin.name !== undefined ? output.concat(origin.name + ' ') : output;
    output = region ? output.concat(region + ' ') : output;
    output = process ? output.concat(`(${process})`) : output;

    return output;
  }
  else if(bean_type === 'blend' && _.size(beanBlendComponents)){
    const orderedBeanBlendComponents = _.orderBy(beanBlendComponents, ['blend_percent'], ['desc']);
    let name = '';
    _.forEach(orderedBeanBlendComponents, (value, key) => {
      const prefix = key > 0 ? ' / ' : '';
      const output = ( _.size(origins) && origins[value.origin] !== undefined && origins[value.origin].name !== undefined ) ? origins[value.origin].name : false;
      // return output ? `${prefix} ${output}` : false;
      name = output ? name.concat(`${prefix}${output}`) : name;
    });

    return `${name} Blend`;
  }

  return 'Unnamed Bean';
};



export const secondsToTimeStringDisplay = seconds => {
  seconds = Number(seconds);
  if(isNaN(seconds) || typeof seconds == 'undefined' || seconds == 0 || seconds === 0) {
    return '';
  }

  const d = Number(seconds);
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);

  let output = '';
  output += h && h === 1 ? h + ' Hr' : '';
  output += h && h !== 1 ? h + ' Hrs' : '';

  output += h && (m || s) ? ', ' : '';

  output += m && m === 1 ? m + ' Min' : '';
  output += m && m !== 1 ? m + ' Mins' : '';

  output += (h && m && s) || (!h && m && s) ? ', ' : '';

  output += s ? s + ' Sec' : '';

  return output;
};


export const temperatureInRecipePreference = (temperature, userPreferences, temperatureMeasurement = null) => {
  // const userTempType = _.size(userPreferences) && userPreferences.global_temperatureMeasurement ? userPreferences.global_temperatureMeasurement : 'c';
  const thisTempType = temperatureMeasurement ? temperatureMeasurement : 'c';
  let tempNumber = `${Math.round( temperature * 10 ) / 10}`;

  return `${tempNumber}° ${thisTempType.toString().toUpperCase()}`
};


export const temperatureInUserPreference = (temperature, userPreferences, temperatureMeasurement = null) => {
  const userTempType = _.size(userPreferences) && userPreferences.global_temperatureMeasurement ? userPreferences.global_temperatureMeasurement : 'c';
  const thisTempType = temperatureMeasurement ? temperatureMeasurement : 'c';
  let tempNumber;
  if(userTempType === 'f'){
    if(thisTempType === 'c'){
      //* Convert C to F
      const farenheitTemp = (temperature * (9/5)) + 32;
      tempNumber = `${Math.round( farenheitTemp * 10 ) / 10}`;
    }
    else {
      tempNumber = Math.round( temperature * 10 ) / 10;
    }
  }
  else {
    if(thisTempType === 'f'){
      //* Convert F to C
      const celsiusTemp = (temperature - 32) * (5/9);
      tempNumber = `${Math.round( celsiusTemp * 10 ) / 10}`;
    }
    else {
      tempNumber = Math.round( temperature * 10 ) / 10;
    }
  }
  // return `${Math.round( temperature * 10 ) / 10}° C`;

  return `${tempNumber}° ${userTempType.toString().toUpperCase()}`
};

export const temperatureInOtherUnit = (temperature, temperatureMeasurement = null) => {
  if(!temperature){
    return null;
  }

  const thisTempType = temperatureMeasurement ? temperatureMeasurement : 'c';

  if(thisTempType === 'f'){
    const celsiusTemp = (temperature - 32) * (5/9);
    return `${Math.round( celsiusTemp * 10 ) / 10}° C`;
  }

  const farenheitTemp = (temperature * (9/5)) + 32;
  return `${Math.round( farenheitTemp * 10 ) / 10} ° F`;
};

export const prettyDate = (timestamp) => {
  // return new Date(Date.parse(timestamp)).toLocaleDateString("en-US"); // Didn't work
  return new Date(timestamp).toLocaleDateString("en-US");
};


export const getMonthFromTimestamp = (timestamp, abbreviated = false) => {
  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  if(abbreviated === true){
    monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  }
  const d = new Date(timestamp);
  return monthNames[d.getMonth()];
};
