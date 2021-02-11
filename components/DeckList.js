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
                <Text >
                    Decklist
                </Text>
                <TouchableOpacity  onPress={this.addCardNow}>
                    <Text>
                        add deck
                    </Text>
                </TouchableOpacity>
                {Object.keys(Decks).map((deck)=>{
                    const noCards = Decks[deck].questions.length
                    return(
                    <DeckPreview DeckId={deck} noCards={noCards}/>
                    )
                })}

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        padding:10,
        margin:10,
        marginBottom:20,
        flex:1,
        backgroundColor: '#E0E0E0',

    }
})
export default connect(
    (state)=>{
        return {
            Decks: state
        }
    }
)(DeckList)