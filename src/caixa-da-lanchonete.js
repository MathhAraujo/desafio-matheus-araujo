class CaixaDaLanchonete {

    constructor() {
        this.valorDaCompra = 0.0;
        //Index do produto corresponde ao index de seu preço;
        this.produtos = ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"];
        this.precos = [3.0, 1.5, 6.2, 6.5, 2.0, 7.25, 9.5, 7.5];

    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        let itemAtual;

        //Checa se o parâmetro itens recebido é válido
        if (Array.isArray(itens) && itens.length > 0) {

            //Clona o array de itens e formata de forma que possa ser utilizado para saber se o item extra
            //possui o principal correspondente em qualquer posição do pedido
            let itensBackup = itens.slice();
            for (let i = 0; i < itensBackup.length; i++) {
                itensBackup[i] = itensBackup[i].substring(0, itensBackup[i].indexOf(","))
            }

            while (itens.length > 0) {
                //Divide o primeiro item do array de itens em dois elementos no array itemAtual, sendo o itemAtual[0] o nome do produto
                // e o itemAtual[1] a quantidade
                itemAtual = itens.shift().split(",");

                //Checa se o item está na lista de produtos
                if (!this.produtos.includes(itemAtual[0])) {
                    return "Item inválido!";
                }

                //Checa se o item extra pedido possui o principal coorespondente no pedido
                if ((itemAtual[0] == "chantily" && !itensBackup.includes("cafe")) || (itemAtual[0] == "queijo" && !itensBackup.includes("sanduiche"))) {
                    return "Item extra não pode ser pedido sem o principal";
                }

                //Checa se a quantidade do item pedido é maior que zero
                if (itemAtual[1] <= 0) {
                    return "Quantidade inválida!";
                }

                //Soma o valor já salvo com o valor do produto atual, multiplicado pela sua quantidade
                this.valorDaCompra += (this.precos[this.produtos.indexOf(itemAtual[0])] * itemAtual[1]);
            }

            //Checa o método de pagamento e calcula de acordo
            if (metodoDePagamento == "dinheiro") {
                this.valorDaCompra = this.valorDaCompra - ((this.valorDaCompra / 100) * 5);
            } else if (metodoDePagamento == "credito") {
                this.valorDaCompra = this.valorDaCompra + ((this.valorDaCompra / 100) * 3);
            } else if (metodoDePagamento == "debito") {
                this.valorDaCompra = this.valorDaCompra;
            } else {
                return "Forma de pagamento inválida!";
            }

            //Formata a mensagem final
            this.valorDaCompra = this.valorDaCompra;
            let msgFinal = "R$ " + this.valorDaCompra.toFixed(2);
            return msgFinal.replace(".", ",");

        } else {
            return "Não há itens no carrinho de compra!";
        }
    }
}

export { CaixaDaLanchonete };
