import $config from '@/config'
class Websocket {
  constructor(option) {
    this.websocket = null
    this.isConnect = false
    this.timeoutNum = null
    this.isHandClose = false
    this.data = null
    Object.assign(this, option)
    this.connect(option)
  }

  connect(option) {
    console.log('创建!')
    this.websocket = new WebSocket($config.wsUrl + this.url)
    this.initSocket(option)
  }

  initSocket(option) {
    this.websocket.onclose = () => {
      console.log('websocket连接关闭~' + this.url)
      this.isConnect = false
      // 如果手动关闭则不进行重连
      if (!this.isHandClose) {
        this.reconnectSocket(option)
      }
    }

    this.websocket.onerror = (e) => {
      console.log(e)
      console.log('websocket发生异常~' + this.url)
      if (this.isHandClose === true) {
        return false
      }
      this.reconnectSocket(option)
    }

    this.websocket.onopen = () => {
      console.log('websocket已连接~ ' + this.url)
      this.isConnect = true

      // if ('sendMessage' in option) {
      //   console.log(option, 'jjjj')
      //   this.send(option.sendMessage || '')
      // }

      this.sendSock(this.data)
    }

    this.websocket.onmessage = (e) => {
      option.callback(JSON.parse(e.data))
    }
  }

  reconnectSocket(option) {
    if (this.isConnect === true) {
      return false
    }
    console.log('websocket 重新连接~ ')
    this.isConnect = true
    this.timeoutNum && clearTimeout(this.timeoutNum)
    this.timeoutNum = setTimeout(() => {
      this.connect(option)
      this.isConnect = false
    }, 1000)
  }

  /**
   * // websocket连接状态下才能进行send
   * @option {*} msg
   * 向服务send的消息
   */
  send(msg) {
    // if (!msg) return
    this.websocket.send(JSON.stringify(msg))
  }

  sendSock(agentData, callback) {
    this.data = agentData
    // globalCallback = callback // 此callback为在其他地方调用时定义的接收socket数据的函数，此关重要。
    // 下面的判断主要是考虑到socket连接可能中断或者其他的因素，可以重新发送此条消息。
    switch (this.websocket.readyState) {
      // CONNECTING：值为0，表示正在连接。
      case 1:
        // setTimeout(() => {
        this.send(agentData, callback)
        // }, 400)
        break
      // OPEN：值为1，表示连接成功，可以通信了。
      case this.websocket.OPEN:
        this.send(agentData)
        break
      // CLOSING：值为2，表示连接正在关闭。
      case this.websocket.CLOSING:
        setTimeout(() => {
          this.send(agentData, callback)
        }, 300)
        break
      // CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
      case this.websocket.CLOSED:
        // do something
        break
      default:
        // this never happens
        break
    }
  }

  close() {
    console.log('WS手动关闭')
    this.isHandClose = true
    if (this.websocket) {
      this.websocket.close()
      this.isConnect = false
    }
  }
}

export default Websocket
