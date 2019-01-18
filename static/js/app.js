var onTheWall = 99;
var takenDown = 0;
var passedAround = 0;
var onGround = 0;

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
    responsive: true,
    title: {
      display: true,
      text: 'Distributions of Beer'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
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

  chart.update();
});

document.getElementById('passAround').addEventListener('click', function() {
  if (onGround > 0) {
    passedAround++;
    onGround--;

    config.data.datasets[1].data[takenDown].y++;

    chart.update();
  };
});
