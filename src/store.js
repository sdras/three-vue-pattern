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
    score: 0,

    // feel free to change this, thought it may help
    // it'll be one of three states
    // idle - awaiting user input
    // listening - listening to user input
    // fetching - fetching user data from the API
    uiState: 'idle'
  },
  //showing things, not mutating state
  getters: {
    tripleCounter: state => {
      return state.counter * 3
    }
  },
  //mutating the state
  //mutations are always synchronous
  mutations: {
    //showing passed with payload, represented as num
    increment: (state, num) => {
      state.counter += num
    },
    newIntent: (state, { intent, score }) => {
      // the score is how confident the API is in the intent it gave
      // on a scale from 0 to 1, where score > .7 is considered to be
      // decently confident; I set that thresh hold at .3 for my CodePen
      // because I probably didn't train it well enough but it worked
      // well enough for the demo
      state.intent = intent
      state.score = score
    },
    setUiState: (state, status) => {
      state.uiState = status
    }
  },
  //commits the mutation, it's asynchronous
  actions: {
    // showing passed with payload
    incrementAsync({ commit }, num) {
      setTimeout(() => {
        commit('increment', num)
      }, 1000)
    },

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
          commit('newIntent', data.topScoringIntent)
          commit('setUiState', 'idle')
        })
        .catch(err => {
          console.error('axios error', err)
        })
    }
  }
})
