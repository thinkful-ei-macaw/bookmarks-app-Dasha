import store from "./store.js";
import api from "./api.js";

function renderMain() {
  return `
    <h1>My Bookmarks</h1>
    <div>
    <select class="filter-control" id="js-filter-control" name="filter"
                    aria-label="Filter ratings by minimum rating">
                    <option value="0">All</option>
                    <option value="5">5 stars</option>
                    <option value="4">4+ stars</option>
                    <option value="3">3+ stars</option>
                    <option value="2">2+ stars</option>
                    <option value="1">1+ stars</option>
                </select>
                <label for="filter-control" id="filter-label">Filter </label>
</div>
    <button class="add-bookmark">Add Bookmark</button>
    
    ${renderList()}
    <div>
    <select class="filter-control" id="js-filter-control" name="filter"
                    aria-label="Filter ratings by minimum rating">
                    <option value="0">All</option>
                    <option value="5">5 stars</option>
                    <option value="4">4+ stars</option>
                    <option value="3">3+ stars</option>
                    <option value="2">2+ stars</option>
                    <option value="1">1+ stars</option>
                </select>
                <label for="filter-control" id="filter-label">Filter </label>
</div>
    <button class="add-bookmark">Add Bookmark</button>
    
  `;
}

function generateNewBookmarkHtml() {
  return `
  <section class="row">
      <div class="bookmark-container">
        <ul class="js-bookmarks-container"></ul>
      </div>
    </section>
    
  <form id="js-new-bookmark-form">
    <fieldset>
      <div class="col-6">
        <label for="js-form-title">Title</label>
        <li class="new-item-li">
          <input
            type="text"
            id="js-form-title"
            name="title"
            placeholder="title goes here" required
          />
        </li>
        <label for="js-form-description">Description</label>
        <li class="new-item-li">
          <textarea
            id="js-form-description"
            name="description"
            placeholder="this is the best site ever!"></textarea>
        </li>
      </div>
      <div class="col-6">
        <label for="js-form-url">URL</label>
        <li class="new-item-li">
          <input
            type="url"
            id="js-form-url"
            name="url"
            placeholder="https://..." required/>
        </li>
        <label for="js-form-rating" id="rating-label">
          Rating:1-5
        </label>
        <select
          id="js-form-rating"
          name="rating"
          aria-labelledby="rating-label"
        >
          <option value="5" selected>
            5
          </option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>
      <div class="add-btn-container col-12">
        <button type="submit" id="js-add-bookmark" class="add-button">
          ADD BOOKMARK
        </button>
        <button type="button" id="js-cancel-bookmark">
          CANCEL
        </button>
      </div>
    </fieldset>
  </form>
  ;`;
}

const generateError = function(message) {
  return `
      <section class="error-container">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

function renderList() {
  let html = `<ul>`;
  let bookmarks =
    store.store.filter > 0
      ? store.store.bookmarks.filter(b => b.rating >= store.store.filter)
      : store.store.bookmarks;
  bookmarks.forEach(b => (html += renderBookmark(b)));
  html += `</ul>`;
  return html;
}

function renderBookmark(bookmark) {
  let html = `<li class="bookmark" id="${bookmark.id}">`;
  html += `<h3>${bookmark.title}</h3>`;
  if (bookmark.expanded) {
    html += `<p>${bookmark.desc}</p>`;
    html += `<p>Rating: ${bookmark.rating}</p>`;
    html += `<button><a class="bookmark-url" href="${bookmark.url}" target="_blank">visit site</a></button>`;
    html += `<button type="button" id="js-delete-bookmark"> delete bookmark
        </button> `;
  }
  html += `</li>`;
  return html;
}

function expandBookmark() {
  $("main").on("click", ".bookmark", e => {
    const id = $(e.currentTarget).attr("id");
    store.toggleBookmarkExpanded(id);
    render();
  });
}

function visitBookmark() {
  console.log("visit");
  $("main").on("click", ".bookmark-url", e => {
    e.stopPropagation();
  });
}

function deleteBookmark() {
  $("main").on("click", "#js-delete-bookmark", e => {
    console.log("delete");
    e.preventDefault();
    e.stopPropagation();
    //remove it from added list
    const id = $(e.currentTarget)
      .parent()
      .attr("id");
    console.log(id);
    store.findAndDelete(id);
    render();
  });
}

function addNewBookmarkClick() {
  $("main").on("click", ".add-bookmark", event => {
    event.preventDefault();
    console.log("newbutton");

    $("main").html(generateNewBookmarkHtml());
  });
}

//.api goes here but where?? look up dog example
//i did everything riiight ugh whyyyy
function submitButtonClick() {
  $("main").on("submit", "#js-new-bookmark-form", e => {
    e.preventDefault();
    console.log("add me plz");
    const newBookmark = {
      title: `${e.target.title.value}`,
      url: `${e.target.url.value}`,
      desc: `${e.target.description.value}`,
      rating: `${e.target.rating.value}`
    };
    api
      .createBookmark(newBookmark)
      .then(bookmark => store.addBookmark(bookmark))
      .then(() => render());
  });
}

function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $(".error-container").html(el);
  } else {
    $(".error-container").empty();
  }
}

function handleCancelButton() {
  $("main").on("click", "#js-cancel-bookmark", event => {
    //event.preventDefault();
    console.log("cancel button");

    //$("generateNewBookmarkHtml").hide();
    $("main").html(renderMain);
  });
}

function filterBookmarks() {
  $("main").on("change", ".filter-control", e => {
    console.log(e.target.value);
    store.setFilter(e.target.value);
    render();
  });
}

const render = () => {
  $("main").html(renderMain());
};

const bindEventListeners = () => {
  expandBookmark();
  visitBookmark();
  submitButtonClick();
  handleCancelButton();
  addNewBookmarkClick();
  generateError();
  filterBookmarks();
  deleteBookmark();
};

export default {
  render,
  bindEventListeners
};
