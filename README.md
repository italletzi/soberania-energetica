# Soberanía Energética — Mónica Mendoza

Funnel digital completo. HTML/CSS/JS puro → Netlify.

## Archivos

| Archivo | Página | Estado |
|---------|--------|--------|
| `index.html` | Quiz lead magnet | ✅ Listo |
| `resultado.html` | Resultado del quiz | ✅ Listo |
| `curso.html` | Landing curso $4,500 | ✅ Listo |
| `sesion0.html` | Sesión 0 $1,500 | ✅ Listo |
| `css/styles.css` | Estilos compartidos | ✅ Listo |
| `js/main.js` | JS compartido | ✅ Listo |
| `img/logo-mb3.png` | Logo transparente | ⚠️ Pendiente |

## Setup rápido (3 pasos)

### 1. Clonar y abrir en VS Code
```bash
git clone https://github.com/TU_USUARIO/soberania-energetica.git
cd soberania-energetica
code .
```

### 2. Configurar variables en `js/main.js`
```js
const CONFIG = {
  N8N_WEBHOOK:    'https://TU_N8N.app.n8n.cloud/webhook/quiz-lead',
  GETNET_CURSO:   'https://getnet.mx/pago/TU_LINK_CURSO',
  GETNET_SESION0: 'https://getnet.mx/pago/TU_LINK_SESION0',
  WA_NUMBER:      '521XXXXXXXXXX',  // número de Mónica con código país
};
```

### 3. Reemplazar logo
- Obtener `logo-mb3.png` con fondo transparente (Remove.bg o archivo original)
- Reemplazar el texto "MB3" en todos los HTML por:
  `<img src="img/logo-mb3.png" alt="Mónica Mendoza" class="site-logo">`

## Deploy

Cada `git push` a `main` hace deploy automático en Netlify.

```bash
git add .
git commit -m "tu mensaje"
git push
```

## Conectar dominio (cuando Mónica lo compre)

1. Netlify → Site Settings → Domain Management → Add custom domain
2. Ingresar el dominio (ej. `monicamendoza.mx`)
3. Copiar los DNS records que da Netlify
4. Pegarlos en el panel del registrador de dominio
5. Esperar 24-48h para propagación

## GetNet — Cómo generar los links de pago

1. Entrar al portal de GetNet México: getnet.mx
2. Ir a "Get Link & Pay"
3. Crear link para "Curso Iniciación" → $4,500 MXN
4. Crear link para "Sesión 0" → $1,500 MXN
5. Copiar las URLs y pegarlas en `js/main.js`

Los links funcionan sin ninguna integración de código — GetNet maneja todo el checkout.
