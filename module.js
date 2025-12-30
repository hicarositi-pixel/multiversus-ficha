import { MultiversusData } from "./multiversusData.js";

Hooks.once("init", () => {
  console.log("Multiversus Ficha | módulo inicializado");
});

// Renomear abas padrão
Hooks.on("renderWTCharacterSheet", (app, html) => {
  const tabNames = ["Geral","Atributos","Origem","Poderes","Silhueta","Anotações"];
  html.find(".sheet-tabs .item").each((i, el) => { if(tabNames[i]) el.textContent = tabNames[i]; });
});

// Renderizar conteúdo do Perfil diretamente na aba Geral
Hooks.on("renderWTCharacterSheet", async (app, html, data) => {
  const actor = data.actor;
  const mvData = new MultiversusData(actor);

  const generalTab = html.find(".tab.general");
  if (!generalTab.length) return;

  // Criar container do Perfil e Sobrevivente dentro da aba Geral
  const perfilContent = $(`
    <div class="perfil-survivor-container">
      <h2>Perfil</h2>
      <div class="hbox vgap8">
        <div class="vbox vgap4 grow"><label>Nome do Jogador</label><input type="text" name="playerName" value="${data.actor.system.playerName||''}"></div>
        <div class="vbox vgap4 grow"><label>Arquétipo</label><input type="text" name="archetypeName" value="${data.actor.system.archetypes?.[0]||''}"></div>
        <div class="vbox vgap4 grow"><label>Universo/Tema</label><input type="text" name="universeTheme" value="${data.actor.system.universeTheme||''}"></div>
        <div class="vbox vgap4 grow"><label>LVL</label><input type="number" name="customLevel" min="0" value="${data.actor.system.customLevel||0}"></div>
      </div>

      <h2>Ficha de Sobrevivente</h2>
      <div class="vbox vgap8 survival-section">
        <div class="hbox vgap8">
          <div class="vbox vgap4 grow"><label>Pontos Disponíveis</label><input type="number" min="0" name="pointsAvailable" value="${data.actor.system.survival?.pointsAvailable||10}"></div>
          <div class="vbox vgap4 grow"><label>Pontos Distribuídos</label><input type="number" min="0" name="pointsUsed" value="${data.actor.system.survival?.pointsUsed||0}"></div>
        </div>

        <h3>Capacidades (0 a 10)</h3>
        <div class="hbox vgap4">
          <div class="vbox vgap4 grow"><label>Incendiar</label><input type="number" min="0" max="10" name="incendiar" value="${data.actor.system.survival?.incendiar||0}"></div>
          <div class="vbox vgap4 grow"><label>Regar</label><input type="number" min="0" max="10" name="regar" value="${data.actor.system.survival?.regar||0}"></div>
          <div class="vbox vgap4 grow"><label>Plantar</label><input type="number" min="0" max="10" name="plantar" value="${data.actor.system.survival?.plantar||0}"></div>
          <div class="vbox vgap4 grow"><label>Congelar</label><input type="number" min="0" max="10" name="congelar" value="${data.actor.system.survival?.congelar||0}"></div>
          <div class="vbox vgap4 grow"><label>Transportar</label><input type="number" min="0" max="10" name="transportar" value="${data.actor.system.survival?.transportar||1}"></div>
          <div class="vbox vgap4 grow"><label>Lenhar</label><input type="number" min="0" max="10" name="lenhar" value="${data.actor.system.survival?.lenhar||0}"></div>
        </div>

        <div class="hbox vgap4">
          <div class="vbox vgap4 grow"><label>Minerar</label><input type="number" min="0" max="10" name="minerar" value="${data.actor.system.survival?.minerar||0}"></div>
          <div class="vbox vgap4 grow"><label>Trabalhar</label><input type="number" min="0" max="10" name="trabalhar" value="${data.actor.system.survival?.trabalhar||1}"></div>
          <div class="vbox vgap4 grow"><label>Coletar</label><input type="number" min="0" max="10" name="coletar" value="${data.actor.system.survival?.coletar||1}"></div>
          <div class="vbox vgap4 grow"><label>Purificar</label><input type="number" min="0" max="10" name="purificar" value="${data.actor.system.survival?.purificar||0}"></div>
          <div class="vbox vgap4 grow"><label>Fortificar</label><input type="number" min="0" max="10" name="fortificar" value="${data.actor.system.survival?.fortificar||0}"></div>
          <div class="vbox vgap4 grow"><label>Desenterrar</label><input type="number" min="0" max="10" name="desenterrar" value="${data.actor.system.survival?.desenterrar||0}"></div>
        </div>

        <div class="hbox vgap4">
          <div class="vbox vgap4 grow"><label>Analisar</label><input type="number" min="0" max="10" name="analisar" value="${data.actor.system.survival?.analisar||1}"></div>
          <div class="vbox vgap4 grow"><label>Reparar</label><input type="number" min="0" max="10" name="reparar" value="${data.actor.system.survival?.reparar||0}"></div>
          <div class="vbox vgap4 grow"><label>Caçar</label><input type="number" min="0" max="10" name="cacar" value="${data.actor.system.survival?.cacar||0}"></div>
          <div class="vbox vgap4 grow"><label>Curar</label><input type="number" min="0" max="10" name="curar" value="${data.actor.system.survival?.curar||0}"></div>
          <div class="vbox vgap4 grow"><label>Ventilar</label><input type="number" min="0" max="10" name="ventilar" value="${data.actor.system.survival?.ventilar||0}"></div>
          <div class="vbox vgap4 grow"><label>Energizar</label><input type="number" min="0" max="10" name="energizar" value="${data.actor.system.survival?.energizar||0}"></div>
        </div>

        <div class="hbox vgap4">
          <div class="vbox vgap4 grow"><label>Moldar</label><input type="number" min="0" max="10" name="moldar" value="${data.actor.system.survival?.moldar||0}"></div>
          <div class="vbox vgap4 grow"><label>Rastrear</label><input type="number" min="0" max="10" name="rastrear" value="${data.actor.system.survival?.rastrear||0}"></div>
        </div>
      </div>
    </div>
  `);

  // Adiciona na aba Geral
  generalTab.append(perfilContent);

  // Preenche e salva os inputs automaticamente
  for (const input of perfilContent.find("input[name]")) {
    const name = input.name;
    input.value = await mvData.get("perfil", name) || input.value;

    $(input).on("blur keydown", async (e) => {
      if (e.type === "keydown" && e.key !== "Enter") return;
      await mvData.set("perfil", name, e.currentTarget.value);
      if (e.key === "Enter") e.currentTarget.blur();
    });
  }
});

