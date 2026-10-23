import { DIRECCION, HORARIO, ENVIOS_ZONA } from '../config'

/* Preguntas frecuentes de la home. Texto plano (sin JSX) para poder
   reusarlo tal cual en el JSON-LD FAQPage de la Fase 5.
   Regla: ningún dato del negocio se inventa — cada respuesta sale de algo
   que ya figura en la web (fuente al lado de cada una). */

export interface FaqItem {
  pregunta: string
  respuesta: string
  /** Si está, la respuesta muestra un botón a WhatsApp con este texto precargado. */
  waTexto?: string
}

export const FAQ: FaqItem[] = [
  {
    // Fuente: consigna Fase 4A. "Te avisamos el total": a confirmar con el dueño (CONTEXTO.md).
    pregunta: '¿Puedo mandar la lista del colegio por WhatsApp?',
    respuesta: 'Sí. Mandanos la lista por WhatsApp, en foto o en texto: te la preparamos y te avisamos el total.',
    waTexto: 'Hola! Les quiero mandar la lista del colegio.',
    // TODO(contenido): plazo para preparar la lista — no figura en la web, no mostrar hasta confirmarlo.
  },
  {
    // Fuente: EnviosPage, pasos 02 y 03.
    pregunta: '¿Cómo hago un pedido si no hay carrito de compras?',
    respuesta: 'Agregá con el botón + los productos que te interesan a tu lista y mandala con un clic por WhatsApp. Te confirmamos disponibilidad y precio final.',
  },
  {
    // Fuente: config.ts (DIRECCION, HORARIO) — mismos datos que el footer.
    pregunta: '¿Dónde están y en qué horario atienden?',
    respuesta: `Estamos en ${DIRECCION}. Atendemos ${HORARIO}.`,
  },
  {
    // Fuente: EnviosPage, card "Entregas a domicilio" + paso 04 (retiro en tienda).
    pregunta: '¿Hacen envíos a domicilio?',
    respuesta: `Sí, hacemos entregas en ${ENVIOS_ZONA}, sujeto a disponibilidad de zona. Consultá disponibilidad y costo de envío por WhatsApp. También podés retirar en el local.`,
    // TODO(contenido): costo y plazo de envío — no figuran en la web, no mostrar hasta confirmarlos.
  },
  {
    // Fuente: ProductCard (agotado visible + botón a WhatsApp). Texto definido en la Fase 4A.
    pregunta: '¿Qué pasa si un producto figura como agotado?',
    respuesta: 'Escribinos desde el botón del producto y te contamos por WhatsApp si lo podemos conseguir.',
    // TODO(contenido): si avisan cuando vuelve a entrar y en cuánto tiempo — a confirmar con el dueño.
  },
  {
    // Fuente: EnviosPage:336 (card "Formas de pago"). A confirmar con el dueño (CONTEXTO.md).
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta: 'Efectivo, transferencia bancaria, Mercado Pago, débito y crédito.',
  },
]
