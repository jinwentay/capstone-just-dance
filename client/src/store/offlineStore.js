import { observable, action, runInAction } from 'mobx';
import axios from 'axios';
import ls from 'local-storage';
import socketStore from './store';

class OfflineStore {
  @observable accuracyData = [];
  @action
  getAllSessionAccuracy = () => {
    console.log("get session accuracy");
    axios.get("/get/session/all/accuracy").then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  @observable totalPositions = [];
  @action 
  getAllSessionTotalPositions = () => {
    console.log("get session positions");
    axios.get("/get/session/all/numPositions").then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }
}

const offlineStore = new OfflineStore();

export default offlineStore;