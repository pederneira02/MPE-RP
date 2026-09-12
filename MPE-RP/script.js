const MAX_MEMBROS = 4;
let membrosEquipe = [];

function getMesExtenso(mes) {
  const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  return meses[parseInt(mes) - 1];
}

function popularAno() {
  const select = document.getElementById('in-ano');
  const anoAtual = new Date().getFullYear();

  for (let ano = 2020; ano <= 2035; ano++) {
    const option = document.createElement('option');
    option.value = ano;
    option.textContent = ano;
    select.appendChild(option);
  }

  select.value = anoAtual;
}

function renderCheck(elementId, selectedValue, allOptions) {
  let html = '';
  allOptions.forEach(opt => {
    html += (opt === selectedValue)
      ? `<span class="active">[ X ] ${opt}</span>`
      : `<span>[ &nbsp;&nbsp; ] ${opt}</span>`;
  });
  document.getElementById(elementId).innerHTML = html;
}

function renderMembrosEquipe() {
  const container = document.getElementById('member-list');
  container.innerHTML = '';

  membrosEquipe.forEach((nome, index) => {
    const chip = document.createElement('div');
    chip.className = 'member-chip';

    const text = document.createElement('span');
    text.textContent = nome;
    chip.appendChild(text);

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn-remove-member';
    removeBtn.textContent = '×';
    removeBtn.title = 'Remover membro';
    removeBtn.addEventListener('click', () => {
      membrosEquipe.splice(index, 1);
      renderMembrosEquipe();
      updateDoc();
    });

    chip.appendChild(removeBtn);
    container.appendChild(chip);
  });
}

function adicionarMembro() {
  const input = document.getElementById('in-membro-novo');
  const nome = (input.value || '').trim().replace(/\s+/g, ' ');

  if (!nome) {
    input.focus();
    return;
  }

  if (membrosEquipe.length >= MAX_MEMBROS) {
    alert('Você pode adicionar até 4 membros na equipe.');
    return;
  }

  membrosEquipe.push(nome.slice(0, 40));
  input.value = '';
  renderMembrosEquipe();
  updateDoc();
}

function updateDoc() {
  const numero = document.getElementById('in-numero').value.replace(/\D/g, '').slice(0, 3);
  const anoSelecionado = document.getElementById('in-ano').value || new Date().getFullYear();
  const cidade = (document.getElementById('in-cidade').value || 'Brasil Roleplay').trim() || 'Brasil Roleplay';

  document.getElementById('out-numero').innerText = numero ? String(numero).padStart(3, '0') : '___';
  document.getElementById('out-ano').innerText = anoSelecionado;

  document.getElementById('out-dp').innerText = document.getElementById('in-dp').value;

  const promotor = document.getElementById('in-promotor').value.trim();
  document.getElementById('out-promotor').innerText = promotor || '__________________';
  document.getElementById('out-assinatura-nome').innerText = promotor ? promotor.toUpperCase() : 'PROMOTOR(A) DE JUSTIÇA';

  document.getElementById('out-passaporte').innerText = document.getElementById('in-passaporte').value || '_____';
  document.getElementById('out-inicio').innerText = document.getElementById('in-inicio').value || '--:--';
  document.getElementById('out-fim').innerText = document.getElementById('in-fim').value || '--:--';
  document.getElementById('out-diretor').innerText = document.getElementById('in-diretor').value || '__________________';

  const membrosFormatados = membrosEquipe.length > 0 ? membrosEquipe.join(', ') : '__________________';
  document.getElementById('out-membros').innerText = membrosFormatados;

  document.getElementById('out-obs1').innerText = document.getElementById('in-obs1').value || 'Nenhuma observação registrada.';
  document.getElementById('out-obs2').innerText = document.getElementById('in-obs2').value || 'Nenhuma observação registrada.';
  document.getElementById('out-sintese').innerText = document.getElementById('in-sintese').value || 'Nenhuma recomendação registrada.';

  const dataRaw = document.getElementById('in-data').value;
  if (dataRaw) {
    const [ano, mes, dia] = dataRaw.split('-');
    document.getElementById('out-data').innerText = `${dia}/${mes}/${ano}`;
    document.getElementById('out-cidade-data').innerText = `${cidade}, ${dia} de ${getMesExtenso(mes)} de ${ano}.`;
  } else {
    document.getElementById('out-data').innerText = 'DD/MM/AAAA';
    document.getElementById('out-cidade-data').innerText = `${cidade}, _____ de _______________ de ${anoSelecionado}.`;
  }

  renderCheck('out-brajud', document.getElementById('in-brajud').value, ['Regular', 'Parcial', 'Irregular']);
  renderCheck('out-custodia', document.getElementById('in-custodia').value, ['Adequada', 'Inadequada']);
  renderCheck('out-miranda', document.getElementById('in-miranda').value, ['Regular', 'Irregular/Violações']);
  renderCheck('out-mandados', document.getElementById('in-mandados').value, ['Regular', 'Irregular']);
  renderCheck('out-cursos', document.getElementById('in-cursos').value, ['Ativos', 'Baixa adesão', 'Inativos']);
  renderCheck('out-celas', document.getElementById('in-celas').value, ['Adequadas', 'Inadequadas']);
  renderCheck('out-frota', document.getElementById('in-frota').value, ['Atende a demanda', 'Defasada']);
  renderCheck('out-situacao', document.getElementById('in-situacao').value, ['Apta/Legal', 'Com Ressalvas (adequações curtas)', 'Crítica (requer intervenção/Corregedoria)']);
}

function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function gerarImagem() {
  const relatorio = document.getElementById('relatorio-a4');
  const btn = document.querySelector('.btn-gerar');

  btn.textContent = 'Gerando...';
  btn.disabled = true;

  html2canvas(relatorio, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false
  }).then(canvas => {
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        triggerDownload(url, 'Relatorio_Controle_Externo.png');
        setTimeout(() => URL.revokeObjectURL(url), 3000);
      } else {
        triggerDownload(canvas.toDataURL('image/png'), 'Relatorio_Controle_Externo.png');
      }

      btn.textContent = 'Emitir Relatório (PNG)';
      btn.disabled = false;
    }, 'image/png');
  }).catch(err => {
    console.error(err);
    btn.textContent = 'Emitir Relatório (PNG)';
    btn.disabled = false;
    alert('Não foi possível gerar o PNG. Tente abrir a página em um servidor local (Live Server / http-server) e tentar novamente.');
  });
}

window.onload = function () {
  popularAno();
  renderMembrosEquipe();
  updateDoc();
};