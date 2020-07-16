export default [
  {
    initial: 'delivery',
    textBack: 'cart',
    back: 'delivery',
    data: 'data delivery',
    dataContent: [
      {
        caption: 'Delivery details',
        isInput: true,
        checkbox: { value: false, as: 'Send as dropshipper' },
        inputs: [
          {
            name: 'Email',
            choose: false,
            as: 'email',
            required: false,
            value: '',
          },
          {
            name: 'Dropshipper name',
            choose: false,
            as: 'dName',
            required: false,
            value: '',
          },
          {
            name: 'Phone number',
            choose: false,
            as: 'phone',
            required: false,
            value: '',
          },
          {
            name: 'Dropshipper phone number',
            choose: false,
            as: 'dPhone',
            required: false,
            value: '',
          },
          {
            name: 'Delivery address',
            choose: false,
            as: 'address',
            required: true,
            value: '',
          }],
      }],
  },
  {
    initial: 'payment',
    textBack: 'delivery',
    back: 'delivery',
    data: 'data payment',
    dataContent: [
      {
        caption: 'Shipment',
        isInput: false,
        checkbox: null,
        inputs: [
          {
            name: 'GO-SEND',
            est: 'today',
            choose: false,
            as: 'goSend',
            required: false,
            value: '15000',
          },
          {
            name: 'JNE',
            est: '2 days',
            choose: false,
            as: 'jne',
            required: false,
            value: '9000',
          },
          {
            name: 'Personal Courier',
            est: '1 day',
            choose: false,
            as: 'courier',
            required: false,
            value: '29000',
          }],
      },
      {
        caption: 'Payment',
        isInput: false,
        checkbox: null,
        inputs: [
          {
            name: 'e-Wallet',
            choose: false,
            as: 'eWallet',
            required: false,
            value: '1500000',
          },
          {
            name: 'Bank Transfer',
            choose: false,
            as: 'transfer',
            required: false,
            value: '0',
          },
          {
            name: 'Virtual Account',
            choose: false,
            as: 'va',
            required: false,
            value: '0',
          }],
      }],
  },
  {
    initial: 'finish',
    textBack: 'payment',
    back: 'payment',
    data: 'data finish',
    dataContent: [
      {
        caption: 'Thank you',
        isInput: false,
        checkbox: null,
        inputs: null,
      }],
  }];
