import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net-bs';
import MainOverviewContainer from './MainOverviewContainer';
import SystemOverviewContainer from './SystemOverviewContainer';
import AdditionOverviewContainer from './AdditionOverviewContainer';

export default class App extends Component {
    render() {
        return (
        	<div id="wrapper">
        	<MainOverviewContainer />
        	<SystemOverviewContainer />
                <AdditionOverviewContainer />
            </div>
        );
    }
}


