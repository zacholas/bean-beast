import React, { Component } from 'react';
import _ from 'lodash';
import { TouchableOpacity, View, Text, Image, FlatList } from 'react-native';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Headline, Hr, BodyText, Container, Button } from "../../components/common";
import Modal from "../../components/common/Modal";
import * as navRoutes from "../../constants/NavRoutes";
import { deleteBean, editBean, cloneRecipe, editRecipe } from "../../actions";
import { textLink, bodyText, marginBottomHalf, defaultMarginAmount, headerNavTextLink } from "../../constants/Styles";
import { prettyDate, roastLevelDisplay, temperatureInUserPreference } from "../../helpers/labels";
import {colorGray1000, colorGray1200, colorGray400} from "../../constants/Colors";
import BeanRecipes from '../../components/beans/BeanRecipes';
import { generateRandomID } from "../../helpers";

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
        <BodyText noMargin style={headerNavTextLink}><Icon name="pencil" size={16} style={textLink} /> Edit Bean</BodyText>
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
    this.createRecipeModal = null;

    this.state = {
      new_cloned_recipe_id: null,
    }
    // this._beanImage = this._beanImage.bind(this);
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    const newRecipeID = this.state.new_cloned_recipe_id;
    const newRecipe = _.size(nextProps.recipes) && _.size(nextProps.recipes.recipes) && nextProps.recipes.recipes[newRecipeID] ? nextProps.recipes.recipes[newRecipeID] : null;

    if(this.props.recipes.loading === true && nextProps.recipes.loading === false && newRecipeID && newRecipe){
      this.setState({ new_cloned_recipe_id: null });
      this.props.editRecipe(newRecipe);
      this.props.navigation.navigate(navRoutes.EDIT_RECIPE, {
        type: 'edit',
        recipe: newRecipe
      });
    }
  }


  render() {
    const bean = this.props.bean;
    const { tasting_notes, comments } = bean;
    // console.log('viewing bean: ' + bean.name);
    // console.log('this bean recipes', this.props.recipes);
    const recentRecipe = this._getMostRecentRecipe();
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
            <BodyText>Roasted on: {prettyDate(this.props.bean.roast_date)} </BodyText>
          </View>
        </View>
        <Hr />
        {this._ratingInfo()}
        <Hr />
        {this._originInfo()}
        <Hr />
        {tasting_notes ? <View><Headline h5 style={marginBottomHalf}>Tasting Notes:</Headline><BodyText>{tasting_notes}</BodyText></View> : <View />}
        {comments ? <View><Headline h5 style={marginBottomHalf}>Comments:</Headline><BodyText>{comments}</BodyText></View> : <View />}
        {(this.props.bean.tasting_notes || this.props.bean.comments) ? <Hr /> : <View />}

        <Hr />

        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Headline h3 inline style={marginBottomHalf}>Recipes with this Bean</Headline>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { this._newRecipeOnPress() }}>
            <Text style={textLink}>+ Add New</Text>
          </TouchableOpacity>
        </View>

        <Hr />

        <BeanRecipes bean_id={this.beanID} favorites={true} navigation={this.props.navigation} />
        <BeanRecipes bean_id={this.beanID} favorites={false} navigation={this.props.navigation} />
        {/*<View>*/}
          {/*<View style={{ flexDirection: 'row' }}>*/}
            {/*<Headline h5 inline style={marginBottomHalf}>Your Favorite Recipes with this Bean:</Headline>*/}
            {/*<Text>Filter & Sort</Text>*/}
          {/*</View>*/}
          {/*<BeanRecipes bean_id={this.beanID} favorites={true} />*/}
          {/*<BodyText>list of recipes</BodyText>*/}
        {/*</View>*/}

        {/*<Hr />*/}

        {/*<View>*/}
          {/*<View style={{ flexDirection: 'row' }}>*/}
            {/*<Headline h5 style={marginBottomHalf}>All Recipes with this Bean:</Headline>*/}
            {/*<Text>Filter & Sort</Text>*/}
          {/*</View>*/}
          {/*<BodyText>list of recipes</BodyText>*/}
        {/*</View>*/}

        {/*<Hr />*/}


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

        <Modal
          ref={(ref) => { this.createRecipeModal = ref; }}
          headlineText="Create new recipe"
        >
          <BodyText>
            Do you want to start from scratch or use your most recent recipe as a template?
          </BodyText>
          {recentRecipe ? this._recentRecipeModalOutput(recentRecipe) : null}
          <Button
            onPress={() => {this._createRecipeFromPrevious()}}
            title='Start from Recipe'
            iconName='copy'
            backgroundColor="green"
          />
          <Button
            onPress={() => {this._createRecipeFromScratch()}}
            title='Start from Scratch'
            iconName='plus-circle'
            backgroundColor={colorGray1200}
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
    if(_.size(this.props.bean) && this.props.bean.bean_image !== undefined){
      const beanImage = this.props.bean.bean_image;
      if(beanImage) {
        return (
          <View>
            <TouchableOpacity onPress={() => {
              this.beanImageModal.show()
            }}>
              <Image source={{uri: beanImage}}
                     style={{width: 150, height: 200, marginRight: 15, marginBottom: defaultMarginAmount}} />
            </TouchableOpacity>
            <Modal
              ref={(ref) => {
                this.beanImageModal = ref;
              }}
              dismissButtonText='Close'
              headlineText='Bean Image'
            >
              <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Image source={{uri: beanImage}} style={{width: 400, height: 600, maxWidth: '100%'}}
                       resizeMode="contain" />
              </View>
            </Modal>
          </View>
        );
      }
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
    // console.log('blendComponent', blendComponent);
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
      <BodyText>
        {originOutput && originOutput.name}
        {(origin_region && originOutput) && `, ${origin_region}`}
        {(origin_region && !originOutput) && origin_region}
        {origin_details && ` (${origin_details})`}
        {originOutput || origin_region || origin_details ? ' — ' : ''}
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
      </BodyText>
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

  _newRecipeOnPress(){
    //* Check if there are previous recipes and either show the picker modal or go straight to a new one from scratch
    if(_.size(this.props.beanRecipes)){
      this.createRecipeModal.show();
    }
    else {
      this._createRecipeFromScratch();
    }
  }

  _getMostRecentRecipe(){
    if(_.size(this.props.beanRecipes)){
      let recipes = _.orderBy(this.props.beanRecipes, ['modified'], ['desc']);
      recipes = _.values(recipes);
      // console.log('recipes', recipes);
      // console.log('first recipe', recipes[0]);
      return recipes[0];
    }
    return false;
  }

  _recentRecipeModalOutput(item){
    const thisBrewMethodID = item.brew_method ? item.brew_method : false;
    const thisBrewMethod = thisBrewMethodID && _.size(this.props.brewMethods) && _.size(this.props.brewMethods.brewMethods) && this.props.brewMethods.brewMethods[thisBrewMethodID] ? this.props.brewMethods.brewMethods[thisBrewMethodID] : false;

    let itemTexts = [];
    if( item.modified ){ itemTexts.push(prettyDate(item.modified)); }
    if( item.nickname ){ itemTexts.push(`“${item.nickname}”`); }
    if( thisBrewMethod && thisBrewMethod.name ){ itemTexts.push(thisBrewMethod.name); }
    if( item.grind ){ itemTexts.push(`Grind: ${item.grind}`); }
    if( item.dose ){ itemTexts.push(`Dose: ${item.dose}g`); }
    if( item.temperature ){ itemTexts.push(`Temp: ${temperatureInUserPreference(item.temperature, this.props.userPreferences, item.temperatureMeasurement)}`); }

    let output = '';

    for(let i = 0; i < itemTexts.length; i++){
      output += itemTexts[i];
      output += i < (itemTexts.length - 1) ? ' — ' : '';
    }

    return <BodyText>{`(Your most recent recipe was: ${output})`}</BodyText>;
  }

  _createRecipeFromScratch(){
    this.props.navigation.navigate(navRoutes.EDIT_RECIPE, {
      type: 'create',
      bean_id: this.props.bean.id
    });
    this.createRecipeModal.hide();
  }

  _createRecipeFromPrevious(){
    const recentRecipe = this._getMostRecentRecipe();
    const id = generateRandomID('recipe');
    if(id && recentRecipe && recentRecipe.id){
      this.props.cloneRecipe(id, recentRecipe.id);
      this.setState({ new_cloned_recipe_id: id });
      this.createRecipeModal.hide();
    }
  }
}

const mapStateToProps = (state, props) => {
  const beanID = props.navigation.getParam('id');
  const thisBean = _.size(state.beans) && _.size(state.beans.beans) ? state.beans.beans[beanID] : null;
  const thisBeanRecipes = thisBean ? _.filter(state.recipes.recipes, (recipe) => { return recipe.bean_id === beanID }) : {};
  return {
    bean: thisBean,
    roaster: thisBean ? state.cafes.cafes[thisBean.cafe] : null,
    origins: state.origins.origins,
    roastLevels: state.roastLevels.roastLevels,
    beanProcesses: state.beanProcesses.beanProcesses,
    coffeeSpecies: state.coffeeSpecies.coffeeSpecies,
    beanRecipes: thisBeanRecipes,
    recipes: state.recipes
  }
};

export default connect(mapStateToProps, { deleteBean, editBean, cloneRecipe, editRecipe })(ViewBeanScreen);

ViewBeanScreen.propTypes = {
  bean: PropTypes.object.isRequired
};

ViewBeanScreen.defaultProps = {
  bean: {
    id: false,
    name: ''
  }
};
