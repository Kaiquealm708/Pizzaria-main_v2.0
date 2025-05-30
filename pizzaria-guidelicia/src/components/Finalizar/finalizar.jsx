import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FinalizarPedido = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const carrinho = location.state?.carrinho || [];

  const [formaPagamento, setFormaPagamento] = useState("");
  const [tipoRecebimento, setTipoRecebimento] = useState("");

  const taxaEntrega = 5.0; // valor fixo da entrega

  const confirmarCompra = () => {
    if (!tipoRecebimento) {
      alert("Por favor, selecione o tipo de recebimento.");
      return;
    }

    if (!formaPagamento) {
      alert("Por favor, selecione uma forma de pagamento.");
      return;
    }

    alert(
      `Compra confirmada!\nForma de pagamento: ${formaPagamento}\nRecebimento: ${tipoRecebimento}`
    );
    navigate("/", { replace: true });
  };

  const totalProdutos = carrinho.reduce((acc, item) => {
    const precoNum = parseFloat(item.preco.replace("R$", "").replace(",", "."));
    return acc + (isNaN(precoNum) ? 0 : precoNum);
  }, 0);

  const totalFinal = tipoRecebimento === "entrega" ? totalProdutos + taxaEntrega : totalProdutos;

  const formatarBRL = (valor) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Finalizar Pedido</h1>

      {carrinho.length === 0 ? (
        <p style={styles.vazio}>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div style={styles.section}>
            <h3>Resumo do Pedido</h3>
            <ul style={styles.lista}>
              {carrinho.map((item, i) => (
                <li key={i} style={styles.item}>
                  <span>{item.nome}</span>
                  <span>{item.preco}</span>
                </li>
              ))}
            </ul>
            <p>
              <strong>Total dos Produtos:</strong> {formatarBRL(totalProdutos)}
            </p>
          </div>

          <div style={styles.section}>
            <h3>Tipo de recebimento</h3>
            <select
              value={tipoRecebimento}
              onChange={(e) => setTipoRecebimento(e.target.value)}
              style={styles.select}
            >
              <option value="">-- Selecione --</option>
              <option value="retirada">Retirada no Local</option>
              <option value="entrega">Entrega (+{formatarBRL(taxaEntrega)})</option>
            </select>
          </div>

          <div style={styles.section}>
            <h3>Forma de Pagamento</h3>
            <select
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
              style={styles.select}
            >
              <option value="">-- Selecione --</option>
              <option value="pix">Pix</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao">Cartão de Crédito/Débito</option>
            </select>
          </div>

          <div style={styles.section}>
            <p style={styles.total}>
              <strong>Total Geral:</strong> {formatarBRL(totalFinal)}
            </p>

            <button onClick={confirmarCompra} style={styles.botao}>
              Confirmar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 30,
    maxWidth: 600,
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  lista: {
    listStyleType: "none",
    padding: 0,
    marginBottom: 10,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #ddd",
  },
  select: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  botao: {
    backgroundColor: "green",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
    fontSize: 16,
    marginTop: 10,
  },
  total: {
    fontSize: 18,
    marginTop: 10,
  },
  vazio: {
    textAlign: "center",
    color: "#666",
  },
};

export default FinalizarPedido;
