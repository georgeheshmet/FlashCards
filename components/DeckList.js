import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { saveDummyData, getData, saveCardtoDeck, saveNewDeck } from '../api'
import { getAllFlashCards, add_card, addDeck } from '../actions'

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
        return(
            <View>
                <Text>
                    Decklist
                </Text>
                <TouchableOpacity  onPress={this.addCardNow}>
                    <Text>
                        add deck
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default connect(
    (state)=>{
        return {
            cards: state
        }
    }
)(DeckList)