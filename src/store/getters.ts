import { ILoginState } from './store'
const getters = {
  userInfo: (state: any): ILoginState => state.login.userInfo
}
export default getters
