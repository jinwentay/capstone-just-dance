var app = require('./index');
var redis = app.redis_client;

exports.storePositions = (callback) => {
  const insertText = 'INSERT INTO Position(id, sid, value, index) VALUES'
  let values = '';
  redis.LRANGE('position', 0, -1, function (err, positions) {
    positions.forEach((position) => {
      const data = JSON.parse(position);
      const text = `(${data.id}, ${data.sid}, ${data.value}, '${data.index}'),`; 
      values += text;
    })
    values = values.slice(0, -1);
    if (values !== '')
      return callback(insertText + values);
    else 
      return callback();
  })
}

exports.storeCorrectPositions = (callback) => {
  const insertText = 'INSERT INTO correct_positions(id, sid, value, index) VALUES'
  let values = '';
  redis.LRANGE('correct_position', 0, -1, function (err, positions) {
    positions.forEach((position) => {
      const data = JSON.parse(position);
      if (data.id && data.sid && data.value && data.index) {
        const text = `(${data.id}, ${data.sid}, ${data.value}, '${data.index}'),`; 
        values += text;
      }
    })
    values = values.slice(0, -1);
    if (values !== '')
      return callback(insertText + values);
    else 
      return callback();
  })
}

exports.storeMoves = (callback) => {
  const insertText = 'INSERT INTO Dance(id, sid, move, time, index) VALUES'
  let values = '';
  redis.LRANGE('dance', 0, -1, function (err, danceMoves) {
    const movePrediction = {};
    danceMoves.forEach((move) => {
      const data = JSON.parse(move);
      const uid = data.id;
      const arr = movePrediction[uid] ? movePrediction[uid] : [];
      
      if (arr.length - 1 < Number(data.index)) {//if prediction does not exist yet
        arr.push(1);
      } else {
        arr[Number(data.index)] += 1; //add to count number of predictions for that index
        if (arr[Number(data.index)] === 4) { //save the 4th prediction for that move
          const text = `(${data.id}, ${data.sid}, '${data.move}', '${data.time}', '${data.index}'),`; 
          values += text;
        }
      }
      movePrediction[uid] = arr;
      // console.log("Dance move: ", uid, movePrediction);
    })
    values = values.slice(0, -1);
    if (values !== '')
      return callback(insertText + values);
    else 
      return callback();
  })
}