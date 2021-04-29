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