// lista dos pacotes
const PACOTES = [
  { id: 1, estilo: "rosa", tam: 4, medo: 3, selo: "Mais vendido", categoria: "Conversas", titulo: "Fala com ela", preco: 9.9,
    chamada: "Para quem está há semanas querendo mandar mensagem, mas continua pensando demais.",
    desc: "Receba um pacote de coragem para puxar assunto, responder um story, chamar para sair e finalmente mandar aquela mensagem que você está adiando." },
  { id: 2, estilo: "contorno", tam: 2, medo: 2, selo: "", categoria: "Conversas", titulo: "Parente chato", preco: 7.9,
    chamada: "Para sobreviver ao almoço de família sem perder a paciência.",
    desc: "Estratégias e respostas para perguntas inconvenientes, opiniões não solicitadas, provocações e aquele parente que simplesmente não sabe a hora de parar." },
  { id: 3, estilo: "preto", tam: 2, medo: 3, selo: "", categoria: "Dinheiro", titulo: "Cobrar o que é seu", preco: 8.9,
    chamada: "<strong>“Irmão, e aquele PIX?”</strong><br>Para quem está cansado de esperar e precisa cobrar alguém sem saber como falar.",
    desc: "Um pacote com abordagens para cobrar dinheiro, lembrar pagamentos e parar de ficar com vergonha de pedir o que é seu." },
  { id: 4, estilo: "claro", tam: 4, medo: 5, selo: "", categoria: "Trabalho e estudos", titulo: "Apresentação", preco: 9.9,
    chamada: "Para quem começa a tremer só de imaginar todos os olhos da sala olhando para você.",
    desc: "Um pacote para entrar na apresentação com mais segurança, controlar o nervosismo, começar a falar e não travar no meio do caminho." },
  { id: 5, estilo: "contorno", tam: 3, medo: 4, selo: "Mais completo", categoria: "Trabalho e estudos", titulo: "Peça um aumento", preco: 12.9,
    chamada: "Você trabalha mais. Você entrega mais. Agora falta coragem para falar sobre isso.",
    desc: "Prepare-se para aquela conversa com argumentos, formas de abordar seu chefe e maneiras de apresentar seu pedido com confiança." },
  { id: 6, estilo: "rosa", tam: 3, medo: 1, selo: "Menor preço", categoria: "Conversas", titulo: "Manda o áudio", preco: 5.9,
    chamada: "Você gravou. Ouviu. Apagou. Gravou de novo. Ouviu mais três vezes.<br><strong>Chega.</strong>",
    desc: "Para quem precisa de coragem de apertar enviar e parar de pensar demais." },
  { id: 7, estilo: "claro", tam: 2, medo: 5, selo: "Novo", categoria: "Relacionamentos", titulo: "Terminar o rolo", preco: 11.9,
    chamada: "Você já sabe que acabou. Só falta alguém dizer em voz alta.",
    desc: "Roteiros para encerrar uma situação sem drama, sem sumir e sem deixar ninguém sem resposta, com carinho e clareza." },
  { id: 8, estilo: "preto", tam: 2, medo: 3, selo: "", categoria: "Conversas", titulo: "Pedir desculpa", preco: 6.9,
    chamada: "Faz semanas que você sabe que errou e ainda não falou nada.",
    desc: "Frases para assumir o erro sem enrolar, sem se justificar demais e sem esperar o momento perfeito, que não existe." },
  { id: 9, estilo: "contorno", tam: 2, medo: 3, selo: "", categoria: "Limites", titulo: "Dizer não", preco: 7.9,
    chamada: "Você aceita tudo e depois reclama sozinho.",
    desc: "Formas educadas e firmes de recusar convites, pedidos e favores, sem culpa e sem pedir desculpa por existir." },
  { id: 10, estilo: "preto", tam: 4, medo: 5, selo: "Novo", categoria: "Trabalho e estudos", titulo: "Entrevista de emprego", preco: 14.9,
    chamada: "A vaga é boa. O frio na barriga também.",
    desc: "Prepare respostas para as perguntas difíceis, fale dos seus pontos fortes sem medo de parecer arrogante e chegue calmo à conversa." },
  { id: 11, estilo: "claro", tam: 2, medo: 2, selo: "", categoria: "Vida", titulo: "Ir sozinho", preco: 6.9,
    chamada: "Para quem só sai de casa se tiver companhia.",
    desc: "Coragem para ir ao cinema, ao restaurante ou viajar sem ninguém, e descobrir que o programa é melhor do que parecia." },
  { id: 12, estilo: "rosa", tam: 6, medo: 4, selo: "", categoria: "Vida", titulo: "Pedir ajuda", preco: 8.9,
    chamada: "Você carrega tudo sozinho e diz que está tudo bem.",
    desc: "Um pacote para reconhecer que precisa de ajuda, escolher a quem pedir e falar sem sentir que está incomodando." },
];

