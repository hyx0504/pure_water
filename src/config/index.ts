const {
  DEV, //
  VITE_WS_SERVER_URL, // websocket请求地址
  VITE_BASE_URL, //axios请求前缀
  VITE_SERVER, // 服务器地址
} = import.meta.env

export interface ScadaConfig {
  scada: {
    server: string
    base: string
  }
}
const { scada } = (window as any).$scada_config || {}
class Config {
  // 获取BaseUrl属性值
  get baseUrl(): string {
    return DEV ? this.scadaBase : this.scadaServer + this.scadaBase
  }
  //获取服务器地址
  get scadaServer(): string {
    return DEV ? VITE_SERVER : scada?.server ?? VITE_SERVER
  }
  // 获取axios请求前缀(相对路径)
  get scadaBase(): string {
    return DEV ? VITE_BASE_URL : scada?.base ?? VITE_BASE_URL
  }
  // ws 地址
  get wsUrl(): string {
    return DEV ? VITE_WS_SERVER_URL : scada?.ws_server_url ?? VITE_WS_SERVER_URL
  }
}
const $config = new Config()

console.log($config)

export default $config
