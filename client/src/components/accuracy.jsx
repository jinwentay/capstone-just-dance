import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Box, Grid, Flex, Text } from 'theme-ui';
import socketStore from '../store/store';
import 'chartjs-plugin-datalabels';

const AccuracyGraph = observer(() => {
  const { accuracy, totalPositions } = socketStore;
  const [state, setState] = useState({
    labels: ['Wrong Positions', 'Correct Positions'],
    datasets: [
      {
        label: 'Accuracy',
        backgroundColor: [
          '#B21F00',
          '#C9DE00'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000'
        ],
        data: [totalPositions - accuracy, accuracy]//[correctPositions.length ? (correctPositions[correctPositions.length - 1].index - accuracy) : 0, accuracy]
      }
    ]
  });

  // useEffect(() => {
  //   if (correctPositions.length) {
  //     console.log('GRAPH', state.datasets[0].data, accuracy, correctPositions[correctPositions.length - 1].index);
  //     setState({
  //       labels: ['Wrong Positions', 'Correct Positions'],
  //       datasets: [
  //         {
  //           label: 'Accuracy',
  //           backgroundColor: [
  //             '#B21F00',
  //             '#C9DE00'
  //           ],
  //           hoverBackgroundColor: [
  //           '#501800',
  //           '#4B5000'
  //           ],
  //           data: [correctPositions[correctPositions.length - 1].index - accuracy, accuracy]
  //         }
  //       ]
  //     })
  //   }
  // }, [accuracy, correctPositions]);
  useEffect(() => {
    console.log(totalPositions, accuracy);
    setState({
      labels: ['Wrong Positions', 'Correct Positions'],
      datasets: [
        {
          label: 'Accuracy',
          backgroundColor: [
            '#B21F00',
            '#C9DE00'
          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000'
          ],
          data: [totalPositions - accuracy, accuracy]
        }
      ]
    })
  },[accuracy, totalPositions]);
  
  return (
    <Box 
      sx={{ 
        my: 'auto'
      }}
    >
      <Pie
        data={state}
        options={{
          plugins: {
            datalabels: {
              color: 'white',
              labels: {
                value: {
                    font: {
                        size: 20,
                        weight: 'bold',
                        family: 'Quicksand',
                    },
                    textAlign: 'center',
                }
              },
              clamp: true,
              formatter: function(value, context) {
                //const totalPositions = context.chart.data.datasets[0].data[0] + context.chart.data.datasets[0].data[1]//correctPositions.length > 0 ? correctPositions[correctPositions.length - 1].index : 0;
                console.log("Accuracy graph label: ",context.chart.data);
                return value === 0 ? '' : value//value === 0 ? '' : (`${totalPositions ? Math.round((value/totalPositions)* 100) : 0}%\n` + `${context.chart.data.labels[context.dataIndex]}: ${value}`);
              },
            }
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }}
      />
    </Box>
  )
})

export default AccuracyGraph;