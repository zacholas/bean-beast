import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Container, BodyText, Headline} from "../../components/common";
import RateBeanForm from "../../components/beans/RateBeanForm";

export default class EditBeanScreen extends Component {
  constructor(props){
    super(props);
    this.bean = props.navigation.getParam('bean', null);
  }

  render() {
    return (
      <Container scroll={true}>
        <Headline>Rate Bean</Headline>
        <RateBeanForm navigation={this.props.navigation} />
      </Container>
    );
  }
}

EditBeanScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
