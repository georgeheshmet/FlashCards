import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import DeckList from './DeckList'
import { FontAwesome,Entypo } from '@expo/vector-icons'
const styles = StyleSheet.create({
    container:{
        padding:10,
        margin:10,
        marginBottom:20,
        // flex:1,
        minHeight:100,
        flexDirection: 'row',
        alignItems: 'center',
        // borderColor: '#A0A0A0',
        // borderRadius:10,
        // borderWidth: 1,
        // backgroundColor: 'white',

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
    },
    Button:{
        backgroundColor: '#0080FF',
        borderRadius: 5,
        alignSelf:'stretch',
        padding: 15,
        margin:10
    },
    ButtonQuiz:{
        backgroundColor: '#b3b3b3',
        borderRadius: 5,
        alignSelf:'stretch',
        padding: 15,
        margin:10,
    
    }
})

class Deckview extends React.Component{


    addCard=()=>{
        this.props.navigation.navigate("Add card",{DeckId: this.props.route.params.DeckId})
    }

    goToQuiz=()=>{
        this.props.navigation.navigate("Quiz",{DeckId: this.props.route.params.DeckId})
    }
    render(){
    const { DeckId} = this.props.route.params
    console.log("deck view props",this.props.decks[DeckId])
    const noCards=this.props.decks[DeckId].questions.length
    return (
        <View style={{flex:1,justifyContent:'center'}}>
            <View style={styles.container}>
            <FontAwesome name="list-alt" size={80} color="black" />
            <Entypo name="flow-line" size={80} color="black" />
            <View style={[styles.deckInfo, styles.center]}>
                <View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'black',fontWeight:'bold'}}>
                            Deck name : 
                        </Text>
                        <Text style={{color:'#0080FF',fontWeight:'bold'}}>
                            {` ${DeckId}`}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'black',fontWeight:'bold'}}>
                            No of Cards:
                        </Text>
                        <Text style={{color:'#0080FF',fontWeight:'bold'}}>
                        {` ${noCards}`}
                        </Text>
                    </View>

                </View>

            </View>
            </View>   
            <TouchableOpacity style={styles.Button} onPress={this.addCard}>
                <Text style={{fontSize:20, color:'white'}}>
                Add FlashCard
                </Text>   
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonQuiz} onPress={this.goToQuiz}>
                <Text style={{fontSize:20, color:'white'}}>
                Take quiz!
                </Text>   
            </TouchableOpacity>
        </View>
    )
}
}

export default  connect(
    (state)=>({
        decks: state
    })
)(Deckview)