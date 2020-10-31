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
   videoUrl: "https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/60_dd29d4c2071d30488fa37c134983b0a4.mp4",
  },

  onLoad: function () {
    this.videoContext = wx.createVideoContext('myvideo')
  },


  go_login() {
    wx.navigateTo({
      url: "/pages/login/login"
    })
  },

  commentShowTrue() {
    console.log('展示评论')
    this.setData({
      commentIsShow : true,
    })
  },

  commentShowFalse() {
    console.log('隐藏评论')
    this.setData({
      commentIsShow : false
    })
  },

  shareShowTrue() {
    console.log('展示分享')
    this.setData({
      shareIsShow : true,
    })
  },

  shareShowFalse() {
    console.log('隐藏分享')
    this.setData({
      shareIsShow : false
    })
  },

  unlockShowTrue() {
    console.log('展示分享')
    this.setData({
      unlockIsShow : true,
    })
  },

  unlockShowFalse() {
    console.log('隐藏分享')
    this.setData({
      unlockIsShow : false
    })
  },

  hintBoxShowFlase() {
    console.log('隐藏提示')
    this.setData({
      hintBoxIsShow : false
    })
  },

  next() {
    console.log( '下拉' )
    this.setData({
      videoUrl: 'https://vt1.doubanio.com/202010191800/d20451ae041ce3db5c58b443f228747c/view/movie/M/402670125.mp4',
    })
  },

  back() {
    console.log( '上拉' )
    this.setData({
      videoUrl: 'https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/60_0efc1cf6a43ed7c001f91add508eb9d0.mp4',
    })
  },

  screenchange(e) {
    console.log(123)
    var isFull = e.detail.fullScreen;
    console.log( isFull )
  },

  speedChange(e) {
    let _this = this;
    this.setData({
      direction:e.detail.direction
    })
  },

  setSpeed: function( e ) {
    let query = e.currentTarget.dataset['index'];
    console.log( query )

    this.data.currentSpeed = {
      title: query + 'x',
      value: query
    }
    this.setData({
      currentSpeed:this.data.currentSpeed
    })

    this.videoContext.playbackRate(Number(query))
    // console.log( VideoContext.playbackRate )
  },

  speedIsShow() {
    //console.log( this )
      this.setData({
        speedShow : !this.data.speedShow
      })
  }
})
