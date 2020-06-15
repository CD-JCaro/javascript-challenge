var sightings = data;

//nabbing our html bits
var headers = Object.keys(sightings[0]);
var table =  d3.select('#ufo-table');
var headerRow = table.select('thead');
var tableBody = table.select('tbody');

var selectButton = d3.select("#filter-btn");

var filters = [d3.select("#datetime"), d3.select("#state"), d3.select("#city"), d3.select("#country"), d3.select("#shape")];


function makeTableHeaders(header)
{
    headerRow.append('th').text(header);
}

function populateTable(data)
{
    // dynamically populating header
    var newRow = tableBody.append('tr');

    headers.forEach(key => newRow.append('td').text(data[key]));
}

function filterData()
{
    //home base for events
    var newSightings = trimData(sightings);

    // clear old table
    tableBody.html("");

    newSightings.forEach(populateTable);
}

function trimData(data)
{
  var newSightings = data;

  //go through our filters and... filtering our data
  filters.forEach(filter => {
    var filterText = filter.property("value");
    var filterName = filter.property("id");

    if(filterText != "")
    {
        // we lowecase the values just in case... we also are accomodating partial searches with .includes
        newSightings = newSightings.filter(sighting => sighting[filterName].includes(filterText.toLowerCase()));
    }
  });

  return newSightings;
}

// setting up our events
filters.forEach(filter=> filter.on('change', filterData));
selectButton.on('click', filterData);

//setting up original table
headers.forEach(makeTableHeaders);
sightings.forEach(populateTable);



