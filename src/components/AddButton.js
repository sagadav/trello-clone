import React, {useState} from 'react'
import {Button ,TextField} from '@material-ui/core'
import {connect} from 'react-redux'
import {addCard, addList} from "../actions/listActions";


let AddButton = (props) => {
    let [formOpen, setFormOpen] = useState(false)
    let [text, updateText] = useState()
    let addList = () => {
        if(text) {
            props.addList(text)
            updateText("")
        }
    }
    let addCart = () => {
        if(text) {
            props.addCart(text, props.id)
            updateText("")
        }
    }
    let closeForm = () => {
        if (text) {
            if (props.list) {
                props.addList(text)
            }
            props.addCart(text, props.id)
            updateText("")
            setFormOpen(false)
        }
        else {
            setFormOpen(false)
        }
    }
    return (
        <>
        {formOpen ?
            <div className='row'>
                <TextField autoFocus value={text} onChange={(e) => updateText(e.target.value)}
                           multiline onBlur={() => closeForm()} variant='outlined' label={props.list ? 'Новый список'
                : 'Новая карточка'}>
                </TextField>
                <Button onMouseDown={props.list ? () => addList() : () => addCart()} className='add'
                variant='outlined'>{props.list ? 'Добавить список' : "Добавить карточку"} </Button>
            </div>

        :         <Button onClick={() => setFormOpen(true)} className='add'
                          variant='outlined'>{props.list ? 'Добавить список' : "Добавить карточку"}
                  </Button>
        }
            </>
        )
}
const mapDispatchToProps = (dispatch) => {
    return {
        addList: (text) => {
            dispatch(addList(text))
        },
        addCart: (text, id) => {
            dispatch(addCard(text, id))
        }
    }
};
export default connect (null, mapDispatchToProps) (AddButton)