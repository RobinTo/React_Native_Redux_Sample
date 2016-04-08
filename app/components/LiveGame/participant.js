import React, {
    StyleSheet,
    View,
    Component,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    ToastAndroid
} from 'react-native';

import { connect } from 'react-redux';
import * as myAppActions from '../../actions/myAppActions';
import { SummonerDetailsContainer } from '../SummonerDetails';

export class Participant extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render() {
        var pressRow = function(summonerName, champion){
            ToastAndroid.show('You pressed goTo ' + summonerName, ToastAndroid.LONG);
            this.props.navigator.push({
                component: SummonerDetailsContainer,
                props: {
                    summonerName,
                    champion
                }
            });
        }.bind(this);

        let participant = this.props.participantData;
        return(
            <TouchableHighlight onPress={() => pressRow(participant.summonerName, this.props.champion)}>
                <View style={styles.container}>
                    <Image
                        source={{uri: "http://ddragon.leagueoflegends.com/cdn/6.6.1/img/champion/" + this.props.champion.image.full}}
                        style={styles.thumbnail}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>{participant.summonerName}</Text>
                        <Text style={styles.title}>{this.props.champion.name}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

function findChampion(championId, champions){
    return champions.filter((c) => {
        return c.id === championId
    });
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 4,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        paddingLeft: 8,
        flex: 1,
    },
    thumbnail: {
        width: 40,
        height: 40,
    },
    name: {
        fontSize: 20,
        textAlign: 'left',
    },
    title: {
        textAlign: 'left',
    },
});

function mapStateToProps(state, ownProps) {
    return {
        championListTemporary : state.staticDataReducer.champions,
        champion : state.staticDataReducer.champions[ownProps.participantData.championId.toString()]
    }
}

export const ParticipantContainer = connect(mapStateToProps, myAppActions)(Participant);