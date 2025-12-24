export class MultiversusData {
  constructor(actor) {
    this.actor = actor;
    this.dataKey = "multiversusData";
    if (!this.actor.flags[this.dataKey]) {
      this.actor.setFlag("world", this.dataKey, {});
    }
  }

  // Retorna todos os dados
  async getAll() {
    return this.actor.getFlag("world", this.dataKey) || {};
  }

  // Retorna valor específico
  async get(tab, field) {
    const all = await this.getAll();
    return all[tab]?.[field];
  }

  // Define valor específico
  async set(tab, field, value) {
    const all = await this.getAll();
    if (!all[tab]) all[tab] = {};
    all[tab][field] = value;
    await this.actor.setFlag("world", this.dataKey, all);
  }

  // Deleta campo específico
  async delete(tab, field) {
    const all = await this.getAll();
    if (all[tab]) {
      delete all[tab][field];
      if (Object.keys(all[tab]).length === 0) delete all[tab];
      await this.actor.setFlag("world", this.dataKey, all);
    }
  }

  // Deleta aba inteira
  async deleteTab(tab) {
    const all = await this.getAll();
    delete all[tab];
    await this.actor.setFlag("world", this.dataKey, all);
  }

  // Adiciona valor em array
  async push(tab, field, value) {
    const current = (await this.get(tab, field)) || [];
    if (!Array.isArray(current)) throw new Error(`Campo ${field} não é array.`);
    current.push(value);
    await this.set(tab, field, current);
  }

  // Remove valor por índice de array
  async removeIndex(tab, field, index) {
    const arr = (await this.get(tab, field)) || [];
    if (!Array.isArray(arr)) throw new Error(`Campo ${field} não é array.`);
    arr.splice(index, 1);
    await this.set(tab, field, arr);
  }

  // Substitui array inteiro
  async setArray(tab, field, array) {
    if (!Array.isArray(array)) throw new Error("O valor precisa ser um array.");
    await this.set(tab, field, array);
  }

  // Retorna cópia do array (protege contra alteração direta)
  async getArray(tab, field) {
    const arr = (await this.get(tab, field)) || [];
    if (!Array.isArray(arr)) return [];
    return [...arr];
  }
}
