import { DragDropContext  } from "react-beautiful-dnd";
import {useState} from "react"
import DndContainer from "./DndContainer";

export default function DashboardMain (){

  const startMessage = [
    {
      id: "1",
      subid: "11",
      message: "start", 
      class: "todo"
    },
    {
      id: "2",
      subid: "12",
      message: "Middle", 
      class: "todo"
    },
    {
      id: "3",
      subid: "13",
      message: "End", 
      class: "todo"
    },
    {
      id: "4",
      subid: "14",
      message: "Done", 
      class: "done"
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
    <div >

    <DragDropContext onDragEnd={dragEnd} className="bg-gradient-primary">
        <div className="row">


        <div className="bg-gradient-primary col-5 mx-auto my-4 border rounded-lg" style={{ minHeight:"250px"}}>
          <div className="text-center">To Do</div>

              <div  >
                <DndContainer dataList={assignment} classD="todo"/>
              </div>

        </div>

        <div className="bg-gradient-warning col-5 mx-auto my-4 border rounded-lg" style={{  minHeight:"250px"}}>
          <div className="text-center">In Progress</div>

              <div>
                <DndContainer dataList={assignment} classD="ip"/>
              </div>

        </div>

        <div className="bg-gradient-success col-5 mx-auto my-4 border rounded-lg" style={{  minHeight:"250px"}}>
          <div className="text-center">Done</div>

              <div>
                <DndContainer dataList={assignment} classD="done"/>
              </div>

        </div>

        <div className="bg-gradient-info col-5 mx-auto my-4 border rounded-lg" style={{  minHeight:"250px"}}>
          <div className="text-center">Done</div>

              <div> To Do {assignment.filter(x=>x.class==="todo").length} </div>
              <div> In Progress {assignment.filter(x=>x.class==="ip").length} </div>
              <div> Done {assignment.filter(x=>x.class==="done").length} </div>

        </div>

        </div>
    </DragDropContext>
    
    </div>
  </>
}