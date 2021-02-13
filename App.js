import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { saveDummyData, getData, saveCardtoDeck, saveNewDeck } from './utils/api'
import { createStore } from 'redux'
import reducers from './reducers'
import { Provider, connect } from 'react-redux'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import AddCard from './components/Addcard'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome, Ionicons,Entypo   } from '@expo/vector-icons'
import  DeckView  from './components/DeckView'
import Quiz from './components/Quiz'

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator()


function MyStack({route}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Decks" options ={{
        headerShown:false
      }}component={MyTabs} />
      <Stack.Screen name="Deck details" 
      options={({route})=>({
        headerTintColor: "white",
        title: route.params.DeckId, 
        headerStyle: {
          backgroundColor: '#0080FF', // Specify the height of your custom header
        }
        })}
      
      component={DeckView} />
      <Stack.Screen name="Quiz" 
      options={({route})=>({
        headerTintColor: "white",
        title: `Quiz on Deck: ${route.params.DeckId}`, 
        headerStyle: {
          backgroundColor: '#0080FF', // Specify the height of your custom header
        }
        })}
      
      component={Quiz} />      
      <Stack.Screen name="Add card" 
      options={({route})=>({
        headerTintColor: "white",
        title: `Add card to ${route.params.DeckId}`, 
        headerStyle: {
          backgroundColor: '#0080FF', // Specify the height of your custom header
        }
        })}
      
      component={AddCard} /> 
    </Stack.Navigator>
  );
}

const MyTabs=() =>{
  return (
    <Tab.Navigator
      initialRouteName='All Decks'
      tabBarOptions= {{
        activeTintColor: 'black',
        inactiveTintColor: 'white',
        pressColor:'gray',
        labelStyle: {
          fontSize: 17,
          fontWeight:'bold'
        },
        // showIcon: true,
        // showLabel:true,
        style: {
          justifyContent:'flex-end',
          alignContent:'center',
          height: 80,
          backgroundColor: '#0080FF',
          shadowColor: 'gray',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }}
    >
      <Tab.Screen
        name='All Decks'
        component={DeckList}
        options={{
          tabBarLabel: 'All Decks',
          tabBarIcon: ({color}) =>(<FontAwesome name="list-alt" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Add deck'
        component={AddDeck}
        options={{
          tabBarLabel: 'add deck',
          tabBarIcon: ({ color }) => (<Entypo name="add-to-list" size={25} color={color} />)
        }}
      />  
    </Tab.Navigator>
  );
}

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
        <NavigationContainer><MyStack/></NavigationContainer>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center'
}
});

// export default connect()(App)