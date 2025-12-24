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