const { Translate } = require('@google-cloud/translate');
    const translate = new Translate({
      projectId: projId,
    });
    const target = 'en';
    translate.translate(text, target)
      .then((results) => {
        let translations = results[0];
        translations = Array.isArray(translations)
          ? translations
          : [translations];

        console.log('Translations:');
        translations.forEach((translation, i) => {
          console.log(`${text[i]} => (${target}) ${translation}`);