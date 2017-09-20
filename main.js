var API_URL = '/api/';

var categories = [];
var beers = [];
var min_abv = 4;
var max_abv = 7;
var min_ibu = 12;
var max_ibu = 22;

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
      click: updateBeers
    })

    $("#category").append(checkbox);
    $("#category").append(label);
  }
}

function getCategories() {
  $.get(API_URL + 'categories', function(result) {
    categories = result['data'];
    buildCategoriesMenu();
  })
}

function selectedCategories() {
  var selected_categories = [];
  $.each($("input[name='category']:checked"), function() {
    selected_categories.push($(this).val());
  })
  return selected_categories;
}

function selectBeer(id) {
  console.log(id);
}

function buildBeersList(beers) {
  $("#beers").html(""); //Clear the current results

  for (i in beers) {
    beer = beers[i];

    var link = $("<a>", {
      onclick: "selectBeer('" + beer['id'] + "')"
    }).text(beer["name"]);

    $("#beers").append(link);
  }
}

function updateBeers() {
  var url = API_URL + 'beers?';
  var cats = selectedCategories();

  //Attach query parameters
  cats = cats.map(function(cat) {return 'styleId=' + cat});
  url += cats.join("&");

  if (cats.length) { //Not if empty
    $.get(url, function(result) {
      buildBeersList(result['data']);
      //TODO: Deal with pagination
    })
  }
}

getCategories();
$(document).ready(buildCategoriesMenu);
