CREATE TABLE Users
(
  id SERIAL UNIQUE PRIMARY KEY,
  username varchar(255) unique not null,
  password varchar(30) not null,
);

CREATE TABLE Session
(
  sid SERIAL UNIQUE PRIMARY KEY,
  date DATE DEFAULT CURRENT_DATE,
  startTime TIMESTAMP,
  endTime TIMESTAMP
);

CREATE TABLE Participants
(
  id INTEGER,
  sid INTEGER
  foreign key (id) references Users(id) on delete cascade,
  foreign key (sid) references Session(sid) on delete cascade,
  primary key (id, sid)
)

CREATE TABLE Position 
(
  value integer not null,
  time TIMESTAMP,
  foreign key (id) references Users(id) on delete cascade,
  foreign key (sid) references Session(sid) on delete cascade
);

CREATE TABLE Dance
(
  move string not null,
  time TIMESTAMP,
  foreign key (id) references Users(id) on delete cascade,
  foreign key (sid) references Session(sid) on delete cascade
);

CREATE TABLE IOT
(
  sensor string not null,
  value integer not null,
  time TIMESTAMP,
  foreign key (id) references Users(id) on delete cascade,
  foreign key (sid) references Session(sid) on delete cascade
);

CREATE TABLE timeDelay
(
  moveNumber integer not null,
  time TIMESTAMP,
  foreign key (id) references Users(id) on delete cascade,
  foreign key (sid) references Session(sid) on delete cascade
)