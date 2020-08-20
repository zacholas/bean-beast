# Bean Beast
Bean Beast is an app that allows coffee lovers to keep track of their favorite beans and recipes.

## The state of Bean Beast
After working a lot on this project solo and finally getting it to baseline for v1, I've noticed myself running out of steam with it. There are a lot of things I'd like to add (recipe sharing is at the top of my list), but everything takes time and every new feature introduces new bugs.

So at this point, since I'm not really working on it, but people still use it and like it and I'd rather it not die, I thought it'd make sense to take it open source.

## Installation
Runs on React Native + expo. So just download the repo and run `yarn` and I _think_ you should be good to go.

## Usage
`yarn start` to start the watcher and open the expo web interface.

## Contributing
Pull requests are welcome, but please test everything super thoroughly first. This project has taken a backseat for me and if your code introduces loads of bugs that I have to address, that obviously isn't something I'd want to pour a lot of time into.

For major changes, please open an issue first to discuss what you would like to change.

## Known Bugs
The biggest bugs right now have to do with issues with `redux-persist` in the recipe/bean configuration screens. If you configure some data and then go back, it sort of partially (but not fully) stores the state and causes everything to explode. I believe this is one of them that sentry keeps nagging me about:
- [ ]  Error: /actions/RecipeActions.js @ cloneRecipe — Error: Error: Error: There is no route defined for key recipeList.
Must be one of: 'beansList','editBean','viewBean','rate_bean','viewRecipe'

And here's another bug that you can reproduce that's related to redux persist:
- [ ]  Bug: edit a bean, save and exit, and then re-open it again. The date enabled switch will get turned off.
    - [ ]  Setting destroyonunmount to true fixed this, but I wonder what I broke in the process....
        - [ ]  It breaks the ability to go back to a previous form step. Fffffff

There's also no automated testing in place right now, so probz that'd be good to add.

Outstanding Bugs reported by users:
- "Almost everytime I close/open the app some of the pictures (beans label) just disappear. It is not a big deal but just a bit annoying so I wanted to report it." / Images in the bean list not showing up

### Other Bugs from my list:
- [ ]  Deleting a roaster and then deleting the bean results in an error
    - [ ]  maybe related to dev server not running tho
    - [ ]  Actually, it's when deleting any bean
    - [ ]  but not on the iphone 11. weird
- [ ]  I think when you clone a bean and hit back it takes you to the source bean not the newly cloned one; should change that.

## Roadmap
Some things that I have on my list that'd be cool to add:
- [ ]  Recipe sharing with deep linking so that people can share recipes with friends
- [ ]  The ability to click "start" on a recipe and have it walk you through each step of the process of following it, along with a timer for each of the time-specific steps
- [ ]  Show app tour on first launch
- [ ]  Notes from last time popup when cloning
- [ ]  Aeropress mark the recipe as inverted

### Feature requests from users
- [ ]  Adding a bean restocking functionality / the ability to "renew" a bean when the user buys a new bag, so that new recipes will have their roast date calculating relative to this new bag, rather than their initial bag
- [ ]  editable recipe date
- [ ]  hone the recipes page
    - [ ]  sort and filter on the list
        - [ ]  favorites only
        - [ ]  by bean
- [ ]  Enable screen rotation
- [ ] Do some optimization to help tablet / ipad users have a better experience
- [ ] would be great to see would be the inclusion of the rating when you click on Beans. You currently get a list of all beans you've added and a little thumbnail pic which is great, but it would be handy to see the rating without having to click on each bean....
- [ ] Allow users to add/edit brew methods
- [ ] Only problem I've found is I can't see there's a way to edit or delete country of origin? I added a need country with a typo by mistake and seem to be stuck with it?
- [ ] Hey there. It would be helpful if building the recipe notes there was an option called “other” aside from the options currently offered, bringing the total selection to 8 Possible recipe steps to choose. In building my Aeropress recipe, there is a specific time to “plunge”. And other users start inverted so they have to note when to “flip” and plunge. Plunging also is part of the French press recipe creation too. Having an “other” option would allow users to be creative.
- [ ] the ability to add two different “coffee species” to one “Bean” since farmers have to sometimes/often harvest two different coffee varietals to sell as one batch. I would love to Be specific and Place down that a bag of beans contains the “typica” and the “yellow bourbon” varieties.
- [ ] is there a search option to find my coffee bean or coffee roaster once I start having lots of them in the app?