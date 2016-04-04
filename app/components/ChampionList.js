import React, {
    StyleSheet,
    View,
    Component,
    Text,
    Image,
    ListView,
    TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import * as myAppActions from '../actions/myAppActions';
import { ChampionDetailContainer } from './ChampionDetail';

export class ChampionList extends Component {

    constructor(props){
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
    }

    componentDidMount(){
        this.props.getChampionData();
    }


    renderChampion(champion){
        var pressRow = function(champion){
            this.props.navigator.push({
                component: ChampionDetailContainer,
                props: {
                    champion
                }
            });
        }.bind(this);

        return (
            <TouchableHighlight onPress={() => pressRow(champion)}>
                <View style={styles.container}>
                    <Image
                        source={{uri: "http://ddragon.leagueoflegends.com/cdn/6.6.1/img/champion/" + champion.image.full}}
                        style={styles.thumbnail}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>{champion.name}</Text>
                        <Text style={styles.title}>{champion.title}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        // If champions doesn't exist
        if(!this.props.championReducer.champions){
            return (
                <View>
                    <Text>Loading champions...</Text>
                </View>
            );
        }
        // If champions exist.
        this.dataSource = this.dataSource.cloneWithRows(this.props.championReducer.champions);
        return(

            <ListView dataSource={this.dataSource} renderRow={this.renderChampion.bind(this)}/>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        championReducer: state.championReducer
    }
}

export const ChampionListContainer = connect(mapStateToProps, myAppActions)(ChampionList);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});