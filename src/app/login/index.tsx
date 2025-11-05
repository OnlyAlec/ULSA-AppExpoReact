import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import {
  Animated,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { AuthContext, UserData } from "@context/AuthContext";
import { login, register } from "@services/authService";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerFirstname, setRegisterFirstname] = useState("");
  const [registerLastname, setRegisterLastname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerID, setRegisterID] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { setSessionData } = useContext(AuthContext);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const headerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fadeHeader = (toValue: number) => {
      Animated.timing(headerOpacity, {
        toValue,
        duration: 180,
        useNativeDriver: true,
      }).start();
    };

    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      fadeHeader(0);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      fadeHeader(1);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [headerOpacity]);

  const handleLogin = async () => {
    if (isSubmitting) {
      return;
    }
    if (!loginUser && !loginPassword) {
      setHasError(true);
    }

    setIsSubmitting(true);
    setHasError(false);

    try {
      const data = await login(loginUser.trim(), loginPassword);
      setSessionData(data);
      router.replace("/home" as never);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async () => {
    if (isSubmitting) {
      return;
    }
    if (!registerName && !registerEmail && !registerPassword) {
      setHasError(true);
    }

    setIsSubmitting(true);
    setHasError(false);

    const userData: UserData = {
      id: Number(registerID),
      email: registerEmail,
      username: registerName.trim(),
      firstname: registerFirstname.trim(),
      lastname: registerLastname.trim(),
    };

    try {
      const data = await register(userData, registerPassword);
      setSessionData(data);
      router.replace("/home" as never);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }

    // Alert.alert(
    //   "Próximamente",
    //   "El registro estará disponible en una versión futura."
    // );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#107E7D", "#A1E5AB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />

        <View style={styles.content}>
          <Animated.View
            style={[styles.header, { opacity: headerOpacity }]}
            pointerEvents={isKeyboardVisible ? "none" : "auto"}
          >
            <Image
              style={styles.logo}
              source={require("../../../assets/images/queen.png")}
              contentFit="contain"
            />
            <Text style={styles.title}>Norsys</Text>
            <Text style={styles.subtitle}>
              Cianoacrilatos similares a los &quot;superpegamentos&quot;{" "}
            </Text>
          </Animated.View>
          <KeyboardAvoidingView
            behavior={"padding"}
            keyboardVerticalOffset={50}
          >
            <BlurView intensity={20} tint="light" style={styles.card}>
              {/* Tabs */}
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "login" && { backgroundColor: "#FF4848" },
                  ]}
                  onPress={() => {
                    setActiveTab("login");
                    setHasError(false);
                  }}
                  disabled={isSubmitting}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "login" && styles.tabTextActive,
                    ]}
                  >
                    Iniciar Sesión
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "register" && { backgroundColor: "#9B3DFF" },
                  ]}
                  onPress={() => {
                    setActiveTab("register");
                    setHasError(false);
                  }}
                  disabled={isSubmitting}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "register" && styles.tabTextActive,
                    ]}
                  >
                    Registrarse
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Form */}
              {activeTab === "login" && (
                <View style={styles.form}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombre de Usuario</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Miau!"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={loginUser}
                      onChangeText={setLoginUser}
                      keyboardType="default"
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Shh... es un secreto"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={loginPassword}
                      onChangeText={setLoginPassword}
                      secureTextEntry
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#FF4848" }]}
                    onPress={handleLogin}
                  >
                    <Text style={styles.buttonText}>
                      {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
                    </Text>
                  </TouchableOpacity>
                  {hasError ? (
                    <Text style={styles.errorText}>
                      No pudimos iniciar sesion, revisa los datos.
                    </Text>
                  ) : undefined}
                </View>
              )}

              {/* Register Form */}
              {activeTab === "register" && (
                <ScrollView
                  style={styles.scrollForm}
                  contentContainerStyle={styles.form}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Clave ULSA</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Sin 'al'..."
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={registerID}
                      onChangeText={setRegisterID}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombre de Usuario</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Valorant Tag"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={registerName}
                      onChangeText={setRegisterName}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="¿Cómo te llamas?"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={registerFirstname}
                      onChangeText={setRegisterFirstname}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Apellido</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="¿Y tu apellido?"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={registerLastname}
                      onChangeText={setRegisterLastname}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="correo@ejemplo.com"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={registerEmail}
                      onChangeText={setRegisterEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor="rgba(255,255,255,0.5)"
                      value={registerPassword}
                      onChangeText={setRegisterPassword}
                      secureTextEntry
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#9B3DFF" }]}
                    onPress={handleRegister}
                  >
                    <Text style={styles.buttonText}>
                      {isSubmitting ? "Registrando..." : "Crear Cuenta"}
                    </Text>
                  </TouchableOpacity>
                  {hasError ? (
                    <Text style={styles.errorText}>
                      No pudimos registrarte, revisa los datos.
                    </Text>
                  ) : undefined}
                </ScrollView>
              )}
            </BlurView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "rgba(255,255,255,0.8)",
  },
  card: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  tabText: {
    fontFamily: "Poppins-Medium",
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
  tabTextActive: {
    color: "#fff",
  },
  form: {
    gap: 16,
  },
  scrollForm: {
    maxHeight: 340,
    flexGrow: 0,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 14,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    padding: 16,
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  errorText: {
    backgroundColor: "#9f0000ff",
    color: "#FFF",
    padding: 30,
    textAlign: "center",
    borderRadius: 10,
  },
});
