import { useState, useEffect } from "react";

import Board from "./Board";
import PokemonSelector from "./PokemonSelector";
import Scoreboard from "./Scoreboard";
import { BotaoReiniciar } from "./Reiniciar";

export default function App() {

  // ==========================
  // Estados do jogo
  // ==========================

  const [quadrados, setQuadrados] = useState(
    Array(9).fill(null)
  );

  const [jogador1, setJogador1] = useState(true);

  const [status, setStatus] = useState("");

  const [placar1, setPlacar1] = useState(0);
  const [placar2, setPlacar2] = useState(0);
  const [empates, setEmpates] = useState(0);

  const [historico, setHistorico] = useState([]);

  const [linhaVencedora, setLinhaVencedora] = useState([]);

  const [contraMaquina, setContraMaquina] = useState(false);

  const [maquinaJogando, setMaquinaJogando] =
    useState(false);

  // ==========================
  // Pokémon
  // ==========================

  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

  const [nomePokemon1, setNomePokemon1] =
    useState("pikachu");

  const [nomePokemon2, setNomePokemon2] =
    useState("bulbasaur");

  const [erroPokemon, setErroPokemon] =
    useState("");

  // ==========================
  // Buscar Pokémon
  // ==========================

  async function buscarPokemon(nome) {

    try {

      const resposta = await fetch(

        `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`

      );

      if (!resposta.ok) {

        throw new Error(
          "Pokémon não encontrado."
        );

      }

      return await resposta.json();

    } catch (erro) {

      throw new Error(erro.message);

    }

  }

  async function carregarPokemons() {

    try {

      setErroPokemon("");

      const p1 = await buscarPokemon(
        nomePokemon1
      );

      const p2 = await buscarPokemon(
        nomePokemon2
      );

      setPokemon1(p1);

      setPokemon2(p2);

    } catch (erro) {

      setPokemon1(null);

      setPokemon2(null);

      setErroPokemon(erro.message);

    }

  }

  // ==========================
  // Pokémon iniciais
  // ==========================

  useEffect(() => {

    carregarPokemons();

  }, []);

  // ==========================
  // Verificar vencedor
  // ==========================

  function calcularVencedor(tabuleiro) {

    const linhas = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < linhas.length; i++) {

      const [a, b, c] = linhas[i];

      if (
        tabuleiro[a] &&
        tabuleiro[a] === tabuleiro[b] &&
        tabuleiro[a] === tabuleiro[c]
      ) {

        return {
          vencedor: tabuleiro[a],
          linha: linhas[i]
        };

      }

    }

    if (tabuleiro.every(casa => casa !== null)) {

      return {
        vencedor: "EMPATE",
        linha: []
      };

    }

    return null;

  }

  // ==========================
  // Clique do jogador
  // ==========================

  function handleClick(posicao) {

    if (status !== "") return;

    if (maquinaJogando) return;

    if (quadrados[posicao] !== null) return;

    const novoTabuleiro = [...quadrados];

    const jogador = jogador1 ? "P1" : "P2";

    novoTabuleiro[posicao] = jogador;

    setQuadrados(novoTabuleiro);

    setHistorico(prev => [

      ...prev,

      {

        jogador,

        posicao,

        tabuleiro: [...novoTabuleiro]

      }

    ]);

    const resultado =
      calcularVencedor(novoTabuleiro);

    if (resultado) {

      setLinhaVencedora(resultado.linha);

      if (resultado.vencedor === "P1") {

        setStatus(`${pokemon1?.name} venceu!`);

        setPlacar1(prev => prev + 1);

      }

      else if (resultado.vencedor === "P2") {

        setStatus(`${pokemon2?.name} venceu!`);

        setPlacar2(prev => prev + 1);

      }

      else {

        setStatus("Empate!");

        setEmpates(prev => prev + 1);

      }

      return;

    }

    setJogador1(!jogador1);

  }

  // ==========================
  // Jogada da máquina
  // ==========================

  function jogarMaquina() {

    const livres = quadrados
      .map((valor, indice) =>
        valor === null ? indice : null
      )
      .filter(indice => indice !== null);

    if (livres.length === 0) {

      setMaquinaJogando(false);

      return;

    }

    const indice =
      livres[Math.floor(Math.random() * livres.length)];

    const novoTabuleiro = [...quadrados];

    novoTabuleiro[indice] = "P2";

    setQuadrados(novoTabuleiro);

    setHistorico(prev => [

      ...prev,

      {

        jogador: "P2",

        posicao: indice,

        tabuleiro: [...novoTabuleiro]

      }

    ]);

    const resultado =
      calcularVencedor(novoTabuleiro);

    if (resultado) {

      setLinhaVencedora(resultado.linha);

      if (resultado.vencedor === "P2") {

        setStatus(`${pokemon2?.name} venceu!`);

        setPlacar2(prev => prev + 1);

      }

      else if (resultado.vencedor === "EMPATE") {

        setStatus("Empate!");

        setEmpates(prev => prev + 1);

      }

      setMaquinaJogando(false);

      return;

    }

    setJogador1(true);

    setMaquinaJogando(false);

  }

  // ==========================
  // Efeito da máquina
  // ==========================

  useEffect(() => {

    if (!contraMaquina) return;

    if (status !== "") return;

    if (jogador1) return;

    if (maquinaJogando) return;

    setMaquinaJogando(true);

    const timer = setTimeout(() => {

      jogarMaquina();

    }, 500);

    return () => clearTimeout(timer);

  }, [jogador1, contraMaquina, status, maquinaJogando]);

  // ==========================
  // Reiniciar jogo
  // ==========================

  function reiniciarJogo() {

    setQuadrados(Array(9).fill(null));

    setJogador1(true);

    setStatus("");

    setLinhaVencedora([]);

    setHistorico([]);

    setMaquinaJogando(false);

  }

  // ==========================
  // Desfazer jogada
  // ==========================

  function desfazerJogada() {

    if (historico.length === 0) return;

    if (maquinaJogando) return;

    const novoHistorico = [...historico];

    novoHistorico.pop();

    if (novoHistorico.length === 0) {

      setQuadrados(Array(9).fill(null));

      setHistorico([]);

      setJogador1(true);

      setStatus("");

      setLinhaVencedora([]);

      return;

    }

    const ultimaJogada =
      novoHistorico[novoHistorico.length - 1];

    setQuadrados([...ultimaJogada.tabuleiro]);

    setHistorico(novoHistorico);

    setStatus("");

    setLinhaVencedora([]);

    setJogador1(
      ultimaJogada.jogador === "P2"
    );

  }

  return (
    <>

      <h1>Jogo da Velha Pokémon</h1>

      <PokemonSelector
        nomePokemon1={nomePokemon1}
        nomePokemon2={nomePokemon2}
        setNomePokemon1={setNomePokemon1}
        setNomePokemon2={setNomePokemon2}
        carregarPokemons={carregarPokemons}
        erroPokemon={erroPokemon}
      />

      <h2>

        {status !== ""
          ? status
          : `Vez de ${
              jogador1
                ? pokemon1?.name || "Jogador 1"
                : pokemon2?.name || "Jogador 2"
            }`}

      </h2>

      <Board
        quadrados={quadrados}
        handleClick={handleClick}
        pokemon1={pokemon1}
        pokemon2={pokemon2}
        linhaVencedora={linhaVencedora}
      />

      <br />

      <Scoreboard
        pokemon1={pokemon1}
        pokemon2={pokemon2}
        placar1={placar1}
        placar2={placar2}
        empates={empates}
      />

      <br />

      <button onClick={desfazerJogada}>
        Desfazer Jogada
      </button>

      {" "}

      <BotaoReiniciar
        reiniciarJogo={reiniciarJogo}
      />

      <br />
      <br />
                <h2>Histórico de Jogadas</h2>

      <ul>
        {historico.map((jogada, index) => (
          <li key={index}>
            Jogada {index + 1}:{" "}
            {jogada.jogador === "P1"
              ? pokemon1?.name || "Jogador 1"
              : pokemon2?.name || "Jogador 2"}{" "}
            na posição {jogada.posicao}
          </li>
        ))}
      </ul>

      <br />

      <label>
        <input
          type="checkbox"
          checked={contraMaquina}
          onChange={() => setContraMaquina(!contraMaquina)}
        />
        Jogar contra a máquina
      </label>

    </>
  );

}
