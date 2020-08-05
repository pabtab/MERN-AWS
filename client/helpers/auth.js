import cookie from 'js-cookie';

// Set in cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1
    })
  }
}

// Remove from cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key)
  }
}

// Get from cookie such as stored token
// Will be useful when we need to make request to server with auth token
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key)
  }
}

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

// rRemove from localstorage
export const setLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key)
  }
}

// Atuherticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user)
  next()
}

// access user info from localstorage
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token')
    const user = localStorage.getItem('user');
    if (cookieChecked && user) {
      return JSON.parse(user)
    } else {
      return false
    }
  }
}