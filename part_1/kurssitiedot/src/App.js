const Header = (props) => {
  //console.log(props.course.name)
  const name = props.course.name
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = (props) => {
  const name = props.name
  const exercises = props.exercises
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  const parts = props.course.parts
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  const parts = props.course.parts
  const sum = parts[0].exercises+parts[1].exercises+parts[2].exercises
  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: "Half Stack app dev",
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App