/**
 * Created by tom on 2017/6/8.
 */
const Sequelize = require('sequelize');

const Type = {
    TYPE_INT: Sequelize.INTEGER, // 允许介于 -32,768 到 32,767 之间的数字。
    TYPE_VARCHAR: Sequelize.STRING, // 字符串
    TYPE_TEXT: Sequelize.TEXT, // 存放最大长度为 65,535 个字符的字符串。
    TYPE_DOUBLE: Sequelize.DOUBLE, // 双精度浮点
    TYPE_DECIMAL: Sequelize.DECIMAL(10, 2), // 作为字符串存储的 DOUBLE 类型，允许固定的小数点。
    TYPE_DATE: Sequelize.DATE // 用于日期和时间
};
module.exports = Type;