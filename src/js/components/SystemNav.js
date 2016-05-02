import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class SystemNav extends Component {
	constructor() {
		super()
	}

	componentDidMount() {
		//add click event listener on buttons
		this.initBtns();
	}

	initBtns() {
		this.btnsOnClick();
	}

	btnsOnClick() {
		var self = this;
		$(".btn-group .btn").click(function(){
			//$(this).addClass("active").siblings().removeClass("active");
			var listId = $(this).parent().index(".btn-group");
			var optionId = $(this).closest('.btn').index();
			self.props.onSystemNavClick(listId, optionId);
			self.props.onGetSystemAnalytic('./src/js/api/data_system_2.json');
		});
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


/*<div class="btn-group" role="group" aria-label="...">
<button type="button" class="btn btn-default">Left</button>
<button type="button" class="btn btn-default">Middle</button>
<button type="button" class="btn btn-default">Right</button>
</div>*/
