import io from 'socket.io-client';
import { observable, action } from 'mobx';

class SocketStore {
  // constructor() {
  //   const currentUser = LocalStorageHelper.get('currentUser');
  //   if (currentUser?.session) {
  //     this.session = currentUser.session;
  //   }
  // }

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
      if (this.isDebug) {
        console.log('Disconnected');
      }
    });

    this.socket.on('accelerometer', () => {

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
}

const socketStore = new SocketStore();

export default socketStore;
