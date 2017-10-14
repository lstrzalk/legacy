console.log(plot)
console.log(plot2)
let layer1 = {
    title: 'Wykres zależności punktów wewnątrz hiperkuli wpisanej<br>w hipersześcian od rozmiaru wymiaru',
    titlefont: {
        family: 'Courier New, monospace',
        size: 12,
        color: '#2E0927'
    },
    xaxis: {
      title: 'Wymiar',
      titlefont: {
        family: 'Courier New, monospace',
        size: 12,
        color: '#7f7f7f'
      }
    },
    yaxis: {
      title: 'Procent punktów wewnątrz<br>hiperkuli wpisanej w hipersześcian[%]',
      titlefont: {
        family: 'Courier New, monospace',
        size: 12,
        color: '#7f7f7f'
      }
    }
};
let layer2 = {
    title: 'Wykres odchylenia standardowego odległości między punktami do <br> średniej odległości między nimi w zależności od wymiaru',
    titlefont: {
        family: 'Courier New, monospace',
        size: 12,
        color: '#2E0927'
    },
    autosize: true,
    xaxis: {
      title: 'Wymiar',
      titlefont: {
        family: 'Courier New, monospace',
        size: 12,
        color: '#7f7f7f'
      }
    },
    yaxis: {
      title: 'Odchylenie standardowe odległości między punktami<br>do średniej odległości między nimi[%]',
      titlefont: {
        family: 'Courier New, monospace',
        size: 12,
        color: '#7f7f7f'
      }
    }
  };
let layer3 = {
    title: 'Nałożenie wykreów',
    titlefont: {
        family: 'Courier New, monospace',
        size: 16,
        color: '#2E0927'
    },
    autosize: true,
    xaxis: {
      title: 'Wymiar',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
    yaxis: {
      title: 'Procenty[%]',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
    legend: {"orientation": "h"}
  };
Plotly.newPlot('firstTask',[plot], layer1)
Plotly.newPlot('secondTask',[plot2], layer2)
Plotly.newPlot('overall',[plot, plot2], layer3)
let dimsEl = document.getElementsByClassName("dim")
for(let i = 0; i< dimsEl.length; i++){
  dimsEl[i].innerHTML = dims
}
let pointsA = document.getElementsByClassName("pointsA")
for(let i = 0; i< pointsA.length; i++){
  pointsA[i].innerHTML = taskAPointsAmount
}
let pointsB = document.getElementsByClassName("pointsB")
for(let i = 0; i< pointsB.length; i++){
  pointsB[i].innerHTML = taskBPointsAmount
}
let cubeEl = document.getElementsByClassName("cube");
for(let i = 0; i< cubeEl.length; i++){
  cubeEl[i].innerHTML = cubeLength
}
let seriesEl = document.getElementsByClassName("series");
for(let i = 0; i< seriesEl.length; i++){
  seriesEl[i].innerHTML = series
}
