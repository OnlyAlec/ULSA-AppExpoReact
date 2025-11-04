// import { useCallback, useContext, useMemo, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Button,
//   Image,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// import {
//   CameraView,
//   useCameraPermissions,
//   type CameraCapturedPicture,
// } from "expo-camera";
// import * as ImagePicker from "expo-image-picker";

// import { updateProfilePhoto } from "@services/profileService";
// import { MyContext } from "@src/context/MyContext";

// const fallbackProfilePhoto = "http://monsterballgo.com/media/usr/default.png";

// export default function PhotoScreen() {
//   const { loginData } = useContext(MyContext);
//   const [permission, requestPermission] = useCameraPermissions();
//   const cameraRef = useRef<CameraView | null>(null);
//   const [previewUri, setPreviewUri] = useState<string | null>(null);
//   const [statusMessage, setStatusMessage] = useState<string>("");
//   const [isUploading, setIsUploading] = useState(false);
//   const [profilePhotoUrl, setProfilePhotoUrl] = useState(
//     loginData?.profilePhotoUrl ?? fallbackProfilePhoto
//   );

//   const userId = loginData?.id;

//   const ensurePermission = useCallback(async () => {
//     if (permission?.granted) {
//       return true;
//     }

//     const response = await requestPermission();
//     return response?.granted ?? false;
//   }, [permission?.granted, requestPermission]);

//   const uploadPhoto = useCallback(
//     async (uri: string, fileName = "profile-picture.jpg") => {
//       if (!userId) {
//         setStatusMessage("Necesitas iniciar sesión para actualizar tu foto.");
//         return;
//       }

//       try {
//         setIsUploading(true);
//         setStatusMessage("Subiendo foto...");
//         const remoteUrl = await updateProfilePhoto(userId, uri, fileName);
//         setProfilePhotoUrl(remoteUrl);
//         setPreviewUri(null);
//         setStatusMessage("Foto actualizada correctamente.");
//       } catch (error) {
//         const message =
//           error instanceof Error
//             ? error.message
//             : "No se pudo actualizar la foto.";
//         setStatusMessage(message);
//       } finally {
//         setIsUploading(false);
//       }
//     },
//     [userId]
//   );

//   const handleSelectFromLibrary = useCallback(async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.7,
//     });

//     if (result.canceled) {
//       return;
//     }

//     const asset = result.assets[0];
//     if (!asset?.uri) {
//       setStatusMessage("No se encontró la imagen seleccionada.");
//       return;
//     }

//     setPreviewUri(asset.uri);
//     await uploadPhoto(asset.uri, asset.fileName ?? "library-photo.jpg");
//   }, [uploadPhoto]);

//   const handleTakePhoto = useCallback(async () => {
//     const hasPermission = await ensurePermission();
//     if (!hasPermission) {
//       setStatusMessage("La cámara necesita permisos para continuar.");
//       return;
//     }

//     try {
//       const result: CameraCapturedPicture | undefined =
//         await cameraRef.current?.takePictureAsync({
//           quality: 0.7,
//         });

//       if (!result?.uri) {
//         setStatusMessage("No se pudo capturar la foto.");
//         return;
//       }

//       setPreviewUri(result.uri);
//       await uploadPhoto(
//         result.uri,
//         result.uri.split("/").pop() ?? "camera-photo.jpg"
//       );
//     } catch (error) {
//       const message =
//         error instanceof Error
//           ? error.message
//           : "No se pudo obtener la foto de la cámara.";
//       setStatusMessage(message);
//     }
//   }, [ensurePermission, uploadPhoto]);

//   const cameraSection = useMemo(() => {
//     if (permission?.granted) {
//       return (
//         <CameraView
//           ref={cameraRef}
//           style={styles.cameraPreview}
//           facing="back"
//         />
//       );
//     }

//     return (
//       <View style={styles.permissionCard}>
//         <Text style={styles.permissionText}>
//           La cámara aún no tiene permisos.
//         </Text>
//         <Button title="Dar permiso" onPress={ensurePermission} />
//       </View>
//     );
//   }, [ensurePermission, permission?.granted]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Actualiza tu foto de perfil</Text>
//       <Text style={styles.subtitle}>
//         {userId
//           ? `ID de usuario: ${userId}`
//           : "Inicia sesión para subir una foto."}
//       </Text>

//       {cameraSection}

//       <View style={styles.buttonRow}>
//         <Pressable
//           style={styles.actionButton}
//           onPress={handleTakePhoto}
//           disabled={isUploading}
//         >
//           <Text style={styles.buttonLabel}>Foto</Text>
//         </Pressable>
//         <Pressable
//           style={styles.actionButton}
//           onPress={handleSelectFromLibrary}
//           disabled={isUploading}
//         >
//           <Text style={styles.buttonLabel}>Galería</Text>
//         </Pressable>
//       </View>

//       <Text style={styles.resultHeading}>Resultado</Text>
//       <Image
//         style={styles.resultImage}
//         source={{ uri: previewUri ?? profilePhotoUrl }}
//       />

//       <View style={styles.statusRow}>
//         {isUploading ? <ActivityIndicator /> : null}
//         <Text style={styles.statusText}>{statusMessage}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     padding: 20,
//     gap: 16,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "700",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#555",
//   },
//   cameraPreview: {
//     width: 220,
//     height: 220,
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   permissionCard: {
//     width: 220,
//     height: 220,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderColor: "#aaa",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//     gap: 12,
//   },
//   permissionText: {
//     textAlign: "center",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   actionButton: {
//     backgroundColor: "#F9D689",
//     width: 120,
//     height: 40,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 6,
//     borderColor: "#000",
//     borderWidth: 2,
//   },
//   buttonLabel: {
//     fontWeight: "600",
//   },
//   resultHeading: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   resultImage: {
//     width: 160,
//     height: 160,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: "#000",
//   },
//   statusRow: {
//     minHeight: 24,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   statusText: {
//     fontSize: 12,
//     color: "#333",
//   },
// });
