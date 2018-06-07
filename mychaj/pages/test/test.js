var app = getApp();

Page({
	data:{
		name:"",
		time:'',
		nickname:'',
		thumb:'',
		condition:100,
		list:[
			{name:'tc01',address:'北京西十三期物美是超市'},
			{name:'tc02',address:'济南大润发'},
			{name:'tc03',address:'西安东三期物美是超市'},
			{name:'tc04',address:'天津三期物美是超市'},
		]
		,
		arrAy :[1,2,3,4,5,6,7,8,9],
		flag:true,
		item:{
			name:'123',
			address:'binzhou'
		},
    btnCode: '获取验证码'
	},

	onLoad:function(options){
		var self = this;
		// console.log('当页面加载完成之后执行的');
		// this.setData({
		// 	time:app.globalData.time
		// })
		// this.setData({
		// 	userName:app.getUserName()
		// })
		// console.log(app.globalData.time);
	    /**
	     * 获取用户信息
	     */
	    wx.getUserInfo({
	      success: function(res){
	        self.setData({
	          thumb: res.userInfo.avatarUrl,
	          nickname: res.userInfo.nickName
	        })
	      }
	    })
	},
	onReady:function(){
		console.log("onReady 页面加载成功")
	},
	onShow:function(){
	
	},
	onHide:function(){
		
	},
	onUnload:function(){
		
	},
	onPullDownRefresh:function(){
		
	},
	onReachBottom:function(){
		
	}
})		