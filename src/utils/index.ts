// 登出前清空缓存
import { useTokenStore, useUserInfo } from '@/stores/user'
export const clearInfo = () => {
  const { setToken } = useTokenStore()
  const { setUserInfo } = useUserInfo()
  setToken(null)
  setUserInfo(null)
}
