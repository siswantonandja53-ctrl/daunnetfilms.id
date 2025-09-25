"use client";

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProfilePage = ({ userData,  }: { userData: any,  }) => {
    const [customerData, setCustomerData] = useState({ name: '', email: '', phoneNumber: '' });
    const { user, isLoaded } = useUser();
    const [showPhoneDialog, setShowPhoneDialog] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
  

    // Function to open phone dialog
    const openPhoneDialog = () => {
        setShowPhoneDialog(true);
    };

    const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerData({ ...customerData, [e.target.name]: e.target.value });
    };

    const handlePhoneNumberSubmit = async () => {
        try {
            const payload = {
                id: user?.id,
                phoneNumber: phoneNumber,
            };
            console.log('Sending request with payload:', payload);

            const response = await fetch('/api/update-phone-number', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success("Phone number updated", {
                    description: "Your phone number has been successfully updated.",
                });
                setShowPhoneDialog(false); // Close the dialog
                window.location.reload(); // Refresh the page
            } else {
                throw new Error('Failed to update phone number');
            }
        } catch (error) {
            console.error('Error updating phone number:', error);
            toast.error("Error", {
                description: "An error occurred while updating the phone number.",
            });
        }
    };

    return (
    <div className="bg-stone-900 min-h-screen py-8 px-4 sm:px-8 text-white">
            <Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
                <DialogContent className="bg-stone-900 border border-white text-white">
                    <DialogTitle className="text-white">Add Your Phone Number</DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Please add a phone number to use all features of our service.
                    </DialogDescription>
                    <Input
                        type="tel"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        required
                        className="bg-stone-900 border border-white text-white placeholder-gray-400 focus:border-[#F57C00]"
                    />
                    <Button onClick={handlePhoneNumberSubmit} className="bg-[#F57C00] hover:bg-[#EE6028] text-white border border-white w-full mt-2">
                        Save Phone Number
                    </Button>
                </DialogContent>
            </Dialog>
          
            <div className="flex flex-col gap-6 pb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">User Profile</h3>
                    <p className="text-sm text-gray-400">Update your user profile</p>
                </div>
                <Separator className="bg-white/20" />
            </div>
            <div className="flex gap-6 items-center mb-6">
                {!isLoaded ? (
                    <div className="flex flex-col items-center">
                        <Skeleton className="w-[150px] h-[150px] rounded-lg bg-gray-800" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Image
                            src={user?.imageUrl || "https://source.unsplash.com/500x300/?placeholder"}
                            width={150}
                            height={150}
                            alt={user?.fullName || 'User Name'}
                            className="rounded-lg border border-white shadow-md"
                        />
                    </div>
                )}

                <div className="flex flex-col">
                    {userData ? (
                        <div className="flex flex-col gap-4 w-full">
                            <h2 className="font-semibold text-lg text-white">Customer Details</h2>
                            <div className="flex flex-col gap-2">
                                {userData.name ? (
                                    <p className="text-lg text-white"><span className="font-semibold">Name:</span> {userData.name}</p>
                                ) : (
                                    <Input type="text" name="name" value={customerData.name} onChange={handleCustomerChange} placeholder="Name" required className="bg-stone-900 border border-white text-white placeholder-gray-400 focus:border-[#F57C00]" />
                                )}
                                {userData.email ? (
                                    <p className="text-lg text-white"><span className="font-semibold">Email:</span> {userData.email}</p>
                                ) : (
                                    <Input type="text" name="email" value={customerData.email} onChange={handleCustomerChange} placeholder="Email" required className="bg-stone-900 border border-white text-white placeholder-gray-400 focus:border-[#F57C00]" />
                                )}
                                {userData.phone_number ? (
                                    <p className="text-lg text-white"><span className="font-semibold">Phone Number:</span> {userData.phone_number}</p>
                                ) : (
                                    <Input type="tel" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required className="bg-stone-900 border border-white text-white placeholder-gray-400 focus:border-[#F57C00]" />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <Skeleton className="w-[250px] h-[50px] rounded-lg bg-gray-800" />
                            <Skeleton className="w-[250px] h-[50px] rounded-lg bg-gray-800" />
                        </div>
                    )}

                    <div className="flex gap-2 mt-4">
                        <Button size="sm" className="bg-[#F57C00] hover:bg-[#EE6028] text-white border border-white px-4" asChild>
                            <Link href={'/profile/'}>
                                Edit Profile Picture
                            </Link>
                        </Button>
                        <Button size="sm" className="bg-transparent border border-white text-white hover:bg-[#F57C00] hover:text-white px-4" onClick={openPhoneDialog}>
                            Edit Phone
                        </Button>
                    </div>
                </div>
            </div>
            <Separator className="bg-white/20 mt-8" />
         
           

        </div>
    );
};

export default ProfilePage;