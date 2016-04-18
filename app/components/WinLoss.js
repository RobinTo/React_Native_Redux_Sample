import React, {
    StyleSheet,
    View,
    Component,
    Text
} from 'react-native';

export default class WinLoss extends Component {

    constructor(props){
        super(props);
    }

    render() {

        var winRateColor = "green";
        if(this.props.winRate < 50){
            winRateColor = "red";
        }

        return (
            <View style={{flex: 1, flexDirection:"row"}}>
                <Text style={this.props.textStyle}>W/L: </Text>
                <Text style={[this.props.textStyle, {color:"green"}]}>{this.props.wins}</Text>
                <Text style={this.props.textStyle}>/</Text>
                <Text style={[this.props.textStyle, {color:"red"}]}>{this.props.losses}</Text>
                <Text style={this.props.textStyle}> (</Text>
                <Text style={[this.props.textStyle, {color:winRateColor}]}>{this.props.winRate}%</Text>
                <Text style={this.props.textStyle}>)</Text>
            </View>
        )
    }

}