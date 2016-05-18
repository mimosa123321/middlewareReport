import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MainOverview from './../components/MainOverview';
import { getAllData, openAdditionAnalytics } from './../actions';

function mapStateToProps(state) {
    return {
    	overviewLists: state.main.overviewLists
    }
}

class MainOverviewContainer extends Component {
	render() {
        const { overviewLists} = this.props;
        return (
            <div className="mainOverviewContainer">
            	<MainOverview overviewLists={overviewLists} onAdditionLinkClick={this.props.getAllData} onOpenAdditionAnalytics={this.props.openAdditionAnalytics}/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { getAllData, openAdditionAnalytics }
)(MainOverviewContainer)


	