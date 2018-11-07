import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';


// the translations
const resources = {
  es: {
    translation: {
      apple: 'manzana',
      balloon: 'globo',
      banana: 'plátano',
      basket: 'cesta',
      bee: 'abeja',
      bicycle: 'bicicleta',
      boat: 'bote',
      book: 'libro',
      bucket: 'cangilón',
      bunny: 'conejito',
      cactus: 'cactus',
      car: 'coche',
      carrot: 'Zanahoria',
      cat: 'gato',
      chair: 'silla',
      charger: 'cargador',
      cloud: 'nube',
      computer: 'computadora',
      controller: 'controlador',
      desk: 'escritorio',
      dog: 'perro',
      door: 'puerta',
      eraser: 'borrador',
      eyes: 'ojos',
      fan: 'ventilador',
      fire: 'fuego',
      fish: 'pez',
      glasses: 'lentes',
      hat: 'sombrero',
      keyboard: 'teclado',
      keys: 'llaves',
      lock: 'bloquear',
      marker: 'marcador',
      moon: 'Luna',
      mouse: 'ratón',
      mug: 'jarra',
      notebook: 'cuaderno',
      orange: 'naranja',
      outlet: 'salida',
      paper: 'papel',
      pen: 'bolígrafo',
      phone: 'teléfono',
      plane: 'avión',
      pumpkin: 'calabaza',
      purse: 'bolso',
      rain: 'lluvia',
      river: 'río',
      road: 'la carretera',
      shirt: 'camisa',
      shoe: 'zapato',
      sock: 'calcetín',
      speaker: 'altavoz',
      star: 'estrella',
      sun: 'Dom',
      table: 'mesa',
      toothbrush: 'cepillo de dientes',
      tree: 'árbol',
      window: 'ventana',
    },
  },
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: window.navigator.language,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
