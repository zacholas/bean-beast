import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { TextField, PickerField, DatePickerField, SliderField, LabeledSliderField, SwitchField } from "../common/reduxForm";
import { Button } from "../common";
import { required, futureDate, alwaysError } from "../../helpers";
import { rateBean } from "../../actions";

class RateBeanForm extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(): void {
    this.props.change('navigation', this.props.navigation);
  }

  render() {
    // console.log(this.props);
    const { handleSubmit, loading } = this.props;
    return (
      <View>
        <LabeledSliderField
          name="rating"
          label="How did you enjoy it?"
          step={1}
          minimumValue={0}
          maximumValue={10}
          tallNotches={[0, 5, 10]}
          topLabels={[
            {
              content: <Icon name="frown-o" size={30} />,
              containerStyle: { marginLeft: 2 }
            },
            {
              content: <Icon name="meh-o" size={30} />
            },
            {
              content: <Icon name="smile-o" size={30} />,
              containerStyle: { marginRight: 2 }
            }
          ]}
          bottomLabels={[
            { content: 'Hated it' },
            { content: 'Meh' },
            { content: 'Loved it' }
          ]}
        />
        <SwitchField
          name="buy_again"
          label="Buy Again?"
        />
        <TextField
          name="rating_comments"
          label="Rating Comments"
          multiline
        />
        <Button
          title="Save Rating"
          onPress={handleSubmit((values) => this.props.rateBean(values))}
          iconName="check"
          backgroundColor="green"
          spinner={loading}
        />
      </View>
    );
  }
}

const initializedValues = {
  rating: 5,
  buy_again: false
};

const mapStateToProps = (state) => {
  return {
    initialValues: {
      ...initializedValues,
      ...state.beans.currentlyEditingBean,
    },
    loading: state.beans.loading,
  }
};

RateBeanForm = reduxForm({
  form: 'RateBeanForm',
  enableReinitialize: true,
})(RateBeanForm);

RateBeanForm = connect(mapStateToProps, { rateBean })(RateBeanForm);

export default RateBeanForm;

RateBeanForm.propTypes = {
  navigation: PropTypes.object.isRequired
};
