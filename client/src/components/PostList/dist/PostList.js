"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var client_1 = require("@apollo/client");
var queries_1 = require("../../utils/queries");
var mutations_1 = require("../../utils/mutations");
require("./postList.css");
var auth_1 = require("../../utils/auth");
var CommentForm_1 = require("../CommentForm/CommentForm");
var CommentList_1 = require("../CommentList/CommentList");
var PostList = function (_a) {
    var posts = _a.posts;
    var _b;
    var _c = react_1.useState(''), singlePostId = _c[0], setSinglePostId = _c[1];
    var _d = client_1.useMutation(mutations_1.REMOVE_POST), removePost = _d[0], error = _d[1].error;
    var data = client_1.useQuery(queries_1.QUERY_SINGLE_POST, {
        variables: {
            postId: singlePostId
        }
    }).data;
    var singlePost = ((_b = data) === null || _b === void 0 ? void 0 : _b.post) || {};
    var deletePost = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var data_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(event.currentTarget.id);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, removePost({
                            variables: {
                                postId: event.currentTarget.id
                            }
                        })];
                case 2:
                    data_1 = (_a.sent()).data;
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 4];
                case 4:
                    window.location.reload();
                    return [2 /*return*/];
            }
        });
    }); };
    var getPostId = function (event) {
        var value = event.target.value;
        ;
        setSinglePostId(value);
    };
    var closeComments = function (event) {
        setSinglePostId("");
        console.log(singlePostId);
    };
    if (!posts.length) {
        return react_1["default"].createElement("h3", null, "No Posts Yet");
    }
    return (react_1["default"].createElement("div", { className: "postlist-container" }, posts &&
        posts.map(function (post) { return (react_1["default"].createElement("div", { className: "post-container", key: post._id },
            react_1["default"].createElement("h4", { className: 'mail' },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/profiles/" + post.postAuthor }, post.postAuthor),
                react_1["default"].createElement("p", { className: "postdate" },
                    "posted on ",
                    post.createdAt)),
            !post.postPic && (react_1["default"].createElement("div", { className: "post-text-container" },
                react_1["default"].createElement("p", null, post.postText))),
            post.postPic && (react_1["default"].createElement("div", { className: "post-pic-container" },
                react_1["default"].createElement("div", { className: "post-pic" },
                    react_1["default"].createElement("img", { className: "post-pic-image", src: post.postPic, alt: 'drawing' })))),
            auth_1["default"].loggedIn() ? (react_1["default"].createElement("div", { className: "post-footer" },
                react_1["default"].createElement("div", { className: "post-comment-link" }, post._id === singlePost._id ? (react_1["default"].createElement("div", null,
                    react_1["default"].createElement("button", { className: "comment-close-btn", type: "submit", onClick: closeComments }, "Close Comments"),
                    react_1["default"].createElement(CommentForm_1["default"], { postId: post._id }),
                    react_1["default"].createElement(CommentList_1["default"], { comments: singlePost.comments }))) : (react_1["default"].createElement("button", { className: "post-comment-btn", type: "submit", value: post._id, onClick: getPostId }, "Comments"))),
                react_1["default"].createElement("div", { className: "delete-btn-container" }, auth_1["default"].loggedIn() && auth_1["default"].getProfile().data.username === post.postAuthor ? (react_1["default"].createElement("button", { id: post._id, className: "delete-btn", type: "submit", onClick: deletePost }, "Delete Post")) : null))) : null)); })));
};
exports["default"] = PostList;

//# sourceMappingURL=PostList.js.map
