'use client'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/lib/components/ui/form'
import { Input } from '~/lib/components/ui/input'
import { useForm } from 'react-hook-form'
import { api } from '~/trpc/react'
import { Button } from '~/lib/components/ui/button'

export function UserSettings() {
    const { data } = api.user.getSession.useQuery()
    const form = useForm()

    const user = data?.user

    return (
        <Form {...form}>
            <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Display name</FormLabel>
                        <FormControl>
                            <Input placeholder={user?.name ?? 'Displayname'} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit">Save</Button>
        </Form>
    )
}