// funções que uso em vários lugares
const $ = (seletor) => document.querySelector(seletor);
const moeda = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// mostra os pacotes na tela
function notaDoPacote(id) {
  const lista = todasAvaliacoes().filter((a) => a.pacote === id);
  if (!lista.length) return "";
  const media = lista.reduce((s, a) => s + a.nota, 0) / lista.length;
  return `<span class="card__rate" title="${lista.length} avaliações">★ ${fmtNota(media)}</span>`;
}

function renderPacotes() {
  $("#grid").innerHTML = PACOTES.map((p) => `
    <article class="card card--${p.estilo} span-${p.tam}">
      <div class="card__top"><span>${p.categoria}</span>${notaDoPacote(p.id)}</div>
      ${p.selo ? `<span class="selo">${p.selo}</span>` : ""}
      <h3>${p.titulo}</h3>
      <p class="card__call">${p.chamada}</p>
      <p class="card__desc">${p.desc}</p>
      <div class="medo" title="Nível de medo: ${p.medo} de 5"><span>Nível de medo</span>${"<i class='on'></i>".repeat(p.medo)}${"<i></i>".repeat(5 - p.medo)}</div>
      <div class="card__foot">
        <span class="price">${moeda(p.preco)}</span>
        <button class="btn" data-add="${p.id}">Comprar pacote +</button>
      </div>
    </article>`).join("");
}

// carrinho (salva no localStorage)
let carrinho = {};
try { carrinho = JSON.parse(localStorage.getItem("coward-carrinho")) || {}; } catch { carrinho = {}; }

function salvarCarrinho() {
  try { localStorage.setItem("coward-carrinho", JSON.stringify(carrinho)); } catch {}
}

function atualizarCarrinho() {
  const itens = Object.entries(carrinho).map(([id, qtd]) => ({ ...PACOTES.find((p) => p.id === Number(id)), qtd }));
  const total = itens.reduce((soma, i) => soma + i.preco * i.qtd, 0);
  const quantidade = itens.reduce((soma, i) => soma + i.qtd, 0);

  $("#cartCount").textContent = quantidade;
  $("#cartTotal").textContent = moeda(total);
  $("#cartList").innerHTML = itens.map((i) => `
    <li>
      <span>${i.titulo} × ${i.qtd}</span>
      <span>${moeda(i.preco * i.qtd)} <button data-remove="${i.id}">remover</button></span>
    </li>`).join("");
  $("#cartMsg").textContent = quantidade ? "" : "Seu carrinho está vazio. Escolha o medo que quer enfrentar.";
  $("#checkoutBtn").disabled = !quantidade;
}

function adicionar(id, botao) {
  carrinho[id] = (carrinho[id] || 0) + 1;
  salvarCarrinho();
  atualizarCarrinho();

  const badge = $("#cartCount");
  badge.classList.remove("bump");
  void badge.offsetWidth; // faz a animação rodar de novo
  badge.classList.add("bump");

  botao.textContent = "Adicionado ✓";
  botao.classList.add("added");
  setTimeout(() => { botao.textContent = "Comprar pacote +"; botao.classList.remove("added"); }, 1200);
}

$("#grid").addEventListener("click", (e) => {
  const botao = e.target.closest("[data-add]");
  if (botao) adicionar(Number(botao.dataset.add), botao);
});

$("#cartList").addEventListener("click", (e) => {
  const botao = e.target.closest("[data-remove]");
  if (!botao) return;
  const id = botao.dataset.remove;
  carrinho[id] > 1 ? carrinho[id]-- : delete carrinho[id];
  salvarCarrinho();
  atualizarCarrinho();
});

// janela do carrinho
const modal = $("#cartModal");
$("#cartBtn").addEventListener("click", () => modal.showModal());
$("#closeCart").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); }); // fecha se clicar fora

$("#checkoutBtn").addEventListener("click", () => {
  carrinho = {};
  salvarCarrinho();
  atualizarCarrinho();
  $("#cartMsg").textContent = "Pedido recebido! Seus pacotes de coragem já estão a caminho do seu e-mail. Agora vai lá e aperta enviar.";
});

// tema claro e escuro
function aplicarTema(tema) {
  document.documentElement.dataset.theme = tema;
  try { localStorage.setItem("coward-tema", tema); } catch {}
}
let temaSalvo = null;
try { temaSalvo = localStorage.getItem("coward-tema"); } catch {}
aplicarTema(temaSalvo || "light");

$("#themeBtn").addEventListener("click", () => {
  aplicarTema(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

// menu do celular
const menuBtn = $("#menuBtn");
const nav = $("#nav");
menuBtn.addEventListener("click", () => {
  const aberto = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", aberto);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); }
});

// avaliações
let avaliacoesSalvas = [];
try { avaliacoesSalvas = JSON.parse(localStorage.getItem("coward-avaliacoes")) || []; } catch { avaliacoesSalvas = []; }

function todasAvaliacoes() { return avaliacoesSalvas; }
const fmtNota = (n) => n.toFixed(1).replace(".", ",");
const estrelas = (n) => "★".repeat(n) + "☆".repeat(5 - n);
// troca os símbolos do html pra ninguém colocar código no comentário
const esc = (t) => t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function renderAvaliacoes() {
  const lista = todasAvaliacoes();
  if (!lista.length) {
    $("#mediaGeral").textContent = "–";
    $("#mediaStars").textContent = estrelas(0);
    $("#totalAval").textContent = "Ainda sem avaliações";
    $("#reviewList").innerHTML = '<li class="review review--vazio">Nenhuma avaliação ainda. Seja o primeiro a contar como foi enfrentar o seu medo.</li>';
    return;
  }
  const media = lista.reduce((s, a) => s + a.nota, 0) / lista.length;
  $("#mediaGeral").textContent = fmtNota(media);
  $("#mediaStars").textContent = estrelas(Math.round(media));
  $("#totalAval").textContent = lista.length === 1 ? "1 avaliação" : `${lista.length} avaliações`;
  $("#reviewList").innerHTML = lista.map((a, i) => `
    <li class="review">
      <div class="review__top"><span class="stars">${estrelas(a.nota)}</span><span>${PACOTES.find((p) => p.id === a.pacote).titulo}</span></div>
      <p>${esc(a.texto)}</p>
      <div class="review__foot">
        <small>${esc(a.nome)}</small>
        <button class="review__del" data-excluir="${i}">Excluir</button>
      </div>
    </li>`).join("");
}

// excluir avaliação
$("#reviewList").addEventListener("click", (e) => {
  const botao = e.target.closest("[data-excluir]");
  if (!botao || !confirm("Excluir esta avaliação?")) return;
  avaliacoesSalvas.splice(Number(botao.dataset.excluir), 1);
  try { localStorage.setItem("coward-avaliacoes", JSON.stringify(avaliacoesSalvas)); } catch {}
  renderAvaliacoes();
  renderPacotes();
});

// formulário de avaliação
$("#rvPacote").innerHTML = PACOTES.map((p) => `<option value="${p.id}">${p.titulo}</option>`).join("");
const starsInput = $("#starsInput");
starsInput.innerHTML = [1, 2, 3, 4, 5].map((n) => `<button type="button" class="star" data-nota="${n}" aria-label="${n} de 5 estrelas">★</button>`).join("");
let notaEscolhida = 0;

function marcarEstrelas() {
  starsInput.querySelectorAll(".star").forEach((s) => s.classList.toggle("on", Number(s.dataset.nota) <= notaEscolhida));
}
starsInput.addEventListener("click", (e) => {
  const botao = e.target.closest("[data-nota]");
  if (!botao) return;
  notaEscolhida = Number(botao.dataset.nota);
  marcarEstrelas();
});

$("#reviewForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = $("#rvMsg");
  const nome = $("#rvNome").value.trim();
  const texto = $("#rvTexto").value.trim();

  if (!notaEscolhida) { msg.textContent = "Escolha uma nota de 1 a 5 estrelas."; return; }
  if (nome.length < 2) { msg.textContent = "Digite seu nome (mínimo de 2 letras)."; return; }
  if (texto.length < 10) { msg.textContent = "Conte um pouco mais: o comentário precisa de pelo menos 10 caracteres."; return; }

  avaliacoesSalvas.unshift({ pacote: Number($("#rvPacote").value), nome, nota: notaEscolhida, texto });
  try { localStorage.setItem("coward-avaliacoes", JSON.stringify(avaliacoesSalvas)); } catch {}

  e.target.reset();
  notaEscolhida = 0;
  marcarEstrelas();
  msg.textContent = "Obrigado! Sua avaliação já está na lista.";
  renderAvaliacoes();
  renderPacotes();
});

// roda quando a página abre
renderPacotes();
renderAvaliacoes();
atualizarCarrinho();
