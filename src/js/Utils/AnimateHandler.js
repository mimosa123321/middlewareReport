import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

export default class AnimateHandler extends Component {
	transitionEnd(ele, callbackFunc) {
		$(ele).unbind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd');
	    $(ele).bind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function() {
	        $(ele).unbind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd');
	        if (callbackFunc) {
	            callbackFunc.apply();
	        }
	    });
	
	}
	animationEnd(ele, callbackFunc) {
		$(ele).unbind('animationend webkitAnimationEnd MSAnimationEnd oanimationend');
	    $(ele).bind('animationend webkitAnimationEnd MSAnimationEnd oanimationend', function() {
	        $(ele).unbind('animationend webkitAnimationEnd MSAnimationEnd oanimationend');
	        if (callbackFunc) {
	            callbackFunc.apply();
	        }
	    });
	}
}