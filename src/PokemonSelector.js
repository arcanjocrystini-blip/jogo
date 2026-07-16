export default function PokemonSelector({
  nomePokemon1,
  nomePokemon2,
  setNomePokemon1,
  setNomePokemon2,
  carregarPokemons,
  erroPokemon
}) {

  return (
    <div>

      <h2>Escolha os Pokémon</h2>

      <input
        type="text"
        value={nomePokemon1}
        placeholder="Pokémon do Jogador 1"
        onChange={(e) =>
          setNomePokemon1(e.target.value)
        }
      />

      <input
        type="text"
        value={nomePokemon2}
        placeholder="Pokémon do Jogador 2"
        onChange={(e) =>
          setNomePokemon2(e.target.value)
        }
      />

      <button onClick={carregarPokemons}>
        Alterar Pokémon
      </button>

      {erroPokemon && (
        <p style={{ color: "red" }}>
          {erroPokemon}
        </p>
      )}

    </div>
  );

          }
