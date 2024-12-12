"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A generic repository class that implements the IRepository interface.
 * This class provides basic CRUD operations for items of type T, where T extends IIdentified<K>.
 *
 * @template T - The type of items managed by the repository. Must extend IIdentified<K>.
 * @template K - The type of the identifier for items managed by the repository.
 *
 * @implements {IRepository<T, K>}
 */
var Repository = /** @class */ (function () {
    function Repository(initCapacity) {
        if (initCapacity === void 0) { initCapacity = 0; }
        this.items = new Array(initCapacity);
    }
    Repository.prototype.filter = function (predicate, thisArg) {
        return this.items.filter(predicate, thisArg);
    };
    Repository.prototype.find = function (predicate, thisArg) {
        return this.items.find(predicate);
    };
    Repository.prototype.getAll = function () {
        return this.items;
    };
    Repository.prototype.getById = function (id) {
        return this.items.find(function (item) { return item.id === id; });
    };
    Repository.prototype.create = function (element) {
        var index = this.items.findIndex(function (item) { return item != undefined && item.id === element.id; });
        if (index < 0)
            index = this.items.push(element) - 1;
        else
            throw new Error("Element with id ".concat(element.id, " already exists"));
        if (this.onElementUpdate)
            this.onElementUpdate.onUpdate(element, "CREATE");
        return index;
    };
    Repository.prototype.update = function (element) {
        var index = this.items.findIndex(function (item) { return item.id === element.id; });
        if (index > -1)
            this.items[index] = element;
        if (this.onElementUpdate)
            this.onElementUpdate.onUpdate(element, "UPDATE");
        return index;
    };
    Repository.prototype.delete = function (id) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        if (index > -1)
            this.items.splice(index, 1);
        if (this.onElementUpdate)
            this.onElementUpdate.onUpdate(this.items[index], "DELETE");
        return index;
    };
    return Repository;
}());
exports.default = Repository;
//# sourceMappingURL=Repository.js.map