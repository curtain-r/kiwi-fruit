/**
 * Promise 版本 wx.showToast
 * @param {params} params 
 * @returns 
 */
export const showToast= function(params) {
    return new Promise((resolve, reject) => {
        wx.showToast({
            ...params,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{reject(err)},
        });
    })
}

/**
 * Promise 版本 wx.cloud.callfunction
 * @param {name}
 * @returns 
 */
export const callFunction = function (name) {
    return new Promise ((resolve, reject) => {
        wx.cloud.callFunction({
            name,
            success: (res) => {
                resolve(res)
            },
            fail(err) {
                reject(err);
            }
        })
    })
}

/**
 * 生成随机数
 */
export const randNum =  function(){
    return Math.random().toString(32).substr(2, 15);
}

/**
 * 
 * @returns 时间戳
 */
export const CurrentTime = function() {
    var now = new Date();
    var year = now.getFullYear();       
    var month = now.getMonth() + 1;     
    var day = now.getDate();            
    var hh = now.getHours();            
    var mm = now.getMinutes();          
    var ss = now.getSeconds();           

    var clock = year.toString();
    if (month < 10) clock += "0";
    clock += month;
    if (day < 10) clock += "0";
    clock += day;
    if (hh < 10) clock += "0";
    clock += hh;
    if (mm < 10) clock += '0';
    clock += mm;
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
  }
export const CurrentTime_show = function () {
    var now = new Date();
    var year = now.getFullYear();       
    var month = now.getMonth() + 1;    
    var day = now.getDate();           
    var hh = now.getHours();            
    var mm = now.getMinutes();          
    var ss = now.getSeconds();           

    var clock = year.toString()+"-";
    if (month < 10) clock += "0";
    clock += month+"-";
    if (day < 10) clock += "0";
    clock += day+" ";
    if (hh < 10) clock += "0";
    clock += hh+":";
    if (mm < 10) clock += '0';
    clock += mm+":";
    if (ss < 10) clock += '0';
    clock += ss;

    return (clock);
  }

/**
 * 
 * @param {number} beforetime beforetime到现在的事件戳
 * @returns beforetime到现在的事件戳
 */
export const beforeNowtimeByMin = function(beforetime) {
    var setFormat = function (x) {
      if (x < 10) x = "0" + x;
      return x;
    }
    var date = new Date();
    date.setMinutes(date.getMinutes() - beforetime);
    var now = "";
    now = date.getFullYear().toString();
    now = now + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    now = now + setFormat(date.getDate());
    now = now + setFormat(date.getHours());
    now = now + setFormat(date.getMinutes());
    now = now + setFormat(date.getSeconds());
    return now;
  }

// 数据库操作
/**
 * 根据筛选条件选取数据
 * @param {string} setName 数据库名称
 * @param {string} selectConditionSet  集合
 * @returns Promise
 */
 export const getInforWhere = function(setName, selectConditionSet) {
    return new Promise((resolve, reject) => {
        const db = wx.cloud.database();
        db.collection(setName).where(selectConditionSet).get({
            success: res => {
                resolve(res);
            },
            fail: err => {
                reject(err);
            }
        })
    })
}

/**
 * 排序后的数据  
 * @param {string} setName 数据库名称
 * @param {string} ruleItem 排序目标
 * @param {desc|} orderFunc 排序方法
 * @returns Promise
 */
export const getInfoByOrder = function(setName, ruleItem, orderFunc) {
    return new Promise((resolve, reject) => {
        const db = wx.cloud.database();
        db.collection(setName)
            .orderBy(ruleItem, orderFunc)
            .get({
                success: res => {
                    resolve(res);
                }
            })
    })
}

/**
 * 添加数据
 * @param {string} setName 集合名称
 * @param {object} infoObject 数据字段
 * @returns Promise 执行完添加操作
 */
export const addRowToset = function(setName, infoObject) {
    return new Promise((resolve, reject) => {
        const db = wx.cloud.database();
        db.collection(setName).add({
            data: infoObject,
            success: res => resolve(res),
            fail: err => reject(err)
        })
    })
}

/**
 * 筛选数据
 * @param {string} setName 集合名称
 * @param {string} selectConditionSet 筛选该字段
 * @returns Promise res or err
 */
export const getInfoFromSet = function(setName, selectConditionSet) {
    return new Promise((resolve, reject) => {
        const db = wx.cloud.database();
        db.collection(setName).where(selectConditionSet).get({
            success: res => resolve(res),
            fail: err => reject(err)
        })
    })
}

/**
 * 删除数据
 * @param {string} setName 集合名称
 * @param {string} Id 要删除的数据Id
 * @returns Promise res or err
 */
export const deleteInfoFromSet = function(setName, Id) {
    return new Promise((resolve, reject) => {
        const db = wx.cloud.database();
        db.collection(setName).doc(id).remove({
            success: res => resolve(res),
            fail: err => reject(err)
        })
    })
}

/**
 * 更新数据
 * @param {*} setName 
 * @param {*} _id 
 * @param {*} updateInfo 
 * @returns 
 */
export const updateInfo = function(setName, _id, updateInfo) {
    return new Promise((resolve, reject) => {
        const db = wx.cloud.database();
        db.collection(setName).doc(_id).update({
            data: updateInfo,
            success: res => resolve(res),
            fail: err => reject(err)
        })
    })
}