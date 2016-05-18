import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import DataTable from 'datatables.net-bs';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as dataConfigs from './../constants/DataConfigs';
import * as actionTypes from './../constants/ActionTypes';

export default class SystemOverview extends Component {
    constructor() {
        super()
        //this.systemListsHeaderName = {"n":"System Name", "hc":"Hardware All", "oc":"OS All", "mc":"Middleware All", "hoc":"Hardware and OS All","mmc":"Middlesware All","moc":"Middleware and OS All"}
    }
    
    componentDidMount() {
    	console.log("mount");
    	this.dataTable = DataTable(window, $);
    }

    componentDidUpdate() {
        if(this.props.isLoading === false) {
        	this.table = $('#systemOverviewTable').dataTable({
                "columnDefs": [
                    { "orderable": false, "targets": 0 },
                    { "orderable": false, "targets": 1 },
                    { "orderable": false, "targets": 2 },
                    { "orderable": false, "targets": 3 }
                ],
                //"ordering": false,
         	    "retrieve": true,
             	"pageLength": 1000,
             	"paging":   false,
     			"info":     false,
     			"bDestroy": true
             });
        }
    }
    
    handleClick(id, event) {
        if(event.target.nodeName === 'SPAN') {

            // Clicking on the title will open pop-up
            event.preventDefault();
            event.stopPropagation();

            var key = $(event.target).html().toLowerCase();
            var trimKey = key.replace(/\s/g, '_');
            this.props.onAdditionLinkClick(this.getRequestPath(trimKey),actionTypes.GET_ADDITION_ANALYTICS);
            this.props.onOpenAdditionAnalytics();
        } else {

            // Clicking anywhere else will sort the column
            const sortedColumns = this.table.api().order();
            let nextSort = 'asc';
            if(sortedColumns.length > 0) {
                if(sortedColumns[0].length >= id) {
                    nextSort = sortedColumns[0][id] === 'asc' ? 'desc' : 'asc';
                }
            }
            console.log('nextSort', nextSort);
            this.table
                .api()
                .order( [[ id, nextSort ]] )
                .draw();
        }
    }
    
    getRequestPath(key) {
		//return dataConfigs.COMMON_QUERY + dataConfigs.COMMON_QUERY_URL[key];
        return './src/js/api/onUsageAll.json';
	}

    renderTableHeader() {
        //return an array of headers
        var headers = Object.keys(this.props.systemAnalytics[0]);
        var headerTitleNode = headers.map((headerTitle, id) => {
        	var clickHandler = (id > 0 && id < 3)? this.handleClick.bind(this, id): "";
        	var linkStyle = (id > 0 && id < 3)? {
				borderBottom: '1px solid #DDDDDD',
				cursor:'pointer'}:{};
        	
        	var headerTitleValue = (id === 0)? "System Name" : this.props.systemAnalyticsHeader[id - 1];
            return <th key={'systemTableHeader' + id} onClick={clickHandler}>
            		<span style={linkStyle} onClick={clickHandler}>{headerTitleValue}</span>
            	</th>
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
        	var displayValue = parseInt(this.props.systemAnalytics[listId][key]);
        	var bubbleType;
        	if(displayValue < 5 && displayValue >=3) {
        		bubbleType = "bubble";
        	}else if(displayValue >=5) {
        		bubbleType = "bubble2";
        	}
        	var styles = classNames('ball',bubbleType);
        	var bubbleNode = (displayValue >= 4)? ( 
        			<div className="stage">
        				<figure className={styles}>
        					<span>{this.props.systemAnalytics[listId][key]}</span>
        				</figure>
        			</div>):<span>{this.props.systemAnalytics[listId][key]}</span>;
            return (
                <td key={'systemTableField' + id}>
                    {bubbleNode}
                </td>
            )
        })
        return fieldValues
    }

    render() {
        const { systemAnalytics, systemAnalyticsHeader, isLoading } = this.props
        var returnNode; 
        if(isLoading) {
        	if( this.table) {
        		this.table.fnDestroy();
        	}
        	returnNode = (<div className="loader">loading...</div>)
        }else {
        	returnNode = (systemAnalytics.length > 0)? (
                    <table id="systemOverviewTable" className="table table-striped table-bordered" cellspacing="0" width="100%">
                        {this.renderTableHeader()}
                        {this.renderTableBody()}
                    </table>
            ): (<div className="loader">loading...</div>)
        }
        
        return returnNode;
    }
}