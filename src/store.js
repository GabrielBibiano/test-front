import Vue from 'vue'
import Vuex from 'vuex'
import { api } from './config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: {
      id: '',
      items: [],
      subTotal: 0,
      shippingTotal: 0,
      discount: 0,
      total: 0
    },
    payment: {
      creditCardNumber: null,
      cvv: null,
      validity: null,
      holderName: null
    },
    paymentFormIsValid: false
  },
  mutations: {
    SET_CART(state, { cart }) {
      state.cart = cart
    },
    SET_PAYMENT_DATA(state, { payment }) {
      state.payment = payment
    },
    SET_PAYMENT_FORM_VALIDATION(state, { isValid }) {
      state.paymentFormIsValid = isValid
    }
  },
  actions: {
    async GET_CART({ commit }) {
      try {
        const { data } = await api.get('/5b15c4923100004a006f3c07')

        commit('SET_CART', { cart: data })
      } catch (e) {
        console.error(e)
      }
    },
    async UPDATE_PAYMENT({ commit }, { payment }) {
      commit('SET_PAYMENT', { payment })
    },
    async UPDATE_PAYMENT_FORM_VALIDATION({ commit }, { isValid }) {
      commit('SET_PAYMENT_FORM_VALIDATION', { isValid })
    }
  },
  getters: {
    checkoutResume({ cart }) {
      return {
        subTotal: cart.subTotal,
        shippingTotal: cart.shippingTotal,
        discount: cart.discount,
        total: cart.total,
      }
    }
  }
})
