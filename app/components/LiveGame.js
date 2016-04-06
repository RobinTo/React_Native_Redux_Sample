import React, {
    StyleSheet,
    View,
    Component,
    Text,
    Image,
    TextInput,
    TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import * as myAppActions from '../actions/myAppActions';
import { ChampionListContainer } from '../components/ChampionList';

export class LiveGame extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    setSearchText(event){
        var text = event.event.nativeEvent.text; // Will this be the same on iOS? Most likely not?
        console.log("Searching for " + text);
        this.props.searchForLiveGameBySummonerName(text);
    }

    _onPressButton(){
        this.props.navigator.push({
            component: ChampionListContainer,
            props: {
            }
        });
    }

    render() {

        var liveGameParticipants = [];

        if(this.props.liveGame){
            for(var i in this.props.liveGame.participants){
                let participant = this.props.liveGame.participants[i];
                liveGameParticipants.push(<Text key={i}>{participant.summonerName}</Text>)
            }
        } else {
            liveGameParticipants.push(<Text style={{margin: 12}} key="2">No live game retrieved yet, search for a summonername in the text input field above.</Text>);
        }

        return(
            <View style={{flex: 1}}>
                <TouchableHighlight onPress={this._onPressButton.bind(this)}>
                    <View>
                        <Text>Press here to go to champion listview.</Text>
                    </View>
                </TouchableHighlight>
                <Text>Search for a live game:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onSubmitEditing={(event) => this.setSearchText({event})}
                />
                <Text>LiveGame</Text>
                {liveGameParticipants}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
});

function mapStateToProps(state, ownProps) {
    return {
        liveGame : state.liveGameReducer.liveGame
    }
}

export const LiveGameContainer = connect(mapStateToProps, myAppActions)(LiveGame);