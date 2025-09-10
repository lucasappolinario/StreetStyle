let carrinho = [];

// ==========================
// Carrinho de Compras
// ==========================

document.querySelectorAll('.btn-comprar').forEach(button => {
    button.addEventListener('click', function () {
        const nomeProduto = this.parentElement.querySelector('h3').innerText;
        const precoProduto = this.parentElement.querySelector('.preco').innerText;

        // Cria o objeto do produto
        const produto = {
            nome: nomeProduto,
            preco: precoProduto
        };

        adicionarAoCarrinho(produto);
    });
});

// Função para adicionar ao carrinho
function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    atualizarCarrinho();
}

// Atualizar quantidade do carrinho
function atualizarCarrinho() {
    const quantidadeCarrinho = document.getElementById("quantidade-carrinho");
    quantidadeCarrinho.innerText = carrinho.length;
}

// Exibir carrinho
document.getElementById("abrirCarrinho").addEventListener('click', () => {
    document.getElementById("carrinhoModal").style.right = "0";
    exibirCarrinho();
});

// Fechar carrinho
document.getElementById("fecharCarrinhoModal").addEventListener('click', () => {
    document.getElementById("carrinhoModal").style.right = "-100%";
});

// Exibir produtos no carrinho
function exibirCarrinho() {
    const produtosCarrinho = document.getElementById("produtosCarrinho");
    const totalValor = document.getElementById("totalValor");

    produtosCarrinho.innerHTML = '';

    let total = 0;
    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} - ${item.preco}`;
        produtosCarrinho.appendChild(li);

        // Calcula o total
        total += parseFloat(item.preco.replace('R$', '').replace(',', '.'));
    });

    totalValor.innerText = total.toFixed(2).replace('.', ',');
}


// ==========================
// Barra de Pesquisa
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const inputPesquisa = document.getElementById("input-pesquisa");
    const produtos = document.querySelectorAll(".produto-card");

    inputPesquisa.addEventListener("input", () => {
        const termo = inputPesquisa.value.toLowerCase().trim();
        let encontrou = false;

        produtos.forEach(produto => {
            const titulo = produto.querySelector("h3").textContent.toLowerCase();
            const preco = produto.querySelector(".preco").textContent.toLowerCase();

            if (titulo.includes(termo) || preco.includes(termo)) {
                produto.style.display = "block";
                encontrou = true;
            } else {
                produto.style.display = "none";
            }
        });

        // Mostra aviso se não encontrar nada
        if (!encontrou && termo !== "") {
            if (!document.getElementById("aviso-pesquisa")) {
                const aviso = document.createElement("p");
                aviso.id = "aviso-pesquisa";
                aviso.textContent = "Nenhum produto encontrado.";
                aviso.style.color = "red";
                aviso.style.fontWeight = "bold";
                aviso.style.marginTop = "10px";
                inputPesquisa.insertAdjacentElement("afterend", aviso);
            }
        } else {
            const avisoExistente = document.getElementById("aviso-pesquisa");
            if (avisoExistente) avisoExistente.remove();
        }
    });
});
