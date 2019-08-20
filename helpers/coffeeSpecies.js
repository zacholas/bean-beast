import _ from 'lodash';

//* Returns the first (aka lowest index) item in the Coffee Species collection, which should be arabica, unless they have deleted it for some reason
export const getFirstCoffeeSpecies = (allCoffeeSpecies) => {
  if(_.size(allCoffeeSpecies)){
    return _.orderBy(allCoffeeSpecies, ['order'], ['asc'])[0].id;
  }
  return null;
};