import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App(){

  const [nome, setNome] = useState('');
  const [input, setInput] = useState('');
  const nomeInput = useRef(null);

  useEffect(()=>{

    async function getStorage(){
      const nomeStorage = await AsyncStorage.getItem('nomes');
      if(nomeStorage !== null){
        setNome(nomeStorage);
      }
    }

    getStorage();


  }, []);

  useEffect(()=>{ 

    async function saveStorage(){
      await AsyncStorage.setItem('nomes', nome);
    }

    saveStorage();

  }, [nome])

  function alteraNome(){
    setNome(input);
    setInput('');
  }

  function novoNome(){
    nomeInput.current.focus();
  }

  const letrasNome = useMemo(()=>{
    console.log('Mudouletra');
    return nome.length;
  }, [nome]);
  


  return(
    <View style={styles.container}>

      <TextInput
      placeholder="Seu nome..."
      value={input}
      onChangeText={(texto)=> setInput(texto) }
      ref={nomeInput}
      />

      <TouchableOpacity style={styles.btn} onPress={alteraNome}>
        <Text style={styles.btnText}>Altera Nome </Text>
      </TouchableOpacity>

      <Text style={styles.texto}> {nome} </Text>
      
      <Text style={styles.texto}> Tem {letrasNome} letras </Text>

      <TouchableOpacity onPress={novoNome}>
        <Text>Novo nome</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:50,
    margin: 20,
  },
  texto:{
    color:'#000',
    fontSize:35
  },
  btn:{
    backgroundColor:'#222',
    alignItems: 'center',
  },
  btnText:{
    fontSize:15,
    color:'#FFF',
  }

});