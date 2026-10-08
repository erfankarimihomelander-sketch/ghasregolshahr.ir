

// قصر گلشهر — رفتارهای مشترک صفحات
(() => {
  const storageKey = 'ghasre_golshahr_properties_v2';
  const readProperties = () => { try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; } };
  const esc = (value) => String(value ?? '').replace(/[&<>\"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch]));
  function renderProperties() {
    const grid = document.getElementById('propertiesGrid');
    const empty = document.getElementById('empty');
    if (!grid) return;
    let properties = readProperties();
    const filter = grid.dataset.filter || 'all';
    if (filter !== 'all') properties = properties.filter(p => p.type === filter);
    grid.innerHTML = properties.map(p => `<article class="rounded-2xl overflow-hidden bg-surface-container border border-outline/30"><div class="h-48 bg-surface-container-highest">${p.image ? `<img src="${esc(p.image)}" class="w-full h-full object-cover" alt="ملک در زنجان">` : ''}</div><div class="p-5"><div class="text-primary text-xs font-bold mb-2">${esc(p.type || 'ملک')}</div><h3 class="text-lg font-bold text-white mb-2">${esc(p.title || 'ملک ثبت‌شده')}</h3><p class="text-sm text-on-surface-variant mb-3">${esc(p.address || '')}</p><p class="text-sm text-white">${esc(p.price || '')}</p><p class="text-xs text-on-surface-variant mt-2">${esc(p.details || '')}</p></div></article>`).join('');
    if (empty) empty.classList.toggle('hidden', properties.length > 0);
    grid.classList.toggle('hidden', properties.length === 0);
  }
  document.addEventListener('DOMContentLoaded', renderProperties);
})();