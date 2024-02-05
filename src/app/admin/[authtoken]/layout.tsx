"use client"

import { GetStatusToken } from "@/lib/handles/handleToken";
import { HOME_PAGE } from "@/lib/routes";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function IsAdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const pathname = usePathname().split('/')
    const authToken = pathname[pathname.length-1]

    // Router
    const router = useRouter()
    const [isAdminAccess, setStateAdminAccess] = useState<boolean>(false)


    useEffect(() => {
        const fetchToCheckAccess = async () => {
            const SUCCESS_STATUS = 202
            const statusToken = await GetStatusToken(authToken);
            console.log(statusToken, authToken)
            if (statusToken !== SUCCESS_STATUS) {
                router.push(HOME_PAGE)
                return;
            }
            setStateAdminAccess(true);
        }
        fetchToCheckAccess();
    })

    return (
      <>
        {isAdminAccess && children}
      </>
    );
  }
  