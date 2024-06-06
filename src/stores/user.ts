// token
export const useTokenStore = defineStore('token', () => {
  const localToken = localStorage.getItem('token')
  const token = ref(localToken ? localToken : null)
  const setToken = (status: string | null) => {
    token.value = status
    if (status) {
      localStorage.setItem('token', status)
    } else {
      localStorage.removeItem('token')
    }
  }
  const getToken = computed(() => {
    return token.value
  })
  return { token, setToken, getToken }
})
// user
export const useUserInfo = defineStore('userInfo', () => {
  const localJson = localStorage.getItem('userInfo') as string
  const localUserInfo = JSON.parse(localJson)
  const userInfo = ref<Record<string, any> | null>(
    localUserInfo ? localUserInfo : null,
  )
  const setUserInfo = async (status: Record<string, any> | null) => {
    if (status) {
      localStorage.setItem('userInfo', JSON.stringify(status))
      userInfo.value = status
    } else {
      localStorage.removeItem('userInfo')
      userInfo.value = null
    }
  }
  const getUserInfo = computed(() => {
    if (userInfo.value) return userInfo.value
    try {
      if (localStorage.getItem('userInfo')) {
        const json = localStorage.getItem('userInfo') as string
        return JSON.parse(json)
      }
    } catch (error) {
      return {}
    }
    return {}
  })
  return { userInfo, setUserInfo, getUserInfo }
})
