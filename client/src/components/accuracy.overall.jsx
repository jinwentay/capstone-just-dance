import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import { autorun } from 'mobx';
import offlineStore from '../store/offlineStore';
import { Text } from 'theme-ui';

const OverallAccuracyGraph = observer(({ totalPositions, accuracyData }) => {
  const chartRef = useRef(null);
  const { numWrong, numCorrect } = offlineStore;
  return (
    <>
    <Bar
    data={{
        labels: numCorrect.map(i => Number(i.x) === i.x && i.x % 1 === 0 ? i.x: ""),
        datasets: [{
            label: 'Correct positions',
            data: numCorrect.map(i => i.y),
            backgroundColor: '#BB80F6',
            borderColor: '#BB80F6',
            borderWidth: 1
        }, {
          label: 'Wrong positions',
          data: numWrong.map(i => i.y),
          backgroundColor: '#C4C4C4',
          borderColor: '#C4C4C4',
          borderWidth: 1
      }]
    }}
    options={{
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Session'
          }
        }]
      }
    }}
    />
    </>
  )
})

export default OverallAccuracyGraph;