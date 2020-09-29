import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import socketStore from '../store/store';
// {
//   label: deviceUsers['1'],
//   backgroundColor: '#FE223C',
//   borderColor: '#FE223C',
//   borderWidth: 1,
//   data: []
// }, {
//   label: deviceUsers['2'],
//   backgroundColor: '#FDC83D',
//   borderColor: '#FDC83D',
//   borderWidth: 1,
//   data: []
// }, {
//   label: deviceUsers['3'],
//   backgroundColor: '#4280F4',
//   borderColor: '#4280F4',
//   borderWidth: 1,
//   data: []
// }
const danceMove = [
  'rest',
  'zigzag', 
  'elbow', 
  'hair', 
  'pushback', 
  'rocket', 
  'scarecrow', 
  'shrug', 
  'windows', 
  'waving'
];

const barColors = ['#FE223C', '#FDC83D', '#4280F4'];

const TimeGraph = observer(() => {
  const chartRef = useRef(null);
  const { socket, deviceUsers } = socketStore;

  useEffect(() => {
    function createDataset(danceData, danceValue) {
      const numDatasets = chartRef.current.props.data.datasets.length;
      let newDataset = {
        label: deviceUsers[`${danceData.id}`],
        backgroundColor: barColors[numDatasets],
        borderColor: barColors[numDatasets],
        borderWidth: 1,
        data: [{
          x: danceData.time,
          y: (danceValue > -1) ? danceValue : 0
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
            dataset.data.push({
              x: danceData.time,
              y: (danceValue > -1) ? danceValue : 0
            })
          }
        })
        // chartRef.current.props.data.datasets[danceData.id - 1].data.push({
        //   x: danceData.time,
        //   y: (danceValue > -1) ? danceValue : 0
        // })
      }

      chartRef.current.chartInstance.update({
        preservation: true
      })
    }
    if (socket && chartRef.current) {
      socket.on('dance', (danceData) => insertData(danceData));
    }
    return () => {
      socket.off('dance');
    }
  }, [socket, chartRef])
  return (
    <Bar
      ref={chartRef}
      data={{
        datasets: []
      }}
      options={{
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
            ticks: {
              callback: function(value) {
                return danceMove[value];
              }
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

export default TimeGraph;