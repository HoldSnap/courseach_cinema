// stores/errors.js
import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useErrorsStore = defineStore('errors', () => {
  const error = ref(null)

  const setError = (message) => {
  error.value = message
  }

  const clearError = () => {
  error.value = null
  }

  return {
  error, setError, clearError
  }
})
