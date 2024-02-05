"use client"
import { HOME_PAGE } from "@/lib/routes"
import { useRouter } from "next/navigation"

export default function NotFound () {
    const router = useRouter()
    router.push(HOME_PAGE)

    return <></>
}