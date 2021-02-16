import React from 'react'
import { Keyboard, View, StyleSheet,Platform, AsyncStorage, Alert  } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
// import { FLASH_CARDS_KEY } from './api'

const FLASH_CARDS_NOTIFICATION = 'FLASH_CARDS_NOTIFICATION'
const createNotification =() =>{
    return {
      title:'Flash cards',
      body: "dont forget to study today 👋👋 ",
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
      }
    }
  }
  const createButtonAlert = (title,message) =>
  Alert.alert(
    title,
    message,
    [
  
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );
  
  
  export const setLocalNotification= () =>{
    AsyncStorage.getItem(FLASH_CARDS_NOTIFICATION).then(JSON.parse).then((data)=> {
      console.log("data babe",data)
      if( data === null) {
        console.log("null babe")
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {console.log(status); if( status === 'granted'){
          Notifications.cancelAllScheduledNotificationsAsync()
          let today = new Date()
          Notifications.scheduleNotificationAsync(
            {content: createNotification(), 
            trigger:
            {
                hour: today.getHours(),
                minute: 0,
                repeats: true
            }
        }
          )
          AsyncStorage.setItem(FLASH_CARDS_NOTIFICATION,JSON.stringify(true))
        }})
      }
    })
  }

  export const askCameraAndlocationPermission=()=>{
    Permissions.askAsync(Permissions.CAMERA).then(({status}) => {
        console.log("Camera permssion: ",status)
        if( status === 'denied'){
            createButtonAlert("Camera cannot operate","Please give permission")
        }
  })

    Permissions.askAsync(Permissions.LOCATION).then(({ status })=> {
      if( status === 'granted' ) {
          
        console.log('location granted')
      }
      else{
          console.log("location permssion not granted")
      }

    }).catch((error)=> {
    console.warn('Error asking location permsission: ', error)})
    }


  export const clearLocalNotification=() =>{
    return AsyncStorage.removeItem(FLASH_CARDS_NOTIFICATION).then(Notifications.cancelAllScheduledNotificationsAsyn)
  }