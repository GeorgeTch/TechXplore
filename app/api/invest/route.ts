import { NextResponse } from "next/server";
import { cookies } from "next/headers";

interface UserResponse {
  token: string;
  email: string;
}

export async function POST(request: Request) {
  const cookiesStore = cookies();
  const authCookie = cookiesStore.get("auth");

  if (!authCookie) {
    return NextResponse.json(
      { error: "Not authenticated, Please Login First" },
      { status: 401 }
    );
  }

  let authData;
  try {
    authData = JSON.parse(authCookie.value);
  } catch (error) {
    console.error("Error parsing auth cookie:", error);
    return NextResponse.json({ error: "Invalid auth data" }, { status: 401 });
  }

  const { token } = authData;
  console.log(token);

  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  // Parse JSON data from request body
  // const { projectName, amount } = await request.json();
  let projectName, amount;
  try {
    const body = await request.json();
    ({ projectName, amount } = body);
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!projectName || !amount) {
    return NextResponse.json(
      { error: "Missing projectName or amount" },
      { status: 400 }
    );
  }

  const response = await fetch(
    "https://ideaxapp.azurewebsites.net/v1/Project/Invest",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        projectName,
        amount,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Investment API error:", response.status, errorText);
    return NextResponse.json(
      { error: "Investment failed", details: errorText },
      { status: response.status }
    );
  }

  // const result = await response.json();
  return NextResponse.json({ success: true });
}
