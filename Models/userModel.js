const express = require('express');
const Sequelize = require('sequelize');
const configs = require("../Conf/MysqlConf");
const config = configs.Testing;
const Type = require("../Conf/TypeConf"); //数据格式

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

module.exports = {
    user: sequelize.define("user", {
        userID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "用户ID"
        },
        userTel: {
            type: Type.TYPE_VARCHAR,
            comment: "用户手机号",
            allowNull: false
        },
        userPassWord: {
            type: Type.TYPE_VARCHAR,
            comment: "用户密码",
            allowNull: false
        },
        userPayPass: {
            type: Type.TYPE_VARCHAR,
            comment: "用户支付密码",
            allowNull: false
        },
        userSecret: {
            type: Type.TYPE_INT,
            comment: "用户是否进行隐私显示,0:否，1:是",
            allowNull: false,
            defaultValue: 0
        }
    }, {
        comment: "用户表"
    }),
    userExtend: sequelize.define("userExtend", {
        userExtendID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "拓展ID"
        },
        userID: {
            type: Type.TYPE_INT,
            comment: "对应的用户ID",
            allowNull: false
        },
        userOpenID: {
            type: Type.TYPE_VARCHAR,
            comment: "用户微信OpenID"
        },
        userTencentQQ: {
            type: Type.TYPE_VARCHAR,
            comment: "用户QQ号"
        },
        userWeChatNumber: {
            type: Type.TYPE_VARCHAR,
            comment: "用户微信号"
        },
        userToken: {
            type: Type.TYPE_VARCHAR,
            comment: "用户推送接受ID"
        },
        userChatID: {
            type: Type.TYPE_VARCHAR,
            comment: "用户聊天接受ID"
        },
        userSex: {
            type: Type.TYPE_VARCHAR,
            comment: "用户性别"
        },
        userJob: {
            type: Type.TYPE_VARCHAR,
            comment: "用户工作"
        },
        userBirth: {
            type: Type.TYPE_VARCHAR,
            comment: "用户生日"
        },
        userHeight: {
            type: Type.TYPE_VARCHAR,
            comment: "用户身高"
        },
        userWeight: {
            type: Type.TYPE_VARCHAR,
            comment: "用户体重"
        },
        userCity: {
            type: Type.TYPE_VARCHAR,
            comment: "用户居住地"
        },
        userRecord: {
            type: Type.TYPE_VARCHAR,
            comment: "用户学历"
        }
    }, {
        comment: "用户拓展表"
    }),
    userChild: sequelize.define("userChildren", {
        userChildID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "子账号ID"
        },
        userID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "用户ID"
        },
        userOnlyID: {
            type: Type.TYPE_VARCHAR,
            comment: "用户幂缘号",
            unique: true,
            allowNull: false
        },
        userChildName: {
            type: Type.TYPE_VARCHAR,
            comment: "用户子账号名称",
            allowNull: false
        },
        userChildHeadImage: {
            type: Type.TYPE_VARCHAR,
            comment: "用户头像",
            // allowNull:false
        }
    }, {
        comment: "用户子账号表"
    }),
    userCheck: sequelize.define("userCheck", {
        userCheckID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "签到ID"
        },
        userID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "对应的用户ID"
        },
        userChildID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "用户在签到时的子账户ID"
        },
        userCheckDate: {
            type: Type.TYPE_DATE,
            allowNull: false,
            comment: "用户签到日期"
        }
    }, {
        comment: "用户签到表"
    }),
    userGift: sequelize.define("userGift", {
        userGiftID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "拥有礼物ID"
        },
        userID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "用户ID"
        },
        giftID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "礼物ID"
        },
        userGiftCount: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "礼物数量"
        }
    }, {
        comment: "用户礼物对应表"
    }),
    userLevel: sequelize.define("userLevel", {
        userLevelID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "对应的等级ID"
        },
        userID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "用户ID"
        },
        levelID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "等级ID"
        },
        userLevelGrade: {
            type: Type.TYPE_INT,
            allowNull: false,
            defaultValue: 0,
            comment: "获取的分数"
        }
    }, {
        comment: "用户等级表"
    }),
    userWallet: sequelize.define("userWallet", {
        userWalletID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "对应的钱包ID"
        },
        userID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "用户ID"
        },
        userMY: {
            type: Type.TYPE_DECIMAL,
            allowNull: false,
            defaultValue: 0.00,
            comment: "用户幂元"
        },
        userMD: {
            type: Type.TYPE_DECIMAL,
            allowNull: false,
            defaultValue: 0.00,
            comment: "用户幂豆"
        },
        userQM: {
            type: Type.TYPE_DECIMAL,
            allowNull: false,
            defaultValue: 0.00,
            comment: "用户巧米"
        }
    }, {
        comment: "用户钱包"
    }),
    userLikeMessage: sequelize.define("userLikeMessage", {
        userLikeMessageID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "用户点赞消息ID"
        },
        userID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "用户ID"
        },
        likeFromUserID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "发送礼物的用户ID"
        },
        likeMessageID: {
            type: Type.TYPE_INT,
            allowNull: false,
            defaultValue: -1,
            comment: "点赞消息ID，若为-1，则只点赞了这个人"
        },
        readState: {
            type: Type.TYPE_INT,
            allowNull: false,
            defaultValue: 0,
            comment: "消息状态，0：未读，1：已读"
        }
    }, {
        comment: "用户点赞列表"
    }),
    userDiscussMessage: sequelize.define("userDiscussMessage", {
        userDiscussMessageID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },
        userID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "用户ID"
        },
        discussFromUserID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "评论者ID"
        },
        discussMessageID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "评论信息ID"
        },
        readState: {
            type: Type.TYPE_INT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        comment: "用户评论列表"
    }),
    userGiftMessage: sequelize.define("userGiftMessage", {
        userGiftMessageID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },
        userID: {
            type: Type.TYPE_INT,
            comment: "用户ID"
        },
        giftFromUserID: {
            type: Type.TYPE_INT,
            comment: "送礼物人ID"
        },
        giftListID: {
            type: Type.TYPE_INT,
            comment: "礼物发放记录ID"
        },
        readState: {
            type: Type.TYPE_INT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        comment: "用户礼物收发信息列表"
    }),
    userChargeMessage: sequelize.define("userChargeMessage", {
        userChargeMessageID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },
        userID: {
            type: Type.TYPE_INT,
            comment: "用户ID"
        },
        chargeID: {
            type: Type.TYPE_INT,
            comment: "交易记录ID",
        },
        readState: {
            type: Type.TYPE_INT,
            allowNull: false,
            defaultValue: 0,
            comment: "0:未读,1:已读"
        }
    }, {
        comment: "用户交易信息列表"
    }),
    userSystemMessage: sequelize.define("userSystemMessage", {
        userSystemMessageID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },
        userID: {
            type: Type.TYPE_INT,
            allowNull: false
        },
        readState: {
            type: Type.TYPE_INT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        comment: "用户系统消息表"
    }),
    userOrder: sequelize.define("userOrder", {
        userOrderID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },
        userID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "用户ID"
        },
        productID: {
            type: Type.TYPE_INT,
            allowNull: false
        },
        productName: {
            type: Type.TYPE_VARCHAR,
            allowNull: false,
            comment: "商品名称"
        },
        productPrice: {
            type: Type.TYPE_VARCHAR,
            allowNull: false,
            comment: "商品价格"
        },
        productDesc: {
            type: Type.TYPE_VARCHAR,
            allowNull: true,
            comment: "商品描述"
        },
        assState: {
            type: Type.TYPE_INT,
            allowNull: false,
            defaultValue: 0,
            comment: "0:未评价,1:已评价"
        },
        assStar: {
            type: Type.TYPE_INT,
            allowNull: false,
            defaultValue: 0,
            comment: "星级"
        },
        assComment: {
            type: Type.TYPE_VARCHAR,
            allowNull: true,
            comment: "评价内容"
        }
    }, {
        comment: "用户订单表"
    }),
    userPublish: sequelize.define("userPublish", {
        userPublishID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true
        }
    }),
    hostList: sequelize.define("hostList", {
        hostOrderID: {
            type: Type.TYPE_INT,
            primaryKey: true,
            autoIncrement: true,
            comment: "主键ID"
        },
        hostID: {
            type: Type.TYPE_INT,
            allowNull: false,
            comment: "用户ID"
        },
        hostListID: {
            type: Type.TYPE_INT,
            allowNull: false
        },
        hostListName: {
            type: Type.TYPE_VARCHAR,
            allowNull: false,
            comment: "商品名称"
        },
        hostListPrice: {
            type: Type.TYPE_VARCHAR,
            allowNull: false,
            comment: "商品价格"
        },
        hostListDesc: {
            type: Type.TYPE_VARCHAR,
            allowNull: true,
            comment: "商品描述"
        },
        hostListImg: {
            type: Type.TYPE_VARCHAR,
            allowNull: true,
            comment: "商品图片"
        },
        hostListState: {
            type: Type.TYPE_INT,
            allowNull: false,
            defaultValue: 0,
            comment: "0:未评价,1:已评价"
        },
        hostListStar: {
            type: Type.TYPE_INT,
            allowNull: false,
            defaultValue: 0,
            comment: "星级"
        },
        hostListComment: {
            type: Type.TYPE_VARCHAR,
            allowNull: true,
            comment: "评价内容"
        }
    }, {
        commit: '热门列表'
    })
};