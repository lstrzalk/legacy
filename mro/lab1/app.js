const math = require('mathjs');
const fs = require('fs');
const open = require('open');

let inside = {};
let outside = {};

let allInsides = {};
let allOutsides = {};

let insideByDim = {};
let outsideByDim = {};

let pointsLengths = {};
let distances = {};

const taskAPointsAmount = 100000;
const taskBPointsAmount = 100;
const dims = 20;
const cubeLength = 1000;
const r = cubeLength / 2;
const firstSeries = 10;

let euclidesLen = (pointA) => {
    let res = 0;
    for(let i = 0; i< pointA.length; i++){
        res += Math.pow(pointA[i] - r, 2)
    }
    return Math.sqrt(res);
}

let round2SecSignificant = (num) => {
    if(num.toString().split('.').length === 1){
        return num
    } else {
        let strNum = num.toString().split('.')[1];
        let prec = 2
        let counter = 0;
        for(let i = 0; i < strNum.length && counter !== 2; i++){
            if(strNum[i]!=='0'){
                counter++;
                if(counter===2){
                    prec = i+1;
                }
            }
        }
        return parseFloat(parseFloat(num).toFixed(prec));
    }

}
let addTaskAPoint = (currentDim) => {
    let newValue = math.random([currentDim], 0, cubeLength);
    if(euclidesLen(newValue) > r){
        outside[currentDim]++;
    } else {
        inside[currentDim]++;
    }

}
let addTaskBPoint = (currentDim) => pointsLengths[currentDim].push(math.random([currentDim],0, cubeLength))
for(let i = 2 ; i <= dims; i++){
    allInsides[i] = [];
    allOutsides[i] = [];
}

for(let index = 1; index <= firstSeries; index++){
    for(let i = 2 ; i <= dims; i++){
        inside[i] = 0;
        outside[i] = 0;
        for(let p = 0 ; p < i * taskAPointsAmount ; p++){
            addTaskAPoint(i)
        }
        let ins = (inside[i] / (inside[i] + outside[i]))*100
        let out = (outside[i] / (inside[i] + outside[i]))*100

        allInsides[i].push(ins)
        allOutsides[i].push(out)
        console.log(`DIM = ${i} POINTS = ${i*taskAPointsAmount} INSIDE = ${ins}% OUTSIDE = ${out}%`)
        
    }
}
let x = [];
let y = [];
let error_y_arr = [];
for(let i = 2 ; i <= dims; i++){
    let mean = round2SecSignificant(math.mean(allInsides[i]))
    let std = round2SecSignificant(math.std(allInsides[i]))
    // data.push([i,mean,std])
    x.push(i);
    y.push(mean);
    error_y_arr.push(std)
}
let jsonObjToSave = {
    x,
    y,
    name:'% punktów w hiperkuli',
    error_y: {
        type: 'data',
        array: error_y_arr,
        visible: true,
        color: 'rgb(190,66,72)'
    },
    type: 'scatter',
    marker: {color: 'rgb(74,137,170)', size: 12},
    mode: 'markers',
}

for(let index = 1; index <= firstSeries; index++){
    distances[index] = {}
    for(let i = 1 ; i <= dims; i++){
        console.log('START DIM ',i)
        pointsLengths[i] = [];
        distances[index][i] = [];
        for(let p = 0 ; p < i*taskBPointsAmount ; p++){
            addTaskBPoint(i)
        }
        for(let j = 0 ; j < pointsLengths[i].length-1;j++){
            for(let k = j+1; k < pointsLengths[i].length; k++){
                distances[index][i].push(euclidesLen(pointsLengths[i][j], pointsLengths[i][k]));
            }
        }
        console.log('END DIM ',i)
    }
    delete pointsLengths;
}
x = [];
y = [];
error_y_arr = [];
let dimsStd={};
for(let i = 1 ; i <= dims; i++){
    let stds = []
    for(let index = 1; index <= firstSeries; index++){
        let std = round2SecSignificant(math.std(distances[index][i]))
        let mean = round2SecSignificant(math.mean(distances[index][i]))
        stds.push(round2SecSignificant(std/mean*100))
        delete distances[index][i]
    }
    
    let mean = round2SecSignificant(math.mean(stds))
    let std = round2SecSignificant(math.std(stds));
    x.push(i);
    y.push(round2SecSignificant(mean));
    error_y_arr.push(std)
}
let jsonObjToSave2 = {
    x,
    y,
    name:'% odchylenia odległości',
    error_y: {
        type: 'data',
        array: error_y_arr,
        visible: true,
        color: 'rgb(190,66,72)'
    },
    type: 'scatter',
    marker: {color: 'rgb(33,55,75)', size: 12},
    mode: 'markers',
}


fs.writeFile('plot.js',"let plot="+JSON.stringify(jsonObjToSave)+"\nlet plot2="+JSON.stringify(jsonObjToSave2)+"\nlet dims="+dims+"\nlet taskAPointsAmount="+taskAPointsAmount+"\nlet taskBPointsAmount="+taskBPointsAmount+"\nlet cubeLength="+cubeLength+"\nlet series="+firstSeries);
open('./index.html');