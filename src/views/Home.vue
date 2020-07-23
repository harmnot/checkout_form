<template>
  <div>
    <Modal v-if="showError" :error-messages="errorMessagesHTML">
      <template slot="closeButton">
        <span class="close-modal" @click="closeError">&times;</span>
      </template>
    </Modal>
    <TabCard :tabs="tabs" :initial-tab="initialTab">
      <template
        v-for="(c, i) in contents"
        :slot="`tab-head-${c.initial}`"
        slot-scope="{switchTab}"
      >
          <div
            class="do-flex flex-row f-between div-nav"
            :key="i"
            @click="nextStep(switchTab, c.initial, true)"
          >
            <div class="do-flex flex-row" style="cursor: pointer">
              <div :class="modelTab(c.initial)">
               <p>  {{ i+1 }} </p>
              </div>
              <div class="capital">
                {{ c.initial }}
              </div>
            </div>
            <div class="or" v-if="contents.length-1 > i">
              >
            </div>
          </div>
      </template>
      <template
        v-for="(c, firstI) in contents"
        :slot="`tab-panel-${c.initial}`"
        slot-scope="{switchAgain}"
      >
        <div :key="c.initial">
          <div class="p-1 flex-self" @click="switchAgain(c.back)" v-if="c.initial !== 'finish'">
            <div>
              <img src="@/assets/images/back.svg" alt="back" width="12">
            </div>
            <div style="margin-left: 7px;">
              Back to {{ c.textBack }}
            </div>
          </div>
          <div class="p-1 flex-self" v-else>
            <div style="background-color:white;z-index: -1">
              <img src="@/assets/images/back.svg" alt="back" width="12">
            </div>
            <div style="margin-left: 7px;">  </div>
          </div>
          <div class="tab-panel-divide">
            <div class="f-left p-1 border-right" v-if="divNotFinish(c.initial)">
              <div id="not-finish" v-for="(data, i) in c.dataContent" :key="i">
                <div class="do-flex flex-row f-between flex-wrap">
                  <div class="wrap-text">
                    <span class="t-head"> {{ data.caption }} </span>
                    <span class="t-box"> </span>
                  </div>
                  <div class="my-auto" v-if="data.checkbox">
                    <label class="wrap-checkbox">{{ data.checkbox.as }}
                      <input
                        type="checkbox"
                        :disabled="isDone"
                        v-model="checkbox"
                        name="droppshiper"
                        @input="addEvent"
                        @change="addEvent"
                      >
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div class="do-flex flex-row flex-wrap mt-1" v-if="data.isInput">
                  <div
                    class="box"
                    v-for="(input, i) in data.inputs"
                    :key="i"
                    :style="`border-color:${binding[input.as].borderColor};`"
                  >
                    <div class="">
                      <div class="form">
                        <div class="">
                          <input
                            type="text"
                            v-model="value[input.as]"
                            :name="input.as"
                            v-if="isDelivery(input.name) && isDropShipper(input.as)"
                            :style="`cursor:${disable};`"
                            :disabled="!checkbox || isDone"
                            required=""
                            @input="addEvent"
                            @change="addEvent"
                          >
                          <input
                            :disabled="isDone"
                            type="text"
                            v-model="value[input.as]"
                            :name="input.as"
                            v-else-if="isDelivery(input.name) && !isDropShipper(input.as)"
                            required=""
                            @input="addEvent"
                            @change="addEvent"
                          >
                          <textarea
                            :disabled="isDone"
                            v-model="value['address']"
                            rows="5"
                            cols="50"
                            style="margin-bottom: 10px;"
                            required=""
                            v-else
                            name="address"
                            @input="addEvent"
                            @change="addEvent"
                          >
                          </textarea>
                          <label
                            :style="colorChange(input.as)"
                          > {{ input.name }}
                            <span
                              v-if="input.as === 'address' && value['address'] !== ''"
                              style="color: #727070;"
                            >
                              {{ counterChar }}
                            </span>
                          </label>
                        </div>
                        <span
                          class="my-auto"
                          v-if="wrongIcon(input.as)"
                          :style="`color:${binding[input.as].color};`"
                        >
                            &#10005;
                          </span>
                        <span
                          class="my-auto"
                          v-if="checkMarkIcon(input.as)"
                          :style="`color:${binding[input.as].color};`"
                        >
                          &#10004;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="do-flex flex-row flex-wrap mt-1 mb-1" v-if="notFinish(data)">
                  <div
                    class="box-2 between"
                    v-for="(inputC, k) in data.inputs"
                    :key="k"
                    @click="chooseOne(firstI, i, k)"
                    :style="changeStylePayment(choose[data.caption.toLowerCase()][inputC.as])"
                  >
                    <div class="do-flex flex-column fz">
                      <div class="my-auto">
                        {{ inputC.name }}
                      </div>
                      <div v-if="inputC.value !== '0'">
                        <span> {{ formatMoney(inputC.value) }} </span>
                      </div>
                    </div>
                    <div
                      class="my-auto"
                      v-if="choose[data.caption.toLowerCase()][inputC.as].value"
                      :style="checkMarkPayment(choose[data.caption.toLowerCase()][inputC.as])"
                    >
                      <span > &#10004; </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="f-left p-1 border-right" v-else>
              <div class="center-div done">
                <div class="wrap-text" style="text-align: left">
                  <span class="t-head"> {{ c.dataContent[0].caption }} </span>
                  <span class="t-box"> </span>
                </div>
                <div style="margin-top: 1rem" >
                  <b> Order ID :  {{ orderID }} </b>
                </div>
                <div>
                  Your order will be delivery today with {{ getValueMap('shipment').name }}
                </div>
                <div class="flex-self" style="margin-top: 3rem" @click="homePage(switchAgain)">
                  <div>
                    <img src="@/assets/images/back.svg" alt="back" width="12">
                  </div>
                  <div style="margin-left: 7px;">
                    Go to homepage
                  </div>
                </div>
              </div>
            </div>
            <div class="f-right do-flex flex-column pfr-1 f-between">
              <div class="do-flex flex-column">
                <span class="head-l"> Summary </span>
                <span class="space-2"> 10 items purchased </span>
                <div v-if="getValueMap('shipment')">
                  <div class="new-side"></div>
                  <div class="caption-side">
                    Delivery estimation
                  </div>
                  <div class="title-side">
                   {{ getValueMap('shipment').est }} by {{ getValueMap('shipment').name }}
                  </div>
                </div>
                <div
                  v-if="getValueMap('payment') && checkTabFinish('finish')"
                >
                  <div class="new-side"></div>
                  <div class="caption-side">
                    Payment method
                  </div>
                  <div class="title-side">
                    {{ getValueMap('payment').name }}
                  </div>
                </div>
              </div>
              <div class="desc">
              </div>
              <div class="total">
                <div class="do-flex flex-row f-between f-wrap fz">
                  <div>
                    {{ getValueMap('cost').text }}
                  </div>
                  <div class="fw-700">
                    {{ formatMoney(getValueMap('cost').value) }}
                  </div>
                </div>
                <div
                  class="do-flex flex-row f-between f-wrap fz"
                  v-if="getValueMap('fee') && checkbox"
                  style="margin: 10px 0;"
                >
                  <div>
                    {{ getValueMap('fee').text }}
                  </div>
                  <div class="fw-700">
                    {{ formatMoney(getValueMap('fee').value) }}
                  </div>
                </div>
                <div
                  class="do-flex flex-row f-between f-wrap fz"
                  v-if="getValueMap('shipment')"
                  style="margin: 10px 0 15px 0;"
                >
                  <div>
                    <b> {{ getValueMap('shipment').name }} </b> shipment
                  </div>
                  <div class="fw-700">
                    {{ formatMoney(getValueMap('shipment').value) }}
                  </div>
                </div>
                <div
                  class="do-flex flex-row f-between f-wrap"
                  style="margin: 10px 0 15px 0;"
                >
                  <div class="total-text">
                    <b> Total </b>
                  </div>
                  <div class="total-text">
                    {{ formatMoney(doTotal) }}
                  </div>
                </div>
                <div
                  @click="nextStep(switchAgain, 'finish')"
                  style="text-align: center"
                  v-if="checkTabFinish('payment') && getValueMap('payment')"
                >
                  <div class="button">
                    Pay with {{ getValueMap('payment').name }}
                  </div>
                </div>
                <div
                  style="text-align: center"
                  v-if="checkTabFinish('delivery')"
                >
                  <div @click="nextStep(switchAgain, 'payment')" class="button">
                    Continue to Payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </TabCard>
  </div>
