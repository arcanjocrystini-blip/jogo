import Square from "./Square";

export default function Board({
  quadrados,
  handleClick,
  pokemon1,
  pokemon2,
  linhaVencedora
}) {

  function renderSquare(i) {
    return (
      <Square
        valor={quadrados[i]}
        onClick={() => handleClick(i)}
        pokemon1={pokemon1}
        pokemon2={pokemon2}
        destaque={linhaVencedora.includes(i)}
      />
    );
  }

  return (
    <>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>

      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>

      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
}