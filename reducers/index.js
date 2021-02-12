import { ADD_CARD, GET_ALL_FLASH_CARDS, ADD_DECK } from '../actions'

export default function flashCards (state={}, action) {

    switch(action.type){
        case ADD_CARD:
            console.log("action", action)
            return {...state, [action.DeckId]: {...state[action.DeckId], questions : state[action.DeckId].questions.concat(action.card)}}
        case GET_ALL_FLASH_CARDS:
            return {...state, ...action.flashCards}
        case ADD_DECK:
            return {...state, [action.DeckId] : {questions:[], title: action.DeckId}}
        }
        
    return state
}