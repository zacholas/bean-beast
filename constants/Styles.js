import { Platform, StatusBar } from 'react-native';

export * from './styles/RecipeSteps';

// import colorWhite from './Colors';
// import tintColor from './Colors';
import colors, {grayCardBG} from './Colors';

export const fontWeightLight = '300';
export const fontWeightNormal = '400';
export const fontWeightBold = '700';

export const defaultPaddingAmount = 15;
export const defaultMarginAmount = 20;
export const halfMarginAmount = 10;

export const defaultPadding = {
  padding: defaultPaddingAmount,
};

export const marginBottom = {
  marginBottom: defaultMarginAmount,
};

export const marginBottomHalf = {
  marginBottom: halfMarginAmount,
};

export const headingDefaults = {
  fontFamily: 'galano-grotesque-700',
};

export const h1FontSize = 32;
export const h1 = {
  ...headingDefaults,
  fontSize: h1FontSize,
  lineHeight: Platform.OS === 'ios' ? h1FontSize * 0.5 : undefined,
  paddingTop: Platform.OS === 'ios' ? h1FontSize : undefined
  // fontWeight: fontWeightLight
};

export const h2FontSize = 30;
export const h2 = {
  ...headingDefaults,
  fontSize: h2FontSize,
  lineHeight: Platform.OS === 'ios' ? h2FontSize * 0.5 : undefined,
  paddingTop: Platform.OS === 'ios' ? h2FontSize : undefined
};

export const h3FontSize = 26;
export const h3 = {
  ...headingDefaults,
  fontSize: h3FontSize,
  lineHeight: Platform.OS === 'ios' ? h3FontSize * 0.5 : undefined,
  paddingTop: Platform.OS === 'ios' ? h3FontSize : undefined
};

export const h4FontSize = 22;
export const h4 = {
  ...headingDefaults,
  fontSize: h4FontSize,
  lineHeight: Platform.OS === 'ios' ? h4FontSize * 0.5 : undefined,
  paddingTop: Platform.OS === 'ios' ? h4FontSize : undefined
};

export const h5FontSize = 15;
export const h5 = {
  ...headingDefaults,
  // fontWeight: fontWeightBold,
  letterSpacing: 1,

  fontFamily: 'galano-grotesque-800',
  fontSize: h5FontSize,
  lineHeight: Platform.OS === 'ios' ? h5FontSize * 0.5 : undefined,
  paddingTop: Platform.OS === 'ios' ? h5FontSize : undefined
};

export const h6FontSize = 12;
export const h6 = {
  ...headingDefaults,
  // fontWeight: fontWeightBold,
  letterSpacing: 1,

  fontFamily: 'galano-grotesque-800',

  fontSize: h6FontSize,
  lineHeight: Platform.OS === 'ios' ? h6FontSize * 0.5 : undefined,
  paddingTop: Platform.OS === 'ios' ? h6FontSize : undefined
};

export const headline = {
  ...h2,
};

export const bodyText = {
  fontSize: 16,
  fontFamily: 'avenir-next-400',
};

export const centerText = {
  textAlign: 'center',
};

export const centerEverything = {
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
};

export const container = {
  paddingRight: defaultPaddingAmount,
  paddingLeft: defaultPaddingAmount,
};

export const contentContainer = {
  flex: 1,
};

export const centeredContainer = {
  ...defaultPadding,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};


//* Cards
export const card = {
  ...defaultPadding,
  ...marginBottom,
  backgroundColor: colors.colorWhite,
};

export const cardGray = {
  ...defaultPadding,
  ...marginBottom,
  backgroundColor: grayCardBG,
};


//* Text Styles
export const textLink = {
  color: colors.tintColor,
};

export const whiteText = {
  color: colors.colorWhite,
};

export const headerNavTextLink = {
  ...bodyText,
  ...textLink,
  padding: 10,
  paddingRight: 14
};
