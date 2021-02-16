import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BodyText from "../components/BodyText";
import colors from "../constants/colors";
import TitleText from "../components/TitleText";
import CustomButton from "../components/CustomButton.android";

const GameOver = (props) => {
  const [imageHeight, setImageHeight] = useState(
    Dimensions.get("window").width * 0.7
  );
  const [imageWidth, setImageWidth] = useState(
    Dimensions.get("window").width * 0.7
  );
  const [imageRadius, setImageRadius] = useState(
    (Dimensions.get("window").width * 0.7) / 2
  );
  const [imageMargin, setImageMargin] = useState(
    Dimensions.get("window").height / 30
  );
  const [currentHeight, setCurrentHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setImageHeight(Dimensions.get("window").width * 0.7);
      setImageWidth(Dimensions.get("window").width * 0.7);
      setImageRadius((Dimensions.get("window").width * 0.7) / 2);
      setImageMargin(Dimensions.get("window").height / 30);
      setCurrentHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  if (currentHeight < 500) {
    return (
      <ScrollView>
        <View style={styles.screen_Small}>
          <TitleText> The Game is Over!!</TitleText>
          <View style={styles.result}>
            <BodyText style={styles.resultText}>
              Your Phone needed{" "}
              <Text style={styles.highlight}>{props.numRounds}</Text> rounds to
              guess the number{" "}
              <Text style={styles.highlight}>{props.userNumber}</Text>.
            </BodyText>
          </View>

          <CustomButton onPress={props.onRestart}>NEW GAME</CustomButton>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText> The Game is Over!!</TitleText>
        <View
          style={[
            styles.imageContainer,
            {
              height: imageHeight,
              width: imageWidth,
              borderRadius: imageRadius,
              marginVertical: imageMargin,
            },
          ]}
        >
          <Image
            style={styles.image}
            source={require("../assets/success.png")}
            // source={{
            //   uri:
            //     "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            // }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.result}>
          <BodyText style={styles.resultText}>
            Your Phone needed{" "}
            <Text style={styles.highlight}>{props.numRounds}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>.
          </BodyText>
        </View>

        <CustomButton onPress={props.onRestart}>NEW GAME</CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: "20%",
  },
  screen_Small: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: "10%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    // width: Dimensions.get("window").width * 0.7,
    // height: Dimensions.get("window").width * 0.7,
    // borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    // marginVertical: Dimensions.get("window").height / 30,
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
  result: {
    marginHorizontal: 30,
    width: "80%",
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultText: {
    margin: 20,
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
});

export default GameOver;
