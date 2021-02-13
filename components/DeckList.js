import React from 'react'
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { saveDummyData, getData, saveCardtoDeck, saveNewDeck } from '../utils/api'
import { getAllFlashCards, add_card, addDeck } from '../actions'
import DeckPreview from './DeckPreview'
import { setLocalNotification } from '../utils/notificationsHelper'
class DeckList extends React.Component{
    componentDidMount(){
        getData().then((flashCards)=>this.props.dispatch(getAllFlashCards(flashCards))).then(()=>(
        setLocalNotification()))

    }
    addCardNow=()=>{
        const question={
            question :"NO?",
            answer: "NO!"
        }
        // console.log("here we go")
        this.props.dispatch(addDeck('angular'))
    }

    renderItem=(deck)=>{
        // console.log("inside render",deck)
        const { Decks }=this.props
        const noCards = Decks[deck.item].questions.length
        return(
            <DeckPreview  DeckId={deck.item} noCards={noCards} navigation={this.props.navigation}/>
        )
    }
    render(){
        // console.log(this.props)
        const { Decks }=this.props
        return(
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Deck names
                </Text>
                {/* add list view here (flat list) */}
                {/* {Object.keys(Decks).map((deck)=>{ */}
                    {/* const noCards = Decks[deck].questions.length */}
                    {/* return( */}
                    <FlatList data={Object.keys(Decks)} renderItem={this.renderItem} keyExtractor={deck=>deck}/>
                    {/* // <DeckPreview key={deck} DeckId={deck} noCards={noCards}/> */}
                    {/* ) */}
                {/* }) */}
                {/* } */}

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
        color:'#0080FF',
        fontSize: 40,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        fontWeight:'bold',
        marginTop:10,
        padding:10,
        borderColor: '#A0A0A0',
        // borderRadius:10,
        borderWidth: 1,
        // shadowColor: 'gray',
        // shadowOffset:{width: 2, height:2},
        // shadowRadius: 5,


    }
})
export default connect(
    (state)=>{
        return {
            Decks: state
        }
    }
)(DeckList)