import useTasks from "../hooks/useTasks"
import Task from "./Task"

const TasksList = () => {

  const { tasks} = useTasks()

  return (
    <>
      <h2 className="text-secondary mb-3 fw-bold text-center border-bottom border-3 mx-5 pb-3">
        TasksList
      </h2>

      {
        tasks.length ? 
          (
              tasks.map( task => (
                <Task 
                  key={task._id}
                  task={task}
                />
              ))
          ) :
          (
            <p className="text-center text-secondary text-opacity-75 fw-bold fs-5 mt-4">
              No tasks yet
            </p>
          )
      }


    </>
  )
}

export default TasksList