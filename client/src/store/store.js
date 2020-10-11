import io from 'socket.io-client';
import { observable, action, runInAction, computed } from 'mobx';
import axios from 'axios';
import dashboardStore from './dashboardStore';
import ls from 'local-storage';
import { states } from './types';

class SocketStore {
  @observable 
  startSession = false;

  @action
  setStartSession = (isStart) => {
    this.startSession = isStart;
  }

  @observable
  isConnected = false;

  @observable
  socket = null;

  @computed
  get first() {
    let first = [];
    Object.entries(this.currentPositions).map(([key, value]) => {
      console.log(key);
      if (value === 1) {
        first.push(key);
      }
    })
    return first;
  }

  @computed
  get second() {
    let second = [];
    Object.entries(this.currentPositions).map(([key, value]) => {
      if (value === 2) {
        second.push(key);
      }
    })
    return second;
  }

  @computed
  get third() {
    let third = [];
    Object.entries(this.currentPositions).map(([key, value]) => {
      if (value === 3) {
        third.push(key);
      }
    })
    return third;
  }
  @observable
  dancers = new Map();

  @observable
  currentPositions = {};

  @observable
  deviceUsers = {
    '1': '',
    '2': '',
    '3': '',
  }

  @observable
  currDanceMove = '';

  @observable
  currMoveOthers = {};

  @observable
  correctPositions = [];
  
  @computed get accuracy() {
    let userPositions = this.dancers.get(dashboardStore.account.username);
    let correct = 0;
    if (userPositions) {
      userPositions.forEach((position) => {
        const currIndex = Number(position.index);
        console.log('Curr index', currIndex, position.value);
        if (this.correctPositions.length > 0 && this.correctPositions.some((data) => Number(data.index) === currIndex)) {
          const currentPosition = this.correctPositions.find((data) => Number(data.index) === currIndex);
          console.log("Current correct position: ", currentPosition.position);
          if (Number(position.value) === Number(currentPosition.position)) {
            correct += 1;
          }
        }
      })
    }
    console.log('Correct positions', this.correctPositions.length, correct)
    return correct;
  }

  @action
  connect = () => {
    if (this.socket || this.isConnected) return;

    this.socket = io('http://localhost:5000/');
    this.isConnected = true;

    this.socket.on('connect', () => {
      console.log('Connected socket!')
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
    });

    this.socket.on('position', (data) => {
      const username = this.deviceUsers[`${data.id}`];
      if (username !== "") {
        this.currentPositions[username] = data.value;
      }
      let positions = this.dancers.get(username) || [];
      positions.push({ value: data.value, index: data.index });
      this.dancers.set(username, positions);
    })

    this.socket.on('correct_position', (data) => {
      console.log('correct position received', data);
      Object.entries(this.deviceUsers).forEach(([device, username]) => {
        console.log(device, username);
        if (username === dashboardStore.account.username) {
          const index = data.value.findIndex((id) => id === Number(device));
          if (index > -1)
            this.correctPositions.push({ index: data.index, position: index + 1});
        }
      })
    })

    this.socket.on('dance', (data) => {
      const username = this.deviceUsers[`${data.id}`];
      if (username === dashboardStore.account.username) {
        this.currDanceMove = data.move;
      } else {
        this.currMoveOthers[username] = data.move;
        console.log(this.currMoveOthers);
      }
    })

    this.socket.on('update_joined', (data) => {
      this.deviceUsers[`${data.deviceId}`] = data.username;
      this.currentPositions[data.username] = data.deviceId;
      this.dancers.set(data.username, [Number(data.deviceId)]);
      console.log('USER JOINED', data.deviceId, this.deviceUsers[`${data.deviceId}`]);
    })

    this.socket.on('session_stopped', (data) => {
      this.deviceUsers[`${data.deviceId}`] = '';
      console.log('USER LEFT', data);
      this.startSession = false;
      this.getSession();
    })

    this.socket.on('new_sessions', (data) => {
      console.log('New session');
      this.getSession();
    })
  };

  @action
  disconnect = () => {
    if (!this.socket) return;
    this.socket.on('disconnect', () => {
      this.socket = null;
      this.isConnected = false;
    });
  };

  @observable
  joinState = states.INITIAL // 'LOADING', 'DONE', 'ERROR'

  @action
  createSession = (deviceId) => {
    if (!this.socket) return;
    this.joinState = states.LOADING;
    axios
      .post('/create/session', { id: dashboardStore.account.id, device: deviceId })
      .then((res) => {
        if (res.status === 400) {
          alert('You got disconnected. Try logging in again to create a session.');
          return;
        }
        console.log(res.data.session);
        if (res.data) {
          ls.set('session', res.data.session);
          ls.set('deviceId', deviceId);
          runInAction(() => this.startSession = true);
          this.socket.emit('created_session', { sid: res.data.session });
          this.socket.emit('user_joined', { deviceId: deviceId, username: dashboardStore.account.username, id: dashboardStore.account.id })
          console.log('YOU CREATED SESSION: ', dashboardStore.account.username, deviceId);
        } else {
          alert('Unable to create session.');
        }
      })
      .finally(() => this.joinState = states.DONE)
  }

  @action
  joinedSession = (deviceId, sessionId) => {
    if (!this.socket) return;
    if (!sessionId) {
      return alert('Select a session to join or create a new one!');
    }
    this.joinState = states.LOADING;
    console.log('DEVICE', deviceId);
    axios
      .post('/join/session', { id: sessionId, uid: dashboardStore.account.id, device: deviceId })
      .then((res) => {
        if (res.status === 500) {
          alert(res.data.error);
          return;
        }
        ls.set('session', sessionId);
        ls.set('deviceId', deviceId);
        runInAction(() => {
          this.startSession = true;
          console.log('USERS', res.data);
          if (res.data.length > 0) {
            res.data.forEach((user) => {
              console.log('USER', user);
              this.deviceUsers[`${user.device}`] = user.username;
              this.dancers.set(user.username, [Number(user.device)]);
            })
          }
        });
        this.socket.emit('user_joined', { deviceId: deviceId, username: dashboardStore.account.username, id: dashboardStore.account.id })
        console.log('YOU JOINED: ', dashboardStore.account.username, sessionId);
      }).finally(() => this.joinState = states.DONE)
  }

  @observable
  sessions = [];

  @observable
  sessionState = 'INITIAL'; //'LOADING' 'DONE'

  @action
  getSession = () => {
    this.sessionState = 'LOADING';
    axios
      .get('/get/session')
      .then((res) => {
        runInAction(() => {
          this.sessionState = 'DONE';
          this.sessions = res.data;//[{ sid: 1 }, { sid: 2}]
          console.log(res.data);
        });
      })
      .catch((err) => {
        this.sessionState = 'DONE';
        console.log(err);
      })
  }

  @action
  leaveSession = (deviceId) => {
    if (!this.socket) return;
    console.log('YOU LEFT: ', dashboardStore.account.username, deviceId);
    const sid = ls.get('session');
    axios
      .post('/stop/session', { id: sid })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          runInAction(() => this.startSession = false);
          this.socket.emit('stop_session', { sid: sid, deviceId: deviceId, username: dashboardStore.account.username })
          ls.set('session', 0);
          this.sessions = [];
        } else {
          alert(res.data.error);
        }
      }).catch((err) => console.log(err));
  }
}

const socketStore = new SocketStore();

export default socketStore;
