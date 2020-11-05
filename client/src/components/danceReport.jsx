import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Box } from 'theme-ui';
import OfflineStore from '../store/offlineStore';
import { DataTable } from './';

const DanceReport = observer(() => {
  const { sessionMoves } = OfflineStore;
  const danceMoves = useMemo(() => {
    let newMoves = [];
    if (sessionMoves.length > 0) {
      const numMoves = sessionMoves[sessionMoves.length - 1].index;
      if (sessionMoves.length < numMoves) {
        for (let i = 1; i <= numMoves; i++) {
          const move = sessionMoves.find((p) => p.index === i);
          if (move) {
            newMoves.push(position);
          } else {
            newMoves.push({
              index: i,
              move: 'NA',
            })
          }
        }
      } else {
        newMoves = sessionMoves;
      }
    }
    console.log(newMoves);
    return newMoves;
  }, [sessionMoves])
  return (
    <Box
      sx={{
        maxHeight: ['','calc(100vh - 350px)'],
        overflow: 'scroll',
      }}
    >
      <DataTable headers={['No.', 'Predicted Dance Move']} rowItems={danceMoves}/>
    </Box>
  )
})

export default DanceReport;