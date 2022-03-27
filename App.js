import React, {useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Button, FlatList, Image, Text } from 'react-native';


export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [text, setText] = useState('');

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
      const data = await response.json();
      setRecipes(data.meals);
    }
    catch(error) {
      console.error(error);
    }
  }

  const separator = () => {
    return (
      <View
      style={styles.separator} />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.recipes}>
        <FlatList
         keyExtractor={(item, index) => index.toString()}
         renderItem={({item}) => 
         <View>
           <Text style={styles.recipeName}>{item.strMeal}</Text>        
           <Image style={styles.mealImg} source={{uri:item.strMealThumb}}></Image>
           </View>
         } data={recipes} ItemSeparatorComponent={separator} />
        </View>
      <View style={styles.search}>
        <TextInput style={styles.input}
        onChangeText={text => setText(text)} 
        value={text} 
        placeholder='Search recipes by ingredient' />
        <View style={styles.button}>
          <Button title="find" color="#ee9b00" onPress={fetchRecipes} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  recipes: {
    flex: 4,
    backgroundColor: "#ae2012",
    paddingTop: 50,
    paddingLeft: 10
  },
  recipeName: {
    fontWeight: 'bold',
    fontSize: 20
  },
  search: {
    flex: 1,
    backgroundColor: "#bb3e03",
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 20
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#bb3e03",
    marginTop: 5,
    marginLeft: 10
  },
  mealImg: {
    width: 75,
    height: 75
  },
  input: {
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: "#ae2012",
    padding: 5
  },
  button: {
    paddingTop: 10,
    width: 75,
    height: 50
  }
});