// Protege campos principais do Perfil
Hooks.on("preUpdateActor", (actor, update, options, userId) => {
  const protectedFields = ["system.playerName","system.archetypeName","system.universeTheme","system.customLevel"];
  for (const field of protectedFields) {
    if (field in update) update[field] = actor.getField(field);
  }
});

Hooks.on("renderWTCharacterSheet", async (app, html, data) => {
  const actor = data.actor;
  const mvData = new MultiversusData(actor);

  // Se já existe, não recria
  if (html.find(".quick-notes-section").length) return;

  // Criar container das notas
  const notesSection = $(`
    <div class="quick-notes-section">
      <h2>Anotações Rápidas</h2>
      <textarea class="quick-notes-editor"></textarea>
    </div>
  `);

  // Adiciona na aba Geral
  const generalTab = html.find(".tab.general");
  generalTab.append(notesSection);

  // Recupera conteúdo salvo
  const savedNotes = await mvData.get("notas", "quickNotes") || "";

  // Inicializa o TextEditor do Foundry
  await TextEditor.create(
    notesSection.find(".quick-notes-editor")[0],
    savedNotes,
    {
      toolbar: "core.full",
      menubar: true,
      statusbar: true,
      height: 300
    }
  );

  // Salvamento automático ao sair do editor
  notesSection.find(".quick-notes-editor").on("blur", async () => {
    const content = notesSection.find(".quick-notes-editor").val();
    await mvData.set("notas", "quickNotes", content);
  });

  // Impede propagação de clique
  notesSection.on("click", e => e.stopPropagation());
});

