import { observable, action, runInAction } from 'mobx';
import axios from 'axios';

class DashboardStore {
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
  }
}

const dashboardStore = new DashboardStore();

export default dashboardStore;