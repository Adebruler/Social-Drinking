// Declare the states of the bottles
var onTheWall = 99;
var takenDown = 0;
var passedAround = 0;
var onGround = 0;

// Add the host to the party
var drinkers = 1;
var party = [{"id":1,
"guest":"Host",
"drinks":0
}];

var title = d3.select('title')
var countHeader = d3.select('#countHeader')
var navbarBrand = d3.select('#navbar-brand')


// Configure the line chart
var config = {
  type: 'scatter',
  data: {
    labels: [takenDown],
    datasets: [{
      label: 'On the Wall',
      backgroundColor: window.chartColors.red,
      borderColor: window.chartColors.red,
      data: [{
        x: takenDown,
        y: onTheWall
      }],
      fill: false,
      showLine: true
    }, {
      label: 'Passed around',
      backgroundColor: window.chartColors.blue,
      borderColor: window.chartColors.blue,
      data: [{
        x: takenDown,
        y: passedAround
      }],
      fill: false,
      showLine: true
    }]
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Distributions of Beer',
      fontSize: 20
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        title: function(tooltipItems, data) {
                        return tooltipItems[0].xLabel + " Bottles Taken Down!";
                    },
        label: function(tooltipItems, data) {
                        return tooltipItems.yLabel + " Bottles";
                    }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Bottles Taken Down'
        },
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Bottles of Beer'
        }
      }]
    }
  }
};


var ctx = document.getElementById('canvas');

var chart = new Chart(ctx, config);

Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0
    }
});

var colorNames = Object.keys(window.chartColors);

function guestsDrink(){
  // Share one bottle among all guests
  var drinkSize = 1/party.length;
  party.forEach(currGuest => {
    currGuest.drinks += drinkSize;
  })
}

function writeTable(){
  // Add row to table with new guest name and 0 drinks
  $("#party-table").empty();
  var tbody = d3.select("tbody");

  party.forEach(currGuest => {
    var row = tbody.append("tr");

    var cell = row.append("th");
    cell.attr("scope","row")
    cell.text(currGuest.id);

    var cell = row.append("td");
    cell.text(currGuest.guest);

    var cell = row.append("td");
    cell.text(+currGuest.drinks.toFixed(2));
  });
}



// Event listener for "Take one down"
document.getElementById('takeDown').addEventListener('click', function() {
  if (onTheWall > 0) {
    // Relocate bottle
    onTheWall--;
    takenDown++;
    onGround++;

    // Add new values to line chart
    config.data.datasets[0].data.push({
      x: takenDown,
      y: onTheWall
    });
    config.data.datasets[1].data.push({
      x: takenDown,
      y: passedAround
    });
    chart.update();

    // Update page title and header with beer count
    title.text(`${onTheWall} Bottles of Beer!`)
    navbarBrand.text(`${onTheWall} Bottles on the Wall!`)

    // Enable beer to be passed.
    document.getElementById('passAround').disabled = false;
  }
});

// Event listerner for "Pass it around"
document.getElementById('passAround').addEventListener('click', function() {
  if (onGround > 0) {
    // Relocate bottle
    passedAround++;
    onGround--;

    // Move value on linechart
    config.data.datasets[1].data[takenDown].y++;
    chart.update();

    // Add beer to guest table
    guestsDrink();
    writeTable();

    // If none on the ground, disable passing until one is taken down.
    if (onGround == 0){
      document.getElementById('passAround').disabled = true;
    }
  };
});

// Event listener for adding new guest
document.getElementById('newGuest').addEventListener('click', function() {
  // Check if input is blank. If not, add guest
  var guest = d3.select("#guest").property("value");
  if (guest != ""){
    drinkers++;
    currGuest = {"id":drinkers,
      "guest":guest,
      "drinks":0
    };
    party.push(currGuest);

    writeTable();

    document.getElementById('guest').value = "";
  }
});
