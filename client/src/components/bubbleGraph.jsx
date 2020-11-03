import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Bubble } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-streaming';
import socketStore from '../store/store';

const danceMove = [
  'rest',
  'zigzag', 
  'elbow', 
  'hair', 
  'pushback', 
  'rocket', 
  'scarecrow', 
  'shouldershrug', 
  'windows', 
  'waving'
];

const barColors = ['#FD6579', '#FEDC6F', '#7AA7FC'];

const BubbleGraph = observer(() => {
  const chartRef = useRef(null);
  const { socket, deviceUsers } = socketStore;

  useEffect(() => {
    function createDataset(danceData, danceValue) {
      const numDatasets = chartRef.current.props.data.datasets.length;
      let newDataset = {
        label: deviceUsers[`${danceData.id}`],
        backgroundColor: numDatasets < 3 ? barColors[numDatasets] : '#FAFAFA',
        borderColor: numDatasets < 3 ? barColors[numDatasets] : '#FAFAFA',
        borderWidth: 1,
        data: [{
          x: danceData.time,
          y: danceData.move,
          r: 20
        }]
      }
      console.log("NEW DATA SET: ", newDataset);
      chartRef.current.props.data.datasets.push(newDataset);
    }

    function insertData(danceData) {
      console.log("Dance data", danceData);
      const danceValue = danceMove.findIndex((move) => {
        return move === danceData.move
      });
      const username = deviceUsers[`${danceData.id}`];
      const isInserted = chartRef.current.props.data.datasets.some((dataObj) => dataObj.label === username);
      if (!isInserted) {
        createDataset(danceData, danceValue);
      } else {
        chartRef.current.props.data.datasets.forEach((dataset) => {
          if (dataset.label === username) {
            //check if the move for the same time has been recorded previously
            //possible issues: maybe don't show the dance prediction here because it is weird
            const isRepeatedRest = dataset.data.length > 0 && dataset.data[dataset.data.length - 1].y === 'rest' && danceData.move === 'rest';
            if (!isRepeatedRest && dataset.data.length > 0 && dataset.data[dataset.data.length - 1].x !== danceData.time) {
              dataset.data.push({
                x: danceData.time,
                y: danceData.move,
                r: 20
              })
            } else if (dataset.data.length === 0) {
              dataset.data.push({
                x: danceData.time,
                y: danceData.move,
                r: 20
              })
            }
          }
        })
      }

      chartRef.current.chartInstance.update({
        preservation: true
      })
    }
    if (socket && chartRef.current) {
      socket.on('dance', (danceData) => insertData(danceData));
    }
    return () => {
      if (socket)
        socket.off('dance');
    }
  }, [socket, chartRef])
  return (
    <Bubble
      ref={chartRef}
      data={{
        datasets: []
      }}
      options={{
        plugins: {
          datalabels: {
            display: 'auto',
            font: {
              weight: 'bold',
              family: 'Quicksand',
            },
            formatter: function(value, context) {
                // console.log("CHART LABEL: ", value);
                return value.y;
            },
            clip: true,
            clamp: true,
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 20
          }
        },
        scales: {
          xAxes: [{
            type: 'realtime',
            realtime: {
              duration: 10000,
              delay: 1000,
              unit: 'millisecond'
            }
          }],
          yAxes: [{
            type: 'category',
            labels: [
              'zigzag', 
              'elbow', 
              'hair', 
              'pushback', 
              'rocket', 
              'scarecrow', 
              'shouldershrug', 
              'windows', 
              'waving',
              'rest'
            ],
            ticks: {
              min: 'zigzag',
            },
            scaleLabel: {
              display: true,
              labelString: 'Dance Move'
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: false
        }
      }}
    />
  )
})

export default BubbleGraph;