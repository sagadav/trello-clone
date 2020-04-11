import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import Card from './components/Card'
import { DragDropContext, Droppable} from 'react-beautiful-dnd';
import AddButton from "./components/AddButton";
import {dnd} from "./actions/listActions";

function App(props) {

    let dragEnd = (result) => {
        let { destination, source} = result
        if (!destination) {
            return;
        }
        props.dnd({
            droppableIdStart: source.droppableId,
            droppableIdEnd: result.destination.droppableId,
            droppableIndexStart: source.index,
            droppableIndexEnd: destination.index,
            type: result.type
        })
    }
  return (
      <DragDropContext onDragEnd={dragEnd}>
          <Droppable droppableId="all-lists" isCombineEnabled direction="horizontal" type="list">
              {provided =>
      <div className='lists' {...provided.droppableProps}
           ref={provided.innerRef}>
                  {props.list.map((card, i) =>
                          <Card key={`${i}-${card.id}`} title={card.title} id={card.id} cards={card.cards}
                          index_list={i}/>
                      )}
          {provided.placeholder}
          <AddButton list/>

       </div>
              }
          </Droppable>

      </DragDropContext>
  );
}

let mapStateToProps = state => ({
    list: state
})
const mapDispatchToProps = (dispatch) => {
    return {
        dnd: (text) => {
            dispatch(dnd(text))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
