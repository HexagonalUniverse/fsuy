/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/login/page.tsx
 * @brief      The Login page.
 * @date       07-2026
 */

"use client";

import { type ReactElement, useState } from "react";
import { FsuyFooter } from "@/app/components/FsuyFooter";


// import reactLogo from "./assets/react.svg"
import "@/app/styles/pages/home.css";
import "@/app/styles/pages/login.css";

function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(";").shift() ?? null;
    }

    return null;
}

// IA GENERATED
export default function LoginPage(): ReactElement {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    async function login(username: string, password: string): Promise<void> {
        const response = await fetch(
            "http://localhost:4817/login/",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },

                body: JSON.stringify({
                    username,
                    password,
                }),
            },
        );

        if (! response.ok) {
            throw new Error("Login failed");
            return;
        }

        const data = await response.json();
        console.log(data);

        return;
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
            // await fetch("http://localhost:4817/csrf/", { credentials: "include", });

            await login(username, password);

            // redirect
            window.location.href = "/";
        }
        catch {
            console.log("ERROR 2");
            setError("Usuário ou senha inválidos.");

        }
        finally {
            setLoading(false);
        }

        return;
    }


    return (
        <div className="page_body">

            <main className="login_page">
                <form
                    className="login_card"
                    onSubmit={handleSubmit}
                >
                    <h1>Entrar</h1>

                    <label>
                        Usuário
                        <input
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Senha
                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />
                    </label>

                    {error !== "" && (
                        <p className="login_error">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </main>

            <FsuyFooter />
        </div>
    );
}
