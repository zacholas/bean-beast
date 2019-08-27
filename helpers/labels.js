import _ from "lodash";

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
