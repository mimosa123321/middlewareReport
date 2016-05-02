import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MainOverview from './../components/MainOverview';

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
            	<MainOverview overviewLists={overviewLists} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(MainOverviewContainer)


	