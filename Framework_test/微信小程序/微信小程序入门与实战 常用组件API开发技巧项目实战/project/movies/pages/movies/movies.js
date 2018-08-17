var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchResult: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";
    
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");

  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        // console.log(res.data);
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = [];

    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }

      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        // stars: util.convertToStarsArray(subject.rating.stars),
        stars: util.convertToStarsArray(subject.rating.average),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }

    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  },

  onMoreTap: function(event) {
    var categoryTitle = event.currentTarget.dataset.categorytitle;
    wx.navigateTo({
      url: 'more-movie/more-movie?categoryTitle=' + categoryTitle,
    })
  },

  // 输入框聚焦时触发，调出搜索页面，隐藏原来的页面
  onBindFocus: function(event) {
    
    this.setData({
      searchPanelShow: true,
      containerShow: false
    })
  },
  // 确定搜索
  onBindConfirm: function(event) {

    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },
  // 取消搜索
  onCancelTap: function() {
    this.setData({
      searchPanelShow: false,
      containerShow: true,
      searchResult: {}
    })
  },
  
  // 跳转到电影详情页
  onMovieTap: function(event) {
    var movieId = event.currentTarget.dataset.movieid;
    console.log(movieId);
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieid=' + movieId,
    })
  }
})