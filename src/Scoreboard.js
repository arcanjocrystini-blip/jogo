export default function Scoreboard({
  pokemon1,
  pokemon2,
  placar1,
  placar2,
  empates
}) {
  return (
    <div className="scoreboard">

      <h2>Placar</h2>

      <div className="score-item">
        {pokemon1 ? (
          <>
            <img
              src={pokemon1.sprites.front_default}
              alt={pokemon1.name}
              width="50"
              height="50"
            />
            <p>
              <strong>{pokemon1.name}</strong>: {placar1}
            </p>
          </>
        ) : (
          <p>Jogador 1: {placar1}</p>
        )}
      </div>

      <div className="score-item">
        {pokemon2 ? (
          <>
            <img
              src={pokemon2.sprites.front_default}
              alt={pokemon2.name}
              width="50"
              height="50"
            />
            <p>
              <strong>{pokemon2.name}</strong>: {placar2}
            </p>
          </>
        ) : (
          <p>Jogador 2: {placar2}</p>
        )}
      </div>

      <div className="score-item">
        <p>
          <strong>Empates:</strong> {empates}
        </p>
      </div>

    </div>
  );
}