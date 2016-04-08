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
        this.props.getSpecificSummonerData("euw", this.props.summonerName);
    }

    render() {
        var summoner = this.props.summoner;

        if(!summoner || typeof summoner === "undefined" || summoner === null){
            return (
                <View>
                    <Text>Loading summoner data.</Text>
                </View>
            );
        }
        console.log("Summoner was defined:");
        console.log(summoner);
        return(
            <View style={styles.container}>
                <Image
                    source={{uri: "http://ddragon.leagueoflegends.com/cdn/6.6.1/img/champion/" + this.props.champion.image.full}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.name}>{summoner.name}</Text>
                    <Text style={styles.title}>{summoner.id}</Text>
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
        summoner : state.summonerDataReducer.summonerData[ownProps.summonerName]
    }
}

export const SummonerDetailsContainer = connect(mapStateToProps, myAppActions)(SummonerDetails);