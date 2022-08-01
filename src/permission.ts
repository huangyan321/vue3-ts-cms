import router from './router'
import store from './store'
import { getCache } from './utils/cache'

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  const hasToken = getCache('token')

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters.userInfo.name

      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('login/getUserInfoAction')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('login/resetToken')
          next({ path: '/login' })
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({ path: '/login' })
    }
  }
})
