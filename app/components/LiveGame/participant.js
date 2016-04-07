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
import * as myAppActions from '../../actions/myAppActions';

export class Participant extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render() {

        let participant = this.props.participantData;
        return(
            <View style={{flex: 1}}>
                <Text>{participant.summonerName}</Text>
                <Text>{participant.championId}</Text>
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
    }
}

export const ParticipantContainer = connect(mapStateToProps, myAppActions)(Participant);