import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import DataTable from 'datatables.net-bs';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class SystemOverview extends Component {
    constructor() {
        super()
    }

    componentDidUpdate() {
        var dataTable = DataTable(window, $);
        $('#systemOverviewTable').dataTable();
    }

    renderTableHeader() {
        //return an array of headers
        var headers = Object.keys(this.props.systemAnalytics[0]);
        var headerTitleNode = headers.map((headerTitle, id) => {
            var headerTitleValue = headerTitle;
            return <th key={'systemTableHeader' + id}>{headerTitleValue}</th>
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
        var bodyContentNode = this.props.systemAnalytics.map((bodyContent, listId) => {
            return(
                <tr key={'systemTableBody' + listId}>
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
        var fieldKeys = Object.keys(this.props.systemAnalytics[0]);
        var fieldValues = fieldKeys.map((key, id) => {
            return (
                <td key={'systemTableField' + id}>
                    {this.props.systemAnalytics[listId][key]}
                </td>
            )
        })
        return fieldValues
    }

    render() {
        const { systemAnalytics } = this.props
        var returnNode = (systemAnalytics.length > 0)? (
                <table id="systemOverviewTable" className="table table-striped table-bordered" cellspacing="0" width="100%">
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                </table>
        ): (<div>loading...</div>)
        return returnNode;
    }
}