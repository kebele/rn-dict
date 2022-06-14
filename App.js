import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Speech from "expo-speech";

export default function App() {
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");

  const searchWord = (enteredWord) => {
    setNewWord(enteredWord);
  };

  // Fecth data
  const getInfo = () => {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;

    return fetch(url)
      .then((data) => {
        // console.log(data.json())
        return data.json();
      })
      .then((response) => {
        let word = response[0].word;
        setCheckedWord(word);

        let def = response[0].meanings[0].definitions[0].definition;
        setDefinition(def);

        let eg = response[0].meanings[0].definitions[0].example;
        setExample(eg);
      });
  };
  // speak
  const speak = () => {
    Speech.speak(checkedWord);
  };

  // clear
  const clear = () => {
    setCheckedWord("");
    setDefinition("");
    setExample("");
    setNewWord("");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/1.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={{ flex: 0.8 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TextInput
              placeholder="search"
              placeholderTextColor={"grey"}
              style={styles.input}
              clearButtonMode="always"
              textAlign="center"
              onChangeText={searchWord}
              value={newWord}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "60%",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  getInfo();
                }}
              >
                <Text style={styles.text}>get info</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  clear();
                }}
              >
                <Text style={styles.text}>clear</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.text}>Word </Text>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              />
              <Text style={styles.infoText}>{newWord}</Text>
              <Text style={styles.text}>Definition</Text>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              />
              <Text
                // style={[
                //   styles.infoText,
                //   { backgroundColor: "rgba(0,150,55,0.3)" },
                // ]}
                style={styles.infoText}
              >
                {definition}
              </Text>
              <Text style={styles.text}>Example</Text>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              />
              <Text style={styles.infoText}>{example}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  speak();
                }}
              >
                <Image
                  source={require("./assets/speaker.png")}
                  style={styles.speaker}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageDesign: {
    width: "80%",
    height: "120%",
    marginLeft: 50,
    marginTop: 30,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0 ,0.1)",
    backgroundColor: "rgba(0, 0, 0 ,0.1)",
    marginTop: 100,
    fontSize: 25,
  },
  button: {
    // backgroundColor: "rgba(0, 0, 0 ,0.1)",
    width: 90,
    height: 40,
    // borderColor: "black",
    // borderWidth: 1,
    // borderRadius: 20,
  },
  buttonText: {
    fontSize: 25,
    alignSelf: "center",
    marginTop: 5,
  },
  speaker: {
    width: 70,
    height: 50,
  },
  text: {
    fontSize: 25,
    // backgroundColor: "rgba(80, 235, 236,0.3)",
    marginTop: 10,
    alignSelf: "center",
  },
  infoText: {
    fontSize: 22,
    color: "black",
    // backgroundColor: "rgba(0,150,55,0.3)",
    lineHeight: 35,
  },
});
