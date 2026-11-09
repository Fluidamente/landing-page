// Datos de contacto y del ebook compartidos por todo el sitio.

export const WHATSAPP_NUMBER = "5493755749072";
export const WHATSAPP_DISPLAY = "+54 9 3755 74-9072";
export const INSTAGRAM_URL = "https://www.instagram.com/_fluidamente";
export const INSTAGRAM_HANDLE = "@_fluidamente";

export const whatsappLink = (
  text = "Hola Lic. Lépori, me interesa concertar una sesión."
) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const EBOOK_TITLE = "El camino consciente del duelo";
export const EBOOK_PRICE = 29990;
export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);

/**
 * Pantallas donde "Sobre mí" queda fijo mientras se arma el retrato:
 * escritorio con alto suficiente para que entre todo el texto.
 */
export const STAGE_QUERY =
  "(min-width: 1024px) and (min-height: 940px), (min-width: 1280px) and (min-height: 890px), (min-width: 1440px) and (min-height: 840px)";
