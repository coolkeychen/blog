# React-intl 实现国际化多语言
## 引言
> 最近在做一个欧洲路演的demo项目，有一个国际化多语言的需求，刚好弥补之前相关经验的缺失，采用的是雅虎开源的项目 React-intl， 该库提供了 React 组件和Api两种方式来格式化日期，数字和字符串等，有大公司的加持还是比较放心，推荐指数高。  

以下是该项目的设计思路

## React Intl 国际化多语言设计思路
1. 安装 React-intl
2. 创建locale国际化配置资源文件
3. 根据语言环境加载国际化资源
4. 创建 LocaleProvider 国际化上下文组件，使用<IntlProvider/>
5. 使用 react-intl's components & api， 使用<FormattedMessage />

## 1.安装 React-intl
打开终端，进入到项目根目录下，敲下如下命令；
```
npm install react-intl -save
```

##  2.创建locale国际化配置资源文件

目前此项目locale国际化配置资源文件入在 src/locales 文件夹下
```
.  
├── de-de.js  
├── en-us.js  
├── sv-se.js  
├── index.js 
└── zh-simple.js  
```

index.js 代码
```
import { defineMessages } from 'react-intl';
import { getLocale } from 'systemCore/jssdk/LanguageManager';
let language = getLocale().toLowerCase(); 
let messages = null;

try {
  messages = require(`./${language}`);
} catch(e) {
  messages = require('./en_us');
}

export default defineMessages(messages.default);
```

en-us.js 代码
```
export default {
  'common.btnOk': 'Ok',
  'common.btnCancel': 'Cancel',
  'common.btn.remove': 'Remove',
  'common.btn.try_again': 'Try again',
  'common.btn.relogin': 'Relogin',
  'common.btn.ok.gotIt': 'Ok,got it',
  ...
  'network.pair.all.to': 'Would you like to pair to {param_1} ?',
```
locale 文件需要根据业务需求按照不同的页面或者不同的功能块创建不同的文件树，然后用模块化的方法将不同的配置文件进行组织，已达成你的目标。

*{param_1}* 这个字符串传进的动态参数，是不是看起来跟 ES6 的字符串模板很像

## 3.根据语言环境加载国际化资源

LanguageManager.js 代码如下

```
const defaultLangua = 'en_us';
const {
  language: languageConfig,
} = process.env.APP_CONFIG;

export function getLocale() {
  let language = navigator.language;
  if (language.indexOf('-') !== -1) {
    language = language.split('-');
    if (language[1]) {
      language[1] = language[1].toUpperCase();
    }
    language = language.join('_');
  }

  let filterRes = languageConfig.filter(lang => {
    return lang.toLowerCase() === language.toLowerCase();
  })[0];

  if (filterRes) {
    return language;
  }
    language = languageConfig[0].split('_');
    if (language[1]) {
      language[1] = language[1].toUpperCase();
    }
    return language.join('_');


}

export function getLanguage() {
  return getLocale().split('_')[0];
}

```

## 4.创建 LocaleProvider 国际化上下文组件，使用<IntlProvider/>
> 为了能够使用 react-intl 进行国际化，跟 redux 这些框架一样，我们需要一个 Provider Component，用它来提供国际化的上下文

```
import { IntlProvider, addLocaleData } from 'react-intl';
import { getLocale, getLanguage } from 'systemCore/jssdk/LanguageManager';
import messages from './locales';

const en = getLanguage();
const locale = getLocale().replace('_', '-');

addLocaleData(require(`react-intl/locale-data/${en}`));
...
class RootElement extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <IntlProvider locale={locale} messages={messages}>
            <Router history={history}>
              <Route render={
                () => (
                  <Switch>
                    <Route path="/" render={props => <App {...props} />} />
                  </Switch>
                )
              }
              />
            </Router>
          </IntlProvider>
        </Provider>
      </Fragment>
    );
  }
}
```

在定义好 IntlProvider 之后，我们就可以在页面使用它提供的 api 或者组件来进行国际化了

## 5. 使用 react-intl's components,使用<FormattedMessage />

在添加了<IntlProvoder />之后，我们就可以在其包裹的<App />及<App />包含的所有组件中获取到配置文件的信息，传入<FormattedMessage />组件的id参数也能其在配置文件中对应的字符串了。

```
const { formatMessage } = this.props.intl;
...
{formatMessage({ id: 'network.main.title' })}
...
```

至此，项目就可以使用 react-intl 来满足国际化多语言的业务需求了;

## 参考资料：
- [雅虎react-intl](https://github.com/yahoo/react-intl)
