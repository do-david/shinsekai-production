import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
// import Backend from 'i18next-http-backend'
// import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
    en: {
        translation: {
            logout: 'LOGOUT',
            login : {
                signin: 'LOGIN',
                username: 'Username',
                password: 'Password',
                submit: 'Submit',
                errorServor:'Error servor, please try again',
                errorFields:'Required fields need to be filled'
            },
            home: {
                popular:'List of the most popular manga',
                library:'My library'
            },
            pending: {
                loading:'Loading...',
                notFound:'Items not found.'
            },
            detail: {
                back: 'Aack',
                add: 'Add'
            }
        }
    },
    fr: {
        translation: {
            logout: 'DECONNEXION',
            login : {
                signin: `IDENTIFICATION`,
                username: 'Pseudo',
                password: 'Mot de passe',
                submit: 'Envoyer',
                errorServor:'Erreur du serveur, veuillez réessayer.',
                errorFields:'Les champs requis ne sont pas remplis'
            },
            home: {
                popular:'Liste des mangas les plus populaires',
                library:'Ma bibliothèque'
            },
            pending: {
                loading:'Chargement...',
                notFound:'Éléments indisponibles.'
            },
            detail: {
                back: 'Retour',
                add: 'Ajouter'
            }
        } 
    }
}
i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    //.use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    //.use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next).init({
    lng:'fr',
    fallbackLng:'en',
    debug: false,
    resources,
    interpolation: {
        escapeValue: false
    }
})
export default i18n