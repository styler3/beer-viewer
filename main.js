var API_URL = '/api/';

var categories = [];
var beers = [];

var current_page = 1;
var page_count = 1;

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

function buildSelectedSection(beer) {
  
  $("#label").attr("src", "labels" in beer ? beer["labels"]["medium"] : ""),
  $("#title").text(beer["name"]);
  $("#description").text(beer["description"]);
  $("#abv").text("abv" in beer ? beer["abv"] : "?");
  $("#ibu").text("ibu" in beer ? beer["ibu"] : "?");
  $("#srm").text("srm" in beer ? beer["srm"]["name"] : "?");
  $("#og").text("originalGravity" in beer ? beer["originalGravity"] : "?");
  $("#style").text("style" in beer ? beer["style"]["name"] : "");

}

function selectBeer(id) {
  $.get(API_URL + 'beer/' + id, function(result) {
    buildSelectedSection(result['data']);
  })
}

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

function showMoreBeers() {
  current_page++;
  updateBeers(current_page);
}

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
$(document).ready(buildCategoriesMenu);
