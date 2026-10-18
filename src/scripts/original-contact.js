const FORMSPREE_LINK = 'https://formspree.io/f/xwlelqbz';
const form = document.querySelector('[data-original-form]');
const error = document.querySelector('[data-original-email-error]');
const success = document.querySelector('[data-original-success]');
const submit = form?.querySelector('button[type="submit"]');
function setErrorEmailReal(message) { error.textContent = message; error.style.display = message ? 'block' : 'none'; }
function setCargando(value) { submit.disabled = value; submit.querySelector('span').textContent = value ? 'Verificando y enviando...' : 'Enviar mensaje'; }
function setEnviadoExito(value) { form.hidden = value; success.hidden = !value; }
async function manejarEnvio(e) {
    e.preventDefault();
    setErrorEmailReal("");

    const formElement = e.target;
    const formData = new FormData(formElement);
    const emailIngresado = formData.get("email")?.toString().trim();

    // 1. Validar formato básico en el frontend
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(emailIngresado)) {
      setErrorEmailReal("Por favor ingresa un correo electrónico válido.");
      return;
    }

    setCargando(true);

    try {
      // 2. Consultar a nuestra API Serverless en Vercel (Pasa por el servidor, NO por el navegador -> Cero CORS)
      const resServer = await fetch(`/api/validar?email=${encodeURIComponent(emailIngresado)}`);
      const dataServer = await resServer.json();

      // Si Abstract API determina que el correo NO existe:
      if (!dataServer.esValido) {
        setErrorEmailReal("El correo electrónico ingresado no existe o no puede recibir mensajes.");
        setCargando(false);
        return; // 🛑 Detenemos el envío
      }

      // 3. Si el correo ES REAL, se envía a Formspree
      const respuestaFormspree = await fetch(FORMSPREE_LINK, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (respuestaFormspree.ok) {
        setEnviadoExito(true);
      } else {
        setErrorEmailReal("Ocurrió un problema al enviar el formulario. Inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error al procesar el formulario:", err);
      setErrorEmailReal("Error al verificar el correo. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  }
form?.addEventListener('submit', manejarEnvio);
