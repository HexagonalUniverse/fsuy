/**            ------------------------------------------------
 * @file       frontend/fsuy_site/app/(pages)/register/page.tsx
 * @brief      The register page.
 * @date       07-2026
 */

"use client";

import { FormEvent, useState } from "react";
import { FsuyFooter } from "@/app/components/FsuyFooter";

import "@/app/styles/pages/home.css";
import "@/app/styles/pages/login.css";
import "@/app/styles/pages/register.css";

import {
    RegisterResult,
    register,
    } from "@/app/commons";



type RegisterData = {
    username:           string;
    email:              string;
    password:           string;
    confirm_password:   string;
    public_name:        string;
};


export default function RegisterPage(): JSX.Element {
    const [form, setForm] = useState<RegisterData>({
        username:           "",
        email:              "",
        password:           "",
        confirm_password:   "",
        public_name:        "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passReq, setPassReq] = useState<string[]>([]);

    const [redirecting, setRedirecting] = useState(false);
    const [progress, setProgress] = useState(0);


    function redirect_to_homepage() {
        setRedirecting(true);

        const duration = 2500;
        const interval = 25;
        const increment = 100 / (duration / interval);

        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            setProgress(Math.min(current, 100));
        }, interval);

        setTimeout(() => {
            clearInterval(timer);
            window.location.href = "/";
        }, duration);
    }

    function updateField(event: React.ChangeEvent<HTMLInputElement>,): void {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });

        return;
    }

    async function DO_register() : Promise<void> {

        try {
            console.log(form);
            const result: RegisterResult = await register(
                form.username,
                form.email,
                form.password,
                form.public_name,
            );

        } catch (error) {
            console.log("ERROR ", error.status, error);
            setPassReq(error.pass_req);
            throw new Error(error.message);
        }
    }


    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();

        if (form.password !== form.confirm_password) {
            setError("As senhas não coincidem.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await DO_register();

            setSuccess("Conta cadastrada com successo!");
            redirect_to_homepage();


            // resettando os trem tudo
            setForm({
                username:       "",
                email:          "",
                password:       "",
                public_name:    "",
            });

            setPassReq([]);
        }

        catch (error) {
            setError(
                error instanceof Error ?
                    error.message :
                    "Erro desconhecido."
            );
        }
        finally {
            setLoading(false);
        }

        return;
    }

    if (redirecting) {
        return (
            <div className="page_body">

                <main className="login_page">

                    <div className="login_card">

                        <h1>{success}</h1>

                        <p>
                            Redirecionando...
                        </p>

                        <div className="redirect_progress">

                            <div
                                className="redirect_progress_fill"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />

                        </div>

                    </div>

                </main>

                <FsuyFooter />

            </div>
        );
    }

    return (
        <div className="page_body">

            <main className="login_page">

                <form
                    className="login_card"
                    onSubmit={handleSubmit}
                >
                    <h1>Cadastrar</h1>

                    <label>
                        Usuário
                        <input
                            name="username"
                            value={form.username}
                            onChange={updateField}
                            disabled={loading}
                            required
                        />
                    </label>

                    <label>
                        Nome público
                        <input
                            name="public_name"
                            value={form.public_name}
                            onChange={updateField}
                            disabled={loading}
                            required
                        />
                    </label>

                    <label>
                        E-mail
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={updateField}
                            disabled={loading}
                            required
                        />
                    </label>

                    <label>
                        Senha
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={updateField}
                            disabled={loading}
                            required
                        />
                    </label>

                    <label>
                        Confirmar senha
                        <input
                            type="password"
                            name="confirm_password"
                            value={form.confirm_password}
                            onChange={updateField}
                            disabled={loading}
                            required
                        />
                    </label>

                    {passReq.length > 0 && (
                        <div className="password_box">
                            <strong>A senha deve:</strong>

                            <ul className="password_rules">
                                {passReq.map((rule) => (
                                    <li key={rule}>{rule}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error !== "" && (
                        <p className="login_error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Cadastrando..."
                            : "Cadastrar"}
                    </button>

                    <p className="auth_switch">
                        Já possui uma conta?

                        <a href="/login">
                            Entrar
                        </a>
                    </p>

                </form>

            </main>

            <FsuyFooter />

        </div>
    );
}