import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { saveDummyData, getData, saveCardtoDeck, saveNewDeck } from './api'
import { createStore } from 'redux'
import reducers from './reducers'
import { Provider, connect } from 'react-redux'
import DeckList from './components/DeckList'
export default class App extends React.Component {

  componentDidMount(){
    //saveDummyData().then(()=>getData())
    // const question ={question: "hey there", answer :" yes there"}
    // saveCardtoDeck(question,'jobat')
    // saveNewDeck('bestdeck')
    // getData()
  }

  render(){
    // console.log(this.props)
    return (
      <Provider store={createStore(reducers)}>
        <View style={styles.container}>
          <Text>Open up App.js tdo stahrt workinjjg on your app!</Text>
          <StatusBar style="auto" />
          <DeckList/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export default connect()(App)