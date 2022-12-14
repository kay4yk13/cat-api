import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'ru',
  messages: {
    en: {
      header: 'Denis Klimovich, API Test App',
      numOfReq: 'Number of facts to be loaded',
      loadButton: 'Load fun facts',
      loadButtonMsg: 'Data loading...',
      loadError: 'Server Loading error. You will be shown last backuped version of data.',
      ok: 'OK',
      funFact: 'Fun Fact',
      savePreset:'Save preset',
      apply: 'Apply',
      goBack: 'Go Back',
      columnsAdj:'Columns adjustment',
      columnsAdjHeadline:'Select columns for cat facts table',
      title: 'Title',
      modalTitle:'Key by API',
      value: 'Value',

      tableHeaders: {
        _id: 'Fact Id',
        user: 'User Id',
        text: 'Fact text',
        createdAt: 'Data Updated At',
        updatedAt: 'Data Created At',
        __v: 'V',
        source: 'Source',
        type: 'Animal Type',
        deleted: 'Is Deleted',
        used: 'Is Used',
        status: {
          sentCount: 'Sent Count',
          verified: 'Verified'
        }
      }
    },
    ru: {
      header: 'Денис Климович, тестовое приложение с API',
      numOfReq: 'Сколько Фактов будет загружено',
      loadButton: 'Загрузить факты',
      loadButtonMsg: 'Загружаем...',
      loadError: 'Произошла ошибка загрузки, вам будет показана последняя локальная вресия данных.',
      ok: 'Понятно',
      funFact: 'Занимательный факт',
      savePreset:'Сохранить коллекцию',
      apply: 'Применить',
      goBack: 'Вернуться назад',
      columnsAdj:'Настроить столбцы',
      columnsAdjHeadline:'Выберите столбцы для таблицы с фактами о котиках',
      title: 'Заголовок',
      modalTitle:'Ключ API',
      value: 'Значение',

      tableHeaders: {
        _id: 'ID Факта',
        user: 'ID Пользователя',
        text: 'Текст',
        createdAt: 'Дата обнвления',
        updatedAt: 'Дата создания',
        __v: 'V',
        source: 'Источник',
        type: 'Вид животного',
        deleted: 'Удалено',
        used: 'Использовано',
        status: {
          sentCount: 'К-во отправок',
          verified: 'Верифицировано'
        }
      }
    }
  }
})