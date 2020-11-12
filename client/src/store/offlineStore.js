import { observable, action, runInAction, computed } from 'mobx';
import axios from 'axios';
import { DateTime } from 'luxon';
import dashboardStore from './dashboardStore';
import ls from 'local-storage';
class OfflineStore {
  @observable sid = ls.get('session');
  @observable isOpen = true;
  @action setOpen = (value) => {
    console.log("OPEN: ", value);
    this.isOpen = value;
  }
  @action setSid = (id) => {
    this.sid = id;
  }
  @observable accuracyStatus = 'INITIAL';
  @observable accuracyData = [];
  @action
  getAllSessionAccuracy = () => {
    this.accuracyStatus = 'LOADING';
    console.log("get session accuracy");
    axios.get("/get/session/all/accuracy").then((res) => {
      console.log(res.data);
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
      console.log(res.data);
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

  @observable
  sessionMoves = [];

  @action
  getSessionMoves = (sid) => {
    console.log("SESSION STORE", sid);
    const uid = dashboardStore.account.id;
    axios.get(`/get/session/${sid}/danceMoves`, { params: { id: uid } })
    .then((res) => {
      console.log(res.data);
      runInAction(() => {
        this.sessionMoves = res.data;
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  @observable
  sessionPositions = [];

  @action
  getSessionPositions = (sid) => {
    const uid = dashboardStore.account.id;
    axios.get(`/get/session/${sid}/numPositions`, { params: { id: uid }})
    .then((res) => {
      console.log(res.data);
      runInAction(() => {
        this.sessionPositions = res.data;
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  @observable
  sessions = [];

  @action
  getUserSessions = () => {
    const uid = dashboardStore.account.id;
    axios.get(`/get/session/${uid}`)
    .then((res) => {
      console.log(res.data);
      runInAction(() => {
        let newSessions = [];
        res.data.forEach((session) => {
          const date = new Date(session.date);
          const startTime = new Date(session.starttime);
          const endTime = new Date(session.endtime);
          const duration = DateTime.fromJSDate(endTime).diff(DateTime.fromJSDate(startTime), ['hours', 'minutes', 'seconds']).toObject();
          console.log(duration);
          newSessions.push({
            sid: session.sid,
            date: DateTime.fromJSDate(date).toFormat('dd/MM/yyyy'),
            duration: `${duration.hours ? `${duration.hours} hr ` : ''}
            ${duration.minutes} min ${duration.seconds} s`
          });
        })
        this.sessions = newSessions;
      })
    })
    .then(() => {
      if (this.sessions.length > 0) {
        const latestSid = this.sessions[0].sid;
        console.log(latestSid);
        this.getSessionMoves(latestSid);
        this.getSessionPositions(latestSid);
      }
    })
    .catch((err) => {
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

  @computed
  get accuracy() {
    let count = 0;
    this.sessionPositions.forEach((position) => {
      if (position.value === position.correct) {
        count++;
      }
    })
    return count;
  }

  @computed
  get numPositions() {
    if (this.sessionPositions.length > 0) {
      return this.sessionPositions[this.sessionPositions.length - 1].index;
    }
    return 0;
  }
}

const offlineStore = new OfflineStore();

export default offlineStore;