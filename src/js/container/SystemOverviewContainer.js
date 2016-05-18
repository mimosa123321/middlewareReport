import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SystemNav from './../components/SystemNav'
import SystemOverview from './../components/SystemOverview'
import { changeSystemOption, getAllData, openAdditionAnalytics } from './../actions'

function mapStateToProps(state) {
    return {
    	systemNavLists: state.main.systemNavLists,
        systemAnalytics: state.main.systemAnalytics,
        systemAnalyticsHeader: state.main.systemAnalyticsHeader,
        isLoading: state.main.isLoading
    }
}


class SystemOverviewContainer extends Component {
	render() {
		const { systemNavLists, systemAnalytics, systemAnalyticsHeader, isLoading} = this.props
        return (
            <div className="systemOverviewContainer">
            	<SystemNav systemNavLists={systemNavLists}
                           onSystemNavClick={this.props.changeSystemOption}
                           onGetSystemAnalytic={this.props.getAllData} />
                <SystemOverview systemAnalytics={systemAnalytics}
            					systemAnalyticsHeader={systemAnalyticsHeader}
            					isLoading = {isLoading}
            					onAdditionLinkClick={this.props.getAllData}
            					onOpenAdditionAnalytics={this.props.openAdditionAnalytics}/>
            </div>
        );
    }
}

export default connect (
    mapStateToProps,
    { changeSystemOption, openAdditionAnalytics, getAllData }
)(SystemOverviewContainer)

