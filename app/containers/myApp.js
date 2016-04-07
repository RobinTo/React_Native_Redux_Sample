import React, { Component, View, Text, Navigator, BackAndroid } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as myAppActions from '../actions/myAppActions';
import { ChampionListContainer } from '../components/ChampionList';
import { LiveGameContainer } from '../components/LiveGame';

var _navigator;

class MyApp extends Component {
    constructor(props) {
        super(props);
    }

    _renderScene(route, navigator) {
        _navigator = navigator;
        var Component = route.component;
        return (
            <Component {...route.props} navigator={navigator} route={route} />
        );
    }

    componentDidMount(){
        //this.props.clearData();
        this.props.getStaticData();
    }

    render() {

        return(
            <View style={{flex:1, backgroundColor: '#F5FCFF'}}>
                <Navigator
                    initialRoute={{
                        component: LiveGameContainer,
                        props: {}
                    }}
                    renderScene={this._renderScene}
                />
            </View>
        );
    }
}

BackAndroid.addEventListener('hardwareBackPress', function() {
    if (!(_navigator.getCurrentRoutes().length === 1)) {
        _navigator.pop();
        return true;
    }
    return false;
});

function mapStateToProps(state, ownProps) {
    return {
        championReducer: state.championReducer
    }
}

export const MyAppContainer = connect(mapStateToProps, myAppActions)(MyApp);