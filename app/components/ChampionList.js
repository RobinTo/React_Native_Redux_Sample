import React, {
    StyleSheet,
    View,
    Component,
    Text,
    Image,
    ListView
} from 'react-native';


export default class ChampionList extends Component {
    constructor(props){
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
    }

    renderChampion(champion){
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: "http://ddragon.leagueoflegends.com/cdn/6.6.1/img/champion/" + champion.image.full}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.name}>Name: {champion.name}</Text>
                    <Text style={styles.title}>{champion.title}</Text>
                </View>
            </View>
        );
    }

    render() {
        this.dataSource = this.dataSource.cloneWithRows(this.props.champions);
        return(
            <ListView dataSource={this.dataSource} renderRow={this.renderChampion}/>
        );
    }
}

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