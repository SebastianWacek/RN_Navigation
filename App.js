import 'react-native-gesture-handler';

import React, {useState} from 'react';
import { StyleSheet, Button, View, Text, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();


function DetailsOverlook({route, navigation}){

  const {param} = route.params;

  return(
      <View style={styles.container}>
        <Text style={styles.text}>Parameter: {param}</Text>
        <Button title='Change name' onPress={() => navigation.navigate('ChangeParam', {param})}/>
      </View>
  );
}


function ChangeParam({route, navigation}){

  const [param, setParam] = useState(route.params.param);

  return(
      <View style={styles.container}>
        <TextInput
            style={styles.TextInput}
            placeholder="Type here new name!"
            onChangeText={newParam => setParam(newParam)}
            defaultValue={param}
        />
        <Button title = 'Change' onPress={() => navigation.navigate('DetailsOverlook', {param})}/>
      </View>
  );
}


function Details({navigation}){
  return(
      <Stack.Navigator initialRouteName='DetailsOverlook' screenOptions={{headerShown: false}}>
        <Stack.Screen name = "DetailsOverlook" component={DetailsOverlook} initialParams={{param: 'Parameter'}}/>
        <Stack.Screen name = "ChangeParam" component={ChangeParam}/>
      </Stack.Navigator>
  );
}

function Screen2({navigation}){
  return(
      <View style={styles.container}>
        <Text style={styles.text}>Drugi ekran nawigacji BottomTabs</Text>
        <Button title='Go back' onPress={() => navigation.goBack()}></Button>
      </View>
  );
}

function HomeScreen({navigation}){
  return(
      <Tabs.Navigator
          screenOptions={{headerShown: false}}
      >
        <Tabs.Screen name = "Details"  component = {Details}/>
        <Tabs.Screen name = "Screen2" component = {Screen2}/>
      </Tabs.Navigator>

  );
}

function DrawerScreen2({navigation}){
  return(
      <View style={styles.container}>
        <Text style={styles.text}> Drugi ekran Drawer Navigation</Text>
        <Button title='Go back' onPress={() => navigation.goBack()}></Button>
      </View>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <Drawer.Navigator
            screenOptions={{
              headerTitle: "Lab2",

            }}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="DrawerScreen2" component={DrawerScreen2}/>
        </Drawer.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  TextInput: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  text:{
    fontSize: 24,
    marginBottom: 20,
  },

  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});