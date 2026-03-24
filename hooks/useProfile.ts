import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export interface UserInfo {
    id: string
    email: string
    firstName: string
    lastName: string
    password: string
    plan: string
}

export function useProfile() {
    const { data: session, status } = useSession()
    const [loggedInUserInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [loadingLoggedInUser, setLoading] = useState(true)
    const { push } = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (status === 'authenticated' && session?.user?.email) {
                try {
                    const res = await fetch('/api/auth/get-profile', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: session.user.email }),
                    })

                    if (!res.ok) throw new Error('Failed to fetch profile')

                    const data = await res.json()
                    setUserInfo(data.user)
                } catch (err) {
                    console.error(err)
                } finally {
                    setLoading(false)
                }
            } else if (status === 'unauthenticated') {
                push('/login')
            }
        }

        fetchUserProfile()
    }, [status, session, push])

    const hasPurchased = loggedInUserInfo?.plan === 'paid'

    return { loggedInUserInfo, hasPurchased, loadingLoggedInUser }
}
