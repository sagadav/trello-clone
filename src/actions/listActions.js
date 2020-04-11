import {CONST} from "./const";


export const addList = (text) => {
    return {
        type: CONST.ADD_LIST,
        payload: text
    }
}

export const addCard = (text, id) => {
    return {type: CONST.ADD_CARD, payload: {text: text, list_id: id}}
}

export const dnd = text => {
    return {type: CONST.DND, payload: text}
}


export const editCard = (text, list_id, id) => {
    return {type: CONST.EDIT_CARD_TITLE, payload: {text: text, list_id: list_id, id: id}}
}


export const editList = (text, id) => {
    return {type: CONST.EDIT_LIST_TITLE, payload: {text: text, id: id}}
}

export const deleteCard = (list_id, id) => {
    return {type: CONST.DELETE_CARD, payload: {list_id: list_id, id: id}}
}
export const deleteList = (list_id) => {
    return {type: CONST.DELETE_LIST, payload: {list_id: list_id}}
}

