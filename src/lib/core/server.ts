import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};


export const requireRole = async (allowedRole: string | string[]) => {
  const session = await getSession();

  // 1. Not logged in -> send to sign in
  if (!session?.user) {
    redirect("/sign-in");
  }

  const userRole = (session.user.role || "seeker").toLowerCase();
  const roles = (Array.isArray(allowedRole) ? allowedRole : [allowedRole]).map((r) =>
    r.toLowerCase()
  );

  // 2. Strict Role Isolation -> Redirect unauthorized roles to their designated home dashboard
  if (!roles.includes(userRole)) {
    if (userRole === "admin") {
      redirect("/dashboard/admin");
    }
    if (userRole === "recruiter") {
      redirect("/dashboard/recruiter/jobs");
    }
    if (userRole === "seeker" || userRole === "job-seeker") {
      redirect("/dashboard/job-seeker");
    }
    redirect("/");
  }

  return session;
};

export const getToken = async () => {
  const session = await getSession();
 if( !session || !session.session?.token){
  redirect('/sign-in')
 }
 return session.session.token;
}

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = await getToken();
  return await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};


export const uploadImageToImgBB = async (formData: FormData) => {
  const apiKey = process.env.IMGBB_API_KEY;
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data?.data?.url || null;
};