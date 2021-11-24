import { makeAutoObservable } from 'mobx'
class HomeStore {
  constructor() {
    makeAutoObservable(this)
  }
  num = 1
  setNum = () => {
    this.num++
  }
}

export default new HomeStore()
