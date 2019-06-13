import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Headline, Hr, BodyText, Container, Button } from "../../components/common";
import Modal from "../../components/common/Modal";
import * as navRoutes from "../../constants/NavRoutes";
import { deleteBean, editBean } from "../../actions";
import {textLink, bodyText, marginBottomHalf} from "../../constants/Styles";
import EditCafeForm from "../../components/beans/EditBeanForm";

class ViewBeanScreen extends Component {
  constructor(props){
    super(props);
    this.beanID = props.navigation.getParam('id');
    this.deleteConfirmModal = null;
    this.beanRatingCommentsFullModal = null;
    // this._beanImage = this._beanImage.bind(this);
  }

  render() {
    const bean = this.props.bean;
    return (
      <Container>
        {this._beanImage()}
        {this._beanName()}
        {this._roasterName()}
        <Hr />
        {this._ratingInfo()}
        <Hr />
        <BodyText>Details:</BodyText>
        <BodyText>{JSON.stringify(bean)}</BodyText>
        {/*<BodyText>Roasted on: {Date.parse(this.props.bean.roast_date)}</BodyText>*/}
        <Hr />
        <BodyText>Delete, edit, clone (maybe)</BodyText>
        <Button
          onPress={() => this._editBeanButtonPress()}
          title="Edit Bean"
          iconName="pencil"
          backgroundColor="gray"
        />
        <Button
          onPress={() => this.deleteConfirmModal.show()}
          title="Delete Bean"
          iconName="trash"
        />
        <Modal ref={(ref) => { this.deleteConfirmModal = ref; }}>
          <Button
            onPress={() => {this._deleteBean()}}
            title='Yes, delete'
            iconName='trash'
          />
        </Modal>
      </Container>
    );
  }

  _rateBeanButtonPress(){
    this.props.editBean(this.props.bean);
    this.props.navigation.navigate(navRoutes.RATE_BEAN, {
      bean: this.props.bean
    })
  }

  _editBeanButtonPress(){
    this.props.editBean(this.props.bean);
    this.props.navigation.navigate(navRoutes.EDIT_BEAN, {
      type: 'edit',
      bean: this.props.bean
    })
  }

  _deleteBean(){
    this.deleteConfirmModal.hide();
    this.props.deleteBean(this.beanID, this.props.navigation);
  }

  _beanImage(){
    if(this.props.bean.bean_image !== undefined){
      return <Image source={{ uri: this.props.bean.bean_image }} style={{ width: 150, height: 200 }} />;
    }
  }

  _beanName(){
    if(this.props.bean.name !== undefined){
      return <Headline>{this.props.bean.name}</Headline>;
    }
  }

  _ratingComments(){
    if(this.props.bean.rating_comments){
      const fullRatingText = this.props.bean.rating_comments;

      if(fullRatingText.length <= 100){
        return <BodyText>{this.props.bean.rating_comments}</BodyText>;
      }
      else {
        const excerpt = fullRatingText.substring(0, 100);

        return (
          <View>
            <TouchableOpacity onPress={() => this.beanRatingCommentsFullModal.show()}>
              <BodyText style={marginBottomHalf}>{excerpt}[...]</BodyText>
              <BodyText style={{ ...textLink, ...marginBottomHalf }}>Read More</BodyText>
            </TouchableOpacity>
            <Modal
              ref={(ref) => { this.beanRatingCommentsFullModal = ref; }}
              dismissButtonText='Close'
              headlineText='Rating Notes'
            >
              <BodyText>{fullRatingText}</BodyText>
            </Modal>
          </View>
        );
      }

    }
  }

  _ratingInfo(){
    if(typeof this.props.bean.rating !== 'undefined'){
      return (
        <View style={{ paddingBottom: 10 }}>
          <View style={{ ...marginBottomHalf, flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Headline h5 style={{ marginBottom: 0 }}>Rating Information</Headline>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={() => this._rateBeanButtonPress()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="pencil" size={16} style={textLink} />
                <View><Text style={{ ...bodyText, ...textLink, marginBottom: 0, marginLeft: 5 }}>Edit</Text></View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ ...marginBottomHalf, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={bodyText}>Rating: {this.props.bean.rating}/10</Text>
            <Text style={{ ...bodyText, marginLeft: 15, marginRight: 15 }}>|</Text>
            <Text style={bodyText}>Buy Again? {this.props.bean.buy_again && this.props.bean.buy_again === true ? 'Yes' : 'No'}</Text>
          </View>
          {this._ratingComments()}
        </View>
      );
    }
    else {
      return (
        <View>
          <Headline h5>Rating Information</Headline>

          <View style={{ flexDirection: 'row' }}>
            <BodyText style={{ marginRight: 5 }}>No Rating Yet.</BodyText>
            <TouchableOpacity onPress={() => this._rateBeanButtonPress()}><BodyText style={textLink}>Rate this Bean</BodyText></TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  _roasterName(){
    if(this.props.roaster && this.props.roaster.name !== undefined){
      return <BodyText>Roaster: {this.props.roaster.name}</BodyText>;
    }
  }
}

const mapStateToProps = (state, props) => ({
  bean: state.beans.beans[props.navigation.getParam('id')],
  roaster: state.beans.beans[props.navigation.getParam('id')] ? state.cafes.cafes[state.beans.beans[props.navigation.getParam('id')].cafe] : null
});

export default connect(mapStateToProps, { deleteBean, editBean })(ViewBeanScreen);

ViewBeanScreen.propTypes = {
  bean: PropTypes.object.isRequired
};

ViewBeanScreen.defaultProps = {
  bean: {
    name: ''
  }
};
