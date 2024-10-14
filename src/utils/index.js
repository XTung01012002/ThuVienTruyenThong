const _ = require('lodash')
const { Types } = require('mongoose')
const moment = require('moment')
const momentTZ = require('moment-timezone')
    const JWT = require('jsonwebtoken')
const fs = require('fs');
const { InternalServerError } = require('../responseHandle/error.response')

const convertToObjectId = id => new Types.ObjectId(id)
const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields)
}
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]))
}
const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 0]))
}

const removeUndefinedObject = obj => {
    Object.keys(obj).forEach(k => {
        if (obj[k] == null) {
            delete obj[k]
        }
    })
    return obj
}

const updateNestedObjectParser = obj => {
    const final = {}
    Object.keys(obj).forEach(k => {
        if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
            const response = updateNestedObjectParser(obj[k])
            Object.keys(response).forEach(a => {
                final[`${k}.${a}`] = response[a]
            })
        } else {
            final[k] = obj[k]
        }
    })
    return final
}
const redirectVersion = (payload) => {
    return (req, res, next) => {
        const that = this
        const version = req.headers['x-api-version'] || 'v2'
        return payload[version].call(that, req, res, next)
    }
}
/**
 * 
 * @param {object} payload dữ liệu để tạo key
 * @param {String} prefix Tiền tố của key
 * @description Tạo key cho redis
 * @returns 
 */
const initKeyForRedis = (payload, prefix) => {
    const parts = []
    for (const [key, value] of Object.entries(payload)) {
        if (value !== undefined) {
            parts.push(`${key}:${value}`)
        }
    }
    return `${prefix}_${parts.join('_')}`
}
/**
 * 
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @description Hàm set StartDate về đầu ngày (0 giờ, 0 phút, 0 giây) và endDate là kết thúc ngày (23h59m50s)
 */


const bytesToGigabytes = (bytes) => {
    return (bytes / (1024 * 1024 * 1024)).toFixed(3)
}

const moveFile = (source, destination) => {
    try {
        fs.renameSync(source, destination);
    } catch (error) {
        throw new InternalServerError('Lỗi khi di chuyển file:' + error)
    }
}
module.exports = {
    getInfoData,
    getSelectData,
    unGetSelectData,
    removeUndefinedObject,
    updateNestedObjectParser,
    convertToObjectId,

    redirectVersion,
    initKeyForRedis,

    bytesToGigabytes,
    moveFile
}