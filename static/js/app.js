// Declare the states of the bottles
var onTheWall = 99;
var takenDown = 0;
var passedAround = 0;
var onGround = 0;

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
      text: 'Distributions of Beer'
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
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Bottles of Beer'
        },
        ticks: {
          beginAtZero: true
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

document.getElementById('takeDown').addEventListener('click', function() {
  if (onTheWall > 0) {
    onTheWall--;
    takenDown++;
    onGround++;

    config.data.datasets[0].data.push({
      x: takenDown,
      y: onTheWall
    });
    config.data.datasets[1].data.push({
      x: takenDown,
      y: passedAround
    });

    title.text(`${onTheWall} Bottles of Beer!`)
    navbarBrand.text(`${onTheWall} Bottles on the Wall!`)

    document.getElementById('passAround').disabled = false;

    chart.update();
    if (onTheWall == 0){
      document.getElementById('takeDown').disabled = false;
    }
  }
});

document.getElementById('passAround').addEventListener('click', function() {
  if (onGround > 0) {
    passedAround++;
    onGround--;

    config.data.datasets[1].data[takenDown].y++;

    chart.update();
    if (onGround == 0){
      document.getElementById('passAround').disabled = true;
    }
  };
});
