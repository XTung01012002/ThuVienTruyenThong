const { StatusCodes, ReasonPhrases } = require("../utils/httpStatusCode")

const statusCode = {
    OK: 200,
    CREATE: 201
}
const reasonStatusCode = {
    OK: 'Success',
    CREATE: 'Created'
}

class SuccessResponse {
    constructor({ message, status = StatusCodes.OK, reason = ReasonPhrases.OK, data = {} }) {
        this.message = !message ? reason : message
        this.status = status
        this.data = data
    }
    send(res, header = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({ message, data }) {
        super({ message, data })
    }
}

class Created extends SuccessResponse {
    constructor({ option = {} ,message, status = StatusCodes.CREATED, reason = ReasonPhrases.CREATED, data }) {
        super({ message, status, reason, data })
        this.option = option
    }
}

module.exports = {
    OK,Created,SuccessResponse
}