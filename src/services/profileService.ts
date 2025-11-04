import { Platform } from "react-native";

import { endpoints } from "@src/constants";
import { postFormData } from "./apiClient";

interface ProfilePhotoResponseDto {
  error?: boolean;
  message?: string;
  pfp_url?: string;
}

const apiTokenKey = "code37";

function normalizeImageUri(uri: string): string {
  if (Platform.OS === "ios") {
    return uri.replace("file://", "");
  }

  return uri;
}

export async function updateProfilePhoto(
  userId: number,
  imageUri: string,
  fileName = "profile-picture.jpg"
): Promise<string> {
  const formData = new FormData();
  formData.append("token", apiTokenKey);
  formData.append("id", String(userId));

  const photoFile: any = {
    uri: normalizeImageUri(imageUri),
    name: fileName,
    type: "image/jpeg",
  };

  formData.append("image", photoFile);

  const response = await postFormData<ProfilePhotoResponseDto>(
    endpoints.setProfilePicture,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (response.error || !response.pfp_url) {
    throw new Error(
      response.message ?? "Unable to update the profile picture."
    );
  }

  return response.pfp_url;
}
