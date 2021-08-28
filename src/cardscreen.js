import React, { Component, useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
var { width, height } = Dimensions.get("window");
const cardscreen = ({ navigation }) => {
  const [count, setcount] = useState(0);
  const [datacart, setdatacart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refresh, setRefresh] = useState(false)
  useEffect(async () => {
    fetchData()
  }, [])

  const fetchData = () => {
    setRefresh(false)
    AsyncStorage.getItem('cart').then((cart) => {
      if (cart != null) {
        const cartfood = JSON.parse(cart)
        let temp = []
        let total = 0
        temp = cartfood.map((item) => {
          return {
            ...item,
          }
        })
        setdatacart(temp)
        console.log("data", temp)

      }
    })
  }

  const onRefreshData = () => {
    setRefresh(true)
    fetchData()
  }

  const onMinus = (item, index) => {
    const newList = [...datacart]
    if (newList[index].quantity > 1) {
      newList[index].quantity -= 1



      AsyncStorage.setItem('cart', JSON.stringify(newList))
      setdatacart(newList)
    }
    else {
      newList.splice(index, 1)
      AsyncStorage.setItem('cart', JSON.stringify(newList))
      setdatacart(newList)
    }

  }

  const onPlus = (item, index) => {
    const newList = [...datacart]
    console.log("dataa", newList[index].quantity)
    newList[index].quantity += 1

    AsyncStorage.setItem('cart', JSON.stringify(newList))
    setdatacart(newList)
  }

  const listcart = () => {

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={datacart}
          keyExtractor={(item, index) => index.toString()}
          refreshing={refresh}
          onRefresh={() => onRefreshData()}
          renderItem={({ item, index }) =>


            <View style={{ width: width, flexDirection: 'row', borderBottomWidth: 0.5, padding: 10 }}>
              <Image style={{ width: (width / 2 - 40), height: (width / 2 - 30) - 10, resizeMode: 'contain', backgroundColor: 'transparent' }} source={{ uri: item.food.image }} />
              <View style={{ marginLeft: 4 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.food.name}</Text>
                <Text style={{ marginTop: 10 }}>Lorem ipsum food </Text>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 50 }}>
                  <Text style={{ color: '#FF0000', fontSize: 20 }}>${item.food.price}</Text>
                  <View style={{
                    height: 25, paddingHorizontal: 3,
                    borderColor: 'black', borderWidth: 0.4, borderRadius: 5,
                    justifyContent: 'space-between', flexDirection: 'row',
                    marginLeft: 80, alignItems: 'center'
                  }}>
                    <TouchableOpacity onPress={() => onMinus(item, index)} style={{
                      borderRightWidth: 0.5, paddingHorizontal: 5,
                      height: 25, alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Icon name="minus" size={16} color={"#333333"} />
                    </TouchableOpacity>
                    <Text style={{
                      fontSize: 16, paddingRight: 10, paddingLeft: 10
                    }}>{item.quantity}</Text>
                    < TouchableOpacity onPress={() => onPlus(item, index)} style={{
                      borderLeftWidth: 0.5, paddingHorizontal: 5,
                      height: 25, alignItems: 'center', justifyContent: 'center'
                    }} >
                      <Icon name="plus" size={16} color={"#333333"} />
                    </TouchableOpacity>
                  </View>

                </View>
              </View>

            </View>
          }

        />

        <View style={{ margin: 10, width: width - 20, height: 40, borderWidth: 0.5, marginBottom: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }} >
          <View style={{ width: 30 }}></View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#333333', fontSize: 20 }}>Total:</Text>

            <Text style={{ color: '#FF0000', fontSize: 20 }}>${totalPrice}</Text>
          </View>

          <TouchableOpacity style={{ backgroundColor: '#FF0000', height: 38.5, width: 90, alignItems: 'center' }}>
            <Text style={{ color: 'white', padding: 8, fontSize: 15 }}>Check out</Text>
          </TouchableOpacity>
        </View>
      </View>



    );

  };

  return (

    // <View style={{ flex: 1 }}>

    listcart()



    // </View>

  )

}
export default cardscreen