import React from 'react';
import { Alert, StyleSheet, SafeAreaView, Button, TextInput, View } from 'react-native';

export default function App () {
        return (
           
          <SafeAreaView style={styles.container}>
          
            <View>
            
            <TextInput
            placeholder="Type here to translate!"
           />
           </View>
            <Button 
           title="Click Me"
           onPress={() => 
           Alert.alert("My title", "My Message", [
             {text: "Yes"},
             {text: "No"},
           ])

    }
        />
          </SafeAreaView>
          
        );
        <View>Hothaifa</View>
      }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
            
