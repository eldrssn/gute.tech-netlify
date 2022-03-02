export enum TYPES {
  characteristic = 'characteristic',
  description = 'description',
  installation = 'installation',
  questionsAndAnswers = 'questionsAndAnswers',
}

export const TAB_FIELDS: Record<string, string> = {
  [TYPES.characteristic]: 'Характеристики',
  [TYPES.description]: 'Описание',
  [TYPES.installation]: 'Установка',
  [TYPES.questionsAndAnswers]: 'Вопросы и ответы',
};
