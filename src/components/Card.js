import {Card, CardContent} from '@material-ui/core'
import React from 'react'
import AddButton from "./AddButton";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Title from "./Title";

let CardList = (props) => {
    return (
        <Draggable draggableId={`${props.index_list}-${props.id}`} index={props.index_list}>
            {provided =>
                <div className='list' {...provided.draggableProps} {...provided.dragHandleProps}
                     ref={provided.innerRef}>
                    <Title list title={props.title} id={props.index_list} />
                    <Droppable type="card" isCombineEnabled  droppableId={String(props.id)}>
                        {(provided) =>
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {props.cards.map((card, i) =>
                                        <Draggable key={`${i}-${card.id}`} draggableId={String(`${i}-${card.id}`)} index={i}>
                                            {(provided) =>
                                                <Card  {...provided.draggableProps} {...provided.dragHandleProps}
                                                       ref={provided.innerRef} className='card'>
                                                <CardContent>
                                                        <Title list_id={props.id} id={i} title={card.title}/>
                                                </CardContent>
                                                </Card>
                                            }
                                        </Draggable>
                                    )}

                                {provided.placeholder}
                                <AddButton id={props.id}/>
                            </div>
                        }
                    </Droppable>
                </div>
            }
        </Draggable>
    )
}

export default CardList