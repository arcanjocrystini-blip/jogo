
function reiniciarJogo() {
  setQuadrados(Array(9).fill(null));
  setEstado(false);
  setStatus(null);

  setHistorico([]);
  setLinhaVencedora([]);
}