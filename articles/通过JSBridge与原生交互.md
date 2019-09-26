## 通过JSBridge与原生交互

## 引言
> 本人经验，有开发过手机端的商城(vue.js), 有开发过移动端物联网项目(react.js),都是通过 Webview 的形式来渲染前端的项目,原生开发相对于Web 开发, 开发维护成本、更新成本更高，Web 开发可以通过 HTML, CSS, javascript 来快速构建一个页面，易编写、易维护、易部署。   
那 Webview 做为 Native 的载体是怎么跟 web 做数据交互，就是通过 JSBridge 来调用 Native 的接口。而且是这个 双向通信 的通道

## code

1. JSBridge.js
```
// #if CONFIG_APP_MOCK
import mock from '../../../mock';
// import index from '../../modules/user/locales';
// #endif
let instance = null;
let WVJBCallbacks = null;
class JSBridge {
  constructor() {
    if (instance) return instance;

    this.callbackQue = {};
    instance = this;
  }

  setwebviewbridge(callback) {
    // 如果原生已经注入的桥对象，直接执行回调


    // ios, 按需注入
    // if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    //   if (window.WebViewJavascriptBridge) {
    //     callback(window.WebViewJavascriptBridge);
    //     return;
    //   }

    //   if (window.WVJBCallbacks) {
    //     window.WVJBCallbacks.push(callback)
    //     return
    //   }

    //   window.WVJBCallbacks = [callback];

    //   var WVJBIframe = document.createElement('iframe')
    //   WVJBIframe.style.display = 'none'
    //   WVJBIframe.src = 'https://__bridge_loaded__' // 通知原生注入jsbridge
    //   document.documentElement.appendChild(WVJBIframe)
    //   setTimeout(function () {
    //     document.documentElement.removeChild(WVJBIframe)
    //   }, 0)
    // }
    // // android，启动既注入
    // else {
    //   var bridge = window.WebViewJavascriptBridge || window.WKWebViewJavascriptBridge;
    //   if(bridge && bridge.hasNativeMethod){
    //     bridge.hasNativeMethod("send", (responseData)=> {
    //       if(responseData){
    //         if(!this.isReady){
    //           var callbacks = WVJBCallbacks;
    //           if(callbacks){
    //             callbacks.forEach((callback, i) => {
    //               setTimeout(function () {
    //                 callback(window.WebViewJavascriptBridge)
    //               }, 0);
    //             });
    //           } else {
    //             callback(window.WebViewJavascriptBridge);
    //           }

    //           this.isReady = true;
    //         } else {
    //           callback(window.WebViewJavascriptBridge);
    //         }

    //       } else {
    //         if (WVJBCallbacks) {
    //           WVJBCallbacks.push(callback);
    //           return;
    //         }

    //         WVJBCallbacks = [callback];
    //       }
    //     });
    //   } else{
    //     if (window.WebViewJavascriptBridge) {
    //       callback(window.WebViewJavascriptBridge);
    //       return;
    //     }

    //     if (WVJBCallbacks) {
    //       WVJBCallbacks.push(callback)
    //       return
    //     }

    //     WVJBCallbacks = [callback];

    //     document.addEventListener('WebViewJavascriptBridgeReady', function () {
    //       var callbacks = WVJBCallbacks;
    //       callbacks.forEach((callback, i) => {
    //         setTimeout(function () {
    //           callback(window.WebViewJavascriptBridge)
    //         }, 0);
    //       });
    //       // delete window.WVJBCallbacks
    //     }, false)
    //   }


    // }

     // 如果原生已经注入的桥对象，直接执行回调
     if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge);
      return;
    }

    if (window.WVJBCallbacks) {
      window.WVJBCallbacks.push(callback)
      return
    }

    window.WVJBCallbacks = [callback];

    // ios, 按需注入
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__' // 通知原生注入jsbridge
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }

  /*
   * js 调用原生方法
   * todo: 重试，超时
   */

  callHandler(url, data, timeout) {
    return new Promise((resolve, reject) => {
      let timer;
      try {
        const date = new Date();
        const requestName = `${data.service}.${data.action}(${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`;
        let targetUrl = '';
        const {service, action} = data;
        const requestData = data.data;

        if(service === 'HTTP') {
          targetUrl = `url: ${requestData.url}`;
        }

        if(service === 'MQTT' && action === 'public' && requestData.message && requestData.message.service) {
          targetUrl = `method: ${requestData.message.method}, service: ${requestData.message.service}`;
        }
        this.setwebviewbridge((bridge) => {
            console.info('-----------', requestName, targetUrl ,JSON.stringify(data), '-----------');
          //console.log('[system]', '-----------', requestName, targetUrl, data, '----------');
          bridge.callHandler(url, data, (res) => {
            const request_data = data;
              try{
                res = typeof res === 'string' && !/^\s?$/.test(res) ? JSON.parse(res) : res;
            }catch(e){
                console.log('[system]', 'valid response data format', res, e);
            }
            if (targetUrl !== 'method: disconnect, service: user' && targetUrl !== 'method: connect, service: user') {
              console.log('[system]', '-----------', requestName + ' response:', targetUrl, res, 'request message:', request_data, '-----------');
            }
            console.debug("====JSBridge.resp.data=======",JSON.stringify(data),res)
            resolve(res);
            clearTimeout(timer);
              this.sending = false;

          });

        });
      } catch (e) {
        this.sending = false;
        clearTimeout(timer);
        reject(e);
      }

      if (typeof timeout === 'number' && timeout >= 0) {
        timer = setTimeout(() => {
          this.sending = false;
          resolve({
            code: -1001,
            desc: 'Request timeout!'
          })
        }, timeout)
      }

    });
  }

  /*
   * 监听原生调用
   */
  on(name, callback) {
    if (this.callbackQue[name]) {
      this.callbackQue[name].push(callback)
    } else {
      this.callbackQue[name] = [callback]
    }
    /* eslint-disable */
    // #if CONFIG_APP_MOCK
    if (name && name.indexOf('.') > -1) {
      const req = name.split('.')
      setTimeout(() => {
        this.callbackQue[name] && this.callbackQue[name].forEach((cb, i) => {
          const mockData = mock({
            service: `H5_${req[0]}`,
            action: req[1]
          })

          if (mockData) {
            cb && cb(mockData)
            if (cb.once) {
              cb = null
            }
          }
        })
      }, 0)
    }
    // #endif
    /* eslint-enable */
  }
  /*
   * 取消监听
   */
  off(name, callback) {
    var que = this.callbackQue[name]
    if (que && que.length) {
      if (callback) {
        this.callbackQue[name] = que.filter(function (item) {
          return item !== callback
        })
      } else {
        this.callbackQue[name] = []
      }
    }
  }

  /*
   * 监听原生调用，只触发一次
   */
  once (name, callback) {
    callback.once = true
    this.on(name, callback)
  }

  /*
   * js 发送请求给原生
   * params data.service 服务名
   * params data.action 执行动作
   * params data.data 执行动作所需数据
   */
  send (data, timeout) {
      /* eslint-disable */
      // #if CONFIG_APP_MOCK
      const mockData = mock(data);
      if(mockData) {
        return new Promise((resolve, reject) => {
          setTimeout(function () {
            Object.keys(mockData).length ? resolve(mockData) : reject({})
          }, 200)
        })
      }
      // #endif
      /* eslint-enable */
    return this.callHandler('send', data, timeout)
  }

  /**
   * 开始监听原生请求
   */
  listen () {
    this.setwebviewbridge((bridge) => {
      bridge.registerHandler('send', (req) => {
        req = typeof req === 'string' && !/^\s?$/.test(req) ? JSON.parse(req) : req
        const eventName = req.service + '.' + req.action
        //console.info('[system]', 'Native call H5-' + eventName + ':', (req.data ? JSON.stringify(req.data) : 'null'))
        // console.log('Native call H5-' + eventName + ':', req.data);
        this.callbackQue[eventName] && this.callbackQue[eventName].forEach((cb, i) => {
          cb && cb(req.data)
          if (cb.once) {
            cb = null
          }
        })
      })
    })
  }
}

export default new JSBridge();
```

2. Http.js

```
import jsBridge from './JSBridge';

const defaultTimeout = 10 * 1000;
let config = {
  header: {},
};

function request(options) {
  const ipaddr = options.url;
  return jsBridge.send({
    service: 'HTTP',
    action: options.method,
    data: {
      url: ipaddr.indexOf(':') > -1 ? options.url : ipaddr,
      message: options.data,
      header: {
        ...config.header,
        ...options.header,
      },
    },
  }, options.timeout || defaultTimeout).then((res) => {
    if (typeof config.complete === 'function') {
      config.complete(res);
    }

    return res;
  });
}

export default {
  post(options) {
    return request({
      ...options,
      method: 'post',
    });
  },

  get(options) {
    return request({
      ...options,
      method: 'get',
    });
  },

  setUp(options) {
    config = {
      ...config,
      ...options,
    };
  },

  getConfig() {
    return config;
  },
};
```

3. 使用
```
import { Http } from '@/sdk';
import config from '@/config/app.config.json';

const serviceURL = `${config.serviceUrl.httpServer}/device`;

export function getMoreDevList(data) {
  return Http.get({
    url: `${serviceURL}/moreDevList`,
    data,
  });
}

```
