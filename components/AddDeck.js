import React from 'react'
import { StyleSheet,TextInput, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { saveDummyData, getData, saveCardtoDeck, saveNewDeck } from '../api'
import { getAllFlashCards, add_card, addDeck } from '../actions'

class AddDeck extends React.Component{
    state={
        newName:''
    }

    handlevalueChange=(value)=>{
        this.setState(()=>({newName: value}))
        console.log(value)
    }

    handleSubmit=()=>{
        const newDeckName= this.state.newName.trim()
        try {
            saveNewDeck(newDeckName) 
            this.props.dispatch(addDeck(newDeckName))
            this.setState(()=>({newName: ''}))
            this.props.navigation.navigate('All Decks')
        }
        catch(e){
            console.log("error saving deck")
        }
    }
    render(){
    return(
        <View style={styles.container}>

            <TextInput onChangeText ={this.handlevalueChange} value={this.state.newName} placeholder ={'Enter New deck name'} style={{backgroundColor: 'white',padding:15, margin:10, fontSize:20, borderColor: '#A0A0A0', borderWidth: 1, borderRadius:5}} />

            <TouchableOpacity style={styles.Button} onPress={this.handleSubmit}>
                <Text style={{fontSize:20, color:'white'}}>
                Add
                </Text>   
            </TouchableOpacity>
        </View>
    )
}
}


export default connect ()(AddDeck)
const styles = StyleSheet.create({
    container:{
        padding:10,
        margin:10,
        marginBottom:20,
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        // backgroundColor: 'white',
        borderRadius: 5

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
        alignSelf:'center',

        padding: 15
    }
})