import { DragDropContext, Droppable } from "react-beautiful-dnd";


export default function DashboardMain (){
  const startMessage = [
    {
      id: 1,
      title: "todo",
      message: "start", 
    }
  ]

  const dragEnd = () =>{
    
  }
  return <>
    <DragDropContext onDragEnd={dragEnd()}>
      234      
      {startMessage? startMessage.map(x=>{
        return <>
          <div id = {x.id}>
            <div> {x.title} </div>
            <div> { x.message}  </div>
          </div>
        </>
      }) : <></> }
    </DragDropContext>
  </>
}