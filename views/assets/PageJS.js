const toggleBtn = document.querySelector('.sidebar-toggle')
const sidebar = document.querySelector('.sidebar')
let countPaginas, paginaAtual, itemSelecionado, itensPorPagina = []

// Criacao dos itens
function criaItens(item, quantidade) {
    $('.itens').empty()
    const tamanhoPag = quantidade / 3
    if(tamanhoPag <= 1) {
        $('.paginacao').hide()
        for(let i = 0; i < quantidade; i++) {
            $('.itens').append(
                "<div class='container'>" +
                "<div class='circulo'>" + (i + 1) + "</div>" +
                "<div class='item'>Item " + item + (i + 1) + "</div>" +
                "</div>"
            )
        } 
    } else { 
        let paginas = 0, count = 0

        for(let i = 0; i < quantidade; i++) {
            count++
            if(count === 3) {
                paginas++
                count = 0
            }
        }

        if(tamanhoPag % 1 != 0) paginas++
        countPaginas = paginas

        itemSelecionado = item
        itensPorPagina = []
        let countItens = quantidade
        for(let i = 1; i < paginas + 1; i++) {
            if(countItens > 3) {
                itensPorPagina.push({
                    page: i,
                    itens: 3
                })
                
                countItens -= 3
            } else if(countItens === 3) {
                itensPorPagina.push({
                    page: i,
                    itens: 3
                })
                
                break
            } else {
                itensPorPagina.push({
                    page: i,
                    itens: countItens
                })

                break
            }
        }

        paginaAtual = 1
        for(let i = 0; i < 3; i++) {
            $('.itens').append(
                "<div class='container'>" +
                "<div class='circulo'>" + (i + 1) + "</div>" +
                "<div class='item'>Item " + item + (i + 1) + "</div>" +
                "</div>"
            )
        }

        $('.paginacao').show()
        $('.anterior').attr('disabled', true)
        $('.proximo').attr('disabled', false)
    }
}

// Abre ou Fecha a Barra Lateral
$('.sidebar-toggle').on('click', function () {
    toggleBtn.classList.toggle('is-closed')
    sidebar.classList.toggle('is-closed')
})

// Proxima pagina de item
$('.proximo').on('click', function () {
    if(paginaAtual < countPaginas) {
        $('.itens').empty()
        $('.anterior').attr('disabled', false)

        paginaAtual++

        let quantdItensNaPagina = 3 * paginaAtual - 3 + itensPorPagina[paginaAtual - 1].itens
        
        for(let i = quantdItensNaPagina - itensPorPagina[paginaAtual - 1].itens; i < quantdItensNaPagina; i++) {
            $('.itens').append(
                "<div class='container'>" +
                "<div class='circulo'>" + (i + 1) + "</div>" +
                "<div class='item'>Item " + itemSelecionado + (i + 1) + "</div>" +
                "</div>"
            )
        }

        if(paginaAtual == countPaginas) $('.proximo').attr('disabled', true)
    }
})

// Volta Pagina de Item
$('.anterior').on('click', function () {
    if(paginaAtual > 1) {
        $('.itens').empty()
        $('.anterior').attr('disabled', false)

        paginaAtual--

        let quantdItensNaPagina = 3 * paginaAtual - 3 + itensPorPagina[paginaAtual - 1].itens
        for(let i = quantdItensNaPagina - itensPorPagina[paginaAtual - 1].itens; i < quantdItensNaPagina; i++) {
            $('.itens').append(
                "<div class='container'>" +
                "<div class='circulo'>" + (i + 1) + "</div>" +
                "<div class='item'>Item " + itemSelecionado + (i + 1) + "</div>" +
                "</div>"
            )
        }
        if(paginaAtual == 1) $('.anterior').attr('disabled', true)
        if(paginaAtual < countPaginas) $('.proximo').attr('disabled', false)
    }
})

// Listener do Select, esperando a Definição do tipo de Item
$('.select').on('change', function () {
    const quantidade = parseInt($('#quantidade').val())
    if (quantidade.toString() === 'NaN' || quantidade < 1) {
        $('.paginacao').hide()
        $('.itens').hide()
        $('#quantidade')[0].style.backgroundColor = 'red'
        $(".select").val("0")
        return alert('Quantidade inválida, digite um numero maior que 0')
    }

    $('#quantidade')[0].style.backgroundColor = ''

    if ($('.select').val() === '1') {
        $('.itens').show()
        // Criando Item
        criaItens('A', quantidade)
    } else if ($('.select').val() === '2') {
        $('.itens').show()
        // Criando Item
        criaItens('B', quantidade)
    } else {
        $('.paginacao').hide()
        $('.itens').hide()
        $('#quantidade')[0].style.backgroundColor = 'red'
        $(".select").val("0")
        alert('Seleção inválida, Favor Selecionar outra opção')
    }
})

// Fecha a Side Bar se clicar fora
$(document).click(function (e) {
    const check = $(e.target).prop('className').split(' ')
    if (check[0] !== 'sidebar' && check[0] !== 'sidebar-toggle' && check[0] !== 'select') {
        if (toggleBtn.classList.length !== 2) {
            toggleBtn.classList.toggle('is-closed')
            sidebar.classList.toggle('is-closed')
        }
    }
})