'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rootPage = require('../components/rootPage.js');

var _rootPage2 = _interopRequireDefault(_rootPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @createdBy: liuzhenli
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @createdTime: 2019-04-04 14:05:48
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @LastModify: 2019-07-19 18:58:40
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ImageCreator = function (_RootPage) {
  _inherits(ImageCreator, _RootPage);

  function ImageCreator(page, options) {
    _classCallCheck(this, ImageCreator);

    var _this = _possibleConstructorReturn(this, (ImageCreator.__proto__ || Object.getPrototypeOf(ImageCreator)).apply(this, arguments));

    _this.options = options;
    _this.page = page;
    _this.fileType = options.fileType;
    _this.preview = options.preview;
    _this.canvas = options.canvasId;
    _this.context = wx.createCanvasContext(options.canvasId, page);
    _this.formatImgsInfoArr = [];
    _this.canvasHeight = 1334;
    _this.canvasWidth = 750;
    _this.preDrawContentArr = [];
    _this.drawComplate = false;
    _this.drawComplateCount = -1;
    _this.renderElementCount = 0;
    _this.localImageArr = [];
    _this.extraQueue = [];
    _this.canDraw = true;
    _this.canvasGenreated = false;
    _this.setCanvasMeasure(_this.canvasWidth, _this.canvasHeight);
    _this.initAllImageInfo();
    return _this;
  }
  /**
   * 初始化canvas
   */


  _createClass(ImageCreator, [{
    key: 'initCanvas',
    value: function initCanvas() {
      var _this2 = this;

      var useBgImage = this.options.useBgImage;

      var drawBgImage = useBgImage && this.formatImgsInfoArr.length;

      var _ref = drawBgImage ? this.formatImgsInfoArr.pop() : this.options,
          path = _ref.path,
          _ref$height = _ref.height,
          height = _ref$height === undefined ? 1334 : _ref$height,
          _ref$width = _ref.width,
          width = _ref$width === undefined ? 750 : _ref$width;

      this.canvasHeight = height;
      this.canvasWidth = width;
      this.setCanvasMeasure(width, height, _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!drawBgImage) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return _this2.drawImage({ path: path, x: 0, y: 0, width: width, height: height });

              case 3:
                _context.next = 7;
                break;

              case 5:
                _context.next = 7;
                return _this2.drawRect({ x: 0, y: 0, width: width, height: height });

              case 7:
                _this2.drawComplateCount++;
                _this2.canvasGenreated = true;
                _this2.drawMainContent();

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })));
    }
    /**
     * 设置画布的大小
     * @param {Number} canvasWidth
     * @param {Number} canvasHeight
     */

  }, {
    key: 'setCanvasMeasure',
    value: function setCanvasMeasure(canvasWidth, canvasHeight, callback) {
      this.page.setState({
        canvasHeight: canvasHeight + 'px',
        canvasWidth: canvasWidth + 'px'
      }, callback);
    }
    /**
     * 需要动态渲染的元素
     * @param { Object| Array} options
     */

  }, {
    key: 'setExtraData',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        var _this3 = this;

        var _loop, i;

        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!Array.isArray(options)) {
                  _context3.next = 15;
                  break;
                }

                if (options.length) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt('return');

              case 3:
                this.drawComplate = false;
                options = this.checkImageVaild(options);
                _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(i) {
                  return regeneratorRuntime.wrap(function _loop$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _this3.renderElementCount++;

                          if (!(options[i].drawType === 'image')) {
                            _context2.next = 13;
                            break;
                          }

                          if (!(i == options.length - 1)) {
                            _context2.next = 11;
                            break;
                          }

                          if (!options[i].url.match(/(http:\/\/|https:\/\/)/)) {
                            _context2.next = 8;
                            break;
                          }

                          _context2.next = 6;
                          return _this3.downloadPromise(options[i].url).then(function (res) {
                            options[i].path = res.tempFilePath;
                          });

                        case 6:
                          _context2.next = 9;
                          break;

                        case 8:
                          options[i].path = options[i].url;

                        case 9:
                          _context2.next = 12;
                          break;

                        case 11:
                          if (options[i].url.match(/(http:\/\/|https:\/\/)/)) {
                            _this3.downloadPromise(options[i].url).then(function (res) {
                              options[i].path = res.tempFilePath;
                            });
                          } else {
                            options[i].path = options[i].url;
                          }

                        case 12:
                          _this3.canDraw = true;

                        case 13:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _loop, _this3);
                });
                i = 0;

              case 7:
                if (!(i < options.length)) {
                  _context3.next = 12;
                  break;
                }

                return _context3.delegateYield(_loop(i), 't0', 9);

              case 9:
                i++;
                _context3.next = 7;
                break;

              case 12:
                this.generateDrawPromise(options);
                _context3.next = 16;
                break;

              case 15:
                console.error('options需要为Array类型，数据格式不正确！');

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function setExtraData(_x) {
        return _ref3.apply(this, arguments);
      }

      return setExtraData;
    }()
    /**
     * 剔除URL不合法的图片元素
     * @param {Array} options
     */

  }, {
    key: 'checkImageVaild',
    value: function checkImageVaild(options) {
      for (var i = 0; i < options.length; i++) {
        if (options[i]) {
          if (options[i].drawType === 'image') {
            if (!options[i] || !/(^(http|https|wxfile|\.\/|\.\.\/|\/\.\.\/))/.test(options[i].url) || !options[i].url.length) {
              var errorObj = options.splice(i, 1);
              console.warn("数据无效");
              console.table([errorObj]);
            }
          }
        } else {
          options.splice(i, 1);
        }
      }
      return options;
    }
    /**
     * 获取文本宽度
     * @param {String} text
     */

  }, {
    key: 'getTextWidth',
    value: function getTextWidth(text) {
      return this.context.measureText(text);
    }
    /**
     * 创建获取图片信息的异步操作
     */

  }, {
    key: 'initAllImageInfo',
    value: function initAllImageInfo() {
      var _this4 = this;

      var _options$imgArr = this.options.imgArr,
          imgArr = _options$imgArr === undefined ? [] : _options$imgArr;

      if (imgArr.length) {
        imgArr = this.sort(this.checkImageVaild(imgArr));

        var _loop2 = function _loop2(i, j) {
          if (imgArr[i].url && imgArr[i].url.match(/(http:\/\/|https:\/\/)/)) {
            _this4.formatImgsInfoArr[i] = _this4.createImageDownloadPromise(imgArr[i]);
          } else {
            _this4.formatImgsInfoArr[i] = new Promise(function (resolve, reject) {
              _this4.setImageInfo(imgArr[i]).then(function (res) {
                resolve(res);
              }).catch(function (error) {
                _this4.clearTimeout();
                reject({
                  error: error,
                  image: imgArr[i]
                });
              });
            });
          }
        };

        for (var i = 0, j = imgArr.length; i < j; i++) {
          _loop2(i, j);
        }
        this.getAllImgInfo();
      } else {
        this.initCanvas();
      }
    }
    /**
     * 执行所有下载图片的异步操作
     */

  }, {
    key: 'getAllImgInfo',
    value: function getAllImgInfo() {
      var _this5 = this;

      Promise.all(this.formatImgsInfoArr).then(function (arr) {
        _this5.canDraw = true;
        _this5.formatImgsInfoArr = arr.slice(0);
        _this5.initCanvas();
      }).catch(function (e) {
        console.warn('getAllImgInfo() => 加载图片失败', e);
        _this5.clearTimeout();
      });
    }
    /**
     * 获取图片宽高
     * 设置图片信息
     * @param {*} imgItemObj
     */

  }, {
    key: 'setImageInfo',
    value: function setImageInfo(imgItemObj) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: imgItemObj.url,
          success: function success(imageInfo) {
            resolve(_extends({}, imgItemObj, imageInfo, {
              path: imgItemObj.url,
              height: imgItemObj.height || imageInfo.height,
              width: imgItemObj.width || imageInfo.width
            }));
          },
          fail: function fail(errorInfo) {
            reject(errorInfo);
            _this6.clearTimeout();
          }
        });
      });
    }
    /**
     * 下载所需渲染的图片
     * @param {String} filePath
     */

  }, {
    key: 'downloadPromise',
    value: function downloadPromise(filePath) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        if (/^((http|wxfile):\/\/tmp)/.test(filePath)) {
          resolve({
            tempFilePath: filePath
          });
        } else {
          wx.downloadFile({
            url: filePath.replace(/^(http:\/\/)/, 'https://'),
            success: function success(res) {
              resolve(res);
            },
            fail: function fail(err) {
              _this7.toast('加载图片失败');
              _this7.clearTimeout();
              reject({
                errmsg: '加载图片失败',
                filePath: filePath,
                err: err
              });
            }
          });
        }
      });
    }
    /**
     * 格式化所有渲染图片的参数:URL;height; width
     * @param {Object} imgItemObj
     */

  }, {
    key: 'createImageDownloadPromise',
    value: function createImageDownloadPromise(imgItemObj) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        _this8.downloadPromise(imgItemObj.url).then(function (res) {
          var imgInfoObj = _extends({}, imgItemObj, {
            url: res.tempFilePath,
            originUrl: imgItemObj.url
          });
          _this8.setImageInfo(imgInfoObj).then(function (res) {
            resolve(res);
          }).catch(function (error) {
            _this8.clearTimeout();
            reject({
              error: error,
              imgItemObj: imgItemObj
            });
          });
        });
      });
    }

    /**
     * 绘制主要流程
     */

  }, {
    key: 'drawMainContent',
    value: function drawMainContent() {
      var _options = this.options,
          _options$lineArr = _options.lineArr,
          lineArr = _options$lineArr === undefined ? [] : _options$lineArr,
          _options$textArr = _options.textArr,
          textArr = _options$textArr === undefined ? [] : _options$textArr,
          _options$rectArr = _options.rectArr,
          rectArr = _options$rectArr === undefined ? [] : _options$rectArr,
          _options$circleArr = _options.circleArr,
          circleArr = _options$circleArr === undefined ? [] : _options$circleArr;

      this.preDrawContentArr = this.sort([].concat(_toConsumableArray(this.formatImgsInfoArr), _toConsumableArray(textArr), _toConsumableArray(rectArr), _toConsumableArray(circleArr), _toConsumableArray(lineArr)), true);
      this.renderElementCount += this.preDrawContentArr.length;
      this.generateDrawPromise(this.preDrawContentArr);
    }
    /**
     * 执行画图的Promise
     * @param {Array} drawContentArr
     */

  }, {
    key: 'generateDrawPromise',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(drawContentArr) {
        var i, len;
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.canvasGenreated && this.canDraw)) {
                  _context4.next = 12;
                  break;
                }

                this.canDraw = false;
                i = 0, len = drawContentArr.length;

              case 3:
                if (!(i < len)) {
                  _context4.next = 10;
                  break;
                }

                _context4.next = 6;
                return this.drawController(drawContentArr[i]);

              case 6:
                this.drawComplateCount++;

              case 7:
                i++;
                _context4.next = 3;
                break;

              case 10:
                _context4.next = 14;
                break;

              case 12:
                this.extraQueue.push(drawContentArr);
                return _context4.abrupt('return');

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee3, this);
      }));

      function generateDrawPromise(_x2) {
        return _ref4.apply(this, arguments);
      }

      return generateDrawPromise;
    }()
    /**
     * 要渲染的元素
     * @param {Object} content
     */

  }, {
    key: 'drawController',
    value: function drawController(content) {
      var drawType = content.drawType,
          path = content.path,
          width = content.width,
          height = content.height,
          text = content.text,
          color = content.color,
          avatar = content.avatar,
          radius = content.radius;

      if (drawType === 'image') {
        if (content.path) {
          return avatar ? this.drawArcImage(content) : this.drawImage(content);
        }
        console.error('path不存在:');
        console.table([content]);
      } else if (drawType === 'text' && text != undefined && color) {
        return this.drawText(content);
      } else if (drawType === 'rect' && width && height) {
        return this.drawRect(content);
      } else if (drawType === 'circle' && radius) {
        return this.drawCircle(content);
      } else if (drawType === 'line' && width) {
        return this.drawLine(content);
      }
    }
  }, {
    key: 'clearTimeout',
    value: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function () {
      clearTimeout(this.statusObserveID);
      clearTimeout(this.timeoutHandler);
      clearTimeout(this.generateTimeoutID);
    })
    /**
     * 生成图片
     */

  }, {
    key: 'generateImage',
    value: function generateImage() {
      var _this9 = this;

      return new Promise(function (resolve, reject) {

        //此处加setTimeout是为了解决安卓手机在画完以后不执行回调的问题，导致图片导出超时失败（安卓手机性能可能有问题）
        var generateTimeout = function generateTimeout() {
          setTimeout(function () {
            wx.canvasToTempFilePath({
              canvasId: _this9.canvas,
              y: 1,
              fileType: _this9.fileType || 'png',
              success: function success(res) {
                _this9.preview && wx.previewImage({
                  urls: [res.tempFilePath]
                });
                _this9.toast('生成成功');
                resolve(res.tempFilePath);
                _this9.clearTimeout();
              },
              fail: function fail(error) {
                reject(error);
                console.warn("generateImage() => 生成失败");
                _this9.clearTimeout();
              }
            });
          }, 200);
        };
        _this9.context.draw(true, generateTimeout());
      });
    }
    /**
     * 调用绘画的时候监听是否绘画完成，如果完成了就导出
     */

  }, {
    key: 'draw',
    value: function draw() {
      var _this10 = this;

      return new Promise(function (resolve, reject) {
        _this10.timeoutHandler = setTimeout(function () {
          _this10.clearTimeout();
          _this10.toast("生成失败，请重试");
          !_this10.hasDrawComplete() && console.warn('网络超时，请重试') && reject('timeout');
        }, _this10.options.timeout || 5000);

        var generateImage = function generateImage() {
          _this10.generateImage().then(function (res) {
            resolve(res);
          });
        };
        var statusObserve = function statusObserve() {
          _this10.statusObserveID = setTimeout(function () {
            if (_this10.hasDrawComplete()) {
              generateImage();
              _this10.clearTimeout();
            } else {
              statusObserve();
            }
          }, 500);
        };
        statusObserve();
        statusObserve();
      });
    }
    /**
     * 渲染图片
     * @param {String} imageUrl
     * @param  {...any} args
     */

  }, {
    key: 'drawImage',
    value: function drawImage(content) {
      var _this11 = this;

      return new Promise(function (resolve) {
        var path = content.path,
            x = content.x,
            y = content.y,
            width = content.width,
            height = content.height,
            _content$rotate = content.rotate,
            rotate = _content$rotate === undefined ? 0 : _content$rotate,
            _content$radius = content.radius,
            radius = _content$radius === undefined ? 0 : _content$radius,
            topLeftRadius = content.topLeftRadius,
            topRightRadius = content.topRightRadius,
            bottomLeftRadius = content.bottomLeftRadius,
            bottomRightRadius = content.bottomRightRadius;

        _this11.context.rotate(rotate * Math.PI / 180);
        if (radius) {
          _this11.context.save();
          _this11.context.beginPath();
          _this11.context.lineTo(x + width - radius, y);
          _this11.context.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 2 * Math.PI, false);
          _this11.context.lineTo(x + width, y + height - radius);
          _this11.context.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI, false);
          _this11.context.lineTo(x + radius, y + height);
          _this11.context.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI, false);
          _this11.context.lineTo(x, y + radius);
          _this11.context.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI, false);
          _this11.context.clip();

          _this11.context.drawImage(path, x, y, width, height);
          _this11.context.draw(true, setTimeout(function () {
            _this11.context.restore();
            _this11.context.rotate(-rotate * Math.PI / 180);
            resolve();
          }));
        } else {
          _this11.context.drawImage(path, x, y, width, height);
          _this11.context.draw(true, setTimeout(function () {
            _this11.context.rotate(-rotate * Math.PI / 180);
            resolve();
          }));
        }
      });
    }
    /**
     *
     * @param {String} path  图片地址
     * @param {Number} cx    起始x坐标
     * @param {Number} cy    起始y坐标
     * @param {Number} cr    圆角半径
     * @param {Number} borderColor 边框颜色
     */

  }, {
    key: 'drawArcImage',
    value: function drawArcImage(content) {
      var _this12 = this;

      return new Promise(function (resolve) {
        var path = content.path,
            x = content.x,
            y = content.y,
            _content$radius2 = content.radius,
            radius = _content$radius2 === undefined ? 0 : _content$radius2,
            _content$borderColor = content.borderColor,
            borderColor = _content$borderColor === undefined ? 'transparent' : _content$borderColor,
            _content$borderWidth = content.borderWidth,
            borderWidth = _content$borderWidth === undefined ? 0 : _content$borderWidth;

        _this12.context.save();
        _this12.context.beginPath();
        _this12.context.setLineWidth(borderWidth);
        _this12.context.arc(x, y, radius, 0, 2 * Math.PI);
        _this12.context.setStrokeStyle(borderColor);
        _this12.context.stroke();
        _this12.context.clip();
        _this12.context.drawImage(path, x - radius, y - radius, 2 * radius, 2 * radius);
        _this12.context.draw(true, setTimeout(function () {
          _this12.context.restore();
          resolve();
        }));
      });
    }
    /**
     *
     * @param {Number} x       起始x坐标
     * @param {Number} y       起始y坐标
     * @param {Number} width   矩形宽
     * @param {Number} height  矩形高
     * @param {String} color   边框颜色
     * @param {String} backgroundColor 背景颜色
     * @param  {...any} args
     */

  }, {
    key: 'drawRect',
    value: function drawRect(content) {
      var _this13 = this;

      return new Promise(function (resolve) {
        var x = content.x,
            y = content.y,
            width = content.width,
            height = content.height,
            borderColor = content.borderColor,
            _content$backgroundCo = content.backgroundColor,
            backgroundColor = _content$backgroundCo === undefined ? 'transparent' : _content$backgroundCo,
            radius = content.radius,
            topLeftRadius = content.topLeftRadius,
            topRightRadius = content.topRightRadius,
            bottomLeftRadius = content.bottomLeftRadius,
            bottomRightRadius = content.bottomRightRadius,
            _content$lineWidth = content.lineWidth,
            lineWidth = _content$lineWidth === undefined ? 0 : _content$lineWidth,
            gradient = content.gradient,
            shadow = content.shadow;

        if (shadow) {
          _this13.context.shadowOffsetX = shadow.offsetX || 0;
          _this13.context.shadowOffsetY = shadow.offsetY || 0;
          _this13.context.shadowBlur = shadow.blur || 0;
          _this13.context.shadowColor = shadow.color || 'transparent';
        }
        _this13.context.setFillStyle(backgroundColor);
        _this13.context.beginPath();
        _this13.context.moveTo(x + (radius || topLeftRadius || 0), y);
        radius || topRightRadius ? _this13.context.lineTo(x + width - (radius || topRightRadius), y) : _this13.context.lineTo(x + width, y);
        (radius || topRightRadius) && _this13.context.arc(x + width - (radius || topRightRadius), y + (radius || topRightRadius), radius || topRightRadius, 1.5 * Math.PI, 2 * Math.PI, false);
        radius || bottomRightRadius ? _this13.context.lineTo(x + width, y + height - (radius || bottomRightRadius)) : _this13.context.lineTo(x + width, y + height);
        (radius || bottomRightRadius) && _this13.context.arc(x + width - (radius || bottomRightRadius), y + height - (radius || bottomRightRadius), radius || bottomRightRadius, 0, 0.5 * Math.PI, false);
        radius || bottomLeftRadius ? _this13.context.lineTo(x + (radius || bottomLeftRadius), y + height) : _this13.context.lineTo(x, y + height);
        (radius || bottomLeftRadius) && _this13.context.arc(x + (radius || bottomLeftRadius), y + height - (radius || bottomLeftRadius), radius || bottomLeftRadius, 0.5 * Math.PI, Math.PI, false);
        radius || topLeftRadius ? _this13.context.lineTo(x, y + (radius || topLeftRadius)) : _this13.context.lineTo(x, y);
        (radius || topLeftRadius) && _this13.context.arc(x + (radius || topLeftRadius), y + (radius || topLeftRadius), radius || topLeftRadius, Math.PI, 1.5 * Math.PI, false);
        // 增加填充渐变
        if (gradient) {
          var type = gradient.type,
              options = gradient.options;
          var colorArr = options.colorArr;

          var fillStyle = void 0;
          // 线性渐变
          if (type === 'linear') {
            var _options$startX = options.startX,
                startX = _options$startX === undefined ? 0 : _options$startX,
                _options$startY = options.startY,
                startY = _options$startY === undefined ? 0 : _options$startY,
                _options$endX = options.endX,
                endX = _options$endX === undefined ? _this13.canvasWidth : _options$endX,
                _options$endY = options.endY,
                endY = _options$endY === undefined ? _this13.canvasHeight : _options$endY;

            fillStyle = _this13.context.createLinearGradient(startX, startY, endX, endY);
            // 径向渐变
          } else if (type === 'radial') {
            var _options$startX2 = options.startX,
                _startX = _options$startX2 === undefined ? 0 : _options$startX2,
                _options$startY2 = options.startY,
                _startY = _options$startY2 === undefined ? 0 : _options$startY2,
                _options$startRadius = options.startRadius,
                startRadius = _options$startRadius === undefined ? 0 : _options$startRadius,
                _options$endX2 = options.endX,
                _endX = _options$endX2 === undefined ? _this13.canvasWidth : _options$endX2,
                _options$endY2 = options.endY,
                _endY = _options$endY2 === undefined ? _this13.canvasHeight : _options$endY2,
                _options$endRadius = options.endRadius,
                endRadius = _options$endRadius === undefined ? 0 : _options$endRadius;

            fillStyle = _this13.context.createRadialGradient(_startX, _startY, startRadius, _endX, _endY, endRadius);
          }
          for (var i = 0, len = colorArr.length; i < len; i++) {
            var _colorArr$i = colorArr[i],
                position = _colorArr$i.position,
                color = _colorArr$i.color;

            fillStyle.addColorStop(position, color);
          }
          _this13.context.setFillStyle(fillStyle);
        }

        _this13.context.fill();
        _this13.context.setLineWidth(lineWidth);
        _this13.context.setStrokeStyle(borderColor);
        _this13.context.stroke();
        _this13.context.shadowOffsetX = 0;
        _this13.context.shadowOffsetY = 0;
        _this13.context.shadowBlur = 0;
        _this13.context.shadowColor = 'transparent';
        _this13.context.draw(true, setTimeout(function () {
          resolve();
        }));
      });
    }
    /**
     *
     * @param {*} content
     */

  }, {
    key: 'drawCircle',
    value: function drawCircle(content) {
      var _this14 = this;

      return new Promise(function (resolve) {
        var x = content.x,
            y = content.y,
            _content$backgroundCo2 = content.backgroundColor,
            backgroundColor = _content$backgroundCo2 === undefined ? 'red' : _content$backgroundCo2,
            borderStyle = content.borderStyle,
            _content$borderColor2 = content.borderColor,
            borderColor = _content$borderColor2 === undefined ? backgroundColor : _content$borderColor2,
            radius = content.radius,
            _content$borderWidth2 = content.borderWidth,
            borderWidth = _content$borderWidth2 === undefined ? 0 : _content$borderWidth2,
            _content$dashedWidth = content.dashedWidth,
            dashedWidth = _content$dashedWidth === undefined ? 2 : _content$dashedWidth,
            _content$dashedOffset = content.dashedOffset,
            dashedOffset = _content$dashedOffset === undefined ? 2 : _content$dashedOffset;

        _this14.context.beginPath();
        _this14.context.lineWidth = borderWidth;
        borderStyle == 'dashed' && _this14.context.setLineDash([dashedWidth, dashedOffset]);
        _this14.context.arc(x, y, radius, 0, Math.PI * 2);
        _this14.context.setFillStyle(backgroundColor);
        _this14.context.fill();
        _this14.context.setStrokeStyle(borderColor);
        _this14.context.stroke();
        _this14.context.draw(true, setTimeout(function () {
          resolve();
        }));
      });
    }
    /**
     *
     * @param {*} content
     */

  }, {
    key: 'drawLine',
    value: function drawLine(content) {
      var _this15 = this;

      return new Promise(function (resolve) {
        var x = content.x,
            y = content.y,
            width = content.width,
            _content$height = content.height,
            height = _content$height === undefined ? 2 : _content$height,
            _content$dashedWidth2 = content.dashedWidth,
            dashedWidth = _content$dashedWidth2 === undefined ? 5 : _content$dashedWidth2,
            lineStyle = content.lineStyle,
            _content$dashedHeight = content.dashedHeight,
            dashedHeight = _content$dashedHeight === undefined ? 5 : _content$dashedHeight,
            _content$dashedOffset2 = content.dashedOffset,
            dashedOffset = _content$dashedOffset2 === undefined ? 5 : _content$dashedOffset2,
            type = content.type,
            _content$color = content.color,
            color = _content$color === undefined ? 'red' : _content$color;

        _this15.context.beginPath();
        _this15.context.moveTo(x, y);
        _this15.context.lineWidth = type == "vertical" ? width : height;
        lineStyle == 'dashed' && _this15.context.setLineDash([type == "vertical" ? dashedHeight : dashedWidth, dashedOffset]);
        _this15.context.setStrokeStyle(color);
        _this15.context.lineTo(type == "vertical" ? x : x + width, type == "vertical" ? y + height : y);
        _this15.context.stroke();
        _this15.context.draw(true, setTimeout(function () {
          resolve();
        }));
      });
    }
    /**
     * 渲染文字
     * @param {Object} item
     */

  }, {
    key: 'drawText',
    value: function drawText(item) {
      var _this16 = this;

      return new Promise(function (resolve) {
        var text = item.text,
            _item$fontSize = item.fontSize,
            fontSize = _item$fontSize === undefined ? 20 : _item$fontSize,
            _item$x = item.x,
            x = _item$x === undefined ? 0 : _item$x,
            _item$y = item.y,
            y = _item$y === undefined ? 0 : _item$y,
            _item$color = item.color,
            color = _item$color === undefined ? '#000' : _item$color,
            _item$textAlign = item.textAlign,
            textAlign = _item$textAlign === undefined ? 'center' : _item$textAlign,
            padding = item.padding,
            paddingLeft = item.paddingLeft,
            paddingRight = item.paddingRight,
            outLineWidth = item.outLineWidth,
            _item$width = item.width,
            width = _item$width === undefined ? 0 : _item$width;

        var setFontWeight = typeof outLineWidth === 'number';
        if (setFontWeight) {
          _this16.context.beginPath();
          _this16.context.setLineWidth(outLineWidth);
          _this16.context.setStrokeStyle(color);
        }
        _this16.context.setTextAlign(textAlign);
        _this16.context.setFontSize(fontSize);
        _this16.context.setFillStyle(color);
        _this16.context.setTextBaseline('top');
        if (/(.*\$\{(.*)\}\$)/.test(text)) {
          var space = /(.*\$\{(.*)\}\$)/.exec(text)[2];
          var spaceString = " ";
          for (var i = 0; i < space; i++) {
            spaceString += " ";
          }
          text = text.replace(/\$\{(.*)\}\$/, spaceString);
        }
        if (padding) {
          _this16.drawTextWidthPadding(_this16.canvasWidth - padding * 2, item, text, textAlign == 'center' ? _this16.canvasWidth / 2 : textAlign == 'right' ? _this16.canvasWidth - padding : padding);
        } else if (paddingLeft && !paddingRight) {
          _this16.drawTextWidthPadding(_this16.canvasWidth - paddingLeft, item, text, paddingLeft);
        } else if (!paddingLeft && paddingRight) {
          _this16.drawTextWidthPadding(_this16.canvasWidth - paddingRight, item, text, x);
        } else if (paddingLeft && paddingRight) {
          _this16.drawTextWidthPadding(_this16.canvasWidth - paddingRight - paddingLeft, item, text, paddingLeft);
        } else if (width > 0) {
          _this16.drawTextWithWidth(width, item, text, x);
        } else {
          if (setFontWeight) {
            _this16.context.fillText(text, x, y);
            _this16.context.fillText(text, x, y + outLineWidth);
            _this16.context.fillText(text, x, y - outLineWidth);
            _this16.context.fillText(text, x + outLineWidth, y);
            _this16.context.fillText(text, x - outLineWidth, y);
          } else {
            _this16.context.fillText(text, x, y);
          }
        }
        _this16.context.stroke();
        _this16.context.setFillStyle(color);
        _this16.context.draw(true, setTimeout(function () {
          resolve();
        }));
      });
    }
  }, {
    key: 'drawTextWithWidth',
    value: function drawTextWithWidth(widthOfRow, item, text, x) {
      var _item$fontSize2 = item.fontSize,
          fontSize = _item$fontSize2 === undefined ? 20 : _item$fontSize2,
          _item$y2 = item.y,
          y = _item$y2 === undefined ? 0 : _item$y2;

      var str = "";
      for (var i in text) {
        if (this.getTextWidth(str).width < widthOfRow) {
          str = str + text[i];
        }
      }
      if (str.length < text.length) {
        str = str + "...";
      }
      this.context.fillText(str, x, y);
    }
    /**
     * 绘制带有padding值的文字
     * @param {Number} widthOfRow
     * @param {Object} item
     * @param {String} text
     * @param {Number} x
     */

  }, {
    key: 'drawTextWidthPadding',
    value: function drawTextWidthPadding(widthOfRow, item, text, x) {
      var _item$fontSize3 = item.fontSize,
          fontSize = _item$fontSize3 === undefined ? 20 : _item$fontSize3,
          _item$lineHeight = item.lineHeight,
          lineHeight = _item$lineHeight === undefined ? 10 : _item$lineHeight,
          outLineWidth = item.outLineWidth,
          _item$y3 = item.y,
          y = _item$y3 === undefined ? 0 : _item$y3;

      var charCountOfRow = Math.floor(widthOfRow / fontSize);
      var charGroup = Math.ceil(text.length / charCountOfRow);
      for (var i = 0; i < charGroup; i++) {
        if (typeof outLineWidth === 'number') {
          this.context.strokeText(text.substring(i * charCountOfRow, (i + 1) * charCountOfRow), x, i > 0 ? y + i * (fontSize + lineHeight) : y);
        } else {
          this.context.fillText(text.substring(i * charCountOfRow, (i + 1) * charCountOfRow), x, i > 0 ? y + i * (fontSize + lineHeight) : y);
        }
      }
    }
  }, {
    key: 'drawTextWidthLetterSpacing',
    value: function drawTextWidthLetterSpacing(text, x, y, letterSpacing) {
      var _this17 = this;

      var arrText = text.split('');
      var align = this.context.textAlign || 'left';

      // 这里仅考虑水平排列
      var originWidth = this.context.measureText(text).width;
      // 应用letterSpacing占据宽度
      var actualWidth = originWidth + letterSpacing * (arrText.length - 1);
      // 根据水平对齐方式确定第一个字符的坐标
      if (align == 'center') {
        x = x - actualWidth / 2;
      } else if (align == 'right') {
        x = x - actualWidth;
      }

      // 临时修改为文本左对齐
      this.context.setTextAlign('left');
      // 开始逐字绘制
      arrText.forEach(function (letter) {
        var letterWidth = _this17.context.measureText(letter).width;
        _this17.context.fillText(letter, x, y);
        // 确定下一个字符的横坐标
        x = x + letterWidth + letterSpacing;
      });
      // 对齐方式还原
      this.context.setTextAlign(align);
    }
    /**
     * 排序
     * @param {Array} arraytoSort
     * @param {Boolean} flag 倒序
     */

  }, {
    key: 'sort',
    value: function sort(arraytoSort, flag) {
      var temp = void 0;
      for (var i = 1; i < arraytoSort.length; i++) {
        for (var j = i - 1; j >= 0; j--) {
          if (flag) {
            if (Number(arraytoSort[j + 1].zIndex) < Number(arraytoSort[j].zIndex)) {
              temp = arraytoSort[j + 1];
              arraytoSort[j + 1] = arraytoSort[j];
              arraytoSort[j] = temp;
            }
          } else {
            if (Number(arraytoSort[j + 1].zIndex) > Number(arraytoSort[j].zIndex)) {
              temp = arraytoSort[j + 1];
              arraytoSort[j + 1] = arraytoSort[j];
              arraytoSort[j] = temp;
            }
          }
        }
      }
      return arraytoSort;
    }
  }, {
    key: 'hasDrawComplete',
    value: function hasDrawComplete() {
      return this.drawComplateCount === this.renderElementCount;
    }
    /**
     * 图片进行高斯模糊
     * @param {} imgData
     */

  }, {
    key: 'gaussBlur',
    value: function gaussBlur(imgObj) {
      var _this18 = this;

      wx.canvasGetImageData({
        canvasId: this.canvas,
        x: 0,
        y: 0,
        height: 400,
        width: 300,
        success: function success(imgData) {
          var pixes = imgData.data;
          var width = imgData.width;
          var height = imgData.height;
          var gaussMatrix = [],
              gaussSum = 0,
              x = void 0,
              y = void 0,
              r = void 0,
              g = void 0,
              b = void 0,
              a = void 0,
              i = void 0,
              j = void 0,
              k = void 0,
              len = void 0;
          var radius = 10;
          var sigma = 50;
          a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
          b = -0.0002;
          //生成高斯矩阵
          for (i = 0, x = -10; x <= radius; x++, i++) {
            g = a * Math.exp(b * x * x);
            gaussMatrix[i] = g;
            gaussSum += g;
          }
          //归一化, 保证高斯矩阵的值在[0,1]之间
          for (i = 0, len = gaussMatrix.length; i < len; i++) {
            gaussMatrix[i] /= gaussSum;
          }
          //x 方向一维高斯运算
          for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
              r = g = b = a = 0;
              gaussSum = 0;
              for (j = -10; j <= radius; j++) {
                k = x + j;
                if (k >= 0 && k < width) {
                  //确保 k 没超出 x 的范围
                  //r,g,b,a 四个一组
                  i = (y * width + k) * 4;
                  r += pixes[i] * gaussMatrix[j + radius];
                  g += pixes[i + 1] * gaussMatrix[j + radius];
                  b += pixes[i + 2] * gaussMatrix[j + radius];
                  // a += pixes[i + 3] * gaussMatrix[j];
                  gaussSum += gaussMatrix[j + radius];
                }
              }
              i = (y * width + x) * 4;
              // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
              pixes[i] = r / gaussSum;
              pixes[i + 1] = g / gaussSum;
              pixes[i + 2] = b / gaussSum;
              // pixes[i + 3] = a ;
            }
          }
          //y 方向一维高斯运算
          for (x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {
              r = g = b = a = 0;
              gaussSum = 0;
              for (j = -10; j <= radius; j++) {
                k = y + j;
                if (k >= 0 && k < height) {
                  //确保 k 没超出 y 的范围
                  i = (k * width + x) * 4;
                  r += pixes[i] * gaussMatrix[j + radius];
                  g += pixes[i + 1] * gaussMatrix[j + radius];
                  b += pixes[i + 2] * gaussMatrix[j + radius];
                  // a += pixes[i + 3] * gaussMatrix[j];
                  gaussSum += gaussMatrix[j + radius];
                }
              }
              i = (y * width + x) * 4;
              pixes[i] = r / gaussSum;
              pixes[i + 1] = g / gaussSum;
              pixes[i + 2] = b / gaussSum;
            }
          }
          wx.canvasPutImageData(_extends({
            canvasId: _this18.canvas
          }, imgData, {
            success: function success(data) {}
          }));
        }
      });
    }
  }]);

  return ImageCreator;
}(_rootPage2.default);

exports.default = ImageCreator;