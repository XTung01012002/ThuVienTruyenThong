const { inventoryOriginalSchema } = require("../inventory_original.model")

class InventoryOriginRepo {
    // cập nhật tất cả các số lượng (tổng số lượng, số lượng chưa xếp giá, sô lượng trên kệ ...)
    // đây là số lượng tăng thêm hoặc giảm đi
    static updateQuantityById = async ({ bookId, total, quantityNotInShelf = 0, quantityInShelf = 0, quantityLent = 0, quantityOutput = 0 }) => {
        return await inventoryOriginalSchema.findOneAndUpdate({ bookOriginal: bookId }, {
            $inc: {
                quantityInShelf: quantityInShelf,
                quantityLent: quantityLent,
                quantityOutput: quantityOutput,
                total: total,
                quantityNotInShelf: quantityNotInShelf
            }
        }, { new: true })
    }
}

module.exports = InventoryOriginRepo