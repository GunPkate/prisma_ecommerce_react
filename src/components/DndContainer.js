import { Draggable, Droppable } from "react-beautiful-dnd";

export default function DndContainer({ dataList, classD }){
    return <div>
        {dataList? dataList.filter(x=>x.class === classD).map((x,index)=>
        <div>
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
          </div>
          ) : <></> }
    </div>
}