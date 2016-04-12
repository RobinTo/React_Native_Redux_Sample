import React, {
    StyleSheet,
    View,
    Component,
    Text,
    Image,
    ListView,
    TouchableHighlight,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import * as myAppActions from '../actions/myAppActions';
import {getDeepOrDefault, iconsMap, capitalizeFirstLetter, divideOrDefault} from '../utils';

export class SummonerDetails extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render() {
        var summoner = this.props.summonerData;
        if(!summoner || typeof summoner === "undefined" || summoner === null){
            return (
                <View>
                    <Text>Loading summoner data.</Text>
                </View>
            );
        }

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

        //console.log("Summoner was defined:");
        //console.log(summoner);
            return (<View style={styles.container}>
                <Image
                    source={{uri: "http://ddragon.leagueoflegends.com/cdn/6.6.1/img/champion/" + this.props.champion.image.full}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.name}>{this.props.summonerId}</Text>
                    <Text style={styles.title}>{league} {division}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF'
    },
    rightContainer: {
        flex: 1,
    },
    thumbnail: {
        width: 80,
        height: 80,
    },
    name: {
        fontSize: 20,
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
    }
});

function mapStateToProps(state, ownProps) {
    return {
        summonerData : state.summonerDataReducer.summonerData[ownProps.summonerId]
    }
}

export const SummonerDetailsContainer = connect(mapStateToProps, myAppActions)(SummonerDetails);