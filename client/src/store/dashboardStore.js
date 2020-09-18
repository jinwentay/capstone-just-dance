import { observable, action, runInAction } from 'mobx';
import axios from 'axios';
import ls from 'local-storage';

class DashboardStore {
  constructor() {
    const currentUser = ls.get('account');
    if (currentUser) {
      this.account = currentUser;
    }
  }
  @observable 
  account = {
    id: -1,
    username: ''
  }

  @observable state = "pending" //pending, done, error

  @action 
  login = (data) => {
    this.state = "pending";
    axios.get("/get/user", {
      params: {
        username: data.username,
        password: data.password
      }
    }).then((res) => {
      runInAction(() => {
        this.account = res.data[0];
        this.state = "done";
      })
      ls.set('account', res.data[0])//{ id: number, username: string }
    }).catch((err) => {
      this.state = "error";
      console.log(err);
    })
  }

  @action
  signup = (data) => {
    axios
      .post('/post/user', data)
      .then((res) => {
        alert(res.data.message);
        runInAction(() => {
          this.account = res.data[0];
          this.state = "done";
        })
        ls.set('account', res.data[0])//{ id: number, username: string }
        console.log(res.data.account);
      })
      .catch((err) => {
        this.state = "error";
        console.log(err);
      })
  }

  @action
  logout = () => {
    this.account = {
      id: -1,
      username: ''
    }
    ls.set('account', null)//{ id: number, username: string }
  }
}

const dashboardStore = new DashboardStore();

export default dashboardStore;