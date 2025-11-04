import * as Crypto from "expo-crypto";

import type { AuthData, UserData } from "@context/AuthContext";

import { endpoints, key } from "@src/constants";
import { postFormData } from "./apiClient";

interface LoginResponseDto {
  username?: string;
  id?: number;
  email?: string;
  firstname?: string;
  lastname?: string;
  pfp_url?: string;
  credits?: string;
  xp?: string;
  error?: string;
}

interface SignInResponseDto {
  username?: string;
  id?: number;
  email?: string;
  error?: string;
}

export async function login(user: string, password: string): Promise<AuthData> {
  const passwordHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );

  const formData = new FormData();
  formData.append("user", user);
  formData.append("pass", passwordHash);
  formData.append("token", key);

  const response = await postFormData<LoginResponseDto>(
    endpoints.login,
    formData
  );

  if (!response || response.error || !response.id) {
    throw new Error("Unable to authenticate with the provided credentials.");
  }

  const userData: UserData = {
    id: response.id,
    email: response.email ?? "",
    username: response.username ?? "",
    firstname: response.firstname,
    lastname: response.lastname,
    profilePhotoUrl: response.pfp_url,
  };

  return {
    user: userData,
    credits: Number(response.credits) ?? response.credits,
    experience: Number(response.xp) ?? response.xp,
  };
}

export async function register(
  user: UserData,
  password: string
): Promise<AuthData> {
  const passwordHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );

  const formData = new FormData();
  formData.append("token", key);
  formData.append("id", String(user.id));
  formData.append("username", user.username);
  formData.append("pass", passwordHash);
  formData.append("email", user.email);
  formData.append("fist_name", user.firstname ?? "");
  formData.append("last_name", user.lastname ?? "");

  const response = await postFormData<SignInResponseDto>(
    endpoints.register,
    formData
  );

  if (!response || response.error || !response.id) {
    throw new Error("Unable to register with user details.");
  }

  const userData: UserData = {
    id: response.id,
    email: response.email ?? "",
    username: response.username ?? "",
  };

  return {
    user: userData,
  };
}
