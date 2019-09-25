## axios 封装

## 引言
在如今前端项目开发中（vue.js、react.js），和后台交互获取数据这块，我们通常使用 axios 库，基于 promise 的 http 库，可运行在浏览器及node.js。它有很多优秀特性：拦截请求和响应、取消请求、转换json、客户端防御cSRF等。

## 安装
```
npm install axios
```

## code

api.js
```
import axios from "axios";
import { message } from "antd";
import { storage } from "./storage";
import httpaddr from "./httpaddr.js";

message.config({
  duration: 3,
  maxCount: 1
});

// Set config defaults when creating the instance
// IE9, IE10 不兼容window.location.origin
if (!window.location.origin) {
  window.location.origin = `${window.location.protocol}//${
    window.location.hostname
  }${window.location.port ? `:${window.location.port}` : ""}`;
  // window.location.origin = `//172.16.65.76:8060`;
}

const instance = axios.create({
  baseURL: httpaddr.httpServer,
  // baseURL: window.location.origin,
  // withCredentials: true,
  timeout: 1000 * 5
});
// const ACCEPT_LANGUAGE = {
//   zh: 'zh-CN,zh',
//   en: 'en-US,en',
// };
let reqConfig;
let terminal;
if (/(iphone|ipad)/gi.test(navigator.appVersion)) terminal = "APP";
else if (/(android)/gi.test(navigator.appVersion)) terminal = "APP";
else terminal = "WEB";

let loadingTimer = null;
let loadingInstance = null;
let errorClock = null;
const setLoadingTimer = isLoading => {
  // TODO 加载loading方式待改造
  if (isLoading) {
    message.loading("loading data...", 0);
  } else {
    message.destroy();
  }
};

// Add a request interceptor
instance.interceptors.request.use(
  // Do something before request is sent
  config => {
    if (!config.disableLoading) {
      setLoadingTimer(true);
    }

    reqConfig = config;
    // if (reqConfig.url.indexOf('file/getUrl') > -1) {
    //   reqConfig.baseURL = reqConfig.baseURL.replace('/api', '');
    //   // reqConfig.headers.token = 'f88bdcb2-8ec8-41e7-97b0-d1af56c4313a';
    //   // reqConfig.headers['access-token'] = 'f88bdcb2-8ec8-41e7-97b0-d1af56c4313a';
    // }

    reqConfig.headers.token = storage.get("token");
    reqConfig.headers["access-token"] = storage.get("token");
    // reqConfig.headers.token = 'f88bdcb2-8ec8-41e7-97b0-d1af56c4313a';
    // reqConfig.headers['access-token'] = 'f88bdcb2-8ec8-41e7-97b0-d1af56c4313a';

    reqConfig.headers.terminal = terminal;
    // reqConfig.headers['Accept-Language'] = ACCEPT_LANGUAGE['zh'];
    // 不加这个会使得content-type无法设置到request的headers中
    if (!reqConfig.data) {
      reqConfig.data = {};
    }
    if (!reqConfig.params) reqConfig.params = {};
    Object.assign(reqConfig.params, {
      _r: Math.random()
    });

    // console.log('request config = ', reqConfig);

    return reqConfig;
  },
  // Do something with request error
  error => Promise.reject(error)
);

const ERR_DESC = "System error, try again later";
const handleErrorRes = function(response) {
  const {
    data: { code, desc }
  } = response;
  if (600057 === code) {
    message.error(desc, 3, function() {
      window.location = "/Account/login";
    });
  } else if (code !== 200) {
    message.error(desc || ERR_DESC);
  }
};

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    setLoadingTimer(false);
    handleErrorRes(response);
    return response.data;
  },
  error => {
    setLoadingTimer(false);
    errorClock && clearTimeout(errorClock);
    errorClock = setTimeout(() => {
      if (!error.response) {
        message.error(ERR_DESC, 1.8);
      } else {
        error.response.data &&
          message.error(error.response.data.desc || ERR_DESC, 1.8);
      }
    }, 2000);

    return Promise.reject(error);
  }
);

export default instance;

```

httpAddr.js
```
const apiServer = {
  dev: "http://192.168.5.19:8060",
  test: "http://192.168.5.21:8060"
};
export default {
  // httpServer: 'http://172.16.65.83:8060',
  // httpServer: 'http://172.16.65.95:8060',
  // httpServer: 'http://192.168.5.20/mock/20',

  httpServer: apiServer[process.env.REACT_APP_ENV] || apiServer["dev"]
  //httpServer: 'http://192.168.5.21:8060','
  // httpServer:'http://172.16.65.113:8060'
};
```



```
// import store from 'store2';

// const STORAGE_SYMBOL = '__local_store__';
const STORAGE_SYMBOL = '__session_store__';

function settingStorage(prefix) {
  // const storage = store.get(prefix) || {};
  let storage = sessionStorage.getItem(prefix);
  storage = (storage && storage !== '[object Object]') ? JSON.parse(storage) : {};
  return {
    get(key) {
      return key ? storage[key] : undefined;
    },
    set(key, value) {
      storage[key] = value;
      // store.set(prefix, storage);
      sessionStorage.setItem(prefix, JSON.stringify(storage));
    },
    clear(keyArr) {
      if (keyArr.length === 0) {
        sessionStorage.setItem(prefix, '{}');
      } else {
        keyArr.forEach((key) => {
          delete storage[key];
        });
        sessionStorage.setItem(prefix, JSON.stringify(storage));
      }
    },
  };
}


export function createStorage(prefix) {
  return settingStorage(prefix);
}

export const storage = createStorage(STORAGE_SYMBOL);
// export const createIsolateStorage = id => createStorage(`${STORAGE_SYMBOL}${id}`);
export default storage;

```

使用

```
import api from '@/utils/api';

// 树结构
export const spaceFindTree = data => api({
  method: 'GET',
  url: `/space/findTree?flag=${data.flag}`,
  // data,
}).then(res =>
  // console.log(res);
  res).catch((err) => {
  //  Toast(err.response.data.desc || '保存失败, 请重试');
});
```