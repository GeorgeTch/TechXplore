import { NextResponse } from "next/server";
import { cookies } from "next/headers";

interface UserResponse {
  token: string; // Assuming your API returns a token field as a string
  email: string; // Adding email field to UserResponse interface
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email") as string; // Convert FormDataEntryValue to string
  const password = formData.get("password") as string; // Convert FormDataEntryValue to string

  const response = await fetch(
    "https://ideaxapp.azurewebsites.net/v1/User/Login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }

  let user: UserResponse | null = null;
  let token: string | null = null;

  try {
    // Assuming response is not JSON but plain text token
    token = await response.text();
    // Also assuming your API returns the email along with the token
    user = { token, email };
  } catch (error) {
    console.error("Error parsing server response:", error);
    return NextResponse.json(
      { error: "Error parsing server response" },
      { status: 500 }
    );
  }

  if (!token) {
    return NextResponse.json(
      { error: "Token not found in server response" },
      { status: 500 }
    );
  }

  // Set the token in cookies
  const cookiesStore = cookies();
  cookiesStore.set("auth", JSON.stringify(user), { path: "/" });

  return NextResponse.json({ success: true, redirectTo: "/" });
}
