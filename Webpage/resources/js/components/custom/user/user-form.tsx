import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { FormEventHandler } from 'react'

type Props = {
    mode: 'add' | 'edit'
    data: userForm
    onChange: (field: keyof userform, value: string) => void
    onSubmit: FormEventHandler
    onCancel: () => void
    processing: boolean
    errors: Record<string, string>
}

export const UserForm = ({ mode, data, onChange, onSubmit, onCancel, processing, errors }: Props) => {
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='overflow-x-auto p-4'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="fullname" className='text-black'>Full Name</Label>
                            <Input
                                className='text-black'
                                id="fullname"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                value={data.name}
                                onChange={(e) => onChange('name', e.target.value)}
                                placeholder="Full Name"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email" className='text-black'>Email</Label>
                            <Input
                                className='text-black'
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                value={data.email}
                                onChange={(e) => onChange('email', e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role" className='text-black'>Role</Label>
                            <Select
                                value={data.role}
                                onValueChange={(value) => onChange('role', value)}
                            >
                                <SelectTrigger id="priority" className="text-black" tabIndex={3}>
                                    <SelectValue placeholder="Select Priority Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Administrator</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {mode === 'add' && (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className='text-black'>Password</Label>
                                    <Input
                                        className='text-black'
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        value={data.password}
                                        onChange={(e) => onChange('password', e.target.value)}
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="confirm_password" className='text-black'>Confirm Password</Label>
                                    <Input
                                        className='text-black'
                                        id="confirm_password"
                                        type="password"
                                        required
                                        tabIndex={5}
                                        value={data.confirm_password}
                                        onChange={(e) => onChange('confirm_password', e.target.value)}
                                        placeholder="Confirm Password"
                                    />
                                </div>
                            </>
                        )}

                    </div>
                    <div className="mt-10 w-full bottom-10 right-10 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                        <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md" onClick={onCancel}>Cancel</button>
                        <button type='submit' className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md">{mode === 'add' ? 'Create' : 'Update'}</button>
                    </div>
                </div>
            </form>
        </>
    )
}
