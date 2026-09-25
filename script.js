function mudarFerramenta() {
  const tipo = document.getElementById('select-ferramenta').value;
  
  // Esconde todos os containers
  document.getElementById('form-controle').classList.add('hidden');
  document.getElementById('form-anpp').classList.add('hidden');
  document.getElementById('form-denuncia').classList.add('hidden');
  document.getElementById('form-leis').classList.add('hidden');
  document.getElementById('form-generico').classList.add('hidden');

  // Exibe o correto
  if (tipo === 'controle') {
    document.getElementById('form-controle').classList.remove('hidden');
  } else if (tipo === 'anpp') {
    document.getElementById('form-anpp').classList.remove('hidden');
  } else if (tipo === 'denuncia') {
    document.getElementById('form-denuncia').classList.remove('hidden');
  } else if (tipo === 'leis') {
    document.getElementById('form-leis').classList.remove('hidden');
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
  } else if (tipo === 'leis') {
    renderLeis(output);
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
      <img src="logo.png" onerror="this.style.display='none'">
      <h1>MINISTÉRIO PÚBLICO DO ESTADO DO BRASIL</h1>
      <h2>Gabinete de Promotoria</h2>
      <h3 style="margin: 5px 0 0; font-size: 13px; font-weight: 800;">TERMO DE ACORDO DE NÃO PERSECUÇÃO PENAL (ANPP)</h3>
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
    <p>O(a) INVESTIGADO(A), devidamente assistido(a) por seu/sua Defensor(a), CONFESSA formal e circunstancialmente a prática do delito a ele(a) imputado, reconhecendo a materialidade e autoria dos fatos descritos no procedimento investigatório supracitado. O delito apurado trata-se de infração cometida sem violência ou grave ameaça à pessoa.</p>

    <div class="doc-title-sec">3. DAS CONDIÇÕES DO ACORDO</div>
    ${condicoesHTML}

    <div class="doc-title-sec">4. DAS ADVERTÊNCIAS E DESCUMPRIMENTO</div>
    <p>O descumprimento injustificado de quaisquer das condições autoriza o imediato prosseguimento da persecução penal com o oferecimento da denúncia. O cumprimento integral ensejará o arquivamento sem registro de condenação criminal.</p>

    <div class="doc-title-sec">5. DA HOMOLOGAÇÃO JUDICIAL</div>
    <p>O presente acordo somente surtirá efeitos após a devida Homologação Judicial pelo Juiz das Garantias competente.</p>

    <p style="text-align: center; margin-top: 30px;">Cidade Brasil Roleplay, Estado do Brasil, 2026.</p>

    <div class="sig-area">
      <div class="sig-block"><div class="sig-line"></div><p><strong>${reu}</strong><br>Investigado(a)</p></div>
      <div class="sig-block"><div class="sig-line"></div><p><strong>${advogado}</strong><br>Advogado(a) - OAB nº ${oab}</p></div>
      <div class="sig-block"><div class="sig-line"></div><p><strong>${juiz}</strong><br>Juiz(a) das Garantias</p></div>
      <div class="sig-block"><div class="sig-line"></div><p><strong>${promotor}</strong><br>Promotor(a) de Justiça</p></div>
    </div>
  `;
}

// RENDERIZADOR DA DENÚNCIA CRIMINAL
function renderDenuncia(out) {
  const decisao = document.getElementById('denuncia-decisao').value;
  const acusado = document.getElementById('denuncia-acusado').value || '[NOME DO ACUSADO]';
  const passaporte = document.getElementById('denuncia-passaporte').value || '***';
  const artigo = document.getElementById('denuncia-artigo').value || '[TIPIFICAÇÃO PENAL]';
  const fatos = document.getElementById('denuncia-fatos').value || 'Descreva a síntese dos fatos...';
  const promotor = document.getElementById('denuncia-promotor').value || '_______________________';

  const isOferecimento = decisao === 'OFERECIMENTO';

  out.innerHTML = `
    <div class="doc-header-block">
      <img src="logo.png" onerror="this.style.display='none'">
      <h1>MINISTÉRIO PÚBLICO DO ESTADO DO BRASIL</h1>
      <h2>Promotoria de Justiça Criminal</h2>
      <h3 style="margin: 5px 0 0; font-size: 13px; font-weight: 800;">
        ${isOferecimento ? 'OFERECIMENTO DE DENÚNCIA CRIMINAL' : 'TERMO DE INDEFERIMENTO DE DENÚNCIA'}
      </h3>
    </div>

    <table class="doc-table">
      <tr><td class="title">Acusado(a) / Denunciado(a)</td><td>${acusado} (Passaporte ID: ${passaporte})</td></tr>
      <tr><td class="title">Capitulação Penal</td><td>${artigo}</td></tr>
      <tr><td class="title">Status Ministerial</td><td><strong>${isOferecimento ? 'DENÚNCIA OFERECIDA / DEFERIDA' : 'DENÚNCIA INDEFERIDA / REJEITADA'}</strong></td></tr>
    </table>

    <div class="doc-title-sec">EXPOSIÇÃO DOS FATOS E FUNDAMENTAÇÃO JURÍDICA</div>
    <p>${fatos.replace(/\n/g, '<br>')}</p>

    <div class="doc-title-sec">DOS PEDIDOS MINISTERIAIS</div>
    <p>${isOferecimento 
      ? 'Diante do exposto, o Ministério Público requer o RECEBIMENTO da presente Denúncia, citação do acusado para responder aos termos da ação penal e, ao final, a procedência do pedido com a consequente condenação.' 
      : 'Diante da ausência de justa causa, falta de provas suficientes de autoria/materialidade ou atipicidade da conduta, o Ministério Público manifesta-se pelo INDEFERIMENTO/ARQUIVAMENTO da peça acusatória.'}</p>

    <p style="text-align: center; margin-top: 40px;">Brasil Roleplay, Estado do Brasil, 2026.</p>

    <div class="sig-area">
      <div class="sig-block">
        <div class="sig-line"></div>
        <p><strong>${promotor.toUpperCase()}</strong><br>Promotor(a) de Justiça</p>
      </div>
    </div>
  `;
}

// RENDERIZADOR DO CONTROLE EXTERNO
function renderControle(out) {
  const num = document.getElementById('ctrl-num').value || '___';
  const ano = document.getElementById('ctrl-ano').value || '2026';
  const data = document.getElementById('ctrl-data').value ? new Date(document.getElementById('ctrl-data').value).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : '__/__/2026';
  const efetivo = document.getElementById('ctrl-efetivo').value || '___';
  const dp = document.getElementById('ctrl-dp').value;
  const cmd = document.getElementById('ctrl-comandante').value || '[NOME DO COMANDANTE]';
  const estrutura = document.getElementById('ctrl-estrutura').value || 'Nada a declarar.';
  const irreg = document.getElementById('ctrl-irregularidades').value || 'Nenhuma irregularidade constatada.';
  const conclusao = document.getElementById('ctrl-conclusao').value || 'Operação e instalações regulares.';
  const promotor = document.getElementById('ctrl-promotor').value || '_______________________';

  out.innerHTML = `
    <div class="doc-header-block">
      <img src="logo.png" onerror="this.style.display='none'">
      <h1>MINISTÉRIO PÚBLICO DO ESTADO DO BRASIL</h1>
      <h2>Grupo de Atuação Especial de Segurança Pública</h2>
      <h3 style="margin: 5px 0 0; font-size: 13px; font-weight: 800;">RELATÓRIO DE CONTROLE EXTERNO DA ATIVIDADE POLICIAL</h3>
    </div>
    
    <div class="doc-title-sec">DADOS DA INSPEÇÃO MENSAL Nº ${num}/${ano}</div>
    <table class="doc-table">
      <tr><td class="title">Departamento Inspecionado</td><td>${dp}</td></tr>
      <tr><td class="title">Comandante/Responsável</td><td>${cmd}</td></tr>
      <tr><td class="title">Data da Auditoria</td><td>${data}</td></tr>
      <tr><td class="title">Efetivo Presente Confirmado</td><td>${efetivo} Agentes</td></tr>
    </table>

    <div class="doc-title-sec">1. AVALIAÇÃO ESTRUTURAL E DE VEÍCULOS</div>
    <p>${estrutura.replace(/\n/g, '<br>')}</p>

    <div class="doc-title-sec">2. IRREGULARIDADES E CONDUTAS</div>
    <p>${irreg.replace(/\n/g, '<br>')}</p>

    <div class="doc-title-sec">3. CONCLUSÃO E RECOMENDAÇÕES DO M.P.</div>
    <p>${conclusao.replace(/\n/g, '<br>')}</p>

    <p style="text-align: center; margin-top: 40px;">Brasil Roleplay, Estado do Brasil, 2026.</p>

    <div class="sig-area">
      <div class="sig-block">
        <div class="sig-line"></div>
        <p><strong>${promotor.toUpperCase()}</strong><br>Promotor(a) de Justiça e Auditor(a)</p>
      </div>
    </div>
  `;
}

// RENDERIZADOR DA BIBLIOTECA DE LEIS
function renderLeis(out) {
  const lei = document.getElementById('leis-selecao').value;
  const obs = document.getElementById('leis-obs').value || 'Documento gerado para fins de consulta rápida e instrução procedimental.';
  
  let tituloLei = "";
  let conteudoLei = "";

  if (lei === "cp") {
    tituloLei = "EXTRATO LEGISLATIVO - CÓDIGO PENAL";
    conteudoLei = `
      <div class="law-block">
        <h4>Art. 121 - Homicídio</h4>
        <p>Matar alguem: Pena - reclusão, de seis a vinte anos.</p>
      </div>
      <div class="law-block">
        <h4>Art. 155 - Furto</h4>
        <p>Subtrair, para si ou para outrem, coisa alheia móvel: Pena - reclusão, de um a quatro anos, e multa.</p>
      </div>
      <div class="law-block">
        <h4>Art. 157 - Roubo</h4>
        <p>Subtrair coisa móvel alheia, para si ou para outrem, mediante grave ameaça ou violência a pessoa: Pena - reclusão, de quatro a dez anos, e multa.</p>
      </div>
      <div class="law-block">
        <h4>Art. 33 (Lei de Drogas) - Tráfico</h4>
        <p>Importar, exportar, remeter, preparar, produzir, fabricar, adquirir, vender, expor à venda, oferecer, ter em depósito, transportar, trazer consigo, guardar, prescrever, ministrar, entregar a consumo ou fornecer drogas, ainda que gratuitamente, sem autorização ou em desacordo com determinação legal ou regulamentar: Pena - reclusão de 5 a 15 anos e pagamento de 500 a 1.500 dias-multa.</p>
      </div>
    `;
  } else if (lei === "cpp") {
    tituloLei = "EXTRATO LEGISLATIVO - CÓDIGO DE PROCESSO PENAL";
    conteudoLei = `
      <div class="law-block">
        <h4>Art. 301 - Flagrante</h4>
        <p>Qualquer do povo poderá e as autoridades policiais e seus agentes deverão prender quem quer que seja encontrado em flagrante delito.</p>
      </div>
      <div class="law-block">
        <h4>Art. 302 - Considera-se em flagrante delito quem:</h4>
        <p>I - está cometendo a infração penal;<br>II - acaba de cometê-la;<br>III - é perseguido, logo após, pela autoridade, pelo ofendido ou por qualquer pessoa, em situação que faça presumir ser autor da infração;<br>IV - é encontrado, logo depois, com instrumentos, armas, objetos ou papéis que façam presumir ser ele autor da infração.</p>
      </div>
      <div class="law-block">
        <h4>Art. 312 - Prisão Preventiva</h4>
        <p>A prisão preventiva poderá ser decretada como garantia da ordem pública, da ordem econômica, por conveniência da instrução criminal ou para assegurar a aplicação da lei penal, quando houver prova da existência do crime e indício suficiente de autoria e de perigo gerado pelo estado de liberdade do imputado.</p>
      </div>
    `;
  } else if (lei === "cf") {
    tituloLei = "EXTRATO LEGISLATIVO - CONSTITUIÇÃO FEDERAL";
    conteudoLei = `
      <div class="law-block">
        <h4>Art. 5º - Direitos e Garantias Fundamentais</h4>
        <p>Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade.</p>
      </div>
      <div class="law-block">
        <h4>Art. 5º, XI - Inviolabilidade Domiciliar</h4>
        <p>A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.</p>
      </div>
      <div class="law-block">
        <h4>Art. 5º, LVII - Presunção de Inocência</h4>
        <p>Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.</p>
      </div>
    `;
  } else {
    tituloLei = "EXTRATO LEGISLATIVO - CÓDIGO CIVIL";
    conteudoLei = `
      <div class="law-block">
        <h4>Art. 186 - Responsabilidade Civil</h4>
        <p>Aquele que, por ação ou omissão voluntária, negligência ou imprudência, violar direito e causar dano a outrem, ainda que exclusivamente moral, comete ato ilícito.</p>
      </div>
      <div class="law-block">
        <h4>Art. 927 - Obrigação de Indenizar</h4>
        <p>Aquele que, por ato ilícito (arts. 186 e 187), causar dano a outrem, fica obrigado a repará-lo.</p>
      </div>
    `;
  }

  out.innerHTML = `
    <div class="doc-header-block">
      <img src="logo.png" onerror="this.style.display='none'">
      <h1>MINISTÉRIO PÚBLICO DO ESTADO DO BRASIL</h1>
      <h2>Biblioteca e Arquivo Jurídico Ministerial</h2>
      <h3 style="margin: 5px 0 0; font-size: 13px; font-weight: 800;">${tituloLei}</h3>
    </div>

    <div class="doc-title-sec">INFORMAÇÕES DE CONSULTA</div>
    <p><strong>Observação Ministerial:</strong> ${obs}</p>
    <p><em>Este extrato consolida trechos legislativos para pronta referência e instrução de peças do Ministério Público.</em></p>

    <div class="doc-title-sec">TRECHOS SELECIONADOS</div>
    ${conteudoLei}

    <p style="text-align: center; margin-top: 40px; font-size: 10px; color: #666;">
      Documento gerado eletronicamente pelo Hub de Ferramentas - MPE RP.
    </p>
  `;
}

// RENDERIZADOR GENÉRICO (REQUISIÇÃO, PROMOÇÃO, PARECER, OFÍCIO)
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
      <img src="logo.png" onerror="this.style.display='none'">
      <h1>MINISTÉRIO PÚBLICO DO ESTADO DO BRASIL</h1>
      <h2>${titulos[tipo]}</h2>
    </div>

    <table class="doc-table">
      <tr><td class="title">Procedimento / Processo</td><td>${proc}</td></tr>
      <tr><td class="title">Destinatário / Requerido</td><td>${dest}</td></tr>
    </table>

    <div class="doc-title-sec">TEOR E FUNDAMENTAÇÃO</div>
    <p>${texto.replace(/\n/g, '<br>')}</p>

    <p style="text-align: center; margin-top: 50px;">Brasil Roleplay, Estado do Brasil, 2026.</p>

    <div class="sig-area">
      <div class="sig-block">
        <div class="sig-line"></div>
        <p><strong>${promotor.toUpperCase()}</strong><br>Promotor(a) de Justiça</p>
      </div>
    </div>
  `;
}

function gerarImagem() {
  const relatorio = document.getElementById('relatorio-a4');
  const btn = document.querySelector('.btn-gerar');

  btn.textContent = 'GERANDO PNG... (Aguarde)';

  html2canvas(relatorio, { scale: 2, useCORS: true, backgroundColor: '#ffffff' }).then(canvas => {
    let link = document.createElement('a');
    link.download = 'Documento_MPE.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    btn.textContent = 'EMITIR DOCUMENTO (PNG)';
  });
}

window.onload = function() {
  mudarFerramenta();
};