// 1. Registro do Setting (Opcional, mas mantido conforme seu código)
Hooks.once("ready", async () => {
    if (!game.settings.registered["multiversus-ficha.theme"]) {
        game.settings.register("multiversus-ficha", "theme", {
            name: "Tema da Ficha",
            hint: "Escolha o tema visual da ficha",
            scope: "world",
            config: true,
            type: String,
            default: "base",
            choices: { "base": "Base", "lobby": "Lobby", "dark": "Dark" }
        });
    }
});

// 2. Hook Único para Renderizar a Ficha
Hooks.on("renderWTCharacterSheet", async (app, html, data) => {
    const actor = app.actor; // Referência correta do ator
    const windowApp = app.element; // A janela inteira (.window-app)
    const windowContent = windowApp.find(".window-content");

    // --- A. INJETAR VÍDEO NO FUNDO ---
    if (!windowContent.find("video.theme-background").length) {
        const videoSrc = "modules/multiversus-ficha/img/base.mp4";
        const videoEl = $(`
            <video class="theme-background" autoplay muted loop playsinline>
                <source src="${videoSrc}" type="video/mp4">
            </video>
        `);
        windowContent.prepend(videoEl);
    }

    // --- B. GERENCIAMENTO DE TEMAS ---
    const currentTheme = actor.getFlag("multiversus", "currentTheme") || "base";
    
    // Aplica a classe do tema na janela inteira
    windowApp.removeClass("theme-base theme-lobby theme-dark")
             .addClass(`theme-${currentTheme}`);
    windowApp.attr('data-theme', currentTheme);

    // --- C. INJETAR ENGRENAGEM (Se não existir) ---
    if (!html.find(".theme-gear-container").length) {
        const themes = [
            { name: "Base", id: "base", gmOnly: false },
            { name: "Lobby", id: "lobby", gmOnly: true },
            { name: "Dark", id: "dark", gmOnly: true }
        ];

        const gearHtml = $(`
            <div class="theme-gear-container">
                <button type="button" class="gear-button"><i class="fas fa-cog"></i></button>
                <ul class="theme-list hidden">
                    ${themes.map(t => {
                        const disabled = (t.gmOnly && !game.user.isGM) ? 'disabled' : '';
                        return `<li data-theme="${t.id}" class="${disabled}">${t.name}</li>`;
                    }).join("")}
                </ul>
            </div>
        `);

        // Coloca no topo do formulário
        html.find("form").prepend(gearHtml);

        // Eventos da Engrenagem
        gearHtml.find(".gear-button").click(ev => {
            ev.preventDefault();
            ev.stopPropagation();
            gearHtml.find(".theme-list").toggleClass("hidden");
        });

        gearHtml.find(".theme-list li").click(async ev => {
            const li = $(ev.currentTarget);
            if (li.hasClass("disabled")) return;

            const themeId = li.data("theme");
            
            // Fecha o menu e salva
            gearHtml.find(".theme-list").addClass("hidden");
            await actor.setFlag("multiversus", "currentTheme", themeId);
            
            // O Foundry re-renderiza a ficha automaticamente ao mudar a Flag, 
            // aplicando o novo tema através do código acima.
        });
    }
});

Hooks.on("renderActorSheet", (app, html, data) => {
    // 1. Identifica o container de scroll da ficha
    const scrollContainer = html.find('.window-content')[0];
    
    // 2. Recupera a posição salva (se existir)
    const scrollTop = app._scrollPos;
    if (scrollTop) {
        scrollContainer.scrollTop = scrollTop;
    }

    // 3. Ouve o clique nas caixas de vida para salvar a posição antes do sistema atualizar
    html.find('.healthbox').on('mousedown', () => {
        app._scrollPos = scrollContainer.scrollTop;
    });

    // 4. Remove a classe de animação de entrada durante atualizações
    // Isso evita que a ficha "deslize" de novo a cada clique
    if (app._renderedOnce) {
        html.css("animation", "none");
        html.find(".tab").css("animation", "none");
    }
    app._renderedOnce = true;
});

