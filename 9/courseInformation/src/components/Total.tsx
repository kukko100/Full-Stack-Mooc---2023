interface TotalProps {
  total: number;
}

const Total = (props: TotalProps): JSX.Element => {
  return (
    <div>
      <h2> Number of exercises {props.total} </h2>
    </div>
  )
}

export default Total