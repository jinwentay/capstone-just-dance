// var pool = require('./pool');
var app = require('./index');
var redis = app.redis_client;

exports.storePositions = (callback) => {
  const insertText = 'INSERT INTO Position(id, sid, value, time) VALUES'
  let values = '';
  redis.LRANGE('position', 0, -1, function (err, positions) {
    positions.forEach((position) => {
      const data = JSON.parse(position);
      const text = `(${data.id}, ${data.sid}, ${data.value}, '${data.time}'),`; 
      values += text;
    })
    values = values.slice(0, -1);
    if (values !== '')
      return callback(insertText + values);
    else 
      return callback();
  })
  // console.log(values);
  // client.query(insertText + values, [], (q_err, q_res) => {
  //   if (q_err) {
  //     console.log(q_err);
  //   } 
  //   if (q_res) {
  //     console.log('Storing success');
  //   }
  // })
}