import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SystemNav from './../components/SystemNav'
import SystemOverview from './../components/SystemOverview'
import { changeSystemOption, getAllData } from './../actions'

function mapStateToProps(state) {
    return {
    	systemNavLists: state.main.systemNavLists,
        systemAnalytics: state.main.systemAnalytics
    }
}


class SystemOverviewContainer extends Component {
	render() {
		const { systemNavLists, systemAnalytics} = this.props
        return (
            <div className="systemOverviewContainer">
            	<SystemNav systemNavLists={systemNavLists}
                           onSystemNavClick={this.props.changeSystemOption}
                           onGetSystemAnalytic={this.props.getAllData} />
                <SystemOverview systemAnalytics={systemAnalytics}/>
            </div>
        );
    }
}

export default connect (
    mapStateToProps,
    { changeSystemOption, getAllData }
)(SystemOverviewContainer)

