import React, { useState, useRef, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View, Dimensions } from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

// -------FOR FLATLIST--------
// const renderListItem = (listLength, itemData) => (
//   <View style={styles.listItem}>
//     <BodyText>#{listLength-itemData.index}</BodyText>
//     <BodyText>{itemData.item}</BodyText>
//   </View>
// );

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuess, setPastGuess] = useState([initialGuess]);

  const [currentDeviceHeight, setCurrentDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  //-------FOR FLATLIST-------
  // const [pastGuess, setPastGuess] = useState([initialGuess.toString()]);

  const currenLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setCurrentDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuess.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie!!!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currenLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currenLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuess((currentRounds) => [nextNumber, ...currentRounds]);

    //-----FOR FLATLIST----
    // setPastGuess((currentRounds) => [nextNumber.toString(), ...currentRounds]);
  };

  if (currentDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <View style={styles.control}>
          <CustomButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-arrow-down" size={24} color="white" />
          </CustomButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <CustomButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-arrow-up" size={24} color="white" />{" "}
          </CustomButton>
        </View>

        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuess.map((guess, index) =>
              renderListItem(guess, pastGuess.length - index)
            )}
          </ScrollView>

          {/* <FlatList 
          keyExtractor={(item) => item} 
          data={pastGuess} 
          renderItem={renderListItem.bind(this, pastGuess.length)}  
          contentContainerStyle={styles.list}
        /> */}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <CustomButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-arrow-down" size={24} color="white" />
        </CustomButton>
        <CustomButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-arrow-up" size={24} color="white" />{" "}
        </CustomButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuess.map((guess, index) =>
            renderListItem(guess, pastGuess.length - index)
          )}
        </ScrollView>

        {/* <FlatList 
          keyExtractor={(item) => item} 
          data={pastGuess} 
          renderItem={renderListItem.bind(this, pastGuess.length)}  
          contentContainerStyle={styles.list}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 400,
    maxWidth: "90%",
  },
  control: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "75%",
  },
  listContainer: {
    marginTop: "3%",
    flex: 1,
    width: Dimensions.get("window").width > 500 ? "80%" : "95%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
export default GameScreen;
