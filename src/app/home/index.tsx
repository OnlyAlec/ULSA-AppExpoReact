import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import IconCardAccount from "@/src/components/Icons/CardAccount";
import IconFlake from "@/src/components/Icons/Flake";
import IconCircleMultiple from "@components/Icons/CircleMultiple";
import { AuthContext } from "@context/AuthContext";
import { fallbackProfilePhoto } from "@src/constants";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext } from "react";

export default function HomeScreen() {
  const { sessionData, setSessionData } = useContext(AuthContext);
  const user = sessionData?.user;
  const userName = user?.username ?? "Invitado";
  const email = user?.email ?? "Sin correo";

  const handleLogout = () => {
    setSessionData(null);
    router.replace("/login" as never);
  };

  const onNavigateToCredits = () => {
    router.push("/credits" as never);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#107E7D", "#A1E5AB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bienvenid@ {userName}!</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutIcon}>👋</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <BlurView intensity={20} tint="light" style={styles.profileCard}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={["#4D243D", "#F9ADA0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarGlow}
            />
            <View style={styles.avatar}>
              <Image
                source={{
                  uri: user?.profilePhotoUrl ?? fallbackProfilePhoto,
                }}
                style={styles.avatarImage}
              />
            </View>
          </View>

          {/* User Info */}
          <View style={styles.infoContainer}>
            <BlurView intensity={15} tint="light" style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoLabel}>Nombre Completo</Text>
              </View>
              <Text style={styles.infoValue}>
                {user?.firstname} {user?.lastname}
              </Text>
            </BlurView>

            <BlurView intensity={15} tint="light" style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoLabel}>Correo Electrónico</Text>
              </View>
              <Text style={styles.infoValue}>{email}</Text>
            </BlurView>
          </View>
        </BlurView>

        {/* Decorative Elements */}
        <View style={styles.decorativeContainer}>
          <BlurView intensity={10} tint="light" style={styles.decorativeCard}>
            <IconCircleMultiple width={48} height={48} color="#fff" />
            <Text style={styles.decorativeText}>
              Creditos: {sessionData?.credits ?? 0}
            </Text>
          </BlurView>
          <BlurView intensity={10} tint="light" style={styles.decorativeCard}>
            <IconFlake width={48} height={48} color="#fff" />
            <Text style={styles.decorativeText}>
              XP: {sessionData?.experience ?? 0}
            </Text>
          </BlurView>
          <BlurView intensity={10} tint="light" style={styles.decorativeCard}>
            <IconCardAccount width={48} height={48} color="#fff" />
            <Text style={styles.decorativeText}>ID: {user?.id}</Text>
          </BlurView>
        </View>

        {/* Credits Button */}
        <View style={styles.footerSpacer}>
          <TouchableOpacity onPress={onNavigateToCredits}>
            <LinearGradient
              colors={["#4D243D", "#F9ADA0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.creditsButton}
            >
              <Text style={styles.creditsButtonText}>Ver Créditos</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 50,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutIcon: {
    fontSize: 20,
    color: "#fff",
  },
  profileCard: {
    borderRadius: 24,
    padding: 32,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginBottom: 24,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    opacity: 0.75,
    top: -5,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  infoContainer: {
    gap: 16,
  },
  infoCard: {
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
  infoValue: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#fff",
  },
  creditsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 32,
    gap: 8,
  },
  creditsButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  decorativeContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  decorativeCard: {
    flex: 1,
    height: 96,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  decorativeText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerSpacer: {
    marginTop: "auto",
  },
});
