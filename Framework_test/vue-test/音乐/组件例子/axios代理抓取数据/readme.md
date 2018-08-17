### 歌单数据接口分析

[QQ音乐分类歌单](https://y.qq.com/portal/playlist.html)

[分类歌单JSON数据](https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg)

此时在浏览器无法预览歌单数据，且JSONP也无法读取URL，

报错误码500-内部服务器错误

前端无法绕过Headers中的host、referer
```
access-control-allow-origin:http://y.qq.com
referer:https://y.qq.com/portal/playlist.html
```

### axios 介绍和后端接口代理

[axios](https://github.com/mzabriskie/axios)

安装axios
```
npm install axios --save
```

dev-server.js新增
```
var axios = require('axios')

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)
```
recommend.js
```
export function getDiscList() {
  const url = '/api/getDiscList';

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
```
recommend.vue
```
<script type="text/ecmascript-6">
import {getRecommend, getDiscList} from 'api/recommend';
import {ERR_OK} from 'api/config';
export default {
  data() {
      return {
          recommends: []
      };
  },
  created() {
    this._getDiscList();
  },
  methods: {
    _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
             console.log(res.data);
          }
        });
      }
  }
};
</script>
```

浏览器可访问抓取的[getDiscList](http://localhost:8080/api/getDiscList?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.732565425766549)



