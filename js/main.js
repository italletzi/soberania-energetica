/* ═══════════════════════════════════════════════
   SOBERANÍA ENERGÉTICA — JS compartido
   ═══════════════════════════════════════════════ */

/* ── Configuración ──────────────────────────── */
const CONFIG = {
  // n8n webhook — REEMPLAZAR cuando esté configurado n8n
  N8N_WEBHOOK: 'N8N_WEBHOOK_URL',

  // GetNet — REEMPLAZAR con links del panel de GetNet México
  GETNET_CURSO:   'GETNET_LINK_CURSO',
  GETNET_SESION0: 'GETNET_LINK_SESION0',

  // WhatsApp de Mónica — REEMPLAZAR con número real
  WA_NUMBER: '521XXXXXXXXXX',

  // Google Analytics — REEMPLAZAR con ID real (opcional)
  GA_ID: 'G-XXXXXXXXXX',
};

/* ── Toast notification ─────────────────────── */
function showToast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

/* ── Enviar lead a n8n ──────────────────────── */
async function sendLeadToN8N(data) {
  if (CONFIG.N8N_WEBHOOK === 'N8N_WEBHOOK_URL') {
    console.log('[DEV] Lead capturado (n8n no configurado):', data);
    return;
  }
  try {
    await fetch(CONFIG.N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error('Error enviando lead a n8n:', err);
  }
}

/* ── Abrir GetNet ────────────────────────────── */
function openGetNet(producto) {
  const url = producto === 'curso'
    ? CONFIG.GETNET_CURSO
    : CONFIG.GETNET_SESION0;

  if (url.startsWith('GETNET_')) {
    showToast('Link de pago GetNet pendiente de configurar');
    return;
  }
  window.open(url, '_blank');

  // Evento de analytics si está configurado
  if (typeof gtag !== 'undefined') {
    gtag('event', 'begin_checkout', {
      currency: 'MXN',
      value: producto === 'curso' ? 4500 : 1500,
      items: [{ item_name: producto }],
    });
  }
}

/* ── Abrir WhatsApp ─────────────────────────── */
function openWA(mensaje) {
  const msg = encodeURIComponent(
    mensaje || 'Hola Mónica, me interesa saber más sobre tu proceso 🌿'
  );
  window.open(`https://wa.me/${CONFIG.WA_NUMBER}?text=${msg}`, '_blank');
}

/* ── Guardar perfil en sessionStorage ────────── */
function saveProfile(data) {
  sessionStorage.setItem('se_perfil', JSON.stringify(data));
}

function getProfile() {
  try {
    return JSON.parse(sessionStorage.getItem('se_perfil') || '{}');
  } catch {
    return {};
  }
}

/* ── Redirigir con perfil ───────────────────── */
function goToResultado(perfil, score) {
  saveProfile({ perfil, score, ts: Date.now() });
  window.location.href = '/resultado.html';
}
