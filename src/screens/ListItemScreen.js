import React,{useEffect,useState} from 'react'
import { View, Text, FlatList,StyleSheet, Linking, Platform } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ListItemScreen = () => {
    const [items,setItems]=useState([])
    const myitem=[
        {
            name:"IPhone",
            year:"2013",
            phone:"1234565478",
            image:"https://images.unsplash.com/photo-1600541519467-937869997e34?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lJTIwMTF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
            desc:"I am selling this phone"
        },
        {
            name:"camera",
            year:"2012",
            phone:"1234567658",
            image:"https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
            desc:"I am selling this phone"
        },
    ]
    const getDetails=async ()=>{
        const querysnap =await firestore().collection('ads').get()
        const result= querysnap.docs.map(docsnap=>docsnap.data())
        // console.log(result)
        setItems(result)
    }
    const openDial =(phone)=>{
        if (Platform.OS ==='android'){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telpromt:${phone}`)
        }
    }
    useEffect(()=>{
        getDetails()
        return()=>{
            console.log("cleanup")
        }
    },[])
    const renderItem = (item)=>{
        return(
        <Card style={styles.card}>
    <Card.Title title={item.name}/>
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>{item.year}</Paragraph>
      <Paragraph>{item.desc}</Paragraph> 
    </Card.Content>
    <Card.Cover source={{ uri: item.image }} />
    <Card.Actions>
      <Button>{item.price}</Button>
      <Button onPress={()=>openDial()}>call seller</Button>
    </Card.Actions>
  </Card>
        )
    }
    return (
        <View>
            <FlatList 
             data={items}
             keyExtractor={(item)=>item.phone}
             renderItem={({item})=>renderItem(item)}
             inverted
            />
        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        margin:10,
        elevation:2
    }
     });
    
export default ListItemScreen
