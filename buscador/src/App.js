import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';
import globoImg from './img/globo.png';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ""){
      alert("Preencha algum cep!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }
    catch{
      alert("Ops, erro ao buscar! Digite um cep válido!")
      setInput("")
    }
  }

  return (
    <div className="container">
      <img src={globoImg} alt='globo'></img>
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input 
          type="text"
          placeholder="Digite um cep..." 
          value={input}
          onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff'/>
        </button>
      </div>

      <main className="main">
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade: {cep.localidade}-{cep.uf}</span>
        <span>Estado: {cep.estado}</span>
        <span>Região: {cep.regiao}</span>
        <span>DDD: {cep.ddd}</span>

      </main>

      <footer>
        <div className='f1'>
          <h4>@Copyright</h4>
          <p>David Lins Dev</p>
          <p>Buscador CEP</p>
        </div>

        <div className='f2'>
          <h4>@APP React</h4>
          <p>Referencia api:</p>
          <p>viacep.com.br</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
