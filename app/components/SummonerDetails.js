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
        //console.log("Summoner was defined:");
        //console.log(summoner);
        console.log(this.props.summonerData.leagueData);
        var jsonLeague = JSON.stringify(this.props.summonerData.leagueData),
            league = this.props.summonerData.leagueData[0].tier,
            division = this.props.summonerData.leagueData[0].entries[0].division;
        return(
            <View style={styles.container}>
                <Image
                    source={{uri: "http://ddragon.leagueoflegends.com/cdn/6.6.1/img/champion/" + this.props.champion.image.full}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.name}>{this.props.summonerId}</Text>
                    <Text>{league} {division}</Text>
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