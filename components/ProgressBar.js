import { View, Text } from "react-native";
import React from "react";

const ProgressBar = ({ progress, max }) => {
  console.log(max);
  return (
    <View className="border-2 h-5 rounded-xl bg-gray-300 w-full">
      <View
        className={`bg-green-700 h-full rounded-xl`}
        style={{
          width: `${
            max <= 100
              ? progress
              : progress === max
              ? progress - (progress - 100)
              : progress < max && progress > 100
              ? progress - (progress - 100) - 10
              : progress - 10
          }%`,
        }}
      >
        <Text className="font-extrabold self-end pr-1">{progress}</Text>
      </View>
    </View>
  );
};

export default ProgressBar;
