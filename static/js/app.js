var onTheWall = 99;
var takenDown = 0;
var passedAround = 0;

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

document.getElementById('randomizeData').addEventListener('click', function() {
  config.data.datasets.forEach(function(dataset) {
    dataset.data = dataset.data.map(function() {
      return randomScalingFactor();
    });

  });

  chart.update();
});

var colorNames = Object.keys(window.chartColors);
document.getElementById('addDataset').addEventListener('click', function() {
  var colorName = colorNames[config.data.datasets.length % colorNames.length];
  var newColor = window.chartColors[colorName];
  var newDataset = {
    label: 'Dataset ' + config.data.datasets.length,
    backgroundColor: newColor,
    borderColor: newColor,
    data: [],
    fill: false
  };

  for (var index = 0; index < config.data.labels.length; ++index) {
    newDataset.data.push(randomScalingFactor());
  }

  config.data.datasets.push(newDataset);
  chart.update();
});

document.getElementById('addData').addEventListener('click', function() {
  if (config.data.datasets.length > 0) {
    var month = MONTHS[config.data.labels.length % MONTHS.length];
    config.data.labels.push(month);

    config.data.datasets.forEach(function(dataset) {
      dataset.data.push(randomScalingFactor());
    });

    chart.update();
  }
});

document.getElementById('removeDataset').addEventListener('click', function() {
  config.data.datasets.splice(0, 1);
  chart.update();
});

document.getElementById('removeData').addEventListener('click', function() {
  config.data.labels.splice(-1, 1); // remove the label first

  config.data.datasets.forEach(function(dataset) {
    dataset.data.pop();
  });

  chart.update();
});

document.getElementById('takeDown').addEventListener('click', function() {
  onTheWall--;
  takenDown++;

  config.data.labels.push(takenDown);

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
