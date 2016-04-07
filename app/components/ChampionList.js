import React, {
    StyleSheet,
    View,
    Component,
    Text,
    Image,
    ListView,
    TouchableHighlight,
    TextInput,
    ToastAndroid
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
        this.champions = [];
        var keys = Object.keys(this.props.champions),
            champions = [];
        for(var i = 0; i < keys.length; i++){
            var champion = this.props.champions[keys[i]];
            this.champions.push(champion);
        }
    }


    renderChampion(champion){
        var pressRow = function(champion){
            ToastAndroid.show('You pressed goTo ' + champion.name, ToastAndroid.LONG);
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

    setSearchText(search){
        let champions = this.champions;
        if(champions){
            let filteredChampions = champions.filter(function(c){
                return c.name.toLowerCase().indexOf(search.text.toLowerCase()) >= 0;
            });
            this.props.setFilteredChampions(filteredChampions);
        }
    }

    getFilteredOrChampions(){
        if(this.props.filteredChampions){
            return this.props.filteredChampions;
        } else {
            return this.props.champions;
        }
    }

    render() {
        // If champions doesn't exist
        if(!this.props.champions && !this.champions){
            return (
                <View>
                    <Text>Loading champions...</Text>
                </View>
            );
        }
        // If champions exist.
        this.dataSource = this.dataSource.cloneWithRows(this.getFilteredOrChampions());
        return(
            <View style={{flex: 1}}>
                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setSearchText({text})}
                />
                <ListView onChangeVisibleRows={this.testLog} dataSource={this.dataSource} renderRow={this.renderChampion.bind(this)}/>
            </View>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        champions: state.staticDataReducer.champions,
        filteredChampions : state.championReducer.filteredChampions
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