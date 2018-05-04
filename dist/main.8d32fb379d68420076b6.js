webpackJsonp([2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(12);

const { app, router, store } = Object(__WEBPACK_IMPORTED_MODULE_0__app__["a" /* createApp */])();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    // 我们只关心之前没有渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });
    if (!activated.length) {
      return next();
    }

    // 这里如果有加载指示器(loading indicator)，就触发
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to });
      }
    })).then(() => {
      // 停止加载指示器(loading indicator)
      next();
    }).catch(next);
  });

  app.$mount('#app');
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createApp;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__route__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__);






// Vue.config.devtools = process.env.NODE_ENV !== 'production'
// Vue.config.debug = true
// Vue.config.devtools = true
// Vue.config.productionTip = true

function createApp(context = {}) {
  const router = Object(__WEBPACK_IMPORTED_MODULE_2__route__["a" /* createRouter */])();
  const store = Object(__WEBPACK_IMPORTED_MODULE_3__store__["a" /* createStore */])();
  Object(__WEBPACK_IMPORTED_MODULE_4_vuex_router_sync__["sync"])(store, router);

  const app = new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    data: {
      url: context.url
    },
    router,
    store,
    // components: {
    //   App
    // },
    // template: '<App />'
    render: h => h(__WEBPACK_IMPORTED_MODULE_1__App_vue__["a" /* default */])
  });

  return { app, router, store };
}

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App_vue_vue_type_template_id_7ba5bd90__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(10);

var script = {}


/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  script,
  __WEBPACK_IMPORTED_MODULE_0__App_vue_vue_type_template_id_7ba5bd90__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__App_vue_vue_type_template_id_7ba5bd90__["b" /* staticRenderFns */],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) {
  var api = require("/Users/yangming/Documents/learn/vue-ssr/node_modules/vue-hot-reload-api/dist/index.js")
  api.install(require('vue'))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('7ba5bd90', component.options)
    } else {
      api.reload('7ba5bd90', component.options)
    }
  }
}
component.options.__file = "src/App.vue"
/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90__ = __webpack_require__(17);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90__["b"]; });


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [_c("p", [_vm._v("App 页面")]), _c("router-view")],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
/* hot reload */
if (false) {
  var api = require("/Users/yangming/Documents/learn/vue-ssr/node_modules/vue-hot-reload-api/dist/index.js")
  api.install(require('vue'))
  if (api.compatible) {
    module.hot.accept()
    if (module.hot.data) {
      require("/Users/yangming/Documents/learn/vue-ssr/node_modules/vue-hot-reload-api/dist/index.js").rerender('7ba5bd90', {
        render: render,
        staticRenderFns: staticRenderFns
      })
    }
  }
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createRouter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(19);


// import Index from '../views/Index'

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

function createRouter() {
  return new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
    mode: 'history',
    routes: [{
      path: '/:id',
      component: r => __webpack_require__.e/* require.ensure */(0).then((() => r(__webpack_require__(43))).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
    }]
  });
}

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(22);




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

function createStore() {
  return new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
    state: {
      items: {}
    },

    actions: {
      fetchItem({ commit }, id) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__api__["a" /* fetchItem */])(id).then(item => {
          commit('setItem', { id, item });
        });
      }
    },

    mutations: {
      setItem(state, { id, item }) {
        __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].set(state.items, id, item.status === 200 ? item.data.data : 'loading');
      }
    }
  });
}

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchItem;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


const weatherApi = 'https://www.sojson.com/open/api/weather/json.shtml?city=';
function fetchItem(city = '杭州') {
  return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(weatherApi + encodeURIComponent(city));
}

/***/ })
],[11]);
//# sourceMappingURL=main.8d32fb379d68420076b6.js.map