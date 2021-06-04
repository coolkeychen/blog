<!--
 * @Description: 浏览器 visibilitychange 事件
 * @Author: 陈春凯
 * @Date: 2021-06-04 17:16:35
 * @LastEditTime: 2021-06-04 18:06:50
 * @LastEditor: 陈春凯
-->

## 浏览器visibilitychange默认行为

> 最近项目上线一个考试倒计时功能，考生在最后几秒提交试卷，前端却提示考试已结束，提示文案是来至后端返回的结果，剩余时间缀是后台接口提供，正常情况下，是不会出现以上的问题，通过不断重复测试，才让这个场景重现；原来考生在答题的时间有切换过浏览器标签页，然后又回到考试答题页面。竟然场景能重复，就提供解决问题的方法。还是同样的谷歌，百度，发现浏览器为了更强更快的性能，在切换标签页，计数器会被暂时停止

#### 1. 解题思路

  浏览器提供 visibilitychange 事件，当其选项卡的内容变得可见或被隐藏时，会在文档上触发 visibilitychange (能见度更改)事件。该事件提供两个属性 visible，hidden；hidden 事件对此次问题有用，当用户切换到其它标签页，倒计时功能照常运行

#### 2. 倒计时功能
 remainingTime 这个属性用来记录当前切换到其他标签页时所剩下的时间缀
```
// 倒计时
countCourse(countdown) {
  let time = parseInt(countdown);
  if(this.interval) clearInterval(this.interval)
  this.interval = setInterval(() => {
      if (time > 0) {
          // 获取天、时、分、秒
          let dates = parseInt(time / (60 * 60 * 24));
          let hour = parseInt(time % (60 * 60 * 24) / 3600);
          let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
          let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
          this.matchTime = {
              hour:this.timeFormat(hour+dates*24),
              min: this.timeFormat(min),
              sec: this.timeFormat(sec),
          };
      } else { // 活动已结束，全部设置为'00'
          this.matchTime = {
              hour: '00',
              min: '00',
              sec: '00',
          };
          clearInterval(this.interval);
      }
      time -= 1;
      this.remainingTime = time
  },1000)
},
```

#### 3. 注册事件及回调
 现在开发环境使用的是vue , 所以在 mounted 注册事件
```
  mounted() {
    const that = this;
    this.$nextTick(()=> {
      document.addEventListener('visibilitychange',that.countDownCallback(document.visibilityState))
    })
  },
  methods: {
    // 回调函数，切换到其他页面继续倒计时
    countDownCallback(visibilityState) {
      if (visibilityState === 'hidden') {
        if (this.interval)  clearInterval(this.interval)
        this.countCourse(this.remainingTime)
      }
    }
  }
```

#### 4. 移除销毁已注册事件
```
  beforeDestroy() {
    document.removeEventListener('visibilitychange',this.countDownCallback)
  }
```

#### 5. 举一反三
倒计时问题解决了，网页版音乐播放页同样也适用 visibilitychange 这个事件，当tab 切换标签页，音乐停止，回到播放页面继续播放
```
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible') {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
});
```

