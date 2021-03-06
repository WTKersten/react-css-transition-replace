function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import raf from 'dom-helpers/util/requestAnimationFrame';
import ReactCSSTransitionReplaceChild from './ReactCSSTransitionReplaceChild';
import { nameShape, transitionTimeout } from './utils/PropTypes';
var reactCSSTransitionReplaceChild = React.createElement.bind(null, ReactCSSTransitionReplaceChild);

var ReactCSSTransitionReplace = /*#__PURE__*/function (_React$Component) {
  _inherits(ReactCSSTransitionReplace, _React$Component);

  var _super = _createSuper(ReactCSSTransitionReplace);

  function ReactCSSTransitionReplace(props) {
    var _this;

    _classCallCheck(this, ReactCSSTransitionReplace);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleDoneAppearing", function (key) {
      delete _this.transitioningKeys[key];

      if (key !== _this.state.currentKey) {
        // This child was removed before it had fully appeared. Remove it.
        _this.performLeave(key);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "performLeave", function (key) {
      _this.transitioningKeys[key] = true;

      _this.childRefs[key].componentWillLeave(_this.handleDoneLeaving.bind(_assertThisInitialized(_this), key));

      if (!_this.state.currentChild || !findDOMNode(_this.childRefs[_this.state.currentKey])) {
        // The enter transition dominates, but if there is no entering
        // component or it renders null the height is set to zero.
        _this.enqueueHeightTransition();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "performHeightTransition", function () {
      if (!_this.unmounted) {
        var _assertThisInitialize = _assertThisInitialized(_this),
            state = _assertThisInitialize.state;

        var currentChildNode = state.currentChild ? findDOMNode(_this.childRefs[state.currentKey]) : null;

        _this.setState({
          height: currentChildNode ? currentChildNode.offsetHeight : 0,
          width: _this.props.changeWidth ? currentChildNode ? currentChildNode.offsetWidth : 0 : null
        });
      }

      _this.rafHandle = null;
    });

    _this.childRefs = Object.create(null);
    _this.state = {
      currentKey: '1',
      currentChild: _this.props.children ? React.Children.only(_this.props.children) : undefined,
      prevChildren: {},
      height: null,
      width: null
    };
    _this.shouldEnterCurrent = false;
    _this.keysToLeave = [];
    _this.transitioningKeys = {};
    return _this;
  }

  _createClass(ReactCSSTransitionReplace, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.transitionAppear && this.state.currentChild) {
        this.performAppear(this.state.currentKey);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unmounted = true;
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var nextChild = nextProps.children ? React.Children.only(nextProps.children) : undefined;
      var currentChild = this.state.currentChild;

      if (currentChild && nextChild && nextChild.key === currentChild.key && !this.state.nextChild) {
        // This is the same child, but receiving new props means the child itself has re-rendered
        return this.setState({
          currentChild: nextChild
        });
      }

      var _this$state = this.state,
          currentKey = _this$state.currentKey,
          prevChildren = _this$state.prevChildren;
      var nextState = {
        currentKey: String(Number(currentKey) + 1),
        currentChild: nextChild,
        height: 0,
        width: this.props.changeWidth ? 0 : null
      };

      if (nextChild) {
        this.shouldEnterCurrent = true;
      }

      if (currentChild) {
        var currentChildNode = findDOMNode(this.childRefs[currentKey]);
        nextState.height = currentChildNode ? currentChildNode.offsetHeight : 0;
        nextState.width = this.props.changeWidth ? currentChildNode ? currentChildNode.offsetWidth : 0 : null;
        nextState.prevChildren = _objectSpread(_objectSpread({}, prevChildren), {}, _defineProperty({}, currentKey, currentChild));

        if (!this.transitioningKeys[currentKey]) {
          this.keysToLeave.push(currentKey);
        }
      }

      this.setState(nextState);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.shouldEnterCurrent) {
        this.shouldEnterCurrent = false; // If the current child renders null there is nothing to enter

        if (findDOMNode(this.childRefs[this.state.currentKey])) {
          this.performEnter(this.state.currentKey);
        }
      }

      var keysToLeave = this.keysToLeave;
      this.keysToLeave = [];
      keysToLeave.forEach(this.performLeave);
    }
  }, {
    key: "performAppear",
    value: function performAppear(key) {
      this.transitioningKeys[key] = true;
      this.childRefs[key].componentWillAppear(this.handleDoneAppearing.bind(this, key));
    }
  }, {
    key: "performEnter",
    value: function performEnter(key) {
      this.transitioningKeys[key] = true;
      this.childRefs[key].componentWillEnter(this.handleDoneEntering.bind(this, key));
      this.enqueueHeightTransition();
    }
  }, {
    key: "handleDoneEntering",
    value: function handleDoneEntering(key) {
      delete this.transitioningKeys[key];

      if (key === this.state.currentKey) {
        // The current child has finished entering so the height transition is also cleared.
        this.setState({
          height: null
        });
      } else {
        // This child was removed before it had fully appeared. Remove it.
        this.performLeave(key);
      }
    }
  }, {
    key: "handleDoneLeaving",
    value: function handleDoneLeaving(key) {
      delete this.transitioningKeys[key];
      var nextState = {
        prevChildren: _objectSpread({}, this.state.prevChildren)
      };
      delete nextState.prevChildren[key];
      delete this.childRefs[key];

      if (!this.state.currentChild || !findDOMNode(this.childRefs[this.state.currentKey])) {
        nextState.height = null;
      }

      this.setState(nextState);
    }
  }, {
    key: "enqueueHeightTransition",
    value: function enqueueHeightTransition() {
      if (!this.rafHandle) {
        this.rafHandle = raf(this.performHeightTransition);
      }
    }
  }, {
    key: "wrapChild",
    value: function wrapChild(child, moreProps) {
      var transitionName = this.props.transitionName;

      if (_typeof(transitionName) === 'object' && transitionName !== null) {
        transitionName = _objectSpread({}, transitionName);
        delete transitionName.height;
      } // We need to provide this childFactory so that
      // ReactCSSTransitionReplaceChild can receive updates to name,
      // enter, and leave while it is leaving.


      return reactCSSTransitionReplaceChild(_objectSpread({
        name: transitionName,
        appear: this.props.transitionAppear,
        enter: this.props.transitionEnter,
        leave: this.props.transitionLeave,
        appearTimeout: this.props.transitionAppearTimeout,
        enterTimeout: this.props.transitionEnterTimeout,
        leaveTimeout: this.props.transitionLeaveTimeout
      }, moreProps), child);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          currentKey = _this$state2.currentKey,
          currentChild = _this$state2.currentChild,
          prevChildren = _this$state2.prevChildren,
          height = _this$state2.height,
          width = _this$state2.width;
      var childrenToRender = [];

      var _this$props = this.props,
          overflowHidden = _this$props.overflowHidden,
          transitionName = _this$props.transitionName,
          component = _this$props.component,
          childComponent = _this$props.childComponent,
          notifyLeaving = _this$props.notifyLeaving,
          transitionAppear = _this$props.transitionAppear,
          transitionEnter = _this$props.transitionEnter,
          transitionLeave = _this$props.transitionLeave,
          changeWidth = _this$props.changeWidth,
          transitionAppearTimeout = _this$props.transitionAppearTimeout,
          transitionEnterTimeout = _this$props.transitionEnterTimeout,
          transitionLeaveTimeout = _this$props.transitionLeaveTimeout,
          containerProps = _objectWithoutProperties(_this$props, ["overflowHidden", "transitionName", "component", "childComponent", "notifyLeaving", "transitionAppear", "transitionEnter", "transitionLeave", "changeWidth", "transitionAppearTimeout", "transitionEnterTimeout", "transitionLeaveTimeout"]);

      var transitioning = this.shouldEnterCurrent || this.keysToLeave.length || Object.keys(this.transitioningKeys).length;
      containerProps.style = _objectSpread({}, containerProps.style);

      if (transitioning) {
        containerProps.style.position = 'relative';

        if (overflowHidden) {
          containerProps.style.overflow = 'hidden';
        }
      }

      if (height !== null) {
        var heightClassName = typeof transitionName === 'string' ? "".concat(transitionName, "-height") : transitionName && transitionName.height || '';
        containerProps.className = "".concat(containerProps.className || '', " ").concat(heightClassName);
        containerProps.style.height = height;
      }

      if (width !== null) {
        containerProps.style.width = width;
      }

      var positionAbsolute = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // In Chrome a selection on a child due to multiple clicks often transfers to the final child after
        // the transitions completes. This prevents selection of the child without other side-effects.
        userSelect: 'none'
      };
      Object.keys(prevChildren).forEach(function (key) {
        var child = prevChildren[key];
        childrenToRender.push( /*#__PURE__*/React.createElement(childComponent, {
          key: key,
          style: positionAbsolute
        }, _this2.wrapChild(notifyLeaving && typeof child.type !== 'string' ? /*#__PURE__*/React.cloneElement(child, {
          isLeaving: true
        }) : child, {
          ref: function ref(r) {
            return _this2.childRefs[key] = r;
          }
        })));
      });

      if (currentChild) {
        childrenToRender.push( /*#__PURE__*/React.createElement(childComponent, {
          key: currentKey,
          // While there are leaving children positioning must always be specified to keep the current
          // child on top; the current child can switch to relative positioning after entering though.
          style: this.transitioningKeys[currentKey] ? positionAbsolute : transitioning ? {
            position: 'relative'
          } : null
        }, this.wrapChild(currentChild, {
          ref: function ref(r) {
            return _this2.childRefs[currentKey] = r;
          }
        })));
      }

      return /*#__PURE__*/React.createElement(component, containerProps, childrenToRender);
    }
  }]);

  return ReactCSSTransitionReplace;
}(React.Component);

_defineProperty(ReactCSSTransitionReplace, "displayName", 'ReactCSSTransitionReplace');

_defineProperty(ReactCSSTransitionReplace, "propTypes", {
  transitionName: nameShape.isRequired,
  transitionAppear: PropTypes.bool,
  transitionEnter: PropTypes.bool,
  transitionLeave: PropTypes.bool,
  transitionAppearTimeout: transitionTimeout('Appear'),
  transitionEnterTimeout: transitionTimeout('Enter'),
  transitionLeaveTimeout: transitionTimeout('Leave'),
  overflowHidden: PropTypes.bool,
  changeWidth: PropTypes.bool,
  notifyLeaving: PropTypes.bool
});

_defineProperty(ReactCSSTransitionReplace, "defaultProps", {
  transitionAppear: false,
  transitionEnter: true,
  transitionLeave: true,
  overflowHidden: true,
  changeWidth: false,
  notifyLeaving: false,
  component: 'div',
  childComponent: 'span'
});

export { ReactCSSTransitionReplace as default };