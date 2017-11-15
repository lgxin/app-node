let moment = require("moment");
let Models = require("../Models/userModel");
let co = require('co');

//JSON格式返回
let jsonWrite = (res, ret) => {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
//生成随机len位字符串
let getRandomString = (len) => {
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};
//生成size位随机数
let getRandomNum = (size) => {
    let str = '';
    for (let i = 0; i < size; i++) {
        str += Math.floor(Math.random() * 10);
        //Math.random() * 10-------0-10随机数包括浮点数
        // Math.floor再取整--返回小于或等于指定小数的最大整数。
    }
    return str;
};
//分页
let pagination = (pageNo, pageSize, array) => {
    let offset = (pageNo - 1) * pageSize;
    // pageNo页数 pageSize每页的数量
    // offset开始值
    return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
};

//用户拥有一个钱包(1对1 的关联)
Models.user.hasOne(Models.userWallet, {
    foreignKey: "userID"
});
//钱包属于某个用户(1对1 的关联)
Models.userWallet.belongsTo(Models.user, {
    foreignKey: "userID"
});
//用户拥有一个拓展
Models.user.hasOne(Models.userExtend, {
    foreignKey: "userID"
});
//用户拥有多个子账号 (1对多的关联)
Models.user.hasMany(Models.userChild, {
    foreignKey: "userID"
});
//子账号属于某个用户(1对1的关联)
Models.userChild.belongsTo(Models.user, {
    foreignKey: "userID"
});
//用户拥有一个等级
Models.user.hasOne(Models.userLevel, {
    foreignKey: "userID"
});

module.exports = {
    SetMySQL: (req, res, next) => {
        co(function* () {
            // code here
            yield Models.user.sync({force: true});
            yield Models.userExtend.sync({force: true});
            yield Models.userChild.sync({force: true});
            yield Models.userCheck.sync({force: true});
            yield Models.userGift.sync({force: true});
            yield Models.userLevel.sync({force: true});
            yield Models.userWallet.sync({force: true});
            yield Models.userLikeMessage.sync({force: true});
            yield Models.userDiscussMessage.sync({force: true});
            yield Models.userGiftMessage.sync({force: true});
            yield Models.userChargeMessage.sync({force: true});
            yield Models.userSystemMessage.sync({force: true});
            yield Models.userOrder.sync({force: true});
            yield Models.hostList.sync({force: true});
            jsonWrite(res, {
                CheckStatus: 1,
                CheckDetail: "建库成功"
            });
        }).catch(function (err) {
            console.error(
                "捕捉到异常 --> \n" +
                "错误名称:" + err.name + " ---> \n" +
                "错误信息: " + err.message
            );
            jsonWrite(res, {
                CheckStatus: -1,
                ErrName: err.name,
                ErrMessage: err.message
            })
        });
    },
    userRegister: (req, res, next) => {
        co(function* () {
            // code here
            let param = req.body;// 获取get传过了的数据
            // let param = req.query || req.params;
            let userTel = param.userTel,
                userName = param.userName,
                userPassWord = param.userPassWord,
                userPayPass = param.userPayPass;
            console.log(userTel, userPassWord);
            //判断数据库中是否存在  0为查询到
            let userCount =
                yield Models.user.count({
                    where: {
                        userTel: userTel
                    }
                });
            console.log(userCount, '123')

            if (userCount > 0) {
                jsonWrite(res, {
                    CheckStatus: 1000,
                    CheckDetail: "该手机号已注册,请使用其他手机号码"
                })
            } else {
                //用户信息
                let userInfo =
                    yield Models.user.create({
                        userTel: userTel,
                        userPassWord: userPassWord,
                        userPayPass: userPayPass,
                        userSecret: 0
                    });
                jsonWrite(res, {
                    CheckStatus: 1000,
                    CheckDetail: "注册成功",
                    Verification: getRandomNum(5)
                })
            }
        }).catch(function (err) {
            console.error(
                "捕捉到异常 --> \n" +
                "错误名称:" + err.name + " ---> \n" +
                "错误信息: " + err.message
            );
            jsonWrite(res, {
                CheckStatus: -1,
                ErrName: err.name,
                ErrMessage: err.message
            })
        });
    },
    userSignin: (req, res, next) => {
        co(function* () {
            let param = req.body;// 获取get传过了的数据
            let userTel = param.userTel,
                userPassWord = param.userPassWord
            let userCount =
                yield Models.user.count({
                    where: {
                        userTel: userTel,
                        userPassWord: userPassWord
                    }
                });
            if (userCount > 0) {
                jsonWrite(res, {
                    CheckStatus: 1000,
                    CheckDetail: "登录成功",
                    CheckState: 0
                })
            } else {
                jsonWrite(res, {
                    CheckStatus: 1001,
                    CheckDetail: "用户名或密码错误",
                    CheckState: 1
                })
            }
            //判断数据库中是否存在
        }).catch(function (err) {
            console.error(
                "捕捉到异常 --> \n" +
                "错误名称:" + err.name + " ---> \n" +
                "错误信息: " + err.message
            );
            jsonWrite(res, {
                CheckStatus: -1,
                ErrName: err.name,
                ErrMessage: err.message
            })
        });
    },
    hostList: (req, res, next) => {
        co(function* () {
            //   let userInfo =
            //     yield Models.user.create({
            //         // hostOrderID:1, //主键id
            //         // hostID:1,//用户id
            //         // hostListID:1, //
            //         hostListName:'商品名称', //商品名称
            //         hostListPrice:'23.0',//商品价格
            //         hostListDesc:'这个是一个好的商品'//商品描述
            //         // hostListImg:'null',// 商品img
            //         // hostListState:null,//商品评价
            //         // hostListStar:null,// 星级
            //         // hostListComment:null,//评价内容
            //         // userSecret:0
            //     });
            // let users =
            //      //     yield Models.hostList.findAll();
            // let users =
            //      yield Models.hostList.create({
            //          hostID:1,
            //          hostListID:1,
            //          hostListName:'商品名称', //商品名称
            //          hostListPrice:'23.0',//商品价格
            //          hostListImg:'http://www.quanjing.com/image/2017index/lx4.png',
            //          hostListDesc:'这个是一个好的商品'//商品描述
            //      });
            //      console.log(users.get({'plain': true}));
            let params = req.query,
                hostListpageing = params.hostListpageing,
                hostListpageSize = params.hostListpageSize;
            console.log(params);
            console.log(params.hostListpageing);
            console.log(params.hostListpageSize);
            let hostlist = yield Models.hostList.findAll();// 获取一个表的所有的数据
            jsonWrite(res, {
                CheckStatus: 1000,
                CheckDetail: "获取列表成功",
                hostList: pagination(parseInt(hostListpageing), parseInt(hostListpageSize), hostlist)
            })
            //判断数据库中是否存在
        }).catch(function (err) {
            console.error(
                "捕捉到异常 --> \n" +
                "错误名称:" + err.name + " ---> \n" +
                "错误信息: " + err.message
            );
            jsonWrite(res, {
                CheckStatus: -1,
                ErrName: err.name,
                ErrMessage: err.message
            })
        });
    },
    removeList: (req, res, next) => {
        co(function* () {
            let param = req.body;// 获取post传过了的数据
            // let param = req.query || req.params;
            let hostOrderID = param.hostOrderID;
            console.log(hostOrderID);
            let removeID =
                yield Models.hostList.destroy({
                    where: {
                        hostOrderID: hostOrderID,
                    }
                });
            console.log(removeID, 1231231)
            if (removeID > 0) {
                jsonWrite(res, {
                    CheckStatus: 1000,
                    CheckDetail: "删除成功",
                    CheckState: 0
                })
            } else {
                jsonWrite(res, {
                    CheckStatus: 1001,
                    CheckDetail: "删除失败",
                    CheckState: 1
                })
            }

            // let removeID=
            //     yield Models.hostList.destroy({
            //         where: {
            //             hostOrderID: hostOrderID,
            //         }
            //         });
            // console.log(removeID)

        }).catch(function (err) {
            console.error(
                "捕捉到异常 --> \n" +
                "错误名称:" + err.name + " ---> \n" +
                "错误信息: " + err.message
            );
            jsonWrite(res, {
                CheckStatus: -1,
                ErrName: err.name,
                ErrMessage: err.message
            })
        });
    },
    forgetpassword: (req, res, next) => {
        console.log(req.body, '---+++')
        co(function* () {
            let param = req.body;// 获取post传过了的数据
            // let param = req.query || req.params;
            let password = param.password,
                username = param.username;
            console.log(password, username)
            let userCount =
                yield Models.user.count({
                    where: {
                        userTel: username
                    }
                });
            // 方法2：直接update操作db // 修改指定的值
            var pram={userPassWord:password};
            let user =
                yield Models.user.update(pram,{
                    where: {
                        userTel: username
                    }
                });
            console.log(user[0],909090)
            if (user[0] > 0) {
                jsonWrite(res, {
                    CheckStatus: 1000,
                    CheckDetail: "修改成功",
                    CheckState: 0
                })
            } else {
                jsonWrite(res, {
                    CheckStatus: 1001,
                    CheckDetail: "该账户不存在",
                    CheckState: 1
                })
            }

        }).catch(function (err) {
            console.error(
                "捕捉到异常 --> \n" +
                "错误名称:" + err.name + " ---> \n" +
                "错误信息: " + err.message
            );
            jsonWrite(res, {
                CheckStatus: -1,
                ErrName: err.name,
                ErrMessage: err.message
            })
        });
    }
};