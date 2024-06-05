import React, { useState, useEffect } from 'react';

function App() {
  const [dados, setDados] = useState(null);
  const [idAtual, setIdAtual] = useState(1);

  useEffect(() => {
    buscarDados(idAtual);
  }, [idAtual]);

  function buscarDados(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => response.json())
      .then(data => {
        setDados(data);
      })
      .catch(error => console.error('Erro ao buscar:', error));
  }

  function handleBotaoAnteriorClick() {
    if (idAtual > 1) {
      setIdAtual(prevId => prevId - 1);
    }
  }

  function handleBotaoProximoClick() {
    setIdAtual(prevId => prevId + 1);
  }

  function handleBotaoBuscarClick() {
    const id = parseInt(idAtual);
    if (!isNaN(id)) {
      setIdAtual(id);
    }
  }

  return (
    <div className="container">
      <div className="imagem">
        {dados && <img src={dados.image} alt="Imagem" id="imagem" />}
      </div>
      <div className="informacoes">
        {dados && (
          <>
            <h2 id="nome">{dados.name}</h2>
            <p id="status">Status: {dados.status}</p>
            <p id="especie">Espécie: {dados.species}</p>
            <p id="genero">Gênero: {dados.gender}</p>
            <p id="origem">Origem: {dados.origin.name}</p>
            <p id="localizacao">Localização: {dados.location.name}</p>
            <p id="criado">Criado em: {new Date(dados.created).toLocaleDateString('pt-BR')}</p>
            <p id="id">ID: {dados.id}</p>
          </>
        )}
      </div>
      <div className="lista">
        <h2>Episódios</h2>
        <ul>
          {dados && dados.episode.map((urlEpisodio, index) => {
            const numeroEpisodio = urlEpisodio.split("/").pop();
            return <li key={index}>Episódio: {numeroEpisodio}</li>;
          })}
        </ul>
      </div>
      <div className="botoes">
        <button id="anterior" onClick={handleBotaoAnteriorClick}>Anterior</button>
        <button id="proximo" onClick={handleBotaoProximoClick}>Próximo</button>
      </div>
      <div className="busca">
        <input type="number" id="entrada-id" placeholder="Buscar pelo ID" value={idAtual}
          onChange={(elemento) => setIdAtual(elemento.target.value)} />
        <button id="buscar" onClick={handleBotaoBuscarClick}>Buscar</button>
      </div>
    </div>
  );
}

export default App;