Hooks.on("renderActorSheet", (app, html, data) => {
    const sheet = html.closest('.window-app');
    const scrollContainer = html.find('.window-content')[0];

    // 1. LIMPEZA AUTOMÁTICA: Sempre que a ficha renderiza, ela "destrava"
    sheet.removeClass('is-animating impact-glitch');
    app._lockClick = false; 

    // 2. RESTAURAR SCROLL
    if (app._scrollPos && scrollContainer) {
        scrollContainer.scrollTop = app._scrollPos;
    }

    // 3. SISTEMA DE BLOQUEIO GENÉRICO
    html.on('click', '.healthbox', function(event) {
        const box = $(this);

        // Se já houver uma trava, ignora totalmente
        if (app._lockClick) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return false;
        }

        // Delay para o Foundry atualizar o dado antes de checarmos a classe
        setTimeout(() => {
            // CONDIÇÃO: Ativa se a caixa virou Shock (Amarela)
            // Você pode adicionar outras condições aqui com || (OU)
            if (box.hasClass('shock')) { 
                
                // ATIVA O ESCUDO
                app._lockClick = true;
                sheet.addClass('is-animating impact-glitch');
                
                // Salva scroll para garantir que não pule após o re-render
                if (scrollContainer) app._scrollPos = scrollContainer.scrollTop;

                // DESATIVA O ESCUDO: Após 600ms (tempo da animação + margem)
                setTimeout(() => {
                    app._lockClick = false;
                    sheet.removeClass('is-animating impact-glitch');
                }, 600);
            }
        }, 30);
    });
});


// Procure este Hook no seu module.js e adicione as linhas de tradução:
Hooks.on("renderWTCharacterSheet", (app, html) => {
    
    // --- TRADUÇÕES DE TÍTULOS E LABELS ---
    html.find('h2:contains("Stats")').text("Atributos"); // Traduz Stats
    html.find('h2:contains("General")').text("Geral");
    html.find('label:contains("Points Spent")').text("Xp Gastos:");
    html.find('label:contains("Points to Spend")').text("Xp Não Gasto:");
    html.find('label:contains("Willpower")').text("Força de Vontade:");
    html.find('label:contains("Base Will")').text("Vontade Base:");
    

    // --- RENOVAR ABAS (Você já tem isso, mantenha abaixo) ---
    const tabNames = ["Geral","Atributos","Origem","Poderes","Silhueta","Anotações"];
    html.find(".sheet-tabs .item").each((i, el) => { if(tabNames[i]) el.textContent = tabNames[i]; });
});

Hooks.on("renderWTCharacterSheet", (app, html, data) => {
    const powersTab = html.find(".tab.powers");
    
    // 1. TRADUÇÕES
    powersTab.find('.grow:contains("Foci")').text("Focos");
    powersTab.find('.grow:contains("Hyperstats")').text("Hiper-Atributos");
    powersTab.find('.grow:contains("Hyperskills")').text("Hiper-Perícias");
    powersTab.find('.grow:contains("Miracles")').text("Milagres");

    // 2. CABEÇALHO DE ROLAGEM GERAL
    if (powersTab.find(".general-roll-header").length === 0) {
        const rollHeader = $(`
            <div class="general-roll-header" style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px; margin-bottom: 15px;">
                <h2 class="hbox">
                    <div class="grow">Rolagem Geral</div>
                    <div class="hbox vgap4" style="align-items: center;">
                        <input type="text" class="general-roll-input" 
                               value="2d" 
                               style="width: 100px; text-align: center; background: rgba(0,0,0,0.3); color: white; border: 1px solid #555; font-size: 0.75rem; height: 24px;">
                        <button class="nogrow general-roll-button" title="Configurar Rolagem de Poder">
                            <i class="fa-solid fa-dice"></i>
                        </button>
                    </div>
                </h2>
            </div>
        `);

        powersTab.prepend(rollHeader);

        // 3. FUNÇÃO NATIVA "CONFIGURE YOUR ROLL" PERSONALIZADA
        rollHeader.find(".general-roll-button").click(async (ev) => {
            ev.preventDefault();
            
            // Pega o valor da caixa de texto
            const formula = rollHeader.find(".general-roll-input").val();

            // Usa a função core do sistema Wild Talents para abrir o diálogo
            // 'flavor' define o nome que aparece no topo da janela "Configure Your Roll"
            return game.wildtalents.roll(formula, {
                flavor: "Poder", 
                speaker: ChatMessage.getSpeaker({ actor: app.actor })
            });
        });
    }
});

