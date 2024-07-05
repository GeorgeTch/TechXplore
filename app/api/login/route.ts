import { NextResponse } from "next/server";
import { cookies } from "next/headers";

interface UserResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }

  const user: UserResponse = await response.json();

  const cookiesStore = cookies();
  cookiesStore.set("auth", JSON.stringify(user));

  if (user.username === formData.get("username")) {
    return NextResponse.json({ success: true, redirectTo: "/" });
  } else {
    return NextResponse.json({ success: false, redirectTo: "/login" });
  }
}
