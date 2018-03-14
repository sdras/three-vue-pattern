import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

if (!SpeechRecognition) {
  // uh shit browser doesn't support speech, do things here
}

const recognition = new SpeechRecognition()

// put true here if you the speech to keep recording after it gets a result, leave false if you want the speech to end after it gets a result
// this also means you'll need to stop speech at some point by calling `recognition.abort()`
recognition.continuous = false

recognition.lang = 'en-US'
recognition.interimResults = false
recognition.maxAlternatives = 1

export default new Vuex.Store({
  state: {
    counter: 0,
    intent: 'None',
    intensity: 'None',
    score: 0,
    // idle - awaiting user input
    // listening - listening to user input
    // fetching - fetching user data from the API
    uiState: 'idle',
    zoom: 3
  },
  getters: {
    intentStr: state => {
      var str = state.intent
      str = str.replace(/\b(App.)\b/gi, '')
      return str
    },
    intensityStr: state => {
      var str = state.intensity
      str = str.replace(/\b(Intensity.)\b/gi, '')
      return str
    }
  },
  mutations: {
    newIntent: (state, { intent, score }) => {
      if (intent.includes('Intensity')) {
        state.intensity = intent
        if (intent.includes('More')) {
          state.counter++
        } else if (intent.includes('Less')) {
          state.counter--
        }
      } else {
        state.intent = intent
      }
      state.score = score
    },
    setUiState: (state, status) => {
      state.uiState = status
    },
    setIntent: (state, status) => {
      state.intent = status
    },
    setZoom: state => {
      var expr = state.intent
      switch (expr) {
        case 'App.Excited':
          state.zoom = 2 + state.counter
          break
        case 'App.Nervous':
          state.zoom = 2 + state.counter
          break
        case 'App.Happy':
          state.zoom = 2 + state.counter
          break
        case 'App.Tipsy':
          state.zoom = 1 + state.counter
          break
        default:
          state.zoom = 3 + state.counter
      }
    }
  },
  actions: {
    getSpeech({ dispatch, commit }) {
      commit('setUiState', 'listening')
      recognition.start()

      recognition.onresult = function(event) {
        const last = event.results.length - 1
        const phrase = event.results[last][0].transcript
        dispatch('getUnderstanding', phrase)
      }
    },

    getUnderstanding({ commit }, utterance) {
      commit('setUiState', 'fetching')
      const url = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/75419c7d-260b-4404-9978-343b16b22b19`

      axios({
        method: 'get',
        url,
        params: {
          verbose: true,
          timezoneOffset: 0,
          q: utterance
        },
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'dac1f04f2a85466cb25bc4154692ab91'
        }
      })
        .then(({ data }) => {
          console.log('axios result', data)
          if (altMaps.hasOwnProperty(data.query)) {
            commit('newIntent', { intent: altMaps[data.query], score: 1 })
          } else {
            commit('newIntent', data.topScoringIntent)
          }
          commit('setUiState', 'idle')
          commit('setZoom')
        })
        .catch(err => {
          console.error('axios error', err)
        })
    }
  }
})

// if it keeps thinking you're saying something else, add here:
// we don't want to do it in Luis if the meaning is much different
// because it will learn the wrong thing.
const altMaps = {
  gypsy: 'App.Tipsy',
  call: 'App.Calm',
  Les: 'Intensity.Less',
  bus: 'Intensity.Less',
  Bus: 'Intensity.Less',
  plus: 'Intensity.Less',
  Plus: 'Intensity.Less',
  last: 'Intensity.Less',
  Last: 'Intensity.Less'
}
