import colors from "../../../constants/Colors";
import {bodyText, marginBottom} from "../../../constants/Styles";

export const inputContainer = {
  ...marginBottom
};

export const textInput = {
  ...bodyText,
  borderColor: 'rgba(0,0,0,.2)',
  borderWidth: 1,
  height: 47,
  padding: 10,
  borderRadius: 2,
};

export const label = {
  marginBottom: 7,
};

export const warningText = {
  marginTop: 2,
  color: colors.colorWarning,
};

export const errorText = {
  marginTop: 2,
  color: colors.colorDanger
};
