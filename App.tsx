import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const PasswordSchema=Yup.object().shape({
  passwordLength:Yup.number()
  .min(4,'Password should be min of 4 length').max(40,'Password should be max of 40 length').required('Length is reqired')
})

const App = () => {
  const [password,setPassword]=useState('');
  const [upperCase,setUpperCase]=useState(true);
  const [lowerCase,setLowerCase]=useState(false);
  const [symbol,setSymbol]=useState(false);
  const [number,setNumber]=useState(false)
  const [isPassword,setIsPassword]=useState(false)

  const generatePassword=(passwordLength:number)=>{
      let CharacterList=''
      let upperCases='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let lowerCases='abcdefghijklmnopqrstuvwxyz'
      let symbols='@!#$%^&*()'
      let numbers='1234567890'

      if(lowerCase)
      {
        CharacterList+=upperCases;
      }
      if(upperCase)
      {
        CharacterList+=lowerCases
      }
      if(symbol)
      {
        CharacterList+=symbols
      }
      if(number)
      {
        CharacterList+=numbers;
      }
      let result=createPassword(CharacterList,passwordLength);
      setPassword(result);
      setIsPassword(true);
  }

  const createPassword=(characters:string,passwordLength:number)=>{
    let result='';
    for(let i=0;i<passwordLength;i++)
    {
      const charIndex=Math.round(Math.random()*characters.length)
      result+=characters.charAt(charIndex);
    }
    return result
  }

  const resetPassword=()=>{
    setPassword('')
    setIsPassword(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumber(false)
    setSymbol(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <SafeAreaView>
         <View>
           <View style={styles.header}>
            <Text style={styles.headerText}>Password Generator</Text>
           </View>
          <Formik
            initialValues={{passwordLength:''}}
            validationSchema={PasswordSchema}
            onSubmit={(values)=>{
              console.log(values)
              generatePassword(+values.passwordLength)
            }}
          >
             {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
           <View >
          
              <View style={styles.inputbox}>
                <View>
                  <Text style={styles.LabelHeading}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                  
                 </View>
                <TextInput
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder='Enter a number: Ex. 8'
                    keyboardType='numeric'
                    
                  />
              
            </View>
            <View style={styles.inputbox}>
              <View><Text style={styles.LabelHeading}>Include Lowercase</Text></View>
              <View><BouncyCheckbox
                isChecked={lowerCase}
                onPress={()=>setLowerCase(!lowerCase)}
                fillColor='#2fed6f'
              /></View>
            </View>
            <View style={styles.inputbox}>
              <View><Text style={styles.LabelHeading}>Include Uppercase</Text></View>
               <View>
               <BouncyCheckbox
                  isChecked={upperCase}
                  onPress={()=>setUpperCase(!upperCase)}
                  fillColor='#2fed6f'
                />
               </View>
            </View>
            <View style={styles.inputbox}>
              <View><Text style={styles.LabelHeading}>Include Symbol</Text></View>
               <View>
               <BouncyCheckbox
                  isChecked={symbol}
                  onPress={()=>setSymbol(!symbol)}
                  fillColor='#2fed6f'
                />
               </View>
            </View>
            <View style={styles.inputbox}>
              <View><Text style={styles.LabelHeading}>Include Lowercase</Text></View>
              <View>
              <BouncyCheckbox
                  isChecked={number}
                  onPress={()=>setNumber(!number)}
                  fillColor='#2fed6f'
                />
              </View>
            </View>
            

            <View style={styles.buttonBox}>
              <TouchableOpacity 
                disabled={!isValid}
                onPress={()=>handleSubmit()}
                style={styles.button}
              >
                <Text>Generate Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>{
                  handleReset();
                  resetPassword()
                }}
                style={styles.button}
              >
                <Text>Reset</Text>
              </TouchableOpacity>
            </View>
           </View>
         </>
       )}
          </Formik>
         </View>
         {isPassword?(
           <View style={styles.resultContainer} >
             <View style={styles.resultBox}>
               <Text style={[styles.resultText,styles.resultTitle]}>Long press to select</Text>
               <View>
                 <Text selectable={true} style={[styles.resultText,styles.resultContent]}>{password}</Text>
               </View>
             </View>
           </View>
         ):null}
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  header:{
    backgroundColor:'#020221',
    padding:10,
    paddingVertical:16,
    elevation:8
  },
  headerText:{
    color:'#FFFFFF',
    fontSize:24,
    fontWeight:'bold',
  },
  container:{
    flex:1,
    alignItems:'center',
    marginHorizontal:8
  },
  inputbox:{
     flex:1,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-between',
     margin:20
  },
  inputboxLabel:{
    flex:1,
    flexDirection:'column',
    
  },
  LabelHeading:{
     fontSize:14,
     fontWeight:'500'
  },
  resultBox:{
    backgroundColor:'#000000',
    padding:20,
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    borderRadius:4,
    marginVertical:20,
    elevation:1,
    shadowColor:'#333',
    shadowOffset:{
      width:1,
      height:1
    },
    shadowOpacity:0.3,
    shadowRadius:2
  },
  resultText:{
    color:'#FFFFFF',
    margin:8
  },
  resultContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    margin:'auto',
  },
  resultTitle:{
    fontSize:18,
    fontWeight:'900'
  },
  resultContent:{
    fontSize:14
  },
  buttonBox:{
    flex:1,
    flexDirection:'row',
    gap:20,
    margin:15,
    alignItems:'center',
    justifyContent:'center'
  },
  button:{
    padding:8,
    backgroundColor:'#2fed6f',
    borderRadius:4,
    elevation:1,
    shadowColor:'#333'
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  numBox:{
    
  }
})