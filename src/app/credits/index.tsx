import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreditsScreen() {
  const teamMembers = [
    {
      name: "Alexis Chacon",
      role: "Desarrollador Backend / Frontend",
      colors: ["#4E598C", "#7E52A0"],
    },
    {
      name: "Eduardo Carreño",
      role: "Desarrollador Backend",
      colors: ["#EDB458", "#704E2E"],
    },
  ];

  const onNavigateToHome = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#107E7D", "#A1E5AB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onNavigateToHome}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Créditos</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Title Card */}
          <BlurView intensity={20} tint="light" style={styles.titleCard}>
            <View style={styles.titleHeader}>
              <Text style={styles.title}>Equipo de Desarrollo</Text>
            </View>
            <Text style={styles.subtitle}>
              Conoce a las personas detrás de esta aplicación
            </Text>
          </BlurView>

          {/* Team Members */}
          <View style={styles.teamContainer}>
            {teamMembers.map((member, index) => (
              <BlurView
                key={index}
                intensity={20}
                tint="light"
                style={styles.memberCard}
              >
                <View style={styles.memberContent}>
                  {/* Avatar */}
                  <View style={styles.avatarContainer}>
                    <LinearGradient
                      colors={member.colors}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.avatarGlow}
                    />
                    <View style={styles.avatar}>
                      <LinearGradient
                        colors={[
                          "rgba(255,255,255,0.2)",
                          "rgba(255,255,255,0.1)",
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.avatarGradient}
                      >
                        <Text style={styles.avatarText}>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Text>
                      </LinearGradient>
                    </View>
                  </View>

                  {/* Member Info */}
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberRole}>{member.role}</Text>
                  </View>

                  {/* Social Icons */}
                  <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                      <Text style={styles.socialIcon}>G</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                      <Text style={styles.socialIcon}>in</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </BlurView>
            ))}
          </View>

          {/* Footer */}
          <BlurView intensity={20} tint="light" style={styles.footer}>
            <Text style={styles.footerText}>© 2025 - Hecho por los NAT</Text>
            <View style={styles.dotsContainer}>
              <View style={[styles.dot, { backgroundColor: "#AB92BF" }]} />
              <View style={[styles.dot, { backgroundColor: "#CEF9F2" }]} />
              <View style={[styles.dot, { backgroundColor: "#D6CA98" }]} />
            </View>
          </BlurView>
        </ScrollView>
      </View>
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
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 24,
    color: "#fff",
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
  titleCard: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginBottom: 24,
  },
  titleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 8,
  },
  titleIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
  teamContainer: {
    gap: 16,
    marginBottom: 24,
  },
  memberCard: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  memberContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatarContainer: {
    position: "relative",
  },
  avatarGlow: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 36,
    opacity: 0.75,
    top: -4,
    left: -4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
  },
  avatarGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 32,
  },
  avatarText: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "rgba(255,255,255,0.7)",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 8,
  },
  socialButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
  },
  footer: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginBottom: 24,
  },
  footerText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: 16,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
