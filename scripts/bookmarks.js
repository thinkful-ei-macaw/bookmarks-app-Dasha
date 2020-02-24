import $ from 'jquery';
import api from './api';
import store from './store';

/********** TEMPLATE GENERATION FUNCTIONS **********/
//i has a confusion

// These functions return HTML
function generateInitialViewHtml() {
  return `
  <div class="start-screen">
    <p>bookmarks added here
    </p>
    <section class="row">
        <div class="controls">
          <button id="js-new-bookmark">Add New</button>
          
          <select
            class="filter-control"
            id="js-filter-control"
            name="filter"
            aria-label="Filter ratings by minimum rating">
            <option value="0">All</option>
            <option value="5">5 stars</option>
            <option value="4">4+ stars</option>
            <option value="3">3+ stars</option>
            <option value="2">2+ stars</option>
            <option value="2">1+ stars</option>
          </select>
          <label for="filter-control" id="filter-label">Filter </label>
          
        </div>
      </section>
  `;
}

function generateNewBookmarkHtml() {
  return `
    <form id='js-new-item-form'>
    <fieldset>
    <legend>New Bookmark</legend>
      <div class='col-6'>
        <label for='js-form-title'>Title</label>
        <li class='new-item-li'><input type='text' id='js-form-title' name='title' placeholder='Amazing programming article'></li>

        <label for='js-form-description'>Description</label>
        <li class='new-item-li'><textarea id='js-form-description' name='description' placeholder="I can't believe its not PHP!"></textarea>
      </div>
      <div class='col-6'>
        <label for='js-form-url'>URL</label>
        <li class='new-item-li'><input type='url' id='js-form-url' name='url' placeholder='https://...'></li>

        <label for='js-form-rating' id='rating-label'>Rating: </label>
        <select id='js-form-rating' name='rating' aria-labelledby='rating-label'>
          <option value='5' selected>5</option>
          <option value='4'>4</option>
          <option value='3'>3</option>
          <option value='2'>2</option>
          <option value='1'>1</option>
        </select>
      </div>
      <div class='add-btn-container col-12'>
        <button type='submit' id='js-add-bookmark' class='add-button'>ADD BOOKMARK</button>
        <button type='button' id='js-cancel-bookmark'>CANCEL</button>
      </div>
      </fieldset>
    </form>
    `;
}
//how to generate expanded view? object.smth
//send using fetch call but the data is generated in an object while using a form

/*function generateExpandedView() {
  return `
  <form id="question-form" class="question-form">
  <fieldset class="fieldset">
  <div class="question">
  <h2>${bookmarkName}</h2>
  </div>
  <div class="answers">
  ${generateAnswersHtml()}
  </div>
  <p>
  <button type="submit" id="submit-button"
  tabindex="5">Submit</button>
  </p>
  </fieldset>
  </form>
  `;
} 
*/

function generateUpdateBookmarkForm() {
  return `
      <form id='js-edit-form'>
      <fieldset>
      <legend>Update Bookmark</legend>
        <div class='col-6'>
          <label for='js-form-title'>Title</label>
          <li class='new-item-li'><input type='text' id='js-form-title' name='title' placeholder='Amazing programming article'></li>

         
          <label for='js-form-description'>Description</label>
          <li class='new-item-li'><textarea id='js-form-description' name='description' placeholder="I can't believe its not PHP!"></textarea>
        </div>
        <div class='col-6'>
          <label for='js-form-url'>URL</label>
          <li class='new-item-li'><input type='url' id='js-form-url' name='url' placeholder='https://...'></li>

          <label for='js-form-rating' id='rating-label'>Rating: </label>
          <select id='js-form-rating' name='rating' aria-labelledby='rating-label'>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select>
        </div>
        <div class='add-btn-container col-12'>
          <button type='submit' id='js-update-bookmark' class='add-button'>UPDATE BOOKMARK</button>
          <button type='button' id='js-cancel-bookmark'>CANCEL</button>
        </div>
        </fieldset>
      </form>
      `;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag 
//based on the state of the store


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
//get all bookmarks from store object
function handleNewBookmarkClicked() {
  $('#js-new-bookmark').on('click', () => {

    Store.setAddingBookmarkStatus(true);
    Store.setUpdatingBookmarkStatus(false);
    render();
  });
}

// Handler for add bookmark clicked
function handleAddBookmarkClicked() {
  $('#js-form-container').on('submit', '#js-new-item-form', event => {
    event.preventDefault();
    // Serialize the JSON and parse it into an object
    const serializedJSON = JSON.parse($(event.target).serializeJSON());
    const newBookmarkObject = constructBookmarkObject(serializedJSON);

    API.createNewBookmark(
      newBookmarkObject,
      newBookmark => {
        Store.addBookmark(newBookmark);

        Store.setAddingBookmarkStatus(false);
        // Render
        render();
      },
      error => errorCallback(error)
    );
  });
}

//generate rating

///add item to bookmark list
function addItemToBookmarkList(
  bookmarkName,
  ratingNum,
  urlName,
  descriptionDetails
) {
  store.bookmarks.push({
    id: cuid(),
    title: bookmarkName,
    rating: ratingNum,
    url: urlName,
    description: descriptionDetails,
    expanded: false
  });
};
//listen for click and update the store
function handleAddNewItemBtn() {
  $(".newBtn").on("click", function () {
    store.adding = true;
    render();
  });
};

/******* Main App Start ******
function handleBookmarkList() {
  render();
  //call event listeners here
  handleAddNewItemBtn();
};

const Bookmarks = (function () {
  /***** Event listener handlers *****/
// Handle binding all event listeners
function bindEventListeners() {
  handleNewBookmarkClicked();
  handleAddBookmarkClicked();
  handleDeleteBookmarkClicked();
  handleFilterRatingsDropdown();
  handleToggleExpandedBookmarkView();
  handleEditBookmarkClicked();
  handleCancelButton();
}
