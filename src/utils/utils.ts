import { match } from 'react-router-dom'
import { parse } from 'querystring'
import dayjs from 'dayjs'
import store from 'store'

export const getPageQuery = () => parse(window.location.href.split('?')[1])

export const getStateFromStore = (key: string) => {
  if (!key) return null
  const data = store.get(key)
  if (!data || typeof data !== 'string') return data
  try {
    const _parsedData = JSON.parse(data)
    return _parsedData
  } catch (error) {
    return data
  }
}

export const formatDate = (cdate: any) => {
  try {
    let fdate = 'date is empty'
    if (cdate) {
      fdate = dayjs(cdate).format('DD/MM/YY')
      return fdate
    } else {
      return fdate
    }
  } catch (error) {
    return alert(`Error format date: ${error}`)
  }
}

export const isDataURL = (str: any) => {
  try {
    if (str.match(isDataURL.regex)) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log('errors check image product data url', error)
    return false
  }
}
isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i

export const formatMessageResponse = (str: string) => {
  if (!str) return null;
  try{
    return str.charAt(0) + str.slice(1).replaceAll('_',' ').toLowerCase();
  } catch (error) {
    console.log('errors in format message function in utils', error);
    return null;
  }
}

export const residences = [
  {
    value: 'VN',
    label: 'VN',
    children: [
      {
        value: 'HCM',
        label: 'HCM',
      },
    ],
  },
  {
    value: 'US',
    label: 'US',
    children: [
      {
        value: 'Washinton',
        label: 'Washinton',
      },
    ],
  },
]

export const onKeyPress = (e: React.KeyboardEvent) => {
  const specialCharRegex = new RegExp("[a-zA-Z0-9@.' ,-]");
  const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (!specialCharRegex.test(pressedKey)) {
     e.preventDefault();
     return false;
  }
}