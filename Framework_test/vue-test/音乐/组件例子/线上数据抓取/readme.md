例子文件结构


  + src
    - common
      + js
        - jsonp.js
    - api
      + config.js
      + recommend.js
    - comments
      + recommend
        - recommend.vue
        
        
 4个关键文件
 jsonp.js
 config.js
 recommend.js
 recommend.vue
 
 注意路径


## 数据获取
[QQ音乐](https://m.y.qq.com/)
Network => XHR => fcg_yqq...

## jsonp原理+Promise封装

[jsonp原理](https://github.com/webmodules/jsonp)

## 抓取线上数据
[QQ音乐线上jsonp](https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg)

首先安装jsonp
```
npm install jsonp --save
```

common/js/jsonp.js
```
import originJSONP from 'jsonp';

export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
    return new Promise((resolve, reject) => {
      originJSONP(url, option, (err, data) => {
          if (!err) {
              resolve(data);
          } else {
              reject(err);
          }
      });
    });
}

function param(data) {
    let url = '';
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : '';
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    return url ? url.substring(1) : '';
}
```

api/config.js
```
export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
};

export const options = {
  param: 'jsonpCallback'
};

export const ERR_OK = 0;
```
api/recommend.js
```
import jsonp from 'common/js/jsonp';
import {commonParams, options} from './config';

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    });
    return jsonp(url, data, options);
}
```

在recommend.vue中使用
```
<script type="text/ecmascript-6">
import {getRecommend} from 'api/recommend';
import {ERR_OK} from 'api/config';
export default {
  created() {
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data);
        }
      });
    }
  }
};
</script>
```



