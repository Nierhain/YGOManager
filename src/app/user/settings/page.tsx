import { useForm } from 'react-hook-form'
import { UserSettings } from '~/app/_components/User/UserSettings'
import { Button } from '~/lib/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/lib/components/ui/card'

export default async function Settings() {

    return (
        <div className="flex h-full items-center justify-center">
            <Card className="w-2/3">
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Settings</CardTitle>
                            <CardDescription>
                                User related settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <UserSettings />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Admin Settings</CardTitle>
                            <CardDescription>
                                Database and Global App Settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <Button>Update Database</Button>
                            <Button>Update Prices</Button>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}
