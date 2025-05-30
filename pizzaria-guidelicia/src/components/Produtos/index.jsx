import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

// Componente Produto
const Produto = ({ nome, preco, imagem, descricao, onComprar }) => (
  <div className="produto">
    <img src={imagem} alt={nome} />
    <div className="descricao-e-preco">
      <h2>{nome}</h2>
      {descricao && <p>{descricao}</p>}
      <p className="preco">{preco}</p>
      <button className="btn-comprar" onClick={onComprar}>
        Comprar
      </button>
    </div>
  </div>
);

const Produtos = () => {
  const navigate = useNavigate();
  const [mostrarSalgadas, setMostrarSalgadas] = useState(false);
  const [mostrarDoces, setMostrarDoces] = useState(false);
  const [mostrarBebidas, setMostrarBebidas] = useState(false);

  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
    alert('Seu produto foi adicionado ao carrinho !')
  };

  const removerDoCarrinho = (index) => {
    setCarrinho(carrinho.filter((_, i) => i !== index));
  };

  // FUNÇÃO CORRIGIDA
  const finalizarPedido = () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    navigate("/finalizar", { state: { carrinho } });
  };

  const precoParaNumero = (precoStr) => {
    return parseFloat(precoStr.replace("R$", "").replace(",", ".").trim()) || 0;
  };

  const total = carrinho.reduce((acc, item) => acc + precoParaNumero(item.preco), 0);

  const totalFormatado = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="produtos-container">
      <div
        className="carrinho-topo"
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          cursor: "pointer",
          background: "#eee",
          padding: "10px 15px",
          borderRadius: "5px",
          zIndex: 1000,
          boxShadow: "0 0 5px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onClick={() => setMostrarCarrinho(!mostrarCarrinho)}
      >
        <span className="material-icons" style={{ fontSize: 24, color: "#333" }}>
          shopping_cart
        </span>
        <span>{carrinho.length}</span>
      </div>

      {mostrarCarrinho && (
        <div
          className="painel-carrinho"
          style={{
            position: "fixed",
            top: 60,
            right: 20,
            width: 320,
            maxHeight: "70vh",
            overflowY: "auto",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 15,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            zIndex: 999,
          }}
        >
          <h3>Seu Carrinho</h3>
          {carrinho.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            <>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {carrinho.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                      borderBottom: "1px solid #eee",
                      paddingBottom: 8,
                    }}
                  >
                    <div>
                      <strong>{item.nome}</strong>
                      <p style={{ margin: 0 }}>{item.preco}</p>
                    </div>
                    <button
                      onClick={() => removerDoCarrinho(index)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        padding: "4px 8px",
                        cursor: "pointer",
                      }}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  marginBottom: 15,
                  textAlign: "right",
                  color: "#2980b9",
                }}
              >
                Total: {totalFormatado}
              </div>

              <button
                onClick={finalizarPedido}
                style={{
                  width: "100%",
                  background: "green",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Finalizar Pedido
              </button>
            </>
          )}
        </div>
      )}

      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <div className="product-section">
        <h1 id="linkpdt">NOSSOS PRODUTOS</h1>
        <p>
          Trabalhamos com pizzas artesanais, preparadas com ingredientes frescos e
          selecionados. Nossa especialidade são as pizzas clássicas e de sabores
          exclusivos, feitas com massa fininha e crocante. Todos os nossos preços
          são super acessíveis e garantimos a melhor qualidade no sabor! Venha
          experimentar a pizza dos seus sonhos!
        </p>

        <div className="botoes-categorias">
          <button onClick={() => setMostrarSalgadas(!mostrarSalgadas)}>
            {mostrarSalgadas ? "Ocultar" : "Mostrar"} Pizzas Salgadas
          </button>
          <button onClick={() => setMostrarDoces(!mostrarDoces)}>
            {mostrarDoces ? "Ocultar" : "Mostrar"} Pizzas Doces
          </button>
          <button onClick={() => setMostrarBebidas(!mostrarBebidas)}>
            {mostrarBebidas ? "Ocultar" : "Mostrar"} Bebidas
          </button>
        </div>

        <div className="produtos-grid">
          {mostrarSalgadas && (
            <>
              <Produto nome="Pizza de Portuguesa" preco="R$44,00" imagem="/assets/pizza_portuguesa.png" descricao="Molho de tomate, queijo mussarela, presunto, calabresa, ovos, azeitonas, pimentões e cebola." onComprar={() => adicionarAoCarrinho({ nome: "Pizza de Portuguesa", preco: "R$44,00" })} />
              <Produto nome="Pizza de Frango com Catupiry" preco="R$45,00" imagem="/assets/pizza_frango.png" descricao="Molho de tomate, mussarela, frango desfiado temperado e Catupiry." onComprar={() => adicionarAoCarrinho({ nome: "Pizza de Frango com Catupiry", preco: "R$45,00" })} />
              <Produto nome="Pizza de Calabresa" preco="R$42,00" imagem="/assets/pizzacalabresaoficial.png" descricao="Molho de tomate, mussarela, calabresa fatiada, cebola e orégano." onComprar={() => adicionarAoCarrinho({ nome: "Pizza de Calabresa", preco: "R$42,00" })} />
              <Produto nome="Pizza de Marguerita" preco="R$40,00" imagem="/assets/pizzamargueritaoficial.png" descricao="Molho de tomate, mussarela, tomate fresco e manjericão." onComprar={() => adicionarAoCarrinho({ nome: "Pizza de Marguerita", preco: "R$40,00" })} />
              <Produto nome="Pizza de Bauru" preco="R$42,00" imagem="/assets/pizza_bauru.png" descricao="Presunto, queijo mussarela, tomate e orégano." onComprar={() => adicionarAoCarrinho({ nome: "Pizza de Bauru", preco: "R$42,00" })} />
              <Produto nome="Pizza de Brócolis" preco="R$49,00" imagem="/assets/pizza_brocolis.png" descricao="Brócolis frescos, bacon crocante e catupiry." onComprar={() => adicionarAoCarrinho({ nome: "Pizza de Brócolis", preco: "R$49,00" })} />
            </>
          )}

          {mostrarDoces && (
            <>
              <Produto nome="Pizza de Prestígio" preco="R$48,00" imagem="/assets/pizzaprestigiooficial.png" descricao="Chocolate cremoso, coco ralado e leite condensado." onComprar={() => adicionarAoCarrinho({ nome: "Pizza de Prestígio", preco: "R$48,00" })} />
              <Produto nome="Pizza de Romeu e Julieta" preco="R$45,00" imagem="/assets/pizza_romeuejulieta.png" descricao="Mussarela com goiabada. Doce e salgada na medida certa." onComprar={() => adicionarAoCarrinho({ nome: "Pizza de Romeu e Julieta", preco: "R$45,00" })} />
              <Produto nome="Pizza de Brigadeiro" preco="R$44,00" imagem="/assets/pizzabrigadeirooficial.png" descricao="Brigadeiro cremoso com granulado de chocolate." onComprar={() => adicionarAoCarrinho({ nome: "Pizza de Brigadeiro", preco: "R$44,00" })} />
              <Produto nome="Pizza de chocolate com morango" preco="R$48,00" imagem="/assets/pizzamorango.png" descricao="Um delicioso creme de avelã com morangos picados" onComprar={() => adicionarAoCarrinho({ nome: "Pizza de chocolate com morang", preco: "R$448,0" })} />
              <Produto nome="Pizza de Bis de chcolate" preco="R$48,00" imagem="/assets/pizzabis.png" descricao="Um delicioso creme de chocolate ao leite derretido com Bis picados" onComprar={() => adicionarAoCarrinho({ nome: "Pizza de Bis de chocolate", preco: "R55,00" })} />
              <Produto nome="Pizza de nutella com confete" preco="R$58,00" imagem="/assets/pizzaconfete.png" descricao="Uma massa deliciosa recheada de nutella e confete espalhados" onComprar={() => adicionarAoCarrinho({ nome: "Pizza de nutella com confete", preco: "R58,00" })} />
            </>
          )}

          {mostrarBebidas && (
            <>
              <Produto nome="Lata de Coca-Cola 350ml" preco="R$3,50" imagem="/assets/coca.png" onComprar={() => adicionarAoCarrinho({ nome: "Lata de Coca-Cola 350ml", preco: "R$3,50" })} />
              <Produto nome="Garrafa de Coca-Cola 2L" preco="R$10,50" imagem="/assets/coca2l (2).png" onComprar={() => adicionarAoCarrinho({ nome: "Garrafa de Coca-Cola 2L", preco: "R$10,50" })} />
              <Produto nome="Lata de Guaraná Antártica 350ml" preco="R$4,00" imagem="/assets/guarana.png" onComprar={() => adicionarAoCarrinho({ nome: "Lata de Guaraná Antártica 350ml", preco: "R$4,00" })} />
              <Produto nome="Garrafa de Pepsi 2L" preco="R$10,00" imagem="/assets/pepsi2l.png"onComprar={() => adicionarAoCarrinho({ nome: "Garrafa de Pepsi 2L", preco: "R$10,50" })} />
              <Produto nome="Garrafa de Fanta Laranja 2L" preco="R$9,90" imagem="/assets/fanta2l.png"onComprar={() => adicionarAoCarrinho({ nome: "Garrafa de Fanta Laranja 2L", preco: "R$9,90" })} />
              <Produto nome="Garrafa de Água Mineiral de 500 ml" preco="R$3,50" imagem="/assets/agua.png"onComprar={() => adicionarAoCarrinho({ nome: "Garrafa de Água Mineiral de 500 ml ", preco: "R$3,50" })} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Produtos;
