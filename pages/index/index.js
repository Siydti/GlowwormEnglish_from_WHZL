import { get, http, msg } from '../../utils/request.js'

//index.js
//获取应用实例

Page({
  data: {
    nowPage: 0,//当前页面
    commentIsShow: false,//评论弹框显示
    shareIsShow: false,//分享弹框显示
    unlockIsShow: false,//录音弹框显示
    hintBoxIsShow: true,//提示弹框显示
    speedShow: false,//倍速显示
    nowvideo: {},
    videoIdArray: [],
    video: [],
    nowIndex: 0,
    isUp:false,
    scrollaTopVal: 0,
  },

  /* 获取视频 */
  getindex(id_array) {
    let _this = this

    get('index', { id_array, openid: wx.getStorageSync('userOpenid') }, res => {
      // console.log(res)
      res.data.video.video = http + res.data.video.video
      _this.data.video.push(res.data.video)
      _this.data.videoIdArray.push(res.data.video.id)
      console.log(_this.data.videoIdArray)

      _this.setData({
        video: _this.data.video,
        nowvideo: _this.data.video[_this.data.nowIndex],
        videoIdArray: _this.data.videoIdArray
      })

      console.log(_this.data.video)
      console.log(_this.data.nowvideo)
    }, res => {
      msg('系统错误，请稍后再试~')
    })
  },

  onLoad: function () {
    this.videoContext = wx.createVideoContext('myvideo')

    if (wx.getStorageSync('isFirst')) {
      this.setData({
        hintBoxIsShow: false
      })
      wx.setStorageSync('isFirst', true)
    }

    this.getindex(this.data.videoIdArray)
  },

  onShow() {
    if (!wx.getStorageSync('isFirst')) {
      this.setData({
        hintBoxIsShow: true
      })
      wx.setStorageSync('isFirst', true)
    }
  },


  go_login() {
    wx.navigateTo({
      url: "/pages/login/login"
    })
  },

  commentShowTrue() {
    console.log('展示评论')
    this.setData({
      commentIsShow: true,
    })
  },

  commentShowFalse() {
    console.log('隐藏评论')
    this.setData({
      commentIsShow: false
    })
  },

  shareShowTrue() {
    console.log('展示分享')
    this.setData({
      shareIsShow: true,
    })
  },

  shareShowFalse() {
    console.log('隐藏分享')
    this.setData({
      shareIsShow: false
    })
  },

  unlockShowTrue() {
    console.log('展示分享')
    this.setData({
      unlockIsShow: true,
    })
  },

  unlockShowFalse() {
    console.log('隐藏分享')
    this.setData({
      unlockIsShow: false
    })
  },

  hintBoxShowFlase() {
    console.log('隐藏提示')
    this.setData({
      hintBoxIsShow: false
    })
  },

  next() {
    let _this = this
    console.log( _this.data.videoIdAeeay )
    console.log('下拉')
    this.setData({
      nowIndex: this.data.nowIndex++,
      scrollaTopVal: 2,
    })

    this.getindex(_this.data.videoIdArray)
  },

  back() {
    let _this = this
    console.log('上拉')
    console.log( _this.data.videoIdArray )

    if (this.data.nowIndex > 0) {
      this.setData({
        nowIndex: this.data.nowIndex--,
        nowvideo: this.data.video[this.data.nowIndex],
        scrollaTopVal: 2,
      })
    } else {
      this.setData({
        videoIdArray: [],
        video: [],
        scrollaTopVal: 2,
      })
      this.getindex(_this.data.videoIdArray)
    }

    
  },

  screenchange(e) {
    console.log(123)
    var isFull = e.detail.fullScreen;
    console.log(isFull)
  },

  speedChange(e) {
    let _this = this;
    this.setData({
      direction: e.detail.direction
    })
  },

  setSpeed: function (e) {
    let query = e.currentTarget.dataset['index'];
    console.log(query)

    this.data.currentSpeed = {
      title: query + 'x',
      value: query
    }
    this.setData({
      currentSpeed: this.data.currentSpeed
    })

    this.videoContext.playbackRate(Number(query))
    // console.log( VideoContext.playbackRate )
  },

  speedIsShow() {
    //console.log( this )
    this.setData({
      speedShow: !this.data.speedShow
    })
  }
})
