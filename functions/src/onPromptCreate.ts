import * as functions from 'firebase-functions';
import { TranslationServiceClient } from '@google-cloud/translate';

const translate = new TranslationServiceClient();

export const onPromptCreate = functions.firestore.document('prompts/{id}').onCreate(async (snap) => {
  const data = snap.data();
  if (data.locale !== 'en') {
    const [res] = await translate.translateText({
      parent: `projects/${process.env.GCLOUD_PROJECT}/locations/global`,
      contents: [data.description],
      targetLanguageCode: 'en',
    });
    await snap.ref.update({ description_en: res.translations?.[0].translatedText });
  }
});
