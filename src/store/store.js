import {createStore} from "redux";
import {CONST} from '../actions/const'
import uuid from 'react-native-uuid'
let init

if (localStorage.getItem("list")) {
    init = JSON.parse(localStorage.getItem('list'))

} else {
    init = [
        {
            title: 'Пример списка',
            id: uuid.v1(),
            cards: [
                {
                    title: "Чтобы изменить название просто нажмите на него",
                    id: uuid.v1(),
                },
            ],
        }
    ]
}



let card = (state = init, action) => {
    switch (action.type) {
        case CONST.ADD_LIST:
            return  [
                ...state,
                {
                    title: action.payload,
                    cards: [],
                    id: uuid.v1(),
                }
            ]

        case CONST.ADD_CARD:
           state = state.map(list => {
                if (list.id === action.payload.list_id) {
                    return {
                        ...list,
                        cards:[
                            ...list.cards,
                            {
                                id: uuid.v1(),
                                title: action.payload.text
                            }
                        ]
                }

                } else {
                    return list
                }
            })
            return state

        case CONST.DND:
            let {droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, type} = action.payload

            if (type === 'card') {
                if(droppableIdStart === droppableIdEnd) {
                    let list = state.find(list => droppableIdStart === list.id)
                    let card = list.cards.splice(droppableIndexStart, 1)
                    list.cards.splice(droppableIndexEnd, 0,  {id: uuid.v1(), title: card[0].title})
                }
                else {
                    let start = state.find(list => droppableIdStart === list.id)
                    let card = start.cards.splice(droppableIndexStart, 1)
                    let end = state.find(list => droppableIdEnd === list.id)
                    end.cards.splice(droppableIndexEnd, 0, {id: uuid.v1(), title: card[0].title})
                }   }
                if(type === "list") {
                    let list = state.splice(droppableIndexStart, 1);
                    state.splice(droppableIndexEnd, 0, ...list);
                }
                return [...state]
        case CONST.EDIT_CARD_TITLE:
            let list = state.find(list => list.id === action.payload.list_id)
            list.cards[action.payload.id].title = action.payload.text
            return [...state]
        case CONST.DELETE_CARD:
            let listCard = state.find(list => list.id === action.payload.list_id)
            listCard.cards.splice(action.payload.id, 1)
            return [...state]
        case CONST.DELETE_LIST:
            state.splice(action.payload.list_id, 1)
            return [...state]
        case CONST.EDIT_LIST_TITLE:
            state[action.payload.id].title = action.payload.text
            return [...state]
        default:
            return state
    }
}

let store = createStore(card)
export default store

store.subscribe(() => localStorage.setItem("list", JSON.stringify(store.getState())))
// store.subscribe(())