import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Pie } from 'react-chartjs-2';
import { Box } from 'theme-ui';
import 'chartjs-plugin-datalabels';
import PropTypes from 'prop-types';

//get all sessions and display accuracy chart for one session only
//or make request to get accuracy for one session
const AccuracyGraph = observer((props) => {
  const { accuracy, totalPositions } = props;
  console.log(accuracy, totalPositions);
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
        data: [totalPositions - accuracy, accuracy]
      }
    ]
  });

  useEffect(() => {
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
                console.log("Accuracy graph label: ",context.chart.data);
                return value === 0 ? '' : value;
              },
            }
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontSize: 20
            }
          }
        }}
      />
    </Box>
  )
})

AccuracyGraph.propTypes = {
  sid: PropTypes.number,
  accuracy: PropTypes.number,
  totalPositions: PropTypes.number
};

export default AccuracyGraph;