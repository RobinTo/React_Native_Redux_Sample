import React, { Component, View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as myAppActions from '../actions/myAppActions';
import ChampionList from '../components/ChampionList';

class MyApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getChampionData();
    }

    render() {

        if(!this.props.championReducer.champions){
            return (
                <View>
                    <Text>Loading champions...</Text>
                </View>
            );
        }

        return(
            <ChampionList champions={this.props.championReducer.champions} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        championReducer: state.championReducer
    }
}

export const MyAppContainer = connect(mapStateToProps, myAppActions)(MyApp);