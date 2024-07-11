import { api } from '~/trpc/server'

export default async function UserProfile() {
    const user = (await api.user.getSession.query())?.user
    const data = Object.entries(user ?? {})
    return (
        <>
            {data.map(([key, value]) => (
                <div key={key}>
                    {key}: {value}
                </div>
            ))}
        </>
    )
}
