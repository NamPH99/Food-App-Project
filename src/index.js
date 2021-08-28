import React, { Component, useState, useEffect, useRef } from 'react';
import Swiper from 'react-native-swiper';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
  ToastAndroid

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
var { height, width } = Dimensions.get("window");
import Ionicons from 'react-native-vector-icons/Ionicons'

const index = ({ navigation }) => {



  const [databanner, setdatabanner] = useState([]);
  const [datacategory, setdatacategory] = useState([]);
  const [selectcatg, setselectcatg] = useState(0);
  const [datafood, setdatafood] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(async () => {

    const url = "http://tutofox.com/foodapp/api.json";

    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      setisLoading(false);
      setdatabanner(responseJson.banner);
      setdatacategory(responseJson.categories);
      setdatafood(responseJson.food);

    } catch (error) {
      console.log(error);
    }
  }, [])


  function isCheckExist(namefood, arr) {

  }

  onClickAddcart = async (data) => {

    const itemcart = {
      food: data,
      quantity: 1,
      price: data.price,
    }
    AsyncStorage.getItem('cart').then((datacart) => {

      if (datacart !== null) {


        const cart = JSON.parse(datacart)



        cart.push(itemcart)

        AsyncStorage.setItem("cart", JSON.stringify(cart))



      }
      else {
        const cart = []
        cart.push(itemcart)
        AsyncStorage.setItem('cart', JSON.stringify(cart));
      }
      ToastAndroid.showWithGravity("Thêm thành công!", ToastAndroid.CENTER, ToastAndroid.SHORT)

    }).catch((error) => {
      Alert.alert(error)
    })

  }

  renderitem = ({ item }) => {
    return (
      <TouchableOpacity style={{
        width: 80, height: 100, margin: 10, alignItems: 'center', borderWidth: 0.5, borderRadius: 10, backgroundColor: item.color
      }} onPress={() => setselectcatg(item.id)}>

        <Image resizeMode="contain" style={{ width: 50, height: 60, marginBottom: 7 }} source={{ uri: item.image }} />
        <Text style={{ fontSize: 15 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  renderfood = (item) => {
    let catg = selectcatg
    if (catg == 0 || catg == item.categorie) {
      return (
        <TouchableOpacity style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{ uri: item.image }} />
          <View style={{ height: ((width / 2) - 20) - 90, backgroundColor: 'transparent', width: ((width / 2) - 20) - 10 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 3, textAlign: 'center' }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 13 }}>Descp Food and Details</Text>
          <Text style={{ fontSize: 20, color: "green" }}>${item.price}</Text>
          <TouchableOpacity
            onPress={() => onClickAddcart(item)}
            style={{
              width: 100, height: 35, backgroundColor: '#33c37d', flexDirection: 'row', alignItems: 'center',
              justifyContent: "center",
              borderRadius: 5,
              padding: 4
            }}>
            <Icon name="cart-plus" size={20} color={"white"} />
            <View style={{ width: 10 }}></View>
            <Text style={{ color: 'white' }}>AddCart</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <FlatList
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ backgroundColor: "#f2f2f2" }}>
              <View style={{ width: width, alignItems: 'center' }}>
                <View style={{ width: width, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image resizeMode="contain" style={{ height: 60, width: width / 2, margin: 10, }} source={{ uri: "https://www.tutofox.com/foodapp/foodapp.png" }} />
                  <TouchableOpacity onPress={() => navigation.navigate()} style={{ right: 15, position: 'absolute' }}>
                    <Ionicons name="cart-outline" size={25} color="#000" />
                  </TouchableOpacity>
                </View>
                <Swiper style={{ height: width / 2 }} showsButtons={false} autoplay={true} autoplayTimeout={2}>
                  {
                    databanner.map((itembann, index) => {
                      return (
                        <Image key={index} style={styles.imageBanner} resizeMode="contain" source={{ uri: itembann }} />
                      )
                    })
                  }
                </Swiper>
                {/* <Text>{selectcatg}</Text> */}
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={datacategory}
                  keyExtractor={(item) => item.id}
                  renderItem={renderitem}


                />
              </View>

            </View>
          }
          data={datafood}

          renderItem={({ item }) => this.renderfood(item)}
          keyExtractor={(item, index) => index.toString()}


        />

      </View>
    </View>
  )

}




const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20
  },
  divCategorie: {
    backgroundColor: 'red',
    margin: 5, alignItems: 'center',
    borderRadius: 10,
    padding: 10
  },
  titleCatg: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  imageFood: {
    width: ((width / 2) - 20) - 10,
    height: ((width / 2) - 20) - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45
  },
  divFood: {
    width: (width / 2) - 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: 'white',
  }
});
export default index