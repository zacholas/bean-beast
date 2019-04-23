import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Headline, Hr, BodyText, Container, Button } from "../../components/common";
import Modal from "../../components/common/Modal";
import * as navRoutes from "../../constants/NavRoutes";
import { deleteBean, editBean } from "../../actions";

class ViewBeanScreen extends Component {
  constructor(props){
    super(props);
    this.beanID = props.navigation.getParam('id');
    this.deleteConfirmModal = null;
    this.state = {
      deleteModalVisible: false
    }
  }

  render() {
    const bean = this.props.bean;
    return (
      <Container>
        {this._beanName()}
        <Hr />
        <BodyText>Details:</BodyText>
        <BodyText>{JSON.stringify(bean)}</BodyText>
        <Hr />
        <BodyText>Delete, edit, clone (maybe)</BodyText>
        <Button
          onPress={() => this._editBeanButtonPress()}
          title="Edit Bean"
          iconName="pencil"
          backgroundColor="gray"
        />
        <Button
          onPress={() => this._deleteBeanButtonPress()}
          title="Delete Bean"
          iconName="trash"
        />
        <Modal
          ref={ref => {
            this.deleteConfirmModal = ref;
          }}
          visible={this.state.deleteModalVisible}
        />
      </Container>
    );
  }

  _editBeanButtonPress(){
    this.props.editBean(this.props.bean);
    this.props.navigation.navigate(navRoutes.EDIT_BEAN, {
      type: 'edit',
      bean: this.props.bean
    })
  }

  _deleteBeanButtonPress(){
    this.deleteConfirmModal.show();
    // this.setState({
    //   deleteModalVisible: true
    // })
    // this.props.navigation.navigate(navRoutes.DELETE_BEAN_MODAL, {
    //   onPress: () => this.props.deleteBean(this.beanID, this.props.navigation)
    // })
  }

  _beanName(){
    if(this.props.bean.name !== undefined){
      return <Headline>{this.props.bean.name}</Headline>;
    }
  }
}

const mapStateToProps = (state, props) => ({
  bean: state.beans.beans[props.navigation.getParam('id')]
});

export default connect(mapStateToProps, { deleteBean, editBean })(ViewBeanScreen);

ViewBeanScreen.propTypes = {
  bean: PropTypes.object
};

ViewBeanScreen.defaultProps = {
  bean: {
    name: ''
  }
};
