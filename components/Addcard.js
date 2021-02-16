import React from 'react'
import { StyleSheet,TextInput, Text, View, TouchableOpacity, Alert,Button  } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { saveCardtoDeck} from '../utils/api'
import { getAllFlashCards, add_card, addDeck } from '../actions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { askCameraAndlocationPermission} from '../utils/notificationsHelper'
import * as Location from 'expo-location'
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
        answer:'',
        scanned:false
    }
    componentDidMount(){
        askCameraAndlocationPermission()
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

    handleBarCodeScanned=(objx)=>{
        console.log("returned",objx)
        if(objx.type===256){
            this.setState(()=>({scanned:true, answer:objx.data}))
        }

    }

    setScanned=(val)=>{
        this.setState(()=>({scanned:val}))
    }

    barScan=async()=>{
        askCameraAndlocationPermission()
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        console.log("BAR CODE PERMISSION", status)

        // this.state.scanned=true
    }

    clearAnswer=()=>{
        this.setState(()=>({answer:''}))
    }

    getCurrentLocation=async()=>{
       const obx =await Location.getCurrentPositionAsync({accuracy:6})
       console.log(obx)
       this.setState(()=>({question:`lat: ${obx.coords.latitude}, long:${obx.coords.longitude}`}))
    }
    render(){
        return(
            <View style={{flex:1,justifyContent:'center'}}>
            <View >
                <TextInput onChangeText ={this.handlevalueChange} value={this.state.question} 
                placeholder ={'Question'} style={styles.Textarea} onChangeText ={this.handleQuestionChange} />
                <TextInput value={this.state.answer} 
                placeholder ={'Answer'} style={styles.Textarea}   />   
                <TouchableOpacity style={styles.Button} onPress={this.handleSubmit}>
                    <Text style={{fontSize:20, color:'white'}}>
                    Add Card
                    </Text>   
                </TouchableOpacity>          
                <TouchableOpacity style={styles.Button} onPress={this.clearAnswer}>
                    <Text style={{fontSize:20, color:'white'}}>
                    clear
                    </Text>   
                </TouchableOpacity>     
                <TouchableOpacity style={styles.Button} onPress={this.getCurrentLocation}>
                    <Text style={{fontSize:20, color:'white'}}>
                    getCurrentLocation
                    </Text>   
                </TouchableOpacity>   
            </View>
           
                    
                    {!this.state.scanned&&<BarCodeScanner
                    style={{alignSelf:'stretch',height:200}}
                      onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                      
                    />}
                    {this.state.scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setScanned(false)} />}
           
            
            </View>
        )
    }
}

export default connect()(AddCard)