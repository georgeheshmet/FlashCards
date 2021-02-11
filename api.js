import AsyncStorage from '@react-native-async-storage/async-storage'

const FLASH_CARDS_KEY ='flashCardsApiKey'
dummyData={
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        },
        {
          question: 'What is a UI?',
          answer: 'The user interface.'
        },  
        {
          question: 'What is a CO?',
          answer: 'computer organization.'
        },	  
      ]
    },
    Coding: {
      title: 'Coding',
      questions: [
        {
          question: 'What is programming?',
          answer: 'wriring lines of text computer then turn to machine language.'
        },
         {
          question: 'What is .o file?',
          answer: 'object file.'
        },
        {
          question: 'three ways to do a loop?',
          answer: 'for while for-in'
        }	  
      ]
    }
  }

export const saveDummyData = async()=>{
       const data= JSON.stringify(dummyData)
       try {
        await AsyncStorage.setItem( FLASH_CARDS_KEY, data)
       }
       catch(e) {
           console.log("error detected ", e)
       }
}

export const getData = async()=>{
    try {
        let data = await AsyncStorage.getItem(FLASH_CARDS_KEY)
        //console.log("get dat areturns: ",data)
        /* if no data is there save dummy data */
        // if (data === null){
        //   saveDummyData()
        //   data =await AsyncStorage.getItem(FLASH_CARDS_KEY)
        // }
        const  FetchedData = JSON.parse(data)
        return {...FetchedData}
    }
    catch(e){
        console.log("error detected ", e)
        return
    }
}

export const saveCardtoDeck= async({question, answer}, DeckId)=>{
    try {
        const addedQuestion = {
            question :question,
            answer: answer
        }
        const oldData = await AsyncStorage.getItem(FLASH_CARDS_KEY)
        let newData= JSON.parse(oldData)
        if(newData[DeckId]){
            newData[DeckId].questions.push(addedQuestion)
        }
        else{
            newData[DeckId]={}
            newData[DeckId].questions=[]
            newData[DeckId].title = DeckId
        }
        newData[DeckId].questions.push(addedQuestion)
        newData = JSON.stringify(newData)
        await AsyncStorage.setItem(FLASH_CARDS_KEY, newData)
        
    }
    catch(e) {
        console.log("error when adding card ", e)
    }
}

export const saveNewDeck = async(DeckId) =>{
    try{
        const oldData = await AsyncStorage.getItem(FLASH_CARDS_KEY)
        let newData= JSON.parse(oldData)
        newData[DeckId]={}
        newData[DeckId].questions=[]
        newData[DeckId].title = DeckId
        newData = JSON.stringify(newData)
        await AsyncStorage.setItem(FLASH_CARDS_KEY, newData)
        return
    }  
    catch (e) {
        console.log("error when saving new deck ", e)
    } 
}