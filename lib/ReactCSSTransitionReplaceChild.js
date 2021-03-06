"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addClass = _interopRequireDefault(require("dom-helpers/class/addClass"));

var _removeClass = _interopRequireDefault(require("dom-helpers/class/removeClass"));

var _requestAnimationFrame = _interopRequireDefault(require("dom-helpers/util/requestAnimationFrame"));

var _properties = require("dom-helpers/transition/properties");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = require("react-dom");

var _PropTypes = require("./utils/PropTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var events = [];

if (_properties.transitionEnd) {
  events.push(_properties.transitionEnd);
}

if (_properties.animationEnd) {
  events.push(_properties.animationEnd);
}

function addEndListener(node, listener) {
  if (events.length) {
    events.forEach(function (e) {
      return node.addEventListener(e, listener, false);
    });
  } else {
    setTimeout(listener, 0);
  }

  return function () {
    if (!events.length) {
      return;
    }

    events.forEach(function (e) {
      return node.removeEventListener(e, listener, false);
    });
  };
}

var propTypes = {
  children: _propTypes.default.node,
  name: _PropTypes.nameShape.isRequired,
  // Once we require timeouts to be specified, we can remove the
  // boolean flags (appear etc.) and just accept a number
  // or a bool for the timeout flags (appearTimeout etc.)
  appear: _propTypes.default.bool,
  enter: _propTypes.default.bool,
  leave: _propTypes.default.bool,
  appearTimeout: _propTypes.default.number,
  enterTimeout: _propTypes.default.number,
  leaveTimeout: _propTypes.default.number
};

var CSSTransitionGroupChild = /*#__PURE__*/function (_React$Component) {
  _inherits(CSSTransitionGroupChild, _React$Component);

  var _super = _createSuper(CSSTransitionGroupChild);

  function CSSTransitionGroupChild(props) {
    var _this;

    _classCallCheck(this, CSSTransitionGroupChild);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "componentWillAppear", function (done) {
      if (_this.props.appear) {
        _this.transition('appear', done, _this.props.appearTimeout);
      } else {
        done();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillEnter", function (done) {
      if (_this.props.enter) {
        _this.transition('enter', done, _this.props.enterTimeout);
      } else {
        done();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillLeave", function (done) {
      if (_this.props.leave) {
        _this.transition('leave', done, _this.props.leaveTimeout);
      } else {
        done();
      }
    });

    _this.classNameAndNodeQueue = [];
    _this.transitionTimeouts = [];
    return _this;
  }

  _createClass(CSSTransitionGroupChild, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unmounted = true;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.transitionTimeouts.forEach(function (timeout) {
        clearTimeout(timeout);
      });
      this.classNameAndNodeQueue.length = 0;
    }
  }, {
    key: "transition",
    value: function transition(animationType, finishCallback, timeout) {
      var node = (0, _reactDom.findDOMNode)(this);

      if (!node) {
        if (finishCallback) {
          finishCallback();
        }

        return;
      }

      var className = this.props.name[animationType] || this.props.name + '-' + animationType;
      var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
      var timer = null;
      var removeListeners;
      (0, _addClass.default)(node, className); // Need to do this to actually trigger a transition.

      this.queueClassAndNode(activeClassName, node); // Clean-up the animation after the specified delay

      var finish = function finish(e) {
        if (e && e.target !== node) {
          return;
        }

        clearTimeout(timer);

        if (removeListeners) {
          removeListeners();
        }

        (0, _removeClass.default)(node, className);
        (0, _removeClass.default)(node, activeClassName);

        if (removeListeners) {
          removeListeners();
        } // Usually this optional callback is used for informing an owner of
        // a leave animation and telling it to remove the child.


        if (finishCallback) {
          finishCallback();
        }
      };

      if (timeout) {
        timer = setTimeout(finish, timeout);
        this.transitionTimeouts.push(timer);
      } else if (_properties.transitionEnd) {
        removeListeners = addEndListener(node, finish);
      }
    }
  }, {
    key: "queueClassAndNode",
    value: function queueClassAndNode(className, node) {
      var _this2 = this;

      this.classNameAndNodeQueue.push({
        className: className,
        node: node
      });

      if (!this.rafHandle) {
        // The first animation frame is skipped when starting new transitions since
        // entering absolutely positioned elements in Chrome does not animate otherwise.
        this.rafHandle = (0, _requestAnimationFrame.default)(function () {
          return _this2.flushClassNameAndNodeQueueOnNextFrame();
        });
      }
    }
  }, {
    key: "flushClassNameAndNodeQueueOnNextFrame",
    value: function flushClassNameAndNodeQueueOnNextFrame() {
      var _this3 = this;

      this.rafHandle = (0, _requestAnimationFrame.default)(function () {
        return _this3.flushClassNameAndNodeQueue();
      });
    }
  }, {
    key: "flushClassNameAndNodeQueue",
    value: function flushClassNameAndNodeQueue() {
      if (!this.unmounted) {
        this.classNameAndNodeQueue.forEach(function (obj) {
          // This is for to force a repaint,
          // which is necessary in order to transition styles when adding a class name.

          /* eslint-disable no-unused-expressions */
          obj.node.scrollTop;
          /* eslint-enable no-unused-expressions */

          (0, _addClass.default)(obj.node, obj.className);
        });
      }

      this.classNameAndNodeQueue.length = 0;
      this.rafHandle = null;
    }
  }, {
    key: "render",
    value: function render() {
      var props = _objectSpread({}, this.props);

      delete props.name;
      delete props.appear;
      delete props.enter;
      delete props.leave;
      delete props.appearTimeout;
      delete props.enterTimeout;
      delete props.leaveTimeout;
      delete props.children;
      return /*#__PURE__*/_react.default.cloneElement(_react.default.Children.only(this.props.children), props);
    }
  }]);

  return CSSTransitionGroupChild;
}(_react.default.Component);

_defineProperty(CSSTransitionGroupChild, "displayName", 'CSSTransitionGroupChild');

CSSTransitionGroupChild.propTypes = propTypes;
var _default = CSSTransitionGroupChild;
exports.default = _default;