import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import classNames from 'classnames';
import AdditionOverview from './../components/AdditionOverview'
import AnimateHandler from './../Utils/AnimateHandler'


function mapStateToProps(state) {
    return {
    	additionAnalytics: state.main.additionAnalytics,
    	isAdditionOverviewOpen: state.main.isAdditionOverviewOpen,
    	isAdditionAnalyticsLoading:  state.main.isAdditionAnalyticsLoading
    }
}

class AdditionOverviewContainer extends AnimateHandler {
	constructor() {
		super()
	}
	
	
	componentDidMount() {
		//this.show($('.additionOverviewContainer'));
	}
	
	componentDidUpdate() {
		if(this.props.isAdditionOverviewOpen) {
			this.show($('.additionOverviewContainer'));
		}
	}
	
	onClickCloseButton() {
		this.hide($('.additionOverviewContainer'));
	}
	
	show(el) {
		el.css('display','block');
		setTimeout(()=> {
			el.css('opacity',1);
			el.css('transform','translateY(53px)');
			el.css('webkitTransform','translateY(53px)');
			el.css('z-index',99);
		},100)
	}
	
	hide(el) {
		el.css('opacity',1);
		el.css('transform','translateY(100%)');
		el.css('webkitTransform','translateY(100%)');
		this.transitionEnd(el, ()=> {
			el.css('z-index',1);
			el.css('opacity',0);
		})
	}

	render() {
		const { additionAnalytics, isAdditionOverviewOpen, isAdditionAnalyticsLoading} = this.props
		//var containerClass = (isAdditionOverviewOpen)? classNames('additionOverviewContainer','show'):'additionOverviewContainer';
        return (
        	<div className="additionOverviewContainer">
         		<AdditionOverview additionAnalytics={additionAnalytics}
         							isAdditionAnalyticsLoading = {isAdditionAnalyticsLoading}/>
         		<div id="buttonContainer">
         			<button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.onClickCloseButton.bind(this)}>Close</button>
         		</div>
         	</div>
        );
    }
}

export default connect(
    mapStateToProps
)(AdditionOverviewContainer)


	