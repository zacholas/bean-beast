import React, { Component } from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {Headline, Hr, BodyText, Container, Button} from "../../components/common";
import Modal from "../../components/common/Modal";
import * as navRoutes from "../../constants/NavRoutes";
import { deleteRecipe, editRecipe, markRecipeAsFavorite, cloneRecipe } from "../../actions";
import { bodyText, headerNavTextLink, textLink } from "../../constants/Styles";
import styles from './styles';
import { colorGray100, colorGray200, colorGray400, colorGray800 } from "../../constants/Colors";
import { generateRandomID, isDefined } from "../../helpers";
import { LabeledSliderField } from "../../components/common/reduxForm";
import { prettyDate, temperatureInUserPreference } from "../../helpers/labels";
import ViewRecipeStepRow from '../../components/recipes/ViewRecipeStepRow';
import BrewMethodIcon from "../../components/recipes/BrewMethodIcon";

class ViewRecipeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let headerRightOutput = <View />;
    const { params } = navigation.state;
    if(params.recipe && params.onPress){
      headerRightOutput = (
        <TouchableOpacity onPress={params.onPress}>
          <Text style={headerNavTextLink}><Icon name="pencil" size={16} style={textLink} /> Edit</Text>
        </TouchableOpacity>
      );
    }
    return {
      title: 'View Recipe',
      headerRight: headerRightOutput
    }
  };

  constructor(props){
    super(props);
    this.recipeID = props.navigation.getParam('id');
    this.deleteConfirmModal = null;
    this.state = {
      new_cloned_recipe_id: null,
    }
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

  componentDidMount(): void {
    const recipe = this.props.recipe;
    if(recipe){
      this.props.navigation.setParams({
        onPress: () => this._editRecipeButtonPress(recipe),
        recipe
      })
    }
  }

  render() {
    const recipe = this.props.recipe;
    // console.log(recipe);
    return (
      <Container>
        <View style={styles.recipePrimaryInfoBar}>
          {recipe.brew_method && _.size(this.props.brewMethods) && _.size(this.props.brewMethods.brewMethods) && _.size(this.props.brewMethods.brewMethods[recipe.brew_method]) && this.props.brewMethods.brewMethods[recipe.brew_method].name ? (
            <View style={{ ...styles.recipePrimaryInfo, ...thisStyles.gridCalloutItem, flex: 1.5 }}>
              <BrewMethodIcon brew_method_id={recipe.brew_method} size={26} />
              <Headline h6 noMargin style={thisStyles.gridCalloutLabel}>{this.props.brewMethods.brewMethods[recipe.brew_method].name}</Headline>
            </View>
          ) : <View/>}

          {recipe.grind ? (
            <View style={{ ...styles.recipePrimaryInfo, ...thisStyles.gridCalloutItem }}>
              <BodyText noMargin style={thisStyles.gridCalloutText}>{recipe.grind}</BodyText>
              <Headline h6 noMargin style={thisStyles.gridCalloutLabel}>Grind</Headline>
            </View>
          ) : <View/>}

          {recipe.dose ? (
            <View style={{ ...styles.recipePrimaryInfo, ...thisStyles.gridCalloutItem }}>
              <BodyText noMargin style={thisStyles.gridCalloutText}>{recipe.dose}g</BodyText>
              <Headline h6 noMargin style={thisStyles.gridCalloutLabel}>Dose</Headline>
            </View>
          ) : <View/>}

          {recipe.temperature ? (
            <View style={{ ...styles.recipePrimaryInfo, ...thisStyles.gridCalloutItem }}>
              {/*<View style={{ ...styles.recipePrimaryInfo, backgroundColor: colorGray100 }}>*/}
              <BodyText noMargin style={thisStyles.gridCalloutText}>{temperatureInUserPreference(recipe.temperature, this.props.userPreferences)}</BodyText>
              <Headline h6 noMargin style={thisStyles.gridCalloutLabel}>Temp</Headline>
            </View>
          ) : <View/>}
        </View>

        {recipe.nickname ? <Headline noMargin h1>{recipe.nickname}</Headline> : null}



        <BodyText>
          {recipe.created ? `Created: ${prettyDate(recipe.created)}` : null}
          {recipe.created && recipe.modified && recipe.modified !== recipe.created ? ` | ` : null}
          {recipe.modified && recipe.modified !== recipe.created ? `Modified: ${prettyDate(recipe.modified)}` : null}
        </BodyText>

        <View style={styles.recipeRatingContainer}>
          <View style={styles.recipeOverallRatingBar}>
            <View style={styles.recipeOverallRatingSliderContainer}>
              <LabeledSliderField
                name="overall_rating"
                value={recipe.overall_rating}
                step={1}
                disabled
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
            </View>
            <View style={styles.recipeAddToFavoritesContainer}>
              {this._favoriteOutput()}
              {/*<FavoriteField name="favorite_information" />*/}
            </View>
          </View>
        </View>


        <BodyText>
          Rating & Favoriting probs; also brew method, bean name, and roaster info. Prob have the various note fields at the top; maybe in expanders.
        </BodyText>

        <Hr/>



        {this._recipeStepsOutput()}





        {/*<Hr />*/}


        {/*<Hr />*/}

        {/*<View>*/}
          {/*<BodyText>Non-sortable recipe options</BodyText>*/}
        {/*</View>*/}
        {/*<Hr />*/}

        {/*<View>*/}
          {/*<BodyText>sortable recipe steps</BodyText>*/}
        {/*</View>*/}
        {/*<Hr />*/}


        {/*<BodyText>Details:</BodyText>*/}
        {/*<BodyText>{JSON.stringify(recipe)}</BodyText>*/}
        {/*<Hr />*/}
        {/*<BodyText>Delete, edit, clone (maybe)</BodyText>*/}
        {/*<Button*/}
          {/*onPress={() => this._editRecipeButtonPress()}*/}
          {/*title="Edit Recipe"*/}
          {/*iconName="pencil"*/}
          {/*backgroundColor="gray"*/}
        {/*/>*/}

        <Hr/>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: 4 }}>
            <Button
              onPress={() => { this._cloneRecipe(recipe) }}
              title="Clone Recipe"
              iconName="copy"
              backgroundColor={'green'}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 4 }}>
            <Button
              onPress={() => this.deleteConfirmModal.show()}
              title="Delete Recipe"
              iconName="trash"
            />
          </View>
        </View>
        <Modal ref={(ref) => { this.deleteConfirmModal = ref; }}>
          <Button
            onPress={() => {this._deleteRecipe()}}
            title='Yes, delete'
            iconName='trash'
          />
        </Modal>
      </Container>
    );
  }

  _cloneRecipe(item){
    const id = generateRandomID('recipe');
    if(item.id && this.props.cloneRecipe){
      this.props.cloneRecipe(id, item.id);
      this.setState({ new_cloned_recipe_id: id });
      // console.log('done', this.props.recipes.recipes);
      // console.log('done', this.props.recipes.recipes[id]);
    }
  }

  _favoriteOutput(){
    const recipe = this.props.recipe;
    if(recipe && recipe.favorite_information){
      if(recipe.favorite_information.is_favorite === true){
        return (
          <TouchableOpacity onPress={() => { this.props.markRecipeAsFavorite(recipe.id) }} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="heart" size={40} style={{ color: '#e74c3c' }} />
            <Headline h6 style={{ width: 80, textAlign: 'center' }}>Favorited</Headline>
          </TouchableOpacity>
        )
      }

      return (
        <TouchableOpacity onPress={() => { this.props.markRecipeAsFavorite(recipe.id) }} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="heart" size={40} style={{ color: colorGray400 }} />
          <Headline h6 style={{ width: 80, textAlign: 'center' }}>Save as Favorite?</Headline>
        </TouchableOpacity>
      );
    }
  }

  _recipeStepsOutput(){
    const { recipe } = this.props;
    let recipeStepsToRender = [];

    if(recipe.temperature){
      recipeStepsToRender.push({
        totalTime: 0,
        totalWeight: 0,
        field: {
          field_id: 'temperature',
          id: 'temperature',
          values: {
            temperature: recipe.temperature
          }
        }
      })
    }

    if(recipe.dose){
      recipeStepsToRender.push({
        totalTime: 0,
        totalWeight: 0,
        field: {
          field_id: 'dose',
          id: 'dose',
          values: {
            dose: recipe.dose
          }
        }
      })
    }

    if(recipe.grind){
      recipeStepsToRender.push({
        totalTime: 0,
        totalWeight: 0,
        field: {
          field_id: 'grind',
          id: 'grind',
          values: {
            grind: recipe.grind
          }
        }
      })
    }

    // recipeStepsToRender.push(...recipe.recipe_steps);



    const orderedRecipeSteps = _.orderBy(recipe.recipe_steps, ['order'], ['asc']);
    _.forEach(orderedRecipeSteps, (step) => {
      // console.log('step', value);
      switch (step.field_id) {
        case 'default_wait':
        case 'default_pre_infusion':
        case 'default_primary_infusion':
          // values.length
          recipeStepsToRender.push({
            totalTime: Number(recipeStepsToRender[recipeStepsToRender.length - 1].totalTime) + Number(step.values.length),
            totalWeight: Number(recipeStepsToRender[recipeStepsToRender.length - 1].totalWeight),
            field: {
              ...step
            }
          });
          break;

        //* Everything Else
        case 'default_bloom':
          // values.length, values.water_amount
          recipeStepsToRender.push({
            totalTime: Number(recipeStepsToRender[recipeStepsToRender.length - 1].totalTime) + Number(step.values.length),
            totalWeight: Number(recipeStepsToRender[recipeStepsToRender.length - 1].totalWeight) + Number(step.values.water_amount),
            field: {
              ...step
            }
          });
          break;

        case 'default_pour':
          // values.duration, values.water_amount
          recipeStepsToRender.push({
            totalTime: Number(recipeStepsToRender[recipeStepsToRender.length - 1].totalTime) + Number(step.values.duration),
            totalWeight: Number(recipeStepsToRender[recipeStepsToRender.length - 1].totalWeight) + Number(step.values.water_amount),
            field: {
              ...step
            }
          });
          break;

        case 'default_taint':
          recipeStepsToRender.push({
            totalTime: Number(recipeStepsToRender[recipeStepsToRender.length - 1].totalTime),
            totalWeight: Number(recipeStepsToRender[recipeStepsToRender.length - 1].totalWeight),
            field: {
              ...step
            }
          });
          break;

        default:
          break;
      }
      // console.log(`recipe_steps[${key}] = ${value}`)
    });


    if(_.size(recipeStepsToRender)){
      return (
        <View>
          {/*<Hr/>*/}
          <Headline h3 noMargin>Recipe Steps</Headline>
          {this.props.brew_method && this.props.brew_method.name ? <BodyText noMargin>Brew method: {this.props.brew_method.name}</BodyText> : <View/>}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ViewRecipeStepRow headerRow parentProps={{}} />
            {/*<View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>*/}
              {/*<View style={{ flex: 1, alignSelf: 'stretch' }}><BodyText noMargin>Step</BodyText></View>*/}
              {/*<View style={{ width: 60 }}><BodyText noMargin>Total Time</BodyText></View>*/}
              {/*<View style={{ width: 70 }}><BodyText noMargin>Total Weight</BodyText></View>*/}
            {/*</View>*/}
            {
              recipeStepsToRender.map((step, index) => { // This will render a row for each data element.
                return <ViewRecipeStepRow step={step} key={step.field.id} index={index} parentProps={this.props} />;
                // return this._renderRecipeStepRow(step);
              })
            }
          </View>
        </View>
      )
    }
  }

  // _renderRecipeStepRow(step){
  //   console.log('step', step);
  //   return (
  //     <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }} key={step.field.field_id}>
  //       <View style={{ flex: 1, alignSelf: 'stretch' }}><BodyText noMargin>{step.field.field_id}</BodyText></View>
  //       <View style={{ width: 60 }}><BodyText noMargin>{step.totalTime}</BodyText></View>
  //       <View style={{ width: 70 }}><BodyText noMargin>{step.totalWeight}</BodyText></View>
  //     </View>
  //   )
  // }

  _editRecipeButtonPress(recipe = this.props.recipe){
    this.props.editRecipe(recipe);
    this.props.navigation.navigate(navRoutes.EDIT_RECIPE, {
      type: 'edit',
      recipe: recipe
    })
  }

  _deleteRecipe(){
    this.deleteConfirmModal.hide();
    this.props.deleteRecipe(this.recipeID, this.props.navigation);
  }
}