Hooks.on("renderWTCharacterSheet", (app, html, data) => {
    const powersTab = html.find(".tab.powers");
    
    // 1. MANTER TRADUÇÕES EXISTENTES
    powersTab.find('.grow:contains("Foci")').text("Focos");
    powersTab.find('.grow:contains("Hyperstats")').text("Hiper-Atributos");
    powersTab.find('.grow:contains("Hyperskills")').text("Hiper-Perícias");
    powersTab.find('.grow:contains("Miracles")').text("Milagres");

    // 2. CABEÇALHO DE ROLAGEM GERAL (TOPO DA ABA)
    if (powersTab.find(".general-roll-header").length === 0) {
        const rollHeader = $(`
            <div class="general-roll-header" style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px; margin-bottom: 15px;">
                <h2 class="hbox">
                    <div class="grow">Rolagem Geral</div>
                    <div class="hbox vgap4" style="align-items: center;">
                        <input type="text" class="general-roll-input" value="2d" 
                               style="width: 100px; text-align: center; background: rgba(0,0,0,0.3); color: white; border: 1px solid #555; font-size: 0.75rem; height: 24px;">
                        <button class="nogrow general-roll-button wt-roll-anim" title="Configurar Rolagem">
                            <i class="fa-solid fa-dice"></i>
                        </button>
                    </div>
                </h2>
            </div>
        `);
        powersTab.prepend(rollHeader);

        rollHeader.find(".general-roll-button").click(async (ev) => {
            const formula = rollHeader.find(".general-roll-input").val();
            return startRollFlow(ev, formula, "Poder");
        });
    }

    // 3. SELEÇÃO E CUSTOMIZAÇÃO DE TODOS OS BOTÕES DE ROLAGEM
    const allRollButtons = html.find(".roll-stat, .roll-skill, .roll-miracle, .roll-hyperskill, .roll-hyperstat");
    allRollButtons.addClass("wt-roll-anim");
    
    allRollButtons.off("click").click(async (ev) => {
        ev.preventDefault();
        const el = $(ev.currentTarget);
        const formula = el.attr("dice") || "2d";
        
        // --- DETECÇÃO DINÂMICA DE NOME + QUALIDADE ---
        // Pega o nome do poder/perícia na mesma linha
        const parentRow = el.closest(".hbox");
        const powerName = parentRow.find(".grow").first().text().trim();
        
        // Pega o texto da qualidade (ex: Attacks, Defends, Useful) ignorando os números (+0, etc)
        let qualityText = el.parent().text().replace(/[0-9+\-]/g, "").trim();
        
        const finalLabel = qualityText ? `${powerName} [${qualityText}]` : powerName;
        
        return startRollFlow(ev, formula, finalLabel);
    });

    // 4. FUNÇÃO DE FLUXO: ANIMAÇÃO -> MÚLTIPLAS AÇÕES -> CONFIGURAÇÃO NATIVA
    async function startRollFlow(ev, formula, label) {
        const button = $(ev.currentTarget);

        // Animação de Inversão de Cores (Flash)
        button.addClass("wt-anim-active");
        setTimeout(() => button.removeClass("wt-anim-active"), 300);

        // Diálogo de Múltiplas Ações / Notas de Texto
        new Dialog({
            title: `Ação: ${label}`,
            content: `
                <div style="padding: 10px;">
                    <label style="display: block; margin-bottom: 5px;"><b>Descrição da Ação:</b></label>
                    <input type="text" id="multi-action-note" placeholder="Ex: Múltiplas ações, Mirando..." style="width: 100%; margin-bottom: 10px;">
                    <p style="font-size: 0.75rem; color: #777;">O texto abaixo será enviado ao chat.</p>
                </div>
            `,
            buttons: {
                roll: {
                    icon: '<i class="fas fa-dice"></i>',
                    label: "Abrir Diálogo de Dados",
                    callback: async (html) => {
                        const note = html.find("#multi-action-note").val();
                        const chatLabel = note ? `${label} (${note})` : label;

                        // Aciona o diálogo "Configure Your Roll" nativo do sistema
                        return game.wildtalents.roll(formula, {
                            flavor: chatLabel,
                            speaker: ChatMessage.getSpeaker({ actor: app.actor })
                        });
                    }
                }
            },
            default: "roll"
        }).render(true);
    }

    // 5. CSS PARA OS EFEITOS (Invert, Brilho e Escala)
    if (!$("style#wt-complete-effects").length) {
        $("head").append(`
            <style id="wt-complete-effects">
                .wt-roll-anim { transition: all 0.15s ease-out; cursor: pointer; }
                .wt-roll-anim:hover { filter: drop-shadow(0 0 8px #fff); transform: scale(1.15); }
                
                /* Classe de animação disparada pelo JS */
                .wt-anim-active { animation: wt-flash-invert 0.3s forwards; }

                @keyframes wt-flash-invert {
                    0% { filter: invert(0); transform: scale(1); }
                    50% { filter: invert(1) brightness(1.5) drop-shadow(0 0 12px #fff); transform: scale(1.4) rotate(10deg); }
                    100% { filter: invert(0); transform: scale(1); }
                }
            </style>
        `);
    }
});

