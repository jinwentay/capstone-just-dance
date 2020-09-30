import { observable, action, runInAction, computed } from 'mobx';
import axios from 'axios';
import ls from 'local-storage';
import socketStore from './store';
import dashboardStore from './dashboardStore';

class OfflineStore {
  @observable accuracyStatus = 'INITIAL';
  @observable accuracyData = [];
  @action
  getAllSessionAccuracy = () => {
    this.accuracyStatus = 'LOADING';
    console.log("get session accuracy");
    axios.get("/get/session/all/accuracy").then((res) => {
      // console.log(res.data);
      let userAccuracy = [];
      res.data.forEach((data) => {
        if (data.id === dashboardStore.account.id) {
          userAccuracy.push(data);
        }
      })
      console.log(userAccuracy);
      runInAction(() => {
        this.accuracyData = userAccuracy;
        this.accuracyStatus = 'DONE';
      })
    }).catch((err) => {
      runInAction(() => {
        this.accuracyStatus = 'DONE';
      })
      console.log(err);
    })
  }
  @observable status = 'INITIAL';
  @observable totalPositions = [];
  @action 
  getAllSessionTotalPositions = () => {
    this.status = 'LOADING';
    console.log("get session positions");
    axios.get("/get/session/all/numPositions").then((res) => {
      // console.log(res.data);
      let userTotal = [];
      res.data.forEach((data) => {
        if (data.id === dashboardStore.account.id) {
          userTotal.push(data);
        }
      })
      console.log(userTotal);
      runInAction(() => {
        this.totalPositions = userTotal;
        this.status = 'DONE';
      })
    }).catch((err) => {
      runInAction(() => {
        this.status = 'DONE';
      })
      console.log(err);
    })
  }

  @computed
  get numWrong() {
    let wrong = []
    this.totalPositions.forEach((data) => {
      const countCorrect = this.accuracyData.find((session) => session.sid === data.sid);
      const wrongData = {
        x: data.sid,
        y: Number(data.count) - (countCorrect ? countCorrect.count : 0)
      }
      wrong.push(wrongData);
    })
    console.log("WRONG: ", wrong);
    return wrong;
  }

  @computed
  get numCorrect() {
    let correct = []
    this.totalPositions.forEach((data) => {
      const countCorrect = this.accuracyData.find((session) => session.sid === data.sid);
      const correctData = {
        x: data.sid,
        y: (countCorrect ? Number(countCorrect.count) : 0)
      }
      correct.push(correctData);
    })
    console.log("CORRECT: ", correct);
    return correct;
  }
}

const offlineStore = new OfflineStore();

export default offlineStore;