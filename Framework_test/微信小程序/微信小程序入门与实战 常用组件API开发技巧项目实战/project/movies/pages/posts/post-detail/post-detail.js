var postsData = require('../../../data/posts-data.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {

    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });
    // 获取所有缓存的收藏列表
    var postsCollected = wx.getStorageSync("posts_collected");

    if (postsCollected) {
      // 获取当前文章是否被缓存
      var postCollected = postsCollected[postId];
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else {
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === this.data.currentPostId) {
      this.setData({ isPlayingMusic: true });
    }
    
    this.setMusicMonitor();
  },

  /**
   * 是否收藏页面的事件
   */
  onCollectionTap: function(event) {
    this.getPostsCollectedSyc(); // 推荐同步
    // this.getPostsCollectedAsy(); // 异步方法
    
  },
  // 异步获取收藏方法
  getPostsCollectedAsy: function() {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        // 收藏变未收藏，未收藏变收藏
        postCollected = !postCollected;
        // 
        postsCollected[that.data.currentPostId] = postCollected;

        that.showToast(postsCollected, postCollected);
      },
    })
  },


  // 从本地缓存中同步获取方法
  getPostsCollectedSyc: function() {

    var postsCollected = wx.getStorageSync("posts_collected");

    var postCollected = postsCollected[this.data.currentPostId];
    // 收藏变未收藏，未收藏变收藏
    postCollected = !postCollected;
    // 
    postsCollected[this.data.currentPostId] = postCollected;

    this.showToast(postsCollected, postCollected);

  },

  // 播放音乐事件
  onMusicTap: function(event) {

    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;

    if (isPlayingMusic) {

      wx.pauseBackgroundAudio();
      this.setData({ isPlayingMusic: false});
      app.globalData.g_currentMusicPostId = null;

    } else {

      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImg: postData.music.coverImg,
      });
      this.setData({ isPlayingMusic: true });
      app.globalData.g_currentMusicPostId = currentPostId;
    }

  },
  /**
   * 分享页面事件
   */
  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    // 显示操作菜单
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢",
        })
      }
    })
  },
  // 显示模态弹窗
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: "收藏",
      content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },
  // 显示消息提示框
  showToast: function (postsCollected, postCollected) {
    // 更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },

  
  // 页面初始化的时候，监听音乐播放状态
  setMusicMonitor: function() {
    
    var that = this;
    // 监听音乐播放。
    wx.onBackgroundAudioPlay(function () {
      
      app.globalData.g_isPlayingMusic = true;

      that.setData({ isPlayingMusic: true });
      console.log('g_index', app.globalData.g_currentMusicPostId);
      console.log('cur', that.data.currentPostId);
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    // 监听音乐暂停。
    wx.onBackgroundAudioPause(function () {
      that.setData({ isPlayingMusic: false });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    // 监听音乐播放完了，按钮恢复成未播放状态
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      // app.globalData.g_currentMusicPostId = null;
    });
  }
})