// if (location.protocol === 'http:') {
//   window.Glob = {
//     WS_SERVER_URL: 'ws://192.168.222.129:8001/scada',
//     JAVA_SERVER_URL: '/scada',
//   }
// } else if (location.protocol === 'https:') {
//   window.Glob = {
//     WS_SERVER_URL: 'wss://192.168.222.129:8001/scada',
//     JAVA_SERVER_URL: '/scada',
//   }
// }
window.$scada_config = {
  scada: {
    // 服务器地址
    server: '',
    // 请求前缀
    base: '',
    // ws Url, eg: 'ws://192.168.31.1:8001/scada'
    ws_server_url: '',
  },
}
