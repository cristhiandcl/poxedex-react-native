import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";

import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import { setUsuario } from "../slices/usuarioSlice";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const AppJulian = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUsuario = useSelector((state) => state.usuario);

  //Modal for instancia
  const [modalVisible, setModalVisiable] = useState(true);

  //Variables de usuario
  const [user, setUser] = useState("userlab");
  const [password, setPassword] = useState("Admin*2");
  const [code, setCode] = useState("830506365");
  const [token, setToken] = useState("");

  const consultarAPI = async () => {
    const url = "https://alfaapi2.pymesplus.co/oauth/token";
    try {
      const resultado = await axios({
        method: "post",
        url: url,
        data: JSON.stringify({
          username: user,
          password: password,
          oldToken: null,
          dataOptional: {},
        }),
        headers: {
          Referer: `https://alfa2.pymesplus.co/${code}/#/`,
          "Content-Type": "application/json",
        },
      });
      const newUsuario = {
        token: resultado.data.token,
      };
      dispatch(setUsuario(newUsuario));
      setToken(resultado.data.token);
      navigation.navigate("userPage");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Credenciales erróneas",
        "Por favor verifique que sus datos están correctamente diligenciados",
        [
          {
            text: "Ok",
            style: "cancel",
          },
        ]
      );
    }
  };

  //   const loginValidation = () => {
  //     if (token === "") {
  //       Alert.alert(
  //         "Credenciales erróneas",
  //         "Por favor verifique que sus datos están correctamente diligenciados",
  //         [
  //           {
  //             text: "Ok",
  //             style: "cancel",
  //           },
  //         ]
  //       );
  //     }
  //   };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisiable(!modalVisible);
        }}
      >
        <View style={styles.modalFirstView}>
          <View style={styles.modalSecondView}>
            <View>
              <Icon name="key" size={25} color="#000" />
            </View>
            <Text style={styles.modalTextInfo}>
              Por favor ingrese el numero de instancia
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder={"111206365"}
              textAlign="center"
              keyboardType="numeric"
              value={code}
              onChangeText={setCode}
            />
            <View style={styles.modalButtonContainer}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#ef5d60" }]}
                  onPress={() => setModalVisiable(false)}
                >
                  <Text style={styles.textLoginBotton}>Cancelar</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#90a955" }]}
                  onPress={() =>
                    code === ""
                      ? setModalVisiable(true)
                      : setModalVisiable(false)
                  }
                >
                  <Text style={styles.textLoginBotton}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.icon}>
        <Icon.Button
          name="dharmachakra"
          size={30}
          iconStyle={{ color: "#000" }}
          backgroundColor={"rgba(0, 0, 0, 0)"}
          onPress={() => setModalVisiable(!modalVisible)}
        ></Icon.Button>
      </View>
      <View style={{ marginHorizontal: 50, marginTop: 50 }}>
        <Text style={styles.loginText}>Bienvenido a</Text>
        <Text style={styles.pymesText}>Pymes+</Text>
        <Text style={styles.monitorText}>Monitor</Text>
        <Text style={styles.loginTextInfo}>
          Mantente enterado de lo que sucede en tu empresa desde cualquier parte
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.loginText}>Usuario</Text>
        <TextInput
          style={styles.loginInput}
          value={user}
          onChangeText={setUser}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.loginText}>Contraseña</Text>
        <TextInput
          style={styles.loginInput}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.loginBotton}
          onPress={() => {
            consultarAPI();
            // loginValidation();
            console.log(token);
          }}
        >
          <Text style={styles.textLoginBotton}>Ingresar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.forgetTextContainer}>
        <Pressable>
          <Text style={styles.forgetText}>Olvide mi contraseña</Text>
        </Pressable>
      </View>
      <Text>{}</Text>
    </View>
  );
};

export default AppJulian;

const styles = StyleSheet.create({
  loginText: {
    fontSize: 20 * 1.1,
    textAlign: "center",
    marginBottom: 5,
    color: "#000",
    // fontFamily: "OpenSans-SemiBold",
  },
  loginInput: {
    height: 35,
    marginHorizontal: 70,
    borderWidth: 2,
    padding: 10,
  },
  pymesText: {
    fontSize: 30 * 1.1,
    textAlign: "center",
    marginBottom: 5,
    // fontFamily: "OpenSans-BoldItalic",
    color: "#000",
  },
  loginTextInfo: {
    // fontFamily: "OpenSans-Medium",
    color: "#000",
    textAlign: "center",
    fontSize: 12 * 1.1,
    marginTop: 25,
  },
  monitorText: {
    // fontFamily: "OpenSans-Medium",
    color: "#000",
    textAlign: "right",
    marginRight: 90,
    fontSize: 12 * 1.1,
    marginTop: -10,
  },
  icon: {
    marginTop: 15,
    alignItems: "flex-end",
    marginRight: 20,
  },
  forgetText: {
    // fontFamily: "OpenSans-Medium",
    color: "#0074B7",
    textDecorationLine: "underline",
  },
  forgetTextContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  loginBotton: {
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#DDD",
    marginHorizontal: 120,
    borderRadius: 5,
    height: 30,
  },
  textLoginBotton: {
    // fontFamily: "OpenSans-SemiBold",
    textAlign: "center",
    color: "#000",
  },
  modalFirstView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalSecondView: {
    position: "relative",
    marginTop: 100,
    marginHorizontal: 40,
    height: 300,
    padding: 30,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
  },
  modalTextInfo: {
    // fontFamily: "OpenSans-Bold",
    color: "#000",
    textAlign: "center",
    fontSize: 15 * 1.1,
    marginTop: 12,
  },
  modalInput: {
    height: 35,
    width: 150,
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    marginTop: 30,
  },
  modalButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButton: {
    marginHorizontal: 15,
    padding: 5,
    height: 30,
    marginTop: 50,
    backgroundColor: "#DDD",
    borderRadius: 5,
  },
});
