import {StyleSheet} from "react-native";
import { grayCardBG, colorGray400 } from '../../constants/Colors';
import { halfMarginAmount, centerEverything, marginBottom, centeredContainer } from "../../constants/Styles";

export default StyleSheet.create({
  //* Top Heading Area
  brewMethodContainer: {
    ...centeredContainer,
    backgroundColor: grayCardBG,
    minHeight: 200,
    position: 'relative',
  },

  //* Primary Info (grind, dose, temp)
  recipePrimaryInfoBar: {
    ...marginBottom,
    marginTop: halfMarginAmount,
    flexDirection: 'row',
    marginHorizontal: -halfMarginAmount / 2,
  },
  recipePrimaryInfo: {
    ...centerEverything,
    backgroundColor: grayCardBG,
    padding: 10,
    flex: 1,
    marginHorizontal: halfMarginAmount / 2,
  },

  //* Overall Rating & Add to Favorites
  recipeRatingContainer: {

  },
  recipeOverallRatingBar: {
    ...marginBottom,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeOverallRatingSliderContainer: {
    flex: 1,
  },
  recipeAddToFavoritesContainer: {

  },
  recipeAddToFavoritesButton: {

  },
  recipeCriteriaRatingContainer: {
    flexDirection: 'row',
    ...marginBottom,
  },
  recipeCriteriaRating: {
    ...centerEverything,
    padding: 12,
    backgroundColor: colorGray400,
    borderRadius: 400,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0.3)',
    width: 70,
    height: 70,
  },
  recipeCriteriaRatingEmpty: {

  }
});