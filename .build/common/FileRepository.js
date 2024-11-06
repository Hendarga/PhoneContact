"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepository = void 0;
var fs_1 = __importDefault(require("fs"));
var Repository_1 = __importDefault(require("./Repository"));
var FileRepository = /** @class */ (function (_super) {
    __extends(FileRepository, _super);
    function FileRepository(filePath) {
        var _a;
        var _this = _super.call(this) || this;
        // Check if file exists
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("File ".concat(filePath, " does not exist"));
        }
        // Load items from file and initialize the elements updater
        _this.elementUpdater = new onElementUpdate(filePath);
        _this.onElementUpdate = _this.elementUpdater;
        _this.filePath = _this.filePath.bind(_this.elementUpdater);
        _this.loadFromFile = _this.elementUpdater.loadFromFile.bind(_this.elementUpdater);
        _this.flush = _this.elementUpdater.flush.bind(_this.elementUpdater);
        (_a = _this.items).push.apply(_a, _this.loadFromFile());
        return _this;
    }
    return FileRepository;
}(Repository_1.default));
exports.FileRepository = FileRepository;
/// <reference path="IElementUpdate.ts" />
var onElementUpdate = /** @class */ (function () {
    /**
     *
     */
    function onElementUpdate(filePath) {
        this.filePath = filePath;
    }
    onElementUpdate.prototype.onUpdate = function (element, action) {
        switch (action) {
            case 'CREATE':
            case 'UPDATE':
            case 'DELETE':
                ///TODO: add flush call if needed sync with file every action
                break;
            default:
                break;
        }
    };
    onElementUpdate.prototype.flush = function (items) {
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(items, null, 2), 'utf-8');
    };
    onElementUpdate.prototype.loadFromFile = function () {
        if (fs_1.default.existsSync(this.filePath)) {
            var data = fs_1.default.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        return new Array(0);
    };
    return onElementUpdate;
}());
//# sourceMappingURL=FileRepository.js.map