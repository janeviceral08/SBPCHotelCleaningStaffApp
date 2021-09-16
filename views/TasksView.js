import React, { useState, useEffect } from "react";
import { FAB, Portal, Provider } from 'react-native-paper';
import { View,StyleSheet, Dimensions, Text, Image, TouchableOpacity,Pressable, Alert ,TextInput, TouchableHighlight, ScrollView, RefreshControl, FlatList,Button } from "react-native";
import { Col, Card, CardItem, Body, Left, List, Content, Thumbnail, Right,Grid, Icon,  Container, Header,Toast, Input,Item } from 'native-base';
import styles from '../components/styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FlatGrid } from 'react-native-super-grid';
import { useTasks } from "../providers/TasksProvider";
import { useAuth } from "../providers/AuthProvider";
import { TaskItem } from "../components/TaskItem";
import Colors from '../Colors';
import moment from "moment";
import Notif from './push/Notif'
const SCREEN_WIDTH = Dimensions.get('window').width;

export function TasksView({ navigation, route }) {
//  const { name } = route.params;
//  const { projectPartition } = route.params;

const { tasks, rooms} = useTasks();

  const [state, setState] = useState({ open: false });
  const [chat, setChat] = useState([]);
  const [room_type, setroom_type] = useState(tasks);
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

console.log('rooms: ', rooms)


  return (
    <View style={{flex: 1,}}>
          <View style={{width: '100%'}}>
               <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
         <Item>
           <MaterialCommunityIcons name="book-search-outline" size={23} color={Colors.BackColor}/>
           <Input placeholder="Search Room Type" style={{borderColor: 'red'}}    onChangeText={(text) => searchData(text)}/>
           </Item>
       
       </Header>
               </View>
 <FlatList
    
      ListHeaderComponent={
     <View style={style.headerContainer}>
  
         <View style={style.view1} >
       <View style={style.view2}> 

       <Card style={style.card1}>
 
       <CardItem style={{ paddingBottom: 0,marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0,width:SCREEN_WIDTH/2-20,borderRadius: 10}}>
                    <TouchableOpacity style={style.reserve1} onPress={()=> navigation.navigate('Clean')}>
                    <Left style={style.left1}>
                    <Body>
                    <Image source={require('./housekeeper.gif')} style={{marginLeft: '30%'}}/>
 
                  <Text style={style.text2}>For Cleaning</Text>
                </Body>
              </Left>
              <Right>
                <Text style={style.text3}>{rooms.reduce((acc,e)=>{e.status=='Cleaning'?acc++:false; return acc},0)}</Text>
              </Right>
                  </TouchableOpacity>
                  </CardItem>
                  </Card>
        </View>
        <View > 
      
       <Card style={style.card1}>
       <CardItem style={{ paddingBottom: 0,marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0,width:SCREEN_WIDTH/2-20,borderRadius: 10}}>
                    <TouchableOpacity style={style.reserve1} onPress={()=>navigation.navigate('Maintenance')}>
                    <Left style={style.left1}>
                    <Body>
                    <Image source={require('./fireman.gif')} style={{marginLeft: '30%'}}/>
                  <Text style={style.text2}>Under Maintenance</Text>
                </Body>
              </Left>
              <Right>
                <Text style={style.text3}>{rooms.reduce((acc,e)=>{e.status=='Under Maintenance'?acc++:false; return acc},0)}</Text>
              </Right>
                  </TouchableOpacity>
                  </CardItem>
                  </Card>
        </View>


        </View> 
 


        </View>}
     

    />

      
<Provider>
      <Portal>
        <FAB.Group
       
          open={open}
          icon={open ? 'gesture-tap' : 'gesture-tap'}
          actions={[
            {
              icon: 'shield-account',
              label: 'Account Settings',
              onPress: () => navigation.navigate('AccountSettings'),
            },
          ]}
     
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>

    </View>
  );
}

const style = StyleSheet.create({
  view3:{
    marginLeft: -4,
    marginTop: 10,
    width:SCREEN_WIDTH/2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lur:{
    paddingLeft: 5, paddingTop: 5, paddingRight: 10
  },
  viewg:{
    marginLeft: -5,
    width:SCREEN_WIDTH/2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10
  },
  clean:{width:SCREEN_WIDTH-20},
  lview2:{
    marginLeft: -4,
    width:SCREEN_WIDTH/2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10
  },

  text3:{
    color:  Colors.BackColor, fontSize: 20, fontWeight: 'bold',  backgroundColor: '#d8d7d7', paddingLeft: 10, paddingRight: 10, borderRadius:50, marginBottom: 5
  },
  
  text4:{
    color:  Colors.BackColor, fontSize: 20, fontWeight: 'bold',  backgroundColor: '#d8d7d7', paddingLeft: 10, paddingRight: 10, borderRadius:50, marginBottom: 5
  },
  text2:{
    fontSize: 12, fontWeight: 'bold', paddingLeft: 20
  },
  text1:{
   textAlign: 'center', marginLeft: -15
  },
  left1: {
    paddingLeft: 5, paddingTop: 5
  },
  reserve1:{
    width:SCREEN_WIDTH/2-15
  },
  carditem1:{
    paddingBottom: 0, 
    marginBottom: 0, 
    paddingLeft: 0, 
    paddingRight: 0, 
    paddingTop: 0 
  },
  card1: {
    paddingBottom: 10,
    borderRadius: 10
  },
view1: {
  flex: 1,
 flexDirection: 'row',
 flexWrap: 'wrap',
 paddingLeft: 7,
},
view2:{
  marginRight: 7,
  justifyContent: 'center',
  alignItems: 'center'
},
containers: {
 flex: 1,
 flexDirection: 'row',
 flexWrap: 'wrap',
 padding: 1,
},
scrollContainer: {
  flex: 1,
  
},
headerContainer: {
 marginTop: 5
},
inside: {
  margin: 0,
  justifyContent: 'center',
  alignItems: 'center',
},
gridView: {
  marginTop: 20,
  flex: 1,
},
itemContainer: {
  justifyContent: 'flex-end',
  padding: 10,
  marginBottom: -5,
  height: 95,
  borderRadius: 10
},
itemName: {
  fontSize: 16,
  color:Colors.bottom_nav_background,
  fontWeight: '700',
  
},
itemCode1: {
  color: Colors.bottom_nav_background,
  color: '#e87b1c', fontSize: 18,fontWeight: 'bold',
  textAlign: 'center'
},
itemCode2: {
  color: 'gray', fontSize: 18, fontWeight: 'bold',
  textAlign: 'center'
},
sectionHeader: {
  flex: 1,
  fontSize: 15,
  fontWeight: '600',
  alignItems: 'center',
  backgroundColor: '#636e72',
  color: 'black',
  padding: 10,
},
imgFeature: {
  width: '90%',
  height: '60%',
  resizeMode: 'contain',
  alignSelf: "center"
}

});
