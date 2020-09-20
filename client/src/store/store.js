import io from 'socket.io-client';
import { observable, action, runInAction, autorun, computed } from 'mobx';
import axios from 'axios';
import dashboardStore from './dashboardStore';
import ls from 'local-storage';

class SocketStore {
  // constructor() {
  //   const currentUser = LocalStorageHelper.get('currentUser');
  //   if (currentUser?.session) {
  //     this.session = currentUser.session;
  //   }
  // }
  @observable 
  startSession = false;

  @observable
  isConnected = false;

  @observable
  socket = null;

  // @observable
  // session = '';

  // isDebug = false;

  // @observable
  // joinedParty = false;

  // onProfileChange = reaction(
  //   () => this.session,
  //   (session) => {
  //     if (session) {
  //       this.socket = null;
  //       this.isConnected = false;
  //       this.connect();
  //     } else {
  //       if (!session && this.isConnected) {
  //         this.disconnect();
  //       }
  //     }
  //   }
  // );
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
      // this.connect();
      // if (this.isDebug) {
      //   console.log('Disconnected');
      // }
    });

    this.socket.on('accelerometer', () => {

    })

    this.socket.on('position', (data) => {
      const username = this.deviceUsers[`${data.id}`];
      this.currentPositions[username] = data.value;
      let positions = this.dancers.get(username) || [];
      positions.push(data.value);
      this.dancers.set(username, positions);
    })

    this.socket.on('update_joined', (data) => {
      this.deviceUsers[`${data.deviceId}`] = data.username;
      this.currentPositions[data.username] = data.deviceId;
      this.dancers.set(data.username, [Number(data.deviceId)]);
      console.log(this.dancers);
      console.log('USER JOINED', data.deviceId, this.deviceUsers[`${data.deviceId}`]);
    })

    this.socket.on('update_left', (data) => {
      this.deviceUsers[`${data.deviceId}`] = '';
      console.log('USER LEFT', data);
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

  @action
  createSession = (deviceId) => {
    if (!this.socket) return;
    this.socket.emit('user_joined', { deviceId: deviceId, username: dashboardStore.account.username })
    axios
      .post('/create/session', { id: dashboardStore.account.id })
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
          console.log('YOU CREATED SESSION: ', dashboardStore.account.username, deviceId);
        } else {
          alert('Unable to create session.');
        }
      })
  }

  @action
  joinedSession = (deviceId, sessionId) => {
    if (!this.socket) return;
    this.socket.emit('user_joined', { deviceId: deviceId, username: dashboardStore.account.username})
    console.log('YOU JOINED: ', dashboardStore.account.username, deviceId);
    axios
      .post('/join/session', { id: sessionId, uid: dashboardStore.account.id })
      .then((res) => {
        if (res.data[0]) {
          ls.set('session', res.data[0]);
          ls.set('deviceId', deviceId);
          runInAction(() => this.startSession = true);
        } else {
          alert('Unable to join session.');
        }
      })
  }

  @observable
  sessions = [];

  @action
  getSession = () => {
    axios
      .get('/get/session')
      .then((res) => {
        runInAction(() => {
          this.sessions = res.data;
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  @action
  leaveSession = (deviceId) => {
    if (!this.socket) return;
    console.log('YOU LEFT: ', dashboardStore.account.username, deviceId);
    axios
      .post('/stop/session', { id: ls.get('session') })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          runInAction(() => this.startSession = false);
          this.socket.emit('user_left', { deviceId: deviceId, username: dashboardStore.account.username})
        } else {
          alert(res.data.error);
        }
      }).catch((err) => console.log(err));
  }
}

const socketStore = new SocketStore();

export default socketStore;
