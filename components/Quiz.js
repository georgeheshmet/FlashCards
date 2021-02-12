import React from 'react'
import { StyleSheet,TextInput, Text, View, TouchableOpacity, Alert  } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome, Ionicons,MaterialIcons } from '@expo/vector-icons'
import { saveCardtoDeck} from '../api'

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

class Quiz extends React.Component{
    state={
        flipped:false,
        questionIndex:0,
        finished:false,
        questions:[],
        correct:0,
        inCorrect:0,
        unanswered:0,
        score:{},
        result:0,
        showResult:false
    }

    componentDidMount(){
        const { decks }=this.props
        const {DeckId } = this.props.route.params
        const { questions } = decks[DeckId]
        // console.log("questions are",questions[this.state.questionIndex].question)
        this.setState(()=>({questions: questions, flipped:false,finished:false, questionIndex:0}))

    }

    next=()=>{
        // console.log('next')
        let { questionIndex } =this.state
        if (questionIndex === this.state.questions.length-1){
            questionIndex=0
            this.setState(()=>({
                questionIndex: questionIndex,flipped:false,finished:true
            }))
        }
        else{
            questionIndex = questionIndex+1
            this.setState(()=>({
                questionIndex: questionIndex,flipped:false
            }))
        }
       
    }

    flipCard=()=>{
        this.setState((state)=>({
            flipped:!state.flipped
        }))
    }

    handleCorrect=()=>{
        let { questionIndex } =this.state
        if (questionIndex === this.state.questions.length-1){
            questionIndex=0
        }
        else{
            questionIndex = questionIndex+1
        }
        this.setState((state)=>({
            score: {...state.score, [this.state.questionIndex]: "Correct" },questionIndex: questionIndex,flipped:false
        }))
    }

    handleIncorrect=()=>{
        let { questionIndex } =this.state
        if (questionIndex === this.state.questions.length-1){
            questionIndex=0
        }
        else{
            questionIndex = questionIndex+1
        }
        this.setState((state)=>({
            score: {...state.score, [this.state.questionIndex]: "inCorrect" },questionIndex: questionIndex,flipped:false
        }))
    }


    seeResult=()=>{
        const { score } =this.state
        let result=0
        for (let question in Object.keys(score)){
            if(score[question] === 'Correct'){
                result= result+1
            }
        }
        this.setState(()=>({result:result,showResult:true}))
        console.log("result is",result)
    }

    render(){
        const { questionIndex,questions }= this.state
        // if(questionIndex === questions.length-1){
        //     this.setState(()=>({finished:true}))
        // }

        if(this.state.questions.length===0){
            return(
                <View style={{justifyContent:'center',alignContent:'center',flex:1}}>
                    <Text style={{fontSize:30}}>
                    Loading...
                    </Text>
                </View>

            )
        }
        return(
            
            <View style={{flex:1,justifyContent:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <View style={[styles.questionNo,{borderTopRightRadius:0 ,borderBottomRightRadius:0}]}>
                        <Text style={{fontSize:15,fontWeight:'bold'}}>
                        Question
                        </Text>
                    </View>   
                    <View style={[styles.questionNo,{borderTopLeftRadius:0 ,borderBottomLeftRadius:0}]}>
                        <Text style={{fontSize:15,color:'#0080FF',fontWeight:'bold'}}>
                            {`${questionIndex+1}/${questions.length}`}
                        </Text>
                    </View> 
                </View>
            
                <View style={styles.container}>
                    <View style={{flex:2,margin:5,borderColor: '#A0A0A0',backgroundColor:'#0080FF',  justifyContent:'center',borderRadius:75,width:150,height:150,alignItems:'center'}}>
                        <Ionicons   name="md-flash" size={80} color="white" />
                    </View>
                    {this.state.flipped===false?
                    <View  style={{flex:3,justifyContent:'center',alignContent:'center'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'black', fontSize:20}}>
                                {this.state.questions[this.state.questionIndex].question}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.Button} onPress={this.flipCard}>
                                <Text style={{color: 'white',fontSize:17}}>
                                    show answer
                                </Text>
                        </TouchableOpacity>
                    </View>:
                    //answer view
                    <View style={{flex:3,justifyContent:'center',alignContent:'center',marginTop:5}}>
                       {this.state.finished===false&&
                            <Text style={{color:'black', fontSize:20,marginTop:8}}>
                            {this.state.questions[this.state.questionIndex].answer}
                            </Text>
                        }
                        {this.state.finished===false&&<View style={{flexDirection:'row',justifyContent:'center'}}>
                            <TouchableOpacity onPress={this.handleCorrect} style={[styles.Button,{backgroundColor:'#66ff99'}]}>
                                    <Text style={{color: 'white',fontSize:17}}>
                                        Correct
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleIncorrect} style={[styles.Button,{backgroundColor:'#ff3385'}]}>
                                    <Text style={{color: 'white',fontSize:17}}>
                                        inCorrect
                                    </Text>
                            </TouchableOpacity>
                        </View>
                        }
                       {this.state.finished===false&&<TouchableOpacity style={[styles.Button,{padding:5,alignSelf:'center'}]} onPress={this.flipCard}>
                                <Text style={{color: 'white',fontSize:17}}>
                                    flip Card
                                </Text>
                        </TouchableOpacity>}                        
                        {this.state.finished ===false?
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                            <Text style={{fontWeight:'bold'}}>
                                Next
                            </Text>
                            <MaterialIcons onPress={this.next} style={styles.nextButton} name="navigate-next" size={30} color="black" />
                        </View>
                        :
                        <TouchableOpacity onPress={this.seeResult} style={[styles.Button,{backgroundColor:'#999999'}]}>
                        <Text style={{fontWeight:'bold',color:'white'}}>
                            see result
                        </Text>
                    </TouchableOpacity>}
                    </View>}
    

                </View>
            </View>
        )
    }
}

export default  connect(
    (state)=>(
        {
            decks:state
        }
    )
)(Quiz)