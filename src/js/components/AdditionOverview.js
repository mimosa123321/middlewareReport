import React, { Component, PropTypes } from 'react';
import AnimateHandler from './../Utils/AnimateHandler';

export default class AdditionOverview extends AnimateHandler {
	componentDidMount() {
		this.hide($("#jqxgrid"));
		this.initJqx();
	}
	
	initJqx() {
		this.sourceColumnsAB = [];
		this.datafields = [];
		var numberrenderer = function (row, column, value) {
			return '<div style="text-align: center; margin-top: 5px;">' + (1 + value) + '</div>';
		};
		var columns = [];
		for (var i = 0; i < 26; i++) {
			var text = String.fromCharCode(65 + i);
			if (i == 0) {
				var cssclass = 'jqx-widget-header';
				//if (theme != '') cssclass += ' jqx-widget-header-' + theme;
				columns[columns.length] = {pinned: true, exportable: false, text: "", columntype: 'number', cellclassname: cssclass, cellsrenderer: numberrenderer };
			}
			this.datafields[this.datafields.length] = { name: text };
			columns[columns.length] = { text: text, datafield: text, width: 100, align: 'center' };
		}

		this.source = {
			unboundmode: true,
			totalrecords: 100,
			datafields: this.datafields,
			localdata: this.sourceColumnsAB,
			external: null,
			updaterow: function (rowid, rowdata) {}
		};
		this.grid=$("#jqxgrid").jqxGrid({
			width:'90%',
			autoheight:true,
			source:this.source,
			editable: true,
			columnsresize: true,
			selectionmode: "multiplecellsadvanced",
			columns: columns,
			ready:function(){
				$('#jqxgrid').jqxGrid('autoresizecolumns');
			}
		});

		//$("#excelExport").jqxButton({ theme: theme });
		$("#excelExport").click(function () {
			$("#jqxgrid").jqxGrid('exportdata', 'xls', 'reference', false);
		});
	}
	
	componentDidUpdate() {
		this.sourceColumnsAB = [];
		if(this.props.additionAnalytics.length > 0) {
			this.renderTableSourceHeader();
			this.renderTableSourceBody();
			this.source.localdata = this.sourceColumnsAB;
			$("#jqxgrid").jqxGrid('updatebounddata');
			
		}
		
		if(this.props.isAdditionAnalyticsLoading) {
			console.log("should hide grid -- loadung");
			this.hide($("#jqxgrid"));
		}else {
			console.log("should show grid -- finishing loadung");
			this.show($("#jqxgrid"));
		}
	}
	
	renderTableSourceHeader() {
		//return an array of headers 
		var headers = Object.keys(this.props.additionAnalytics[0]);
		var i, tableHeaderObj = {};
		//return {A: "sys_name", B: "...", C:"...", .....}
		for(i=0; i<headers.length; i++) {
			var key = this.datafields[i].name;
			tableHeaderObj[key] = headers[i];
		}
		this.sourceColumnsAB.push(tableHeaderObj);
	}
	
	renderTableSourceBody() {
		//headers = ["sys_name", "Owner"]
		var headers = Object.keys(this.props.additionAnalytics[0]);
		var i,j;
		for(i=0; i<this.props.additionAnalytics.length; i++) {
			var tableContentObj={};
			for(j=0; j<headers.length; j++) {
				var key = this.datafields[j].name;
				//return {A: "sys_name", B: "...", C:"...", .....}
				var headerKey = headers[j];
				var value = this.props.additionAnalytics[i][headerKey];
				tableContentObj[key] = value;
			}
			this.sourceColumnsAB.push(tableContentObj);
		}
	}
	
	show(el) {
		el.css('display','block');
		setTimeout(()=> {
			el.css('opacity',1);
		},100)
	}
	
	hide(el) {
		el.css('opacity',0);
	}
	
	render() {
		const { additionAnalytics , isAdditionAnalyticsLoading} = this.props;
		var loadingNode;
		if(isAdditionAnalyticsLoading) {
			loadingNode = (<div className="loader">loading...</div>)
		}else {
			loadingNode = "";
		}
		return (
				<div>
					<div id='jqxWidget'>
						<div id="jqxgrid"></div>
			            <div id="excelExportContainer">
			                <input type="button" className="btn btn-default" value="Export to Excel" id='excelExport' />
			            </div>
					</div>
					{loadingNode}
				</div>
		)
	}
}