const defaultRecipeProps = {
  dose: null,
  favorite_information: {
    is_favorite: false,
  },
  grind: null,
  nickname: null,
  recipe_steps: [],
  temperature: null,
};

const thisStyles = StyleSheet.create({
  gridCalloutItem: {
    justifyContent: 'flex-end'
  },
  gridCalloutText: {
    fontSize: 21
  },
  gridCalloutLabel: {
    ...bodyText,
    fontSize: 12
  }
});

const mapStateToProps = (state, props) => {
  let recipe = state.recipes.recipes[props.navigation.getParam('id')];
  recipe = {
    ...defaultRecipeProps,
    ...recipe
  };
  const brew_method = isDefined(recipe) && recipe && isDefined(recipe.brew_method) && _.size(state.brewMethods.brewMethods[recipe.brew_method]) ? state.brewMethods.brewMethods[recipe.brew_method] : null;
  return {
    recipe,
    brew_method,
    userPreferences: state.userPreferences,
    brewMethods: state.brewMethods,
    recipes: state.recipes
  };
};

export default connect(mapStateToProps, { deleteRecipe, editRecipe, markRecipeAsFavorite, cloneRecipe })(ViewRecipeScreen);

ViewRecipeScreen.propTypes = {
  recipe: PropTypes.object
};

ViewRecipeScreen.defaultProps = {
  recipe: {}
};
