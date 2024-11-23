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
        if (initCapacity === void 0) { initCapacity = 3; }
        this.items = new Array(initCapacity);
    }
    Repository.prototype.getAll = function () {
        return this.items;
    };
    Repository.prototype.getById = function (id) {
        return this.items.find(function (item) { return item.id === id; });
    };
    Repository.prototype.create = function (element) {
        if (!element) {
            throw new Error("Cannot create undefined element");
        }
        if (!element.id) {
            element.id = this.currentId++; // Генерация id, если его нет
        }
        var index = this.items.findIndex(function (item) { return item.id === element.id; });
        if (index >= 0) {
            throw new Error("Element with id ".concat(element.id, " already exists"));
        }
        this.items.push(element);
        if (this.onElementUpdate) {
            this.onElementUpdate.onUpdate(element, 'CREATE');
        }
        return this.items.length - 1; // Индекс добавленного элемента
    };
    Repository.prototype.read = function (selector) {
        this.items = this.items.filter(selector.equals);
        return this.items;
    };
    Repository.prototype.update = function (element) {
        var index = this.items.findIndex(function (item) { return item.id === element.id; });
        if (index > -1)
            this.items[index] = element;
        if (this.onElementUpdate)
            this.onElementUpdate.onUpdate(element, 'UPDATE');
        return index;
    };
    Repository.prototype.delete = function (id) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        if (index > -1)
            this.items.splice(index, 1);
        if (this.onElementUpdate)
            this.onElementUpdate.onUpdate(this.items[index], 'DELETE');
        return index;
    };
    return Repository;
}());
exports.default = Repository;
//# sourceMappingURL=Repository.js.map