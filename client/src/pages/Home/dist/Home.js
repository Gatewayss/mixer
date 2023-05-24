"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./home.css");
var client_1 = require("@apollo/client");
var Navbar_1 = require("../../components/Navbar/Navbar");
var Header_1 = require("../../components/Header/Header");
var PostForm_1 = require("../../components/PostForm/PostForm");
var PostList_1 = require("../../components/PostList/PostList");
// import Sidebar from '../../components/Sidebar/Sidebar';
var queries_1 = require("../../utils/queries");
var Home = function () {
    var _a;
    var _b = client_1.useQuery(queries_1.QUERY_POSTS), loading = _b.loading, data = _b.data;
    var posts = ((_a = data) === null || _a === void 0 ? void 0 : _a.posts) || [];
    return (react_1["default"].createElement("div", { className: "home-container" },
        react_1["default"].createElement("div", { className: '' }),
        react_1["default"].createElement("div", { className: "home-header-container" },
            react_1["default"].createElement(Header_1["default"], null)),
        react_1["default"].createElement("div", { className: "header-navbar" },
            react_1["default"].createElement(Navbar_1["default"], null)),
        react_1["default"].createElement("div", null),
        react_1["default"].createElement("div", { className: 'home-design' },
            react_1["default"].createElement("div", { className: "home-postform-header" },
                react_1["default"].createElement("h2", null,
                    react_1["default"].createElement("span", { className: "mix" }, "Mix"),
                    react_1["default"].createElement("span", { className: "it" }, "it"),
                    react_1["default"].createElement("span", { className: "up" }, "up"),
                    react_1["default"].createElement("span", { className: "dash" }, "~"),
                    "Think Differently. Create Differently. Share.")),
            react_1["default"].createElement("div", { className: "home-postform-container" },
                react_1["default"].createElement(PostForm_1["default"], null))),
        react_1["default"].createElement("div", { className: "home-postlist-container" }, loading ? (react_1["default"].createElement("div", null, "Loading...")) : (react_1["default"].createElement(PostList_1["default"], { posts: posts })))));
};
exports["default"] = Home;

//# sourceMappingURL=Home.js.map
