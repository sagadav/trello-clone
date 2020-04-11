import React, {useState} from 'react'
import {Button, TextField, Typography} from '@material-ui/core'
import {connect} from 'react-redux'
import {editCard, editList, deleteCard, deleteList} from "../actions/listActions";

function Title(props) {
    let [isEdit, changeIsEdit] = useState(false)
    let [text, updateText] = useState()
    let isList = props.list
    let OpenEdit = () => {
        if(text) {
            changeIsEdit(true)
        }
        else {
            updateText(props.title)
            changeIsEdit(true)
        }
    }
    let CloseEdit = () => {
        if(text) {
            if(props.list) {
                props.editList(text, props.id)
            } else {
                props.editCard(text, props.list_id, props.id)
            }
            changeIsEdit(false)
            updateText("")
        } else {

            changeIsEdit(false)
        }
    }
    return (
        <>
            {isEdit ?
                <div>
                <TextField id='title-text' autoFocus value={text} onChange={(e) => updateText(e.target.value)}
                           multiline onBlur={() => CloseEdit()} className={isList ? 'listField' : "cardField"}/>
                           <Button className='delete' onMouseDown={() => isList ? props.deleteList(props.id) : props.deleteCard(props.list_id, props.id)} >Удалить</Button>
                </div>
                :
            <Typography onClick={() => OpenEdit()} variant={isList ? "h5": "h6"} className={isList ? "titleList" : ""}>{props.title}</Typography>

            }
            </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        editCard: (text, list_id, id) => {
            dispatch(editCard(text, list_id, id))
        },
        editList: (text, id) => {
            dispatch(editList(text, id))
        },
        deleteCard: (list_id, id) => {
            dispatch(deleteCard(list_id, id))
        },
        deleteList: (list_id) => {
            dispatch(deleteList(list_id))
        },
    }
};
export default connect (null, mapDispatchToProps) (Title)