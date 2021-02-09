export const ADD_CARD = 'ADD_CARD'
export const GET_ALL_FLASH_CARDS = 'GET_ALL_FLASH_CARDS'
export const ADD_DECK = 'ADD_DECK'
export const add_card = (card,DeckId) =>{
    return {
        type: ADD_CARD,
        DeckId,
        card
    }
}

export const getAllFlashCards = (flashCards) => {
    return {
        type: GET_ALL_FLASH_CARDS,
        flashCards
    }
}

export const addDeck = (DeckId) =>{
    return {
        type: ADD_DECK,
        DeckId
    }
}