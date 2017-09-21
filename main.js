var API_URL = '/api/';

var categories = [];
var beers = [];

var current_page = 1;
var page_count = 1;

//Add all the checkboxes to the categories menu
function buildCategoriesMenu() {
  for (i in categories) {
    var cat = categories[i];

    var label = $("<label>", {
      for: "cat" + cat["id"]
    }).text(cat["name"]);

    var checkbox = $("<input>", {
      type: "checkbox",
      id: "cat" + cat["id"],
      value: cat["id"],
      name: "category",
      click: function() {
        updateBeers(1);
      }
    })

    var li = $("<li>").append(checkbox.add(label));

    $("#category").append(li);
    //$("#category").append(label);
  }
}

//Fetch all the available beer categories
function getCategories() {
  $.get(API_URL + 'categories', function(result) {
    categories = result['data'];
    buildCategoriesMenu();
  })
}

//Get the currently selected categories
function selectedCategories() {
  var selected_categories = [];
  $.each($("input[name='category']:checked"), function() {
    selected_categories.push($(this).val());
  })
  return selected_categories;
}

//Build the section that displays the currently selected beer
function buildSelectedSection(beer) {
  $("#label").attr("src", "labels" in beer ? beer["labels"]["large"] : ""),
  $("#title").text(beer["name"]);
  $("#description").text(beer["description"]);
  $("#abv").text("abv" in beer ? beer["abv"] : "?");
  $("#ibu").text("ibu" in beer ? beer["ibu"] : "?");
  $("#srm").text("srm" in beer ? beer["srm"]["name"] : "?");
  $("#og").text("originalGravity" in beer ? beer["originalGravity"] : "?");
  $("#style").text("style" in beer ? beer["style"]["name"] : "");
}

//Get the details of a beer
function selectBeer(id) {
  $.get(API_URL + 'beer/' + id, function(result) {
    buildSelectedSection(result['data']);
  })
}

//Build the list of beers
function buildBeersList() {
  $("#beers").html(""); //Clear the current results

  for (i in beers) {
    beer = beers[i];

    var link = $("<a>", {
      onclick: "selectBeer('" + beer['id'] + "')"
    }).text(beer["name"]);

    $("#beers").append(link);
  }

  if (current_page < page_count) {

    var show_more = $("<a>", {
      class: "show-more",
      click: showMoreBeers
    }).text("Show more...");

    $("#beers").append(show_more);

  }
}

//Go to the next "page" of beers from the API
function showMoreBeers() {
  current_page++;
  updateBeers(current_page);
}

//Get beers from the API
function updateBeers(page) {
  var url = API_URL + 'beers?';
  var cats = selectedCategories();

  //Attach query parameters
  cats = cats.map(function(cat) {return 'styleId=' + cat});
  url += cats.join("&");

  if (page == 1) {
    beers = []
  } else {
    url += "&p=" + page;
  }

  if (cats.length) { //Not if empty
    $.get(url, function(result) {
      current_page = result['currentPage'];
      page_count = result['numberOfPages'];
      beers = beers.concat(result['data']);
      buildBeersList();
    })
  }
}

getCategories();
//Avoid race condition between page load and API request
$(document).ready(buildCategoriesMenu);
