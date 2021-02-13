import React from 'react'
import { StyleSheet,TextInput, Text, View, TouchableOpacity, Alert  } from 'react-native'
import { connect } from 'react-redux'
import { setLocalNotification, clearLocalNotification} from '../utils/notificationsHelper'

const styles = StyleSheet.create({
    container:{
        padding:10,
        margin:10,
        marginBottom:20,
        marginLeft:40,
        marginRight:40,
        borderColor: '#A0A0A0',
        borderRadius:10,
        borderWidth: 1,
        backgroundColor: 'white',
        // flex:7,
        height:400,
        justifyContent:'space-between',
        alignItems: 'center'
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
    questionNo:
        {alignSelf:'center',borderWidth:1,borderColor:'#A0A0A0',borderRadius: 5, padding:10,minWidth:80},
    Button:{
        minWidth:100,
        backgroundColor: '#0080FF',
        borderRadius: 5,
        alignSelf:'stretch',
        padding: 5,
        margin :10,
        alignItems:'center',

    },
    nextButton:{margin:10,alignSelf:'flex-end',height:30,width:30, borderRadius:15,backgroundColor:'#0080FF'}
})



export default class extends React.Component {


    state={
        score:0
    }
    goToDeck=()=>{
        this.props.navigation.navigate('Deck details',{DeckId: this.props.DeckId})
    }

    restartQuiz =() =>{
        this.props.navigation.navigate('Quiz',{DeckId: this.props.DeckId})
        this.props.resetQuiz()
    }

    componentDidMount(){
        
            const { score } =this.props
            let result=0
            for (let question in Object.keys(score)){
                if(score[question] === 'Correct'){
                    result= result+1
                }
            }
            this.setState(()=>({
                score: Math.round(result*100/Object.keys(score).length)
            }))
            console.log("result is",result)
            clearLocalNotification()
            setLocalNotification()

        
    }
    render(){
    console.log(this.props)
    return(
        <View>
            <View style={{alignSelf:'center'}}>
                <Text style={{fontSize:25, fontWeight:'bold', color:'#0080FF'}}>
                    Score :{this.state.score}%
                </Text>
            </View>
            <View style={{flexDirection:'row',alignSelf:'center'}}>
                <TouchableOpacity onPress={this.goToDeck} style={[styles.Button,{backgroundColor:'#999999',padding:10,minWidth:120}]}>
                    <Text style={{fontWeight:'bold',color:'white',fontSize:18}}>
                        Go to deck
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.restartQuiz} style={[styles.Button,{backgroundColor:'#999999',padding:10, minWidth:120}]}>
                    <Text style={{fontWeight:'bold',color:'white',fontSize:18}}>
                        Restart quiz
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
}