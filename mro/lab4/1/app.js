let layer1 = {
    title: 'Wykres zależności punktów wewnątrz hiperkuli wpisanej<br>w hipersześcian od rozmiaru wymiaru',
    titlefont: {
        family: 'Courier New, monospace',
        size: 12,
        color: '#2E0927'
    },
    xaxis: {
      title: 'Metoda Inicjalizacji',
      titlefont: {
        family: 'Courier New, monospace',
        size: 12,
        color: '#7f7f7f'
      }
    },
    yaxis: {
      title: 'Jakość klasteryzacji',
      titlefont: {
        family: 'Courier New, monospace',
        size: 12,
        color: '#7f7f7f'
      }
    }
};
let trace = {
    x: ['Forgy', 'K-means ++', 'Random', 'Random Partition'],
    y: [65.564970595124208, 36.333607657358641, 144.09230755267691, 101.43592538041614],
    error_y: {
        type: 'data',
        array: [44.941775627308211, 7.6527794691607251e-15, 2.8421709430404007e-14, 1.4210854715202004e-14],
        visible: true
    },
    type: 'bar',
    marker:{
        color: ['#9C27B0', '#3F51B5', '#4CAF50', '#FFC107']
    },
}
let data = [trace]
let layout = {barmode: 'group'}
Plotly.newPlot('q',data, layer1)