/**            ---------------------------------------------
 * @file       frontend/fsuy_site/app/(pages)/login/page.tsx
 * @brief      The logins page.
 * @date       07-2026
 */

"use client";

import { type ReactElement, useState } from "react";
import { FsuyFooter } from "@/app/components/FsuyFooter";


// import reactLogo from "./assets/react.svg"
import "@/app/styles/pages/home.css";
import "@/app/styles/pages/login.css";

import {
    login,
    } from "@/app/commons";



export default function LoginPage(): ReactElement {
    const [username, setUsername]   = useState("");
    const [password, setPassword]   = useState("");
    const [loading, setLoading]     = useState(false);
    const [error, setError]         = useState("");

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
        catch (error) {
            //setError("Usuário ou senha inválidos.");
            setError(error.message);

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


                    <p className="auth_switch">
                        Não possui uma conta?

                        <a href="/register">
                            Cadastrar
                        </a>
                    </p>

                </form>
            </main>

            <FsuyFooter />
        </div>
    );
}
