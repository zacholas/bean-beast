import React, { Component } from 'react';
import _ from 'lodash';
import { TouchableOpacity, View, Text, Image, FlatList } from 'react-native';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Headline, Hr, BodyText, Container, Button } from "../../components/common";
import Modal from "../../components/common/Modal";
import * as navRoutes from "../../constants/NavRoutes";
import { deleteBean, editBean } from "../../actions";
import { textLink, bodyText, marginBottomHalf, defaultMarginAmount, headerNavTextLink } from "../../constants/Styles";
import { roastLevelDisplay } from "../../helpers/labels";

class ViewBeanScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const bean = navigation.getParam('bean', false);
    const editBeanAction = navigation.getParam('editBeanAction', false);
    // console.log(bean);
    const headerRightContent = bean && editBeanAction ? (
      <TouchableOpacity onPress={() => {
        editBeanAction(bean);
        navigation.navigate(navRoutes.EDIT_BEAN, {
          type: 'edit',
          bean
        })
      }}>
        <Text style={headerNavTextLink}><Icon name="pencil" size={16} style={textLink} /> Edit Bean</Text>
      </TouchableOpacity>
    ) : null;

    return {
      headerRight: headerRightContent
    }
  };

  constructor(props){
    super(props);
    this.beanID = props.navigation.getParam('id');
    this.deleteConfirmModal = null;
    this.beanRatingCommentsFullModal = null;
    this.beanImageModal = null;
    // this._beanImage = this._beanImage.bind(this);
  }

  _rateBeanButtonPress(){
    this.props.editBean(this.props.bean);
    this.props.navigation.navigate(navRoutes.RATE_BEAN, {
      bean: this.props.bean
    })
  }

  _editBeanButtonPress(){
    // console.log(this.props.bean);
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
      const beanImage = this.props.bean.bean_image;
      return (
        <View>
          <TouchableOpacity onPress={() => { this.beanImageModal.show() }}>
            <Image source={{ uri: beanImage }} style={{ width: 150, height: 200, marginRight: 15, marginBottom: defaultMarginAmount }} />
          </TouchableOpacity>
          <Modal
            ref={(ref) => { this.beanImageModal = ref; }}
            dismissButtonText='Close'
            headlineText='Bean Image'
          >
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Image source={{ uri: beanImage }} style={{ width: 400, height: 600, maxWidth: '100%' }} resizeMode="contain" />
            </View>
          </Modal>
        </View>
      );
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
      // <View style={{ paddingBottom: 10 }}>
      return (
        <View>
          <View style={{ ...marginBottomHalf, flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Headline h5 style={{ marginBottom: 0 }}>Rating Information</Headline>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={() => this._rateBeanButtonPress()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="pencil" size={16} style={textLink} />
                <View><Text style={{ ...bodyText, ...textLink, marginBottom: 0, marginLeft: 5 }}>Edit Rating</Text></View>
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

  _beanBlendComponentOutput(blendComponent){
    console.log('blendComponent', blendComponent);
    const { origins, roastLevels, beanProcesses, coffeeSpecies } = this.props;
    const {
      bean_process, coffee_species, basic_roast_level, roast_level, origin,
      origin_details, origin_region, roast_level_advanced_mode, elevation
    } = blendComponent;

    const advancedRoastLevelOutput = (roast_level_advanced_mode === true && roast_level && _.size(roastLevels) && roastLevels[roast_level] !== undefined) ? roastLevels[roast_level] : false;
    const originOutput = (origin !== undefined && origin && _.size(origins) && origins[origin] !== undefined) ? origins[origin] : false;
    const beanProcessOutput = (bean_process !== undefined && bean_process && _.size(beanProcesses) && beanProcesses[bean_process] !== undefined) ? beanProcesses[bean_process] : false;
    const coffeeSpeciesOutput = (coffee_species !== undefined && coffee_species && _.size(coffeeSpecies) && coffeeSpecies[coffee_species] !== undefined) ? coffeeSpecies[coffee_species] : false;

    return (
      <Text>
        {originOutput && originOutput.name}
        {(origin_region && originOutput) && `, ${origin_region}`}
        {(origin_region && !originOutput) && origin_region}
        {origin_details && ` (${origin_details})`}
        {' — '}
        {(beanProcessOutput && beanProcessOutput.name) && beanProcessOutput.name}
        {
          (beanProcessOutput && beanProcessOutput.name) &&
          (basic_roast_level || (advancedRoastLevelOutput && advancedRoastLevelOutput.name) || (coffeeSpeciesOutput && coffeeSpeciesOutput.name) || elevation) &&
          '; '
        }
        {roast_level_advanced_mode === false && basic_roast_level && roastLevelDisplay(basic_roast_level)}
        {(advancedRoastLevelOutput && advancedRoastLevelOutput.name) && advancedRoastLevelOutput.name}
        {(basic_roast_level || (advancedRoastLevelOutput && advancedRoastLevelOutput.name)) && '; '}
        {(coffeeSpeciesOutput && coffeeSpeciesOutput.name) && coffeeSpeciesOutput.name}
        {elevation}
      </Text>
    )
  }

  _renderBeanBlendComponent(blendComponent){
    return (
      <View style={{ flexDirection: 'row', ...marginBottomHalf }}>
        <View style={{ width: 50 }}>
          <Text>{blendComponent.item.blend_percent} %</Text>
        </View>
        <View style={{ flex: 1 }}>
          {this._beanBlendComponentOutput(blendComponent.item)}
        </View>
      </View>
    );
  }

  // Create a key by mushing together all their data
  _blendComponentKeyExtractor = (item) => {
    return `${item.blend_percent && item.blend_percent}${item.origin && item.origin}${item.bean_process && item.bean_process}`;
  };

  _originInfo(){
    const { beanBlendComponents, bean_type } = this.props.bean;
    if(bean_type === 'single_origin' && _.size(beanBlendComponents)){
      return (
        <View style={{ paddingBottom: 10 }}>
          <Headline h5 style={marginBottomHalf}>Bean & Origin Information</Headline>
          <View>
            {this._beanBlendComponentOutput(beanBlendComponents[0])}
          </View>
        </View>
      )
    }
    else if(bean_type === 'blend' && _.size(beanBlendComponents)){
      const orderedBeanBlendComponents = _.orderBy(beanBlendComponents, ['blend_percent'], ['desc']);
      return (
        <View style={{ paddingBottom: 10 }}>
          <Headline h5 style={marginBottomHalf}>Bean & Origin Information</Headline>
          <FlatList
            data={orderedBeanBlendComponents}
            keyExtractor={this._blendComponentKeyExtractor}
            renderItem={this._renderBeanBlendComponent.bind(this)}
          />
        </View>
      )
    }

  }

  _roasterName(){
    if(this.props.roaster && this.props.roaster.name !== undefined){
      return <BodyText style={marginBottomHalf}>Roaster: {this.props.roaster.name}</BodyText>;
    }
  }

  render() {
    const bean = this.props.bean;
    // console.log('viewing bean: ' + bean.name);
    return (
      <Container>
        {/*<Button*/}
          {/*onPress={() => this._editBeanButtonPress()}*/}
          {/*title="Edit Bean"*/}
          {/*iconName="pencil"*/}
          {/*backgroundColor="gray"*/}
        {/*/>*/}
        {/*<Hr />*/}
        {/*<Text>ID: {this.props.bean.id}</Text>*/}
        <View style={{ flexDirection: 'row' }}>
          {this._beanImage()}
          <View style={{ flex: 1 }}>
            {this._beanName()}
            {this._roasterName()}
            <BodyText>Roasted on: {new Date(Date.parse(this.props.bean.roast_date)).toLocaleDateString("en-US")} </BodyText>
          </View>
        </View>
        <Hr />
        {this._ratingInfo()}
        <Hr />
        {this._originInfo()}
        <Hr />
        {this.props.bean.tasting_notes && `<Headline h5 style={marginBottomHalf}>Tasting Notes:</Headline><BodyText>${this.props.bean.tasting_notes}</BodyText>`}
        {this.props.bean.comments && `<Headline h5 style={marginBottomHalf}>Comments:</Headline><BodyText>{this.props.bean.comments}</BodyText>`}
        {(this.props.bean.tasting_notes || this.props.bean.comments) && <Hr /> }
        {/*<BodyText>Details:</BodyText>*/}
        {/*<BodyText>{JSON.stringify(bean)}</BodyText>*/}


        {/*<View style={{ flexDirection: 'row' }}>*/}
          {/*<View style={{ flex: 3, paddingRight: 7 }}>*/}
            {/*<Button*/}
              {/*onPress={() => {}}*/}
              {/*title="Clone Bean"*/}
              {/*iconName="copy"*/}
              {/*backgroundColor="green"*/}
            {/*/>*/}
          {/*</View>*/}
          {/*<View style={{ flex: 2 }}>*/}
            {/*<Button*/}
              {/*onPress={() => this.deleteConfirmModal.show()}*/}
              {/*title="Delete"*/}
              {/*iconName="trash"*/}
            {/*/>*/}
          {/*</View>*/}
        {/*</View>*/}

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
}

const mapStateToProps = (state, props) => ({
  bean: state.beans.beans[props.navigation.getParam('id')],
  roaster: state.beans.beans[props.navigation.getParam('id')] ? state.cafes.cafes[state.beans.beans[props.navigation.getParam('id')].cafe] : null,
  origins: state.origins.origins,
  roastLevels: state.roastLevels.roastLevels,
  beanProcesses: state.beanProcesses.beanProcesses,
  coffeeSpecies: state.coffeeSpecies.coffeeSpecies
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
