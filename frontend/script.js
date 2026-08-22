

//Para pegar uma api precisamos do url dela, como é uma api que eu mesmo criei(api local) eu pego o localhost, mas diferentes api externas tem diferentes urls
const API_URL = 'http://localhost:3000/livros'

// Elementos do HTML

const formLivro = document.querySelector('#form-livro')
const inputTitulo = document.querySelector('#titulo')
const inputAutor = document.querySelector('#autor')
const inputAno = document.querySelector('#ano')
const inputDisponivel = document.querySelector("#disponivel")
const listaLivros = document.querySelector("#lista-livros")
const botaoAtualizar = document.querySelector('#botao-atualizar')
const mensagem = document.querySelector('#mensagem')

//Essa variavel vai servir para indentificar se estamos ou não editando um livro
let livroEmEdicao = null

//FUNÇÂO GET
async function buscarLivros() {
    try{//meio que um pai do if else eu posso colocar tudo de if else que vai acontecer no try e caso nao acontece vai pro cath
        const resposta = await fetch(API_URL);//desparando uma requisição pra minha api
        if(!resposta.ok){//se eu nao tiver resposta correta com os dados correto
            throw new Error('Não foi possivel buscar os livros')
        }
        const livros = await resposta.json() //trasnformadno a resposta JSON para um objeto JavaScript

        //Envia os livros encontrado para a função responsavel pela exibição deles na tela
        mostrarLivros(livros)
    }catch(erro){
        //A função "mostrarMensagem" pode exibir mensagem diferentes
        mostrarMensagem(erro.message, 'erro') //Exibindo a mensagem erro
    }
}
//Função responsavel por exibir os livros
function mostrarLivros(livros){
    //Limpa a tabela antes de inserir,tipo um refresh, os dados ou seja (na da pra acumular)
    listaLivros.innerHTML = ''
    if(livros.length === 0){
        //Caso nao exista livro cadastrado, eu não consigo exibir nada ou seja mando uma mensagem falando que nao é possivel
        listaLivros.innerHTML = `
        <tr class="linha-vazia">
            <td colspan=6>
                Nenhum livro cadastrado
            </td>
        </tr>    
        `
        return
    }
    livros.forEach((livro) =>{//percorrendo o array de livros
        const linha = document.createElement('tr')
        linha.innerHTML = `
            <td>${livro.id}</td>
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.ano}</td>
            <td>
                <span class="${livro.disponivel ? 'disponivel' : 'indisponivel'}">
                    ${livro.disponivel ? 'Sim' : 'Não'}
                </span>
            </td>
            <td>
            <button class="botao botao-editar" onclick="editarLivro(${livro.id})"> Editar </button>
            <button class="botao botao-excluir" onclick="excluirLivro(${livro.id})"> Excluir </button>
            </td>

            `
            listaLivros.appendChild(linha)//cada livro novo que vier tem que ser colocado em baixo de todos os outros
    })
}








//FUNÇÂO POST
async function cadastrarLivro(event) {
    
    event.preventDefault() //Impede que o formulario recarregue a pagina inteira


    //Pega o que o usuario digitou e guarda para colocar na api
    const livro = {
        titulo: inputTitulo.value,
        autor: inputAutor.value,
        ano: Number(inputAno.value),
        disponivel: inputDisponivel.value === '1'
    }
    try{
    //Se existir um livro em edição vamos a função reposnsavel
    if(livroEmEdicao !== null){
        await atualziarLivros(livroEmEdicao, livro)
        return
    }

    //Fazendo uma requisição tipo POST enviando através do body, o livro que construimos acima
    const respota = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(livro)
    })
    if(!respota.ok){
        const erro = await resposta.josn()//caso de erro na requisção
        throw new Error(erro.message || 'Não foi possivel cadastrar o livro ')
    }
    //Se der tudo certo com o cadastramento do livro
    mostrarMensagem('Livro cadastrado com sucesso', 'sucesso')
    //Limpa os campos dos formulario apos o cadastro
    formLivro.requestFullscreen()
    //Atualizamos a lista de livros
    buscarLivros()
    }catch(erro){
        mostrarMensagem(erro.message, 'erro')
    }

}









//FUNÇÂO PUT
async function editarLivro(id){
    try{
        //Para editar um livro nos vamos fazer uma busca pelo id

        const resposta = await fetch(`${API_URL}/${id}`)//Aqui pegamos o livro que vamos alterar pelo id
        if(!resposta.ok){
            throw new Error('Livro não encontrado')
        }
        //Recebemos os dados do livro que desejamos alterar
        const livro = await resposta.json()//aqui armazenamos ele na variavel livro
        //Preenche o formulario com os dados atuais do livro, trazido do banco(eles serão colocados de volta nos inputs)
        inputTitulo.value = livro.titulo
        inputAutor.value = livro.autor
        inputAno.value = livro.ano
        inputDisponivel.value = livro.disponivel ? '1': '0'
        //Guarda o ID do livro que está sendo editado
        livroEmEdicao = id
        //Altera o texto do botão
        document.querySelector('#botao-salvar').textContent = 'Salvar alterações';

    }catch(erro){
        mostrarMensagem(erro.message, 'erro')
    }
}

async function atualziarLivros(id, livro){
    try{
        //Enviamos a requisição do tipo PUT contendo as informações a serem atualizadas
        const resposta = await fetch(`${API_URL}/${id}`,{
            method: 'PUT',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(livro)
        })
        //Caso não seja possivel realizar a atualização do livro trazemos a mensagem da api
        if(!resposta.ok){
            const erro= await resposta.json()
            throw new Error(erro.message || 'Não foi possivel atualizar o livro')
        }
        //Se a atualização funcionou normalmente
        mostrarMensagem('Livro atualizado com sucesso', 'sucesso')

        //a variavel volta a ser nula pois nao tem mais um livro sendo editado
        livroEmEdicao = null

        formLivro.reset()
        //voltamos o texto original do botao
        document.querySelector('#botao-salvar').textContent = 'Cadastrar livro'
        //E atualizamos a listagem dos livros
        buscarLivros()
    }catch(erro){
        mostrarMensagem(erro.message, 'erro')
    }
}

async function excluirLivro(id) {

    const confirmar = confirm('Deseja realmente excluir este livro?')
    if(!confirmar){
        return;
    }
    try{
        const resposta = await fetch(`${API_URL}/${id}`,{
            method: 'DELETE'
        })
        if(!resposta.ok){
            const erro= await resposta.json()
            throw new Error(erro.message || 'Não foi possivel excluir o livro')
        }    
        mostrarMensagem("Livro excluido com sucesso", 'sucesso')
        buscarLivros()
    }catch(erro){
        mostrarMensagem(erro.message, 'erro')
    }
}

function mostrarMensagem(texto, tipo){
    mensagem.textContent = texto
    mensagem.className = 'mensagem'
    if(tipo === 'sucesso'){
        mensagem.classList.add('mensagem-sucesso')
    }else{
        mensagem.classList.add('mensagem-erro')
    }
    setTimeout(()=>{
        mensagem.className = 'Mensagem'
        mensagem.textContent = '';
    }, 3000)
}
formLivro.addEventListener('submit', cadastrarLivro)
botaoAtualizar.addEventListener('click', buscarLivros)
buscarLivros()