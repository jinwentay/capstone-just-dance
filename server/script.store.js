var app = require('./index');
var redis = app.redis_client;

exports.storePositions = (callback) => {
  const insertText = 'INSERT INTO Position(id, sid, value, time, index) VALUES'
  let values = '';
  redis.LRANGE('position', 0, -1, function (err, positions) {
    positions.forEach((position) => {
      const data = JSON.parse(position);
      const text = `(${data.id}, ${data.sid}, ${data.value}, '${data.time}', '${data.index}'),`; 
      values += text;
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
    danceMoves.forEach((move) => {
      const data = JSON.parse(move);
      const text = `(${data.id}, ${data.sid}, '${data.move}', '${data.time}', '${data.index}'),`; 
      values += text;
    })
    values = values.slice(0, -1);
    if (values !== '')
      return callback(insertText + values);
    else 
      return callback();
  })
}