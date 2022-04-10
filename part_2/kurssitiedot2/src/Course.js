const Course = ({ course }) => {
    const array = course.parts.map(part => part.exercises)
    //console.log(array)
    const sum = array.reduce((a, b) => a + b, 0)
  
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={sum}/>
      </div>
    )
  }
  
const Header = ({ course }) => <h2>{course}</h2>

const Content = ({ parts }) =>
<>
    {parts.map(part =>
    <Part key={part.id} part={part}/>
    )}
</>

const Part = ({ part }) => 
<p>
    {part.name} {part.exercises}
</p>

const Total = ({ sum }) => <strong>Total of {sum} exercises</strong>

export default Course