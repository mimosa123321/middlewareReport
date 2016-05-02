import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import DataTable from 'datatables.net-bs';

export default class MainOverview extends Component {
	constructor() {
		super()
		this.overviewListsHeaderName = {"id":"", "type":"TYPE", "t_no":"Total Number", "f_sp":"Full Support", "p_sp":"Partial Support","n":"No Data"}
	}
	
	componentDidMount() {
		var dataTable = DataTable(window, $);
		$('#mainOverviewTable').dataTable();
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
			return (
					<td key={'mainTableField' + id}>
						{this.props.overviewLists[listId][key]}
					</td>
				)
		})
		return fieldValues
	}
	
	render() {
		const { overviewLists } = this.props;
        return (
        		<table id="mainOverviewTable" className="table table-striped table-bordered" cellspacing="0" width="100%">
        			{this.renderTableHeader()}
        			{this.renderTableBody()}
        		</table>
        );
    }
}