Hooks.on("renderWTCharacterSheet", (app, html, data) => {
    // Seleciona a aba de Arquétipos
    const archetypeTab = html.find(".tab.archetype");

    // 1. TRADUÇÃO DOS TÍTULOS (JavaScript puro/jQuery)
    // Buscamos o div .grow dentro de cada h2 e alteramos apenas o texto
    archetypeTab.find('h2.hbox .grow:contains("Archetypes")').text("Arquétipos");
    archetypeTab.find('h2.hbox .grow:contains("Sources")').text("Fontes");
    archetypeTab.find('h2.hbox .grow:contains("Permissions")').text("Permissões");
    archetypeTab.find('h2.hbox .grow:contains("Intrinsics")').text("Intrínsecos");

    // 2. GARANTIR CONTEÚDO BRANCO (FOSCO)
    // Isso aplica a cor branca apenas ao texto dentro do placeholder, sem mudar a fonte
    archetypeTab.find(".placeholder").css({
        "color": "#ffffff",
        "opacity": "0.8"
    });

    // 3. MANTENDO O ESTILO DOS BOTÕES +
    // Se quiser que os botões de adicionar também fiquem brancos:
    archetypeTab.find("button.nogrow").css("color", "#ffffff");

    // --- (Aqui você mantém suas outras funções de rolagem e silhueta) ---
});

Hooks.on("renderWTCharacterSheet", (app, html, data) => {
    // Verifica se a ficha acabou de ser aberta (para não repetir a animação em cada clique)
    if (!app._renderedOnce) {
        html.addClass("wt-tech-open");
        app._renderedOnce = true;
        
        // Remove a classe após a animação para não interferir no uso normal
        setTimeout(() => {
            html.removeClass("wt-tech-open");
        }, 1200);
    }

    // --- (Aqui continuam suas outras funções: traduções, silhueta, etc.) ---
});
