// loan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //内容信息
    abort_content : [
      {
        "content": "特房网隶属于杭州中房信息科技有限公司，是杭州权威的专业房产信息综合网站，内容包括房地产相关政策法规，全面、及时、准确的商品房买卖和二手房交易等实时信息，以及权威的房地产市场行情分析等，目前网站已覆盖杭州主城区和萧山、余杭等十区五县。",
      },
      {
        "content": "特房网自2004年成立以来，致力于打造杭州权威的专业房产信息综合网站。2011年，对接桐庐、萧山数据，开设透明售房网桐庐站与萧山站后，与余杭房产信息网成功实现对接。2012年，淳安、富阳等县市实现与透明售房网对接，透明售房网以“一主站、七分站”的模式，从杭州市区覆盖到大杭州范围。2013年，透明售房网台州站点上线，湖州站、嘉兴站也已在规划建设中。"
      },
      {
        "content": "目前，网站开设了商品房频道、二手房频道、资讯中心、地图看房等多块核心内容，其中，“一房一价”、“每日行情播报”、“看房报告”、“楼市一周”等多个精品栏目受到了购房者及业内的肯定。网站的智能手机客户端应用的开发，使用户在任何时候、任何地点都可通过手机轻松地了解楼市行情和动态等。"
      },
      {
        "content": "特房网将努力开拓，逐步打造成为浙江省乃至全国有影响力的房产信息专业服务品牌。"
      }
    ],
    //弹出框
    hidden: true,
    nocancel: false,
    //下拉选择
    selectPerson:true,
    firstPerson: '抵押贷款',
    selectArea: false,
   
      
  },
 
  application_loan : function(){
    this.setData({
      hidden: false,
    })
  },
  cancel :function (){
    this.setData({
      hidden: true,
    })
  },
  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },
  //点击切换
  mySelect: function (e) {
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,
    })
  },
  bindconfirm:function (e){
    var that = this;
    var tokend = wx.getStorageSync('tokend')
    var name2 = e.detail.value.name2;         //获取input初始值
    var ID_num2 = e.detail.value.ID_num2;    //获取input初始值
    var ID_num = that.data.ID_num ? that.data.ID_num : ID_num2
    wx.request({
      method: 'POST',
      url: app.data.domain + '/loan/add' + tokend, //接口地址
      data: {
        'name': name,
        'ID_num': ID_num
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        wx.showToast({
          title: '资料修改成功',
          image: '../Image/suess.png',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: app.data.domain + '/loan/add',
          })
        }, 2000)

      },
      fail: function (res) {
        console.log('cuowu' + ':' + res)
      }
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  demo: function (e) {

  console.log(1)


  }


})