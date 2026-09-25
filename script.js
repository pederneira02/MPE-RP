function mudarFerramenta() {
  const tipo = document.getElementById('select-ferramenta').value;
  
  // Esconde todos os containers
  document.getElementById('form-controle').classList.add('hidden');
  document.getElementById('form-anpp').classList.add('hidden');
  document.getElementById('form-denuncia').classList.add('hidden');
  document.getElementById('form-generico').classList.add('hidden');

  // Exibe o correto
  if (tipo === 'controle') {
    document.getElementById('form-controle').classList.remove('hidden');
  } else if (tipo === 'anpp') {
    document.getElementById('form-anpp').classList.remove('hidden');
  } else if (tipo === 'denuncia') {
    document.getElementById('form-denuncia').classList.remove('hidden');
  } else {
    document.getElementById('form-generico').classList.remove('hidden');
  }

  updateDoc();
}

function updateDoc() {
  const tipo = document.getElementById('select-ferramenta').value;
  const output = document.getElementById('doc-output');

  if (tipo === 'anpp') {
    renderANPP(output);
  } else if (tipo === 'denuncia') {
    renderDenuncia(output);
  } else if (tipo === 'controle') {
    renderControle(output);
  } else {
    renderGenerico(output, tipo);
  }
}

// RENDERIZADOR DO ANPP
function renderANPP(out) {
  const promotor = document.getElementById('anpp-promotor').value || '_______________________';
  const reu = document.getElementById('anpp-reu').value || '[NOME DO RÉU]';
  const passaporte = document.getElementById('anpp-passaporte').value || '***';
  const advogado = document.getElementById('anpp-advogado').value || '[NOME DO ADVOGADO]';
  const oab = document.getElementById('anpp-oab').value || '[NÚMERO]';
  const proc = document.getElementById('anpp-proc').value || '[NÚMERO]';
  const juiz = document.getElementById('anpp-juiz').value || '[NOME DO JUIZ DAS GARANTIAS]';

  // Condições
  let condicoesHTML = '';
  
  const chkDano = document.getElementById('chk-dano').checked;
  const danoVal = document.getElementById('anpp-dano-val').value || '[VALOR/BEM]';
  const vitima = document.getElementById('anpp-vitima').value || '[NOME DA VÍTIMA]';
  condicoesHTML += `<p><strong>[ ${chkDano ? 'X' : '&nbsp;&nbsp;'} ] Reparação do Dano:</strong> Restituir a quantia/bem ${danoVal} à vítima ${vitima}.</p>`;

  const chkPec = document.getElementById('chk-pecuniaria').checked;
  const pecVal = document.getElementById('anpp-pec-val').value || '[VALOR]';
  const pecDest = document.getElementById('anpp-pec-dest').value || '[FUNDO/INSTITUIÇÃO]';
  condicoesHTML += `<p><strong>[ ${chkPec ? 'X' : '&nbsp;&nbsp;'} ] Prestação Pecuniária:</strong> Pagamento do valor de R$ ${pecVal} destinado ao(à) ${pecDest}.</p>`;

  const chkServ = document.getElementById('chk-servico').checked;
  const servHoras = document.getElementById('anpp-serv-horas').value || '[HORAS]';
  const servLocal = document.getElementById('anpp-serv-local').value || '[LOCAL DE SERVIÇO]';
  condicoesHTML += `<p><strong>[ ${chkServ ? 'X' : '&nbsp;&nbsp;'} ] Prestação de Serviços:</strong> Prestação de serviços comunitários por ${servHoras} horas no(a) ${servLocal}.</p>`;

  const chkOutros = document.getElementById('chk-outros').checked;
  const outrosTxt = document.getElementById('anpp-outros-text').value || '[OUTRAS CONDIÇÕES]';
  condicoesHTML += `<p><strong>[ ${chkOutros ? 'X' : '&nbsp;&nbsp;'} ] Condições Adicionais:</strong> ${outrosTxt}</p>`;

  out.innerHTML = `
    <div class="doc-header-block">
      <img src="logo.png">
      <h1>MINISTÉRIO PÚBLICO DO ESTADO DO BRASIL</h1>
      <h2>Gabinete de Promotoria</h2>
      <h3 style="margin: 5px 0 0; font-size: 12px; font-weight: bold;">TERMO DE ACORDO DE NÃO PERSECUÇÃO PENAL (ANPP)</h3>
    </div>

    <p>Com fundamento nos arts. 132 e 133 do Código de Processo Penal do Estado do Brasil, celebram o presente Acordo de Não Persecução Penal as partes abaixo qualificadas:</p>

    <div class="doc-title-sec">1. QUALIFICAÇÃO DAS PARTES</div>
    <table class="doc-table">
      <tr><td class="title">Instituição Proponente</td><td>Ministério Público do Estado do Brasil - Rep: ${promotor}</td></tr>
      <tr><td class="title">Investigado(a)</td><td>${reu}, Passaporte nº ${passaporte}</td></tr>
      <tr><td class="title">Advogado(a) de Defesa</td><td>${advogado}, OAB nº ${oab}</td></tr>
      <tr><td class="title">Procedimento</td><td>${proc}</td></tr>
    </table>

    <div class="doc-title-sec">2. DOS FATOS E DA CONFISSÃO FORMAL</div>
    <p>O(a) INVESTIGADO(A), devidamente assistido(a) por seu/sua Defensor(a), CONFESSA formal e circumstantialmente a prática do delito a ele(a) imputado, reconhecendo a materialidade e autoria dos fatos descritos no procedimento investigatório supracitado. O delito apurado trata-se de infração cometida sem violência ou grave ameaça à pessoa, preenchendo os requisitos do Art. 132 do CPP.</p>

    <div class="doc-title-sec">3. DAS CONDIÇÕES DO ACORDO (Art. 133 do CPP)</div>
    ${condicoesHTML}

    <div class="doc-title-sec">4. DAS ADVERTÊNCIAS E DESCUMPRIMENTO</div>
    <p>Nos termos do parágrafo único do Art. 135 do CPP, o descumprimento injustificado de quaisquer das condições autoriza o imediato prosseguimento da persecução penal com o oferecimento da denúncia. O cumprimento integral ensejará o arquivamento sem registro de condenação criminal.</p>

    <div class="doc-title-sec">5. DA HOMOLOGAÇÃO JUDICIAL</div>
    <p>Conforme estabelece o Art. 134 do CPP, o presente acordo somente surtirá efeitos após a devida Homologação Judicial pelo Juiz das Garantias competente.</p>

    <p style="text-align: center; margin-top: 20px;">Cidade Brasil Roleplay, Estado do Brasil, 2026.</p>

    <div class="sig-area">
      <div class="sig-line"></div>
      <p><strong>${reu}</strong><br>Investigado(a)</p>
      <br>
      <div class="sig-line"></div>
      <p><strong>${advogado}</strong><br>Advogado(a) - OAB nº ${oab}</p>
      <br>
      <div class="sig-line"></div>
      <p><strong>${juiz}</strong><br>Juiz(a) das Garantias (Homologação)</p>
      <br>
      <div class="sig-line"></div>
      <p><strong>${promotor}</strong><br>Promotor(a) de Justiça</p>
    </div>
  `;
}

