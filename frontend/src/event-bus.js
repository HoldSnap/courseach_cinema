// event-bus.js
import {reactive} from 'vue'

export const eventBus = reactive({
  errors: [],

  addError(error) {
    this.errors.push(error)
  },

  clearErrors() {
    this.errors = []
  }
})
