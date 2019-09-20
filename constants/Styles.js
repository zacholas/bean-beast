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

export const h1 = {
  fontSize: 40,
  // fontWeight: fontWeightLight
};

export const h2 = {
  fontSize: 33,
};

export const h3 = {
  fontSize: 26,
};

export const h4 = {
  fontSize: 22
};

export const h5 = {
  fontSize: 14,
  fontWeight: fontWeightBold,
  letterSpacing: 1
};

export const h6 = {
  fontSize: 10,
  fontWeight: fontWeightBold,
  letterSpacing: 1
};

export const headline = {
  ...h2,
};

export const bodyText = {
  fontSize: 16,
  // fontFamily: 'Raleway-Regular',
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
