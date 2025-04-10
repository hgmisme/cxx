if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function requireNativePlugin(name) {
    return weex.requireModule(name);
  }
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  var zy = requireNativePlugin("ZySDK-ZyUniappMethodModel");
  formatAppLog("log", "at pages/index/index.vue:24", "---------------------zy----------------:", zy);
  const _sfc_main$1 = {
    methods: {
      shareInstance() {
        zy.shareInstance();
      },
      scanDevice() {
        zy.scanDevice((res) => {
          if (res.eventType === "deviceFound") {
            formatAppLog("log", "at pages/index/index.vue:34", "发现新设备:", res.device);
          } else if (res.eventType === "deviceUpdate") {
            formatAppLog("log", "at pages/index/index.vue:36", "设备列表更新:", res.deviceList);
          }
        });
      },
      peripheralStateChange() {
        zy.peripheralStateChange((res) => {
          formatAppLog("log", "at pages/index/index.vue:42", `Device state changed to: ${res.stateName} (${res.state})`);
          if (res.state === 0)
            ;
        });
      },
      peripheralIsReadSendData() {
        zy.peripheralIsReadSendData((res) => {
          if (res.status === "ready") {
            formatAppLog("log", "at pages/index/index.vue:51", "可以发送数据了");
          }
        });
      },
      bluetoothPowerStateChange() {
        zy.bluetoothPowerStateChange((res) => {
          if (res.state === 5) {
            formatAppLog("log", "at pages/index/index.vue:58", "蓝牙已开启");
          } else if (res.state === 4) {
            formatAppLog("log", "at pages/index/index.vue:60", "蓝牙已关闭");
          }
        });
      },
      bluetoothAncsStateChange() {
        zy.bluetoothAncsStateChange((res) => {
          formatAppLog("log", "at pages/index/index.vue:66", "通知中心状态:", res.enabled ? "已启用" : "未启用");
        });
      },
      setIsNeedReconnect() {
        zy.setIsNeedReconnect({ state: true });
      },
      reconnectDevice() {
        zy.reconnectDevice((res) => {
          formatAppLog("log", "at pages/index/index.vue:78", "设备重连操作已触发");
        });
      },
      getSystemListPeripheral() {
        zy.getSystemListPeripheral((res) => {
          formatAppLog("log", "at pages/index/index.vue:83", "系统已配对设备:", res.deviceList);
        });
      },
      stopScan() {
        zy.stopScan({});
        formatAppLog("log", "at pages/index/index.vue:89", "扫描已停止");
      },
      connectDevice() {
        zy.connectDevice({
          uuid: "设备唯一标识",
          mac: "MAC地址（备用）"
        }, (res) => {
          formatAppLog("log", "at pages/index/index.vue:96", res.success ? "连接成功" : "连接失败");
        });
      },
      otaDisconnect() {
        zy.otaDisconnect({});
        formatAppLog("log", "at pages/index/index.vue:102", "OTA连接已断开");
      },
      disconnect() {
        zy.disconnect((res) => {
          formatAppLog("log", "at pages/index/index.vue:106", "设备已断开连接");
        });
      },
      getDeviceSupportList() {
        zy.getDeviceSupportList((res) => {
          if (res.error) {
            formatAppLog("error", "at pages/index/index.vue:112", "错误:", res.error.message);
            return;
          }
          if (res.functionList.step) {
            formatAppLog("log", "at pages/index/index.vue:118", "设备支持步数监测");
          }
          if (res.functionDetails.heartrate) {
            formatAppLog("log", "at pages/index/index.vue:123", "心率监测间隔:", res.functionDetails.heartrate.measurementInterval);
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("button", {
        type: "warn",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.shareInstance && $options.shareInstance(...args))
      }, "shareInstance"),
      vue.createElementVNode("button", {
        type: "warn",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.scanDevice && $options.scanDevice(...args))
      }, "scanDevice"),
      vue.createElementVNode("button", {
        type: "primary",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.peripheralStateChange && $options.peripheralStateChange(...args))
      }, "peripheralStateChange"),
      vue.createCommentVNode(" 新增以下按钮 "),
      vue.createElementVNode("button", {
        type: "default",
        onClick: _cache[3] || (_cache[3] = (...args) => $options.peripheralIsReadSendData && $options.peripheralIsReadSendData(...args))
      }, "peripheralIsReadSendData"),
      vue.createElementVNode("button", {
        type: "default",
        onClick: _cache[4] || (_cache[4] = (...args) => $options.bluetoothPowerStateChange && $options.bluetoothPowerStateChange(...args))
      }, "bluetoothPowerStateChange"),
      vue.createElementVNode("button", {
        type: "default",
        onClick: _cache[5] || (_cache[5] = (...args) => $options.bluetoothAncsStateChange && $options.bluetoothAncsStateChange(...args))
      }, "bluetoothAncsStateChange"),
      vue.createElementVNode("button", {
        type: "default",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.setIsNeedReconnect && $options.setIsNeedReconnect(...args))
      }, "setIsNeedReconnect"),
      vue.createElementVNode("button", {
        type: "default",
        onClick: _cache[7] || (_cache[7] = (...args) => $options.reconnectDevice && $options.reconnectDevice(...args))
      }, "reconnectDevice"),
      vue.createElementVNode("button", {
        type: "default",
        onClick: _cache[8] || (_cache[8] = (...args) => $options.getSystemListPeripheral && $options.getSystemListPeripheral(...args))
      }, "getSystemListPeripheral"),
      vue.createElementVNode("button", {
        type: "default",
        onClick: _cache[9] || (_cache[9] = (...args) => $options.stopScan && $options.stopScan(...args))
      }, "stopScan"),
      vue.createElementVNode("button", {
        type: "default",
        onClick: _cache[10] || (_cache[10] = (...args) => $options.connectDevice && $options.connectDevice(...args))
      }, "connectDevice"),
      vue.createElementVNode("button", {
        type: "default",
        onClick: _cache[11] || (_cache[11] = (...args) => $options.otaDisconnect && $options.otaDisconnect(...args))
      }, "otaDisconnect"),
      vue.createElementVNode("button", {
        type: "default",
        onClick: _cache[12] || (_cache[12] = (...args) => $options.disconnect && $options.disconnect(...args))
      }, "disconnect"),
      vue.createElementVNode("button", {
        type: "default",
        onClick: _cache[13] || (_cache[13] = (...args) => $options.getDeviceSupportList && $options.getDeviceSupportList(...args))
      }, "getDeviceSupportList")
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/ch/Desktop/uniapp_sdk/uniapp_sdk/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/ch/Desktop/uniapp_sdk/uniapp_sdk/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
