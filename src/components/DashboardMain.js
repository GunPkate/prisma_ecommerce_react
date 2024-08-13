import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {useState} from "react"

export default function DashboardMain (){

  const startMessage = [
    {
      id: "1",
      subid: "11",
      message: "start", 
    },
    {
      id: "2",
      subid: "12",
      message: "Middle", 
    },
    {
      id: "3",
      subid: "13",
      message: "End", 
    }
  ]
  const [assignment,setAssignment] = useState(startMessage);

  const dragEnd = (results) =>{
    const {destination, source, type} = results
    if(!destination){ return }
    if(source.droppableId === destination.droppableId && source.index === destination.index ){ return }
    if(type){
      const reOrderedItem = [...assignment];
      const sourceIndex = source.index
      const destinationIndex = destination.index

      console.log("sourceIndex",sourceIndex)
      const [removedItem] =  reOrderedItem.splice(sourceIndex,1)
      console.log("removedItem",removedItem)

      reOrderedItem.splice(destinationIndex,0,removedItem)
      console.log("reOrderedItem",reOrderedItem)
      return setAssignment(reOrderedItem);
    }
  }
  return <>
    <DragDropContext onDragEnd={dragEnd} >
      {assignment? assignment.map((x,index)=>{
        return <>
          <Droppable droppableId = {x.id}>
            {(provided)=>
              <div 
                ref = {provided.innerRef}
                {...provided.droppableProps}
              >
                <Draggable draggableId={x.subid} key={x.subid} index={index}>
                {(provided)=>
                  <div className="d-flex"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >

                      <div> { x.message}  </div>
                  </div> 
                }
                </Draggable>

                {provided.placeholder}
              </div>
            }
          </Droppable>
        </>
      }) : <></> }
    </DragDropContext>
  </>
}