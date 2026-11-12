import { CreateJobInput } from "@/Types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


export const  getJobs = async (query=""):Promise<CreateJobInput[]>=>{
    try {
        const res = await fetch(`${BASE_URL}/jobs?${query}`, {cache:"no-store"})
        if(!res.ok){
            return[]
        }
        return await res.json()
    } catch (error) {
        console.log("Error to get jobs", error);
        return []
    }
}