</template>

<script>
import TabCard from '../components/Tabs.vue';
import dataContentAPI from '../content';
import Modal from '../components/Modal.vue';

export default {
  name: 'Home',
  components: {
    TabCard,
    Modal,
  },
  watch: {
  },
  computed: {
    counterChar() {
      const char = this.value.address.length;
      const limit = 120;
      if (char >= limit) {
        return '';
      }
      return `${limit - char}`;
    },
    doTotal() {
      return this.total;
    },
  },
  data() {
    return {
      errorMessagesHTML: '',
      showError: false,
      m_delivery: true,
      m_payment: false,
      m_finish: false,
      passedTab: ['delivery'],
      tempSummarySide: new Map(),
      summarySide: null,
      total: 500000,
      yellow: '#FFC075',
      disable: 'not-allowed',
      green: '#0bf87f',
      green2: '#d5ffe6',
      borderColor: '#EEEEEE',
      gray: '#999',
      checkbox: null,
      tempCheckbox: true,
      value: null,
      tempValue: {
        email: '',
        dName: '',
        phone: '',
        dPhone: '',
        address: '',
      },
      choose: null,
      tempChoose: {
        shipment: {
          goSend: {
            value: false,
            bColor: this.green,
            bold: 'none',
            background: this.green2,
          },
          jne: {
            value: false,
            bColor: this.green,
            bold: 'none',
            background: this.green2,
          },
          courier: {
            value: false,
            bColor: this.green,
            bold: 'none',
            background: this.green2,
          },
        },
        payment: {
          eWallet: {
            value: false,
            bColor: this.green,
            bold: 'none',
            background: this.green2,
          },
          transfer: {
            value: false,
            bColor: this.green,
            bold: 'none',
            background: this.green2,
          },
          va: {
            value: false,
            bColor: this.green,
            bold: 'none',
            background: this.green2,
          },
        },
      },
      binding: null,
      tempBinding: {
        email: {
          wrong: false,
          required: false,
          empty: true,
          borderColor: this.borderColor,
          color: this.gray,
        },
        dName: {
          wrong: false,
          required: false,
          empty: true,
          borderColor: this.borderColor,
          color: this.gray,
        },
        phone: {
          wrong: false,
          required: false,
          empty: true,
          borderColor: this.borderColor,
          color: this.gray,
        },
        dPhone: {
          wrong: false,
          required: false,
          empty: true,
          borderColor: this.borderColor,
          color: this.gray,
        },
        address: {
          wrong: false,
          required: true,
          empty: true,
          borderColor: this.borderColor,
          color: this.gray,
        },
      },
      orderID: null,
      tempOrderID: this.generateRandomString(5),
      initialTab: localStorage.getItem('currentTab') || 'delivery',
      tabs: ['delivery', 'payment', 'finish'],
      contents: dataContentAPI,
      errors: [],
      isDone: false,
    };
  },
  created() {
    this.getCacheValue();
    this.getCachePassedTab();
  },
  methods: {
    colorChange(initial) {
      return `color:${this.binding[initial].color};`;
    },
    homePage(switchTab) {
      localStorage.clear();
      this.$router.go(0);
      return switchTab('delivery');
    },
    generateRandomString(length) {
      let result = '';
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      for (let i = 0; i < length; i += 1) {
        const rand = Math.floor(Math.random() * chars.length);
        result += chars[rand];
      }
      return result;
    },
    getCacheValue() {
      if (!localStorage.getItem('currentTab')) {
        localStorage.setItem('currentTab', 'delivery');
      }
      this.value = JSON.parse(localStorage.getItem('value')) || this.tempValue;
      this.binding = JSON.parse(localStorage.getItem('binding')) || this.tempBinding;
      this.checkbox = JSON.parse(localStorage.getItem('checkbox'));
      this.choose = JSON.parse(localStorage.getItem('choose')) || this.tempChoose;
      this.isDone = localStorage.getItem('done');
      this.orderID = localStorage.getItem('orderID') || this.tempOrderID;
      const newMap = new Map();
      newMap.set('cost', { text: 'Cost of Goods', value: 500000 });
      const summary = JSON.parse(localStorage.getItem('summarySide'));
      if (summary) {
        summary.value.forEach(([key, val]) => {
          newMap.set(key, val);
        });
      }
      this.summarySide = newMap;
      this.resetDropShipper(this.checkbox);
    },
    resetDropShipper(notChecked) {
      if (!notChecked) {
        this.value.dName = '';
        this.value.dPhone = '';
        this.changeStyle('dName', '');
        this.binding.dName.wrong = false;
        this.binding.dName.empty = true;
        this.changeStyle('dPhone', '');
        this.binding.dPhone.wrong = false;
        this.binding.dPhone.empty = true;
        this.disable = 'not-allowed';
        this.summarySide.delete('fee');
        this.sumCheckOut();
        return;
      }
      this.summarySide.set('fee', { text: 'Dropshipping Fee', value: 5900 });
      this.sumCheckOut();
      this.disable = '';
    },
    modelTab(d) {
      const k = this[`m_${d}`];
      if (k) {
        return 'num-2';
      }
      return 'num';
    },
    generateHTML(errors = this.errors) {
      let err = '';
      errors.forEach((val) => {
        err += `<li style="padding: 6px 0;"> ${val} </li>`;
      });
      const style = 'text-align: left;list-style: hangul-consonant';
      this.errorMessagesHTML = `<ul style='${style}'> ${err} </ul>`;
    },
    nextStep(event, v, isFistStep = false) {
      const obj = this.binding;
      const storageBinding = JSON.stringify(obj);
      const storageValue = JSON.stringify(this.value);
      const storageChoose = JSON.stringify(this.choose);
      if ((v === 'payment') || isFistStep) {
        const keys = Object.keys(this.binding);
        keys.forEach((val) => {
          if (!obj[val].wrong && obj[val].required && obj[val].empty) {
            if (this.value.address === '') {
              this.errors.push(`<b> ${val} </b> is required`);
            } else {
              this.errors.push(`<b> ${val} </b> length must be no more 120 chars`);
            }
          }

          if (obj[val].wrong && !obj[val].empty && !obj[val].required) {
            this.errors.push(`<b> ${val} </b> is invalid`);
          }
        });
        if (this.value.address.length > 120) {
          this.errors.push('<b> address </b> length must be no more 120 chars');
        }
        if (this.errors.length >= 1) {
          this.generateHTML();
          this.showError = true;
          this.errors = [];
          return event('delivery');
        }
        if (this.isDone) {
          return event('finish');
        }
        this.errors = [];
        localStorage.setItem('m_payment', 'true');
        localStorage.setItem('checkbox', this.checkbox);
        localStorage.setItem('binding', storageBinding);
        localStorage.setItem('value', storageValue);
        this.m_payment = true;
        return event('payment');
      }

      if (!isFistStep && v === 'finish') {
        const choosingPayment = this.choose;
        const getData = (key) => Object.keys(key).find((val) => key[val].value === true);
        const [ship, pay] = [choosingPayment.shipment, choosingPayment.payment];
        if (!getData(ship) === true) {
          this.errors.push('required to choose a <b> shipment </b>');
        }
        if (!getData(pay) === true) {
          this.errors.push('required to choose a <b> payment </b>');
        }

        if (this.errors.length >= 1) {
          this.generateHTML();
          this.showError = true;
          this.errors = [];
          return event('payment');
        }
        this.errors = [];
        const summary = JSON.stringify({ value: [...this.summarySide] });
        localStorage.setItem('m_finish', 'true');
        localStorage.setItem('summarySide', summary);
        localStorage.setItem('binding', storageBinding);
        localStorage.setItem('choose', storageChoose);
        this.isDone = true;
        localStorage.setItem('done', 'true');
        localStorage.setItem('orderID', this.orderID);
        this.m_finish = true;
        return event('finish');
      }

      return event('delivery');
    },
    checkTabFinish(v) {
      return localStorage.getItem('currentTab') === v;
    },
    chooseOne(i, j, k, obj = this.choose) {
      if (!this.isDone) {
        const data = this.contents[i].dataContent[j].inputs[k];
        const content = this.contents[i].dataContent[j].caption.toLowerCase();
        const key = Object.keys(obj[content]);
        if (content === 'shipment') {
          this.summarySide.set('shipment', { name: data.name, value: +data.value, est: data.est });
          this.sumCheckOut();
        } else {
          this.summarySide.set('payment', { name: data.name, value: 0, wallet: +data.value });
        }
        key.forEach((val) => {
          if (val === data.as) {
            this.choose[content][val].bColor = this.green;
            this.choose[content][val].bold = '700';
            this.choose[content][val].background = this.green2;
            this.choose[content][val].value = true;
          } else {
            this.choose[content][val].bColor = '#EEE';
            this.choose[content][val].bold = '400';
            this.choose[content][val].background = 'white';
            this.choose[content][val].value = false;
          }
        });
      }
    },
    getCachePassedTab() {
      const data = ['m_payment', 'm_finish'];
      data.forEach((val) => {
        this[val] = localStorage.getItem(val) || false;
      });
    },
    isDelivery(val) {
      return val !== 'Delivery address';
    },
    getValueMap(k) {
      return this.summarySide.get(k);
    },
    isDropShipper(d) {
      return d === 'dPhone' || d === 'dName';
    },
    notFinish(d) {
      return !d.isInput && d.caption !== 'finish';
    },
    divNotFinish(d) {
      return d !== 'finish';
    },
    formatMoney(num) {
      return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    },
    changeStyle(value, initial) {
      if (initial === 'y') {
        this.binding[value].color = this.yellow;
        this.binding[value].borderColor = this.yellow;
      } else if (initial === 'g') {
        this.binding[value].color = this.green;
        this.binding[value].borderColor = this.green;
      } else {
        this.binding[value].color = this.gray;
        this.binding[value].borderColor = this.borderColor;
      }
    },
    sumCheckOut() {
      let total = 0;
      this.summarySide.forEach((val) => {
        total += val.value;
      });
      this.total = total;
    },
    addEvent({ target }) {
      if (target.name === 'address') {
        if (this.value.address !== '') {
          if (this.value.address.length >= 120) {
            this.binding.address.wrong = true;
            this.changeStyle(target.name, 'y');
          } else {
            this.binding.address.wrong = false;
            this.changeStyle(target.name, 'g');
          }
          this.binding.address.empty = false;
        } else {
          this.changeStyle(target.name, '');
          this.binding.address.wrong = false;
          this.binding.address.empty = true;
        }
      }

      if (target.name === 'droppshiper') {
        this.checkbox = target.checked;
        this.resetDropShipper(this.checkbox);
      }

      if (target.name === 'email') {
        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.value.email !== '') {
          if (!re.test(this.value.email)) {
            this.binding.email.wrong = true;
            this.changeStyle(target.name, 'y');
          } else {
            this.changeStyle(target.name, 'g');
            this.binding.email.wrong = false;
          }
          this.binding.email.empty = false;
        } else {
          this.changeStyle(target.name, '');
          this.binding.email.wrong = false;
          this.binding.email.empty = true;
        }
      }

      if (target.name === 'phone' || target.name === 'dPhone') {
        const value = this.value[target.name];
        const r = /^\+?\d+(?:\(\d+\))?-?\d+(?:-\d+)?$/;
        if (value !== '') {
          if (!r.test(value) || value.length < 6 || value.length > 20) {
            this.binding[target.name].wrong = true;
            this.changeStyle(target.name, 'y');
          } else {
            this.binding[target.name].wrong = false;
            this.changeStyle(target.name, 'g');
          }
          this.binding[target.name].empty = false;
        } else {
          this.changeStyle(target.name, '');
          this.binding[target.name].wrong = false;
          this.binding[target.name].empty = true;
        }
      }

      if (target.name === 'dName') {
        if (this.value.dName !== '') {
          this.binding.dName.wrong = false;
          this.binding.dName.empty = false;
          this.changeStyle('dName', 'g');
        } else {
          this.binding.dName.wrong = false;
          this.binding.dName.empty = true;
          this.changeStyle(target.name, '');
        }
      }
    },
    wrongIcon(a) {
      return this.binding[a].wrong && !this.binding[a].empty;
    },
    checkMarkIcon(a) {
      return !this.binding[a].wrong && !this.binding[a].empty;
    },
    changeStylePayment(v) {
      return `border-color:${v.bColor};background-color: ${v.background};font-weight: ${v.bold}`;
    },
    checkMarkPayment(v) {
      return `color: ${v.bColor};`;
    },
    closeError() {
      this.showError = false;
    },
  },
};
</script>