// RENDERIZADOR DA DENÚNCIA CRIMINAL
function renderDenuncia(out) {
  const decisao = document.getElementById('denuncia-decisao').value;
  const acusado = document.getElementById('denuncia-acusado').value || '[NOME DO ACUSADO]';
  const passaporte = document.getElementById('denuncia-passaporte').value || '***';
  const artigo = document.getElementById('denuncia-artigo').value || '[TIPIFICAÇÃO PENAL]';
  const fatos = document.getElementById('denuncia-fatos').value || 'Descreva a síntese dos fatos ou justificativa do indeferimento...';
  const promotor = document.getElementById('denuncia-promotor').value || '_______________________';

  const isOferecimento = decisao === 'OFERECIMENTO';

  out.innerHTML = `
    <div class="doc-header-block">
      <img src="logo.png">
      <h1>MINISTÉRIO PÚBLICO DO ESTADO DO BRASIL</h1>
      <h2>Promotoria de Justiça Criminal</h2>
      <h3 style="margin: 5px 0 0; font-size: 12px; font-weight: bold;">
        ${isOferecimento ? 'OFERECIMENTO DE DENÚNCIA CRIMINAL' : 'TERMO DE INDEFERIMENTO DE DENÚNCIA'}
      </h3>
    </div>

    <table class="doc-table">
      <tr><td class="title">Acusado(a) / Denunciado(a)</td><td>${acusado} (Passaporte ID: ${passaporte})</td></tr>
      <tr><td class="title">Capitulação Penal</td><td>${artigo}</td></tr>
      <tr><td class="title">Status Ministerial</td><td><strong>${isOferecimento ? 'DENÚNCIA OFERECIDA / DEFERIDA' : 'DENÚNCIA INDEFERIDA / REJEITADA'}</strong></td></tr>
    </table>

    <div class="doc-title-sec">EXPOSIÇÃO DOS FATOS E FUNDAMENTAÇÃO JURÍDICA</div>
    <p>${fatos}</p>

    <div class="doc-title-sec">DOS PEDIDOS MINISTERIAIS</div>
    <p>${isOferecimento 
      ? 'Diante do exposto, o Ministério Público requer o RECEBIMENTO da presente Denúncia, citação do acusado para responder aos termos da ação penal e, ao final, a procedência do pedido com a consequente condenação.' 
      : 'Diante da ausência de justa causa, falta de provas suficientes de autoria/materialidade ou atipicidade da conduta, o Ministério Público manifesta-se pelo INDEFERIMENTO/ARQUIVAMENTO da peça acusatória.'}</p>

    <p style="text-align: center; margin-top: 30px;">Brasil Roleplay, Estado do Brasil, 2026.</p>

    <div class="sig-area">
      <div class="sig-line"></div>
      <p><strong>${promotor.toUpperCase()}</strong><br>Promotor(a) de Justiça</p>
    </div>
  `;
}

