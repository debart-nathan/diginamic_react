const Counter = ({ counter, onClickDecrement, onClickIncrement }) => {
  return (
    <section className="d-flex gap-2">
      <button
        onClick={() => { onClickDecrement(counter.id) }}
        className="btn btn-primary">-</button>
      <p className="btn btn-warning mb-0">{counter.value}</p>
      <button
        onClick={()=>{ onClickIncrement(counter.id)}}
        className="btn btn-primary" 
      >+</button>
    </section>
  );
}

export default Counter;