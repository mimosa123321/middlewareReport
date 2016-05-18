import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import DataTable from 'datatables.net-bs';
import * as dataConfigs from './../constants/DataConfigs';
import * as actionTypes from './../constants/ActionTypes';

export default class MainOverview extends Component {
	constructor() {
		super()
		this.overviewListsHeaderName = {"id":"", "type":"TYPE", "t_no":"Total Number", "f_sp":"Full Support", "p_sp":"Partial Support","n_sp":"Non-Support","n":"No Data"}
	}
	
	componentDidUpdate() {
		var dataTable = DataTable(window, $);
		$('#mainOverviewTable').dataTable({
			"paging":   false,
			"info":     false,
			"bFilter" : false
		});
	}
	
	handleClick(event) {
		var key = $(event.target).html().toLowerCase();
		this.props.onAdditionLinkClick(this.getRequestPath(key),actionTypes.GET_ADDITION_ANALYTICS);
		this.props.onOpenAdditionAnalytics();
	}
	
	getRequestPath(key) {
		return dataConfigs.COMMON_QUERY + dataConfigs.COMMON_QUERY_URL[key];
	}
	
	renderTableHeader() {
		//return an array of headers 
		var headers = Object.keys(this.props.overviewLists[0]);
		var headerTitleNode = headers.map((headerTitle, id) => {
			var headerTitleValue = this.overviewListsHeaderName[headerTitle]
			return <th key={'mainTableHeader' + id}>{headerTitleValue}</th>
		})
		return (
			<thead>
				<tr> 
					{headerTitleNode}
				</tr>
			</thead>
		)
	}
	
	renderTableBody() {
		var bodyContentNode = this.props.overviewLists.map((bodyContent, listId) => {
			return(
				<tr key={'mainTableBody' + listId}>
					{this.renderTableFields(listId)}
				</tr>
			)
		})
		return (
			<tbody>
				{bodyContentNode}
			</tbody>
		)
	}
	
	renderTableFields(listId) {
		//return an array of key 
		var fieldKeys = Object.keys(this.props.overviewLists[0]);
		var fieldValues = fieldKeys.map((key, id) => {
			var clickHandler = (id === 0)? this.handleClick.bind(this): "";
			var linkStyle = (id === 0)? {
				color:'#265FCF',
				borderBottom: '1px solid #DDDDDD',
				cursor:'pointer'}:{};
			
			return (
					<td key={'mainTableField' + id}>
						<span style={linkStyle} onClick={clickHandler}>{this.props.overviewLists[listId][key]}</span>
					</td>
				)
		})
		return fieldValues
	}
	
	render() {
		const { overviewLists, onAdditionLinkClick } = this.props;
		var returnNode = (overviewLists.length > 0)? (
				<table id="mainOverviewTable" className="table table-striped table-bordered" cellspacing="0" width="100%">
    				{this.renderTableHeader()}
    				{this.renderTableBody()}
    			</table>
        ): (<div>loading...</div>)
		
        return returnNode;
    }
}
