export default function Square({
  valor,
  onClick,
  pokemon1,
  pokemon2,
  destaque
}) {

  let pokemon = null;

  if (valor === "P1") {
    pokemon = pokemon1;
  }

  if (valor === "P2") {
    pokemon = pokemon2;
  }

  return (
    <button
      className={`square ${destaque ? "winner" : ""}`}
      onClick={onClick}
    >
      {pokemon ? (
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width="55"
          height="55"
        />
      ) : null}
    </button>
  );
}
