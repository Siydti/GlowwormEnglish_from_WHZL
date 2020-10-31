Component({

    methods: {
        active(e) {

            if( e.target.dataset.index == 0 ) {
                wx.redirectTo({
                    url: '/pages/index/index'
                  })
            }else if( e.target.dataset.index == 1 ) {
                wx.redirectTo({
                    url: '/pages/like/like'
                  })
            }else if( e.target.dataset.index == 2 ) {
                wx.redirectTo({
                    url: '/pages/storeroom/storeroom'
                  })
            }else if( e.target.dataset.index == 3 ) {
                wx.redirectTo({
                    url: '/pages/my/my'
                  })
            }
        }
    },

    /* 
        可传递数据
    */
    properties: {
        // tabbarList: {
        //     type: Array,
        //     value: [ '首页' , '关注' , '电影库' , '我的' ]
        // },
        commentCount: {
            type: Number
        }
    },


    /* 
        私有数据
    */
   data: {
        tabbarList: [ '首页' , '关注' , '电影库' , '我的' ],
   },

}) 