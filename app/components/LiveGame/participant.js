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
import {getDeepOrDefault, iconsMap, capitalizeFirstLetter, divideOrDefault} from '../../utils';

export class Participant extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //this.props.getSummonerLeagueData("euw", this.props.participantData.summonerId);
        this.props.getSummonerChampionData("euw", this.props.participantData.summonerId);
    }

    render() {
        var pressRow = function(summonerId, champion){
            ToastAndroid.show('You pressed goTo ' + summonerId, ToastAndroid.LONG);
            this.props.navigator.push({
                component: SummonerDetailsContainer,
                props: {
                    summonerId,
                    champion
                }
            });
        }.bind(this);

        let participant = this.props.participantData;

        var league = capitalizeFirstLetter(getDeepOrDefault(this.props.summonerData, ["leagueData", 0, "tier"], "Unranked")),
            division = getDeepOrDefault(this.props.summonerData, ["leagueData", 0, "entries", 0, "division"], "");

        var championStats = getDeepOrDefault(this.props.summonerData, ["championData", "champions"], []),
            currentChampion = null;

        for(var i = 0; i < championStats.length; i++){
            if(championStats[i].id === this.props.champion.id){
                currentChampion=championStats[i];
            }
        }
        var wins = getDeepOrDefault(currentChampion, ["stats", "totalSessionsWon"], 0),
            losses = getDeepOrDefault(currentChampion, ["stats", "totalSessionsLost"], 0),
            total = wins+losses,
            winRate = (divideOrDefault(wins, total, 0)*100).toFixed(0),
            kills = divideOrDefault(getDeepOrDefault(currentChampion, ["stats", "totalChampionKills"], 0), total, 0).toFixed(2),
            assists = divideOrDefault(getDeepOrDefault(currentChampion, ["stats", "totalAssists"], 0), total, 0).toFixed(2),
            deaths = divideOrDefault(getDeepOrDefault(currentChampion, ["stats", "totalDeathsPerSession"], 0), total, 0).toFixed(2);

        var containerStyle = "container"+getDeepOrDefault(participant, ["teamId"], 0);

        return(
            <TouchableHighlight onPress={() => pressRow(participant.summonerId, this.props.champion)}>
                <View style={[styles.container, styles[containerStyle]]}>
                    <Image
                        source={iconsMap[league.toLowerCase()]}
                        style={styles.thumbnail}
                    />
                    <Image
                        source={{uri: "http://ddragon.leagueoflegends.com/cdn/6.6.1/img/champion/" + this.props.champion.image.full}}
                        style={styles.thumbnail}
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{participant.summonerName}</Text>
                        <Text style={styles.title}>{this.props.champion.name}</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.winRate}>{wins}/{losses} ({winRate}%)</Text>
                        <Text style={styles.kda}>{kills}/{assists}/{deaths}</Text>
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
        marginLeft: 1,
        marginBottom: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    container100: {
        borderLeftColor: "blue",
        borderLeftWidth: 3,
    },
    container200: {
        borderLeftColor: "red",
        borderLeftWidth: 3,
    },
    container0: {
        borderLeftColor: "black",
        borderLeftWidth: 3,
    },
    infoContainer: {
        paddingLeft: 8,
        flex: 1,
    },
    statsContainer: {
        paddingLeft: 8,
        width: 120,
    },
    thumbnail: {
        width: 40,
        height: 40,
    },
    name: {
        fontSize: 14,
        textAlign: 'left',
    },
    winRate: {
        fontSize: 14,
    },
    title: {
        fontSize: 11,
        textAlign: 'left',
    },
    kda: {
        fontSize: 11,
    },
});

function mapStateToProps(state, ownProps) {
    return {
        championListTemporary : state.staticDataReducer.champions,
        champion : state.staticDataReducer.champions[ownProps.participantData.championId.toString()],
        summonerData : state.summonerDataReducer.summonerData[ownProps.participantData.summonerId]
    }
}

export const ParticipantContainer = connect(mapStateToProps, myAppActions)(Participant);
