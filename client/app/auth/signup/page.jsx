'use client';

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signupschema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

// EyeFilledIcon.jsx
const EyeFilledIcon = (props) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        width="1em"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            fill="currentColor"
        />
    </svg>
);

// EyeSlashFilledIcon.jsx
const EyeSlashFilledIcon = (props) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        width="1em"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.438-.391.721-.954.721-1.591 0-1.036-.773-1.896-1.778-2.022L11.062 7.09c.291-.019.587-.034.889-.034 5.351 0 7.424 3.846 7.926 5C19.624 12.692 18.76 14.342 16.972 15.558z"
            fill="currentColor"
        />
    </svg>
);

// EmailIcon.jsx
const EmailIcon = (props) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        width="1em"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            fill="currentColor"
        />
    </svg>
);


export default function SignupPage() {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(signupschema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                // headers: { 'Content-Type': 'application/json' , 'Accept': 'application/json'},
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const userData = await response.json();
            
            // Store userId in localStorage (or you could use a state management solution)
            localStorage.setItem('userId', userData.id);

            // Redirect to login page after successful signup
            router.push('/auth/login');
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div className="flex flex-col w-full items-center justify-center bg-white px-4">
                <h1 className="text-[40px] font-bold text-black mb-2">Join Linktree</h1>
                <p className="text-gray-600 mb-6">Sign up for free!</p>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
                    <Input
                        {...register("email")}
                        type="email"
                        label="Email or username"
                        // placeholder="Enter your email"
                        endContent={<EmailIcon className="text-gray-400 mb-1 size-7" />}
                        classNames={{
                            base: "bg-[#F8F8FF]",
                            label: "text-sm text-gray-600",
                        }}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />

                    <Input
                        {...register("password")}
                        label="Password"
                        // placeholder="Enter your password"
                        endContent={
                            <button type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-gray-400 mb-1 size-7" />
                                ) : (
                                    <EyeFilledIcon className="text-gray-400 mb-1 size-7" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        classNames={{
                            base: "bg-[#F5F5F5]",
                            label: "text-sm text-gray-600",
                        }}
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-[var(--theme)] text-white rounded-full py-3 font-medium hover:bg-[#7C35E3] transition-colors"
                        isLoading={isSubmitting}
                    >
                        Create account
                    </Button>
                </form>

                <div className="mt-4 mx-20 text-center text-sm text-gray-600">
                    By clicking Create account, you agree to Linktree's privacy notice, T&Cs and to receive offers, news and updates.
                    {/* <Link href="/signup" className="text-primary font-medium">
                        Sign Up
                    </Link> */}
                </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center bg-primary text-white">
                <Image
                    src="/signup-grid-image.png"
                    alt="Welcome illustration"
                    width={400}
                    height={300}
                    priority
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
