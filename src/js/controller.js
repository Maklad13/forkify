import * as model from './model.js'
import  RecipeView  from "../js/views/recipe view";
import resultView from '../js/views/result view';
import 'core-js/stable';
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';
import searchView from '../js/views/search view';
import paginationView from '../js/views/pagination view';
import recipeView from '../js/views/recipe view';
import bookmarksView from '../js/views/bookmarks view';
import addRecipeView from '../js/views/add recipe view';

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}



const showRecipe = async function () {
  try {
  const id = window.location.hash.slice(1);
  console.log(id);
   if (!id) return;
    RecipeView.renderSpinner();
    resultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
   await model.loadRecipe(id);
      RecipeView.render(model.state.recipe)
} catch (err) {
    RecipeView.renderError();
  }
}

const controlSearchResults = async function () {
  try {
  
    const query = searchView.getQuery();
    if(!query) return;
    await model.loadSearchResults(query);
    resultView.renderSpinner();
    resultView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
controlSearchResults()

const controlPagination = function (goToPage) {
  resultView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  model.updateServing (newServing);
  //RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id)
  } 
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.loadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.toogleWindow()
    
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
 
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRecipe (showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch (controlSearchResults);
  paginationView.addHandlerClick (controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init()