// RENDERIZADOR DE DOCUMENTOS GENÉRICOS (REQUISIÇÃO, PROMOÇÃO, PARECER, OFÍCIO, ETC.)
function renderGenerico(out, tipo) {
  const titulos = {
    requisicao: 'REQUISIÇÃO MINISTERIAL',
    promocao: 'PROMOÇÃO MINISTERIAL',
    arquivamento: 'PROMOÇÃO DE ARQUIVAMENTO',
    manifestacao: 'MANIFESTAÇÃO MINISTERIAL',
    parecer: 'PARECER JURÍDICO MINISTERIAL',
    oficio: 'OFÍCIO MINISTERIAL'
  };

  const proc = document.getElementById('gen-proc').value || '[PROCEDIMENTO/PROCESSO Nº]';
  const dest = document.getElementById('gen-destinatario').value || '[DESTINATÁRIO]';
  const texto = document.getElementById('gen-texto').value || 'Escreva o teor e os fundamentos jurídicos do documento...';
  const promotor = document.getElementById('gen-promotor').value || '_______________________';

  out.innerHTML = `
    <div class="doc-header-block">
      <img src="logo.png">
      <h1>MINISTÉRIO PÚBLICO DO ESTADO DO BRASIL</h1>
      <h2>${titulos[tipo]}</h2>
    </div>

    <table class="doc-table">
      <tr><td class="title">Procedimento / Processo</td><td>${proc}</td></tr>
      <tr><td class="title">Destinatário / Requerido</td><td>${dest}</td></tr>
    </table>

    <div class="doc-title-sec">TEOR E FUNDAMENTAÇÃO</div>
    <p>${texto}</p>

    <p style="text-align: center; margin-top: 40px;">Brasil Roleplay, Estado do Brasil, 2026.</p>

    <div class="sig-area">
      <div class="sig-line"></div>
      <p><strong>${promotor.toUpperCase()}</strong><br>Promotor(a) de Justiça</p>
    </div>
  `;
}

// RENDERIZADOR DO CONTROLE EXTERNO
function renderControle(out) {
  const num = document.getElementById('ctrl-num').value || '___';
  const ano = document.getElementById('ctrl-ano').value || '2026';
  const dp = document.getElementById('ctrl-dp').value;
  const promotor = document.getElementById('ctrl-promotor').value || '_______________________';

  out.innerHTML = `
    <div class="doc-header-block">
      <img src="logo.png">
      <h1>MINISTÉRIO PÚBLICO DO ESTADO DO BRASIL</h1>
      <h2>RELATÓRIO DE CONTROLE EXTERNO DA ATIVIDADE POLICIAL</h2>
    </div>
    <p><strong>Relatório Nº:</strong> ${num}/${ano} | <strong>Departamento Inspecionado:</strong> ${dp}</p>
    <div class="doc-title-sec">INSPEÇÃO OPERACIONAL E ESTRUTURAL</div>
    <p>Relatório de vistoria e controle externo realizado nas dependências do departamento policial supracitado.</p>
    <div class="sig-area">
      <div class="sig-line"></div>
      <p><strong>${promotor.toUpperCase()}</strong><br>Promotor(a) de Justiça</p>
    </div>
  `;
}

function gerarImagem() {
  const relatorio = document.getElementById('relatorio-a4');
  const btn = document.querySelector('.btn-gerar');

  btn.textContent = 'GERANDO PNG...';

  html2canvas(relatorio, { scale: 2, useCORS: true, backgroundColor: '#ffffff' }).then(canvas => {
    let link = document.createElement('a');
    link.download = 'Documento_MP.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    btn.textContent = 'EMITIR DOCUMENTO (PNG)';
  });
}

window.onload = function() {
  mudarFerramenta();
};
