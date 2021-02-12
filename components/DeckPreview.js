import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'

const styles = StyleSheet.create({
    container:{
        padding:10,
        margin:10,
        marginBottom:20,
        flex:1,
        minHeight:100,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#A0A0A0',
        borderRadius:10,
        borderWidth: 1,
        backgroundColor: 'white',

    },
    deckInfo: {
        fontSize:30,
        padding:5,
        margin:10,
        flexDirection:'column',

    },
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerSelf:{
        alignSelf: 'center'
    }
})

export default class DeckPreview extends React.Component{
    goToDeck=()=>{
        const {DeckId, noCards} =this.props
        console.log("deck details",DeckId, noCards)
    }
    render(){
    const {DeckId, noCards} =this.props
    return (
        <TouchableOpacity style={styles.container} onPress={this.goToDeck}>
            <FontAwesome name="list-alt" size={80} color="black" />
            <View style={[styles.deckInfo, styles.center]}>
                <View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'black',fontWeight:'bold'}}>
                            Deck name : 
                        </Text>
                        <Text style={{color:'#0080FF'}}>
                            {` ${DeckId}`}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'black',fontWeight:'bold'}}>
                            No of Cards:
                        </Text>
                        <Text style={{color:'#0080FF'}}>
                        {` ${noCards}`}
                        </Text>
                    </View>

                </View>

            </View>
        </TouchableOpacity>
    )
}
}