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

export class ChampionDetail extends Component {
    constructor(props){
        super(props);
    }

    render() {
        var champion = this.props.champion;
        return(
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
    }
}

export const ChampionDetailContainer = connect(mapStateToProps, myAppActions)(ChampionDetail);