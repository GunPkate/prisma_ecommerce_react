import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


export default function DashboardMain (){
  const startMessage = [
    {
      id: "1",
      subid: "11",
      title: "todo",
      message: "start", 
    },
    {
      id: "2",
      subid: "12",
      title: "todo",
      message: "End", 
    }
  ]

  const dragEnd = () =>{
    
  }
  return <>
    <DragDropContext onDragEnd={dragEnd()} >
      {startMessage? startMessage.map((x,indexMain)=>{
        return <>
          <Droppable droppableId = {x.id} index = {indexMain}>
            {(provided,indexD1)=>
              <div 
                ref = {provided.innerRef}
                {...provided.droppableProps}
              >
                <Draggable draggableId={x.subid} key={x.subid} index={indexD1}>
                {(provided)=>
                  <div style={{background:"salmon"}}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                      <div > {x.title} </div>
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