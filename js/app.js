// Navegação por abas
const tabs = document.getElementById('tabs');
const sections = ['media','idade','fatorial','parimpar','tabuada'];
tabs.addEventListener('click', (e)=>{
  if(e.target.tagName !== 'BUTTON') return;
  const t = e.target.dataset.target;
  sections.forEach(id=>{
    document.getElementById(id).classList.toggle('hide', id!==t);
  });
  [...tabs.querySelectorAll('button')].forEach(b=>b.classList.toggle('active', b.dataset.target===t));
});

// Helpers de resultado
function showResult(cardId, html){
  const card = document.getElementById(cardId);
  card.querySelector('.result-body').innerHTML = html;
  card.classList.add('show');
}
function hideOnReset(formId, cardId){
  document.getElementById(formId).addEventListener('reset', ()=>{
    const c = document.getElementById(cardId);
    c.classList.remove('show');
    c.querySelector('.result-body').innerHTML = '';
  });
}

// 1) Média
document.getElementById('form-media').addEventListener('submit', e=>{
  e.preventDefault();
  const aluno = document.getElementById('aluno').value.trim();
  const disc  = document.getElementById('disciplina').value.trim();
  const n1 = Number(document.getElementById('n1').value);
  const n2 = Number(document.getElementById('n2').value);
  const media = (n1 + n2) / 2;
  const status = media >= 6 ? 'Aprovado(a)' : 'Reprovado(a)';
  showResult('card-media', `
    <ul class="list">
      <li><strong>Aluno:</strong> ${aluno}</li>
      <li><strong>Disciplina:</strong> ${disc}</li>
      <li><strong>Média:</strong> ${media.toFixed(2)} — ${status}</li>
    </ul>
  `);
});
hideOnReset('form-media','card-media');

// 2) Idade (em 2024)
document.getElementById('form-idade').addEventListener('submit', e=>{
  e.preventDefault();
  const ano = parseInt(document.getElementById('ano-nasc').value, 10);
  const idade2024 = 2024 - ano;
  showResult('card-idade', `<ul class="list"><li>Quem nasceu em <strong>${ano}</strong> completa <strong>${idade2024}</strong> anos em 2024.</li></ul>`);
});
hideOnReset('form-idade','card-idade');

// 3) Fatorial (com BigInt)
function fatBigInt(n){
  let r = 1n;
  for (let i = 2n; i <= n; i++) r *= i;
  return r;
}
document.getElementById('form-fatorial').addEventListener('submit', e=>{
  e.preventDefault();
  const input = parseInt(document.getElementById('num-fat').value, 10);
  if (isNaN(input) || input < 0){ 
    showResult('card-fatorial', '<span class="muted">Digite um número inteiro ≥ 0.</span>');
    return;
  }
  const n = BigInt(input);
  const r = fatBigInt(n);
  showResult('card-fatorial', `<code class="kbd">${n}! = ${r.toString()}</code>`);
});
hideOnReset('form-fatorial','card-fatorial');

// 4) Par ou Ímpar
document.getElementById('form-parimpar').addEventListener('submit', e=>{
  e.preventDefault();
  const n = parseInt(document.getElementById('num-par').value, 10);
  const tipo = (n % 2 === 0) ? 'par' : 'ímpar';
  showResult('card-parimpar', `<ul class="list"><li>O número <strong>${n}</strong> é <strong>${tipo}</strong>.</li></ul>`);
});
hideOnReset('form-parimpar','card-parimpar');

// 5) Tabuada
document.getElementById('form-tabuada').addEventListener('submit', e=>{
  e.preventDefault();
  const n = parseInt(document.getElementById('num-tab').value, 10);
  const linhas = [];
  for (let i=1;i<=10;i++) linhas.push(`${n} x ${i} = ${n*i}`);
  showResult('card-tabuada', `<code class="kbd">${linhas.join('\n')}</code>`);
});
hideOnReset('form-tabuada','card-tabuada');
