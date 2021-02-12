import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { saveDummyData, getData, saveCardtoDeck, saveNewDeck } from '../api'
import { getAllFlashCards, add_card, addDeck } from '../actions'
import DeckPreview from './DeckPreview'

class DeckList extends React.Component{
    componentDidMount(){
        getData().then((flashCards)=>this.props.dispatch(getAllFlashCards(flashCards)))

    }
    addCardNow=()=>{
        const question={
            question :"NO?",
            answer: "NO!"
        }
        console.log("here we go")
        this.props.dispatch(addDeck('angular'))
    }
    render(){
        console.log(this.props)
        const { Decks }=this.props
        return(
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Decklist
                </Text>
                {/* add list view here (flat list) */}
                {Object.keys(Decks).map((deck)=>{
                    const noCards = Decks[deck].questions.length
                    return(
                    <DeckPreview key={deck} DeckId={deck} noCards={noCards}/>
                    )
                })}

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        marginBottom:20,
        flex:1,
        backgroundColor: '#E0E0E0',

    },
    heading :{
        fontSize: 40,
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        fontWeight:'bold',
        margin:10,
        padding:10,
        borderColor: '#A0A0A0',
        borderRadius:10,
        borderWidth: 1,

    }
})
export default connect(
    (state)=>{
        return {
            Decks: state
        }
    }
)(DeckList)