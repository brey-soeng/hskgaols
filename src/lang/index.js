import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // english -ui
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // chinese ui langauge
import elementKmLocale from 'element-ui/lib/locale/lang/km' // khmer

import enLocale from './en'
import zhLocale from './cn_zh'
import khLocale from './kh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  kh: {
    ...khLocale,
    ...elementKmLocale

  }
}

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase()

  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}

export default new VueI18n({
  locale: getLanguage(),
  messages
})
