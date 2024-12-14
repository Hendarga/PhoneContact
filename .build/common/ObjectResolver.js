"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectResolver = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var ContactBook_1 = require("../bll/ContactBook");
var CloudFlareRepository_1 = require("../CF/CloudFlareRepository");
var FileRepository_1 = require("./FileRepository");
var ObjectResolver = /** @class */ (function () {
    function ObjectResolver(configPath) {
        this.readConfig(configPath);
    }
    ObjectResolver.prototype.resolveObject = function (constructor) {
        if (constructor == null) {
            return this;
        }
        var tName;
        if (typeof constructor === "string") {
            tName = constructor;
        }
        else {
            tName = constructor.name;
        }
        switch (tName.trim()) {
            case "IConectionProvider": return this;
            case "ContactBook":
            case "IContactBook":
                return new ContactBook_1.ContactBook();
            // Define concrete implementation for FileRepository storage
            case "FileRepository<Contact,number>":
                return new FileRepository_1.FileRepository(this.buildConnection("contact"));
            // Define concrete implementation for CloudFlareRepository storage
            case "CloudFlareRepository<Contact,number>":
                return new CloudFlareRepository_1.CloudFlareRepository(this.buildConnection("contact"));
            case "IDataSource<Contact,number>":
                {
                    if (this.config.mode == "local") {
                        return this.resolveObject("FileRepository<Contact,number>");
                    }
                    if (this.config.mode == "cloud") {
                        return this.resolveObject("CloudFlareRepository<Contact,number>");
                    }
                }
            default:
                return undefined;
        }
    };
    ObjectResolver.prototype.buildConnection = function (entityName) {
        if (this.config == undefined) {
            throw new Error("Config is undefined");
        }
        if (this.config.mode == "cloud") {
            return this.config.conectionstring;
        }
        if (this.config.mode == "local") {
            switch (entityName) {
                case "contact":
                    return path_1.default.resolve(this.config.localDataDir, "Contacts.json");
                default:
                    return undefined;
            }
        }
    };
    ObjectResolver.prototype.readConfig = function (filePath) {
        try {
            // reading a string from a file
            var fullPath = path_1.default.resolve("./", filePath);
            var data = fs_1.default.readFileSync(fullPath, "utf-8");
            // parse JSON
            this.config = JSON.parse(data);
        }
        catch (error) {
            console.error("Error while reading config file:", error);
        }
    };
    ObjectResolver.instance = new ObjectResolver(".\\config.json");
    return ObjectResolver;
}());
exports.ObjectResolver = ObjectResolver;
//ge
//# sourceMappingURL=ObjectResolver.js.map