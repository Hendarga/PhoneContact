"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConectionBuilder = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var ConectionBuilder = /** @class */ (function () {
    function ConectionBuilder(filepath) {
        this.readConfig(filepath);
    }
    ConectionBuilder.prototype.readConfig = function (filePath) {
        try {
            // Чтение файла
            var fullPath = path_1.default.resolve("./", filePath);
            var data = fs_1.default.readFileSync(fullPath, "utf-8");
            // Парсинг JSON
            this.config = JSON.parse(data);
        }
        catch (error) {
            console.error("Ошибка при чтении файла конфигурации:", error);
        }
    };
    ConectionBuilder.prototype.build = function (entityName) {
        if (this.config == undefined) {
            throw new Error("Config is undefined");
        }
        switch (entityName) {
            case "contact":
                return path_1.default.resolve(this.config.conectionstring, "Contacts.json");
            default:
                return undefined;
        }
    };
    return ConectionBuilder;
}());
exports.ConectionBuilder = ConectionBuilder;
//# sourceMappingURL=ConectionBuilder.js.map