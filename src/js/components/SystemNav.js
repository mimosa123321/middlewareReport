import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import {Promise} from 'es6-promise-polyfill';
import * as dataConfigs from './../constants/DataConfigs';
import * as actionTypes from './../constants/ActionTypes';

export default class SystemNav extends Component {
	constructor() {
		super()
		//activeBtns: [0,0,0]
		this.state = {
			activeBtns: [0,0]
		};
		this.timer = null;
		
	}

	componentDidMount() {
		//add click event listener on buttons
		this.initBtns();
	}

	initBtns() {
		this.btnsOnClick();
	}

	btnsOnClick() {
		$(".btn-group .btn").click((event)=>{
			var listId = $(event.target).parent().index(".btn-group");
			var optionId = $(event.target).closest('.btn').index();
			
			this.setState({ 
				activeBtns: this.state.activeBtns.map((activeBtn,id)=>{
					if(listId === id) {
						return optionId;
					}
					return activeBtn
				})
			});
			
			console.log(this.state.activeBtns);
			this.props.onSystemNavClick(listId, optionId, this.state.activeBtns);
			this.getRequestPath();
		});
	}
	
	getRequestPath(listId, optionId) {
		//use timeout for avoid overload request by clicking so fast
		this.clearTimeout();
		this.startTimeout().then(()=>{
			var path = this.makePath();
			console.log("get path :" + path);
			this.props.onGetSystemAnalytic(path, actionTypes.GET_SYSTEM_ANALYTICS);
			this.clearTimeout();
		});
	}
	
	startTimeout() {
		return new Promise( (resolve, reject) => {
			if(this.timer === null) {
				this.timer = setTimeout(()=>{
					resolve();
				},800)
			}
		})
	}
	
	clearTimeout() {
		clearTimeout(this.timer);
		this.timer = null;
	}
	
	makePath() {
		var path = dataConfigs.COMMON_PATH + 'compatibility/scope/all/';
		var pathArr = this.props.systemNavLists.map((list,id)=>{
			var listName = list.name.toLowerCase();
			var optionName = list.options[this.state.activeBtns[id]].id;
			return listName + "/" + optionName +"/"
		})
		path += pathArr.join("");
		return path;
	}

	renderNav() {
		var navNode = this.props.systemNavLists.map((navList, id) => {
			return (
				<div key={'systemNav'+id} className="nav-group">
					<div className="title">{navList.name}</div>
					<div className="btn-group" role="group" aria-label="system-nav">
						{this.renderOptions(navList)}
					</div>
				</div>
			)
		})
		return (
			<div id="nav">
				{navNode}
			</div>
		)
	}

	renderOptions(navList) {
		var navOptionsNode = navList.options.map((navOption, id) => {
			var optName = navOption.name;
			var isActive = (navOption.isChosen)? "active":""
			var styles = classNames('btn','btn-default',isActive)

			return <button key={'systemNavBtm' + id} type="button" className={styles}>{optName}</button>
		})

		return navOptionsNode;
	}
	
	render() {
		const { systemNavLists, onSystemNavClick, onGetSystemAnalytic } = this.props
		return (
			<div id="systemNav">
				{this.renderNav()}
			</div>
		)
	}
}

