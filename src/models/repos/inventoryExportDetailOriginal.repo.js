const { inventoryExportDetailSchema } = require("../inventoryExportDetail_original.model");

class inventoryExportDetailOriginalRepo {
    static addMany = async (data) => {
        return await inventoryExportDetailSchema.insertMany(data);
    }

}

module.exports =  inventoryExportDetailOriginalRepo