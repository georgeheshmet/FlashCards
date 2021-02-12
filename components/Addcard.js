import React from 'react'
import { StyleSheet,TextInput, Text, View, TouchableOpacity, Alert  } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { saveCardtoDeck} from '../api'
import { getAllFlashCards, add_card, addDeck } from '../actions'

const styles=StyleSheet.create({
    Textarea: {
        backgroundColor: 'white',
        padding:15, 
        margin:10, 
        fontSize:20, 
        borderColor: '#A0A0A0', 
        borderWidth: 1, 
        borderRadius:5},
    Button:{
        backgroundColor: '#0080FF',
        borderRadius: 5,
        alignSelf:'stretch',
        padding: 15,
        margin :10,
        alignItems:'center'
    }
})

const createButtonAlert = (title,message) =>
Alert.alert(
  title,
  message,
  [

    { text: "OK", onPress: () => console.log("OK Pressed") }
  ],
  { cancelable: false }
);
class AddCard extends React.Component{
    state={
        question:'',
        answer:''
    }
    
    handleQuestionChange=(value)=>{
            this.setState(()=>({question: value}))
            console.log(value)       
    }

    handleAnswerChange=(value)=>{
        this.setState(()=>({answer: value}))
        console.log(value)       
    }
    
    handleSubmit=()=>{
        const { question, answer } =this.state
        if(question.length>2 && answer.length >2){
            const {DeckId } = this.props.route.params
            const { question, answer } = this.state
            const card ={question, answer}
           saveCardtoDeck({question, answer}, DeckId)
           this.props.dispatch(add_card(card, DeckId ))
           
           this.setState(()=>({answer: '',question:''}))
           this.props.navigation.goBack()
           createButtonAlert ("Great job!","FlashCard added successfully!")
        }
        else{
            createButtonAlert ('warning!','Please enter a valid question and answer')
        }
    }
    render(){
        return(
            <View>
                <TextInput onChangeText ={this.handlevalueChange} value={this.state.question} 
                placeholder ={'Question'} style={styles.Textarea} onChangeText ={this.handleQuestionChange} />
                <TextInput onChangeText ={this.handlevalueChange} value={this.state.answer} 
                placeholder ={'Answer'} style={styles.Textarea}   onChangeText ={this.handleAnswerChange}/>   
                <TouchableOpacity style={styles.Button} onPress={this.handleSubmit}>
                    <Text style={{fontSize:20, color:'white'}}>
                    Add Card
                    </Text>   
                </TouchableOpacity>            
            </View>
        )
    }
}

export default connect()(AddCard)