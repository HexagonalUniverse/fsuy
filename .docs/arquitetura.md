# Arquietura Geral do Sistema


## Componentes e Módulos

Nosso sistema consiste dos seguintes módulos principais, a saber: o frontend, backend, e banco de dados.
Para todo efeito, nesse sistema cada módulo é também uma camada no sistema.
(Quiçá, em uma continuação trabalho, cada módulo não seja fragmentado mais adequadamente.)

O _frontend_ corresponde à nossa interface WEB.
Ou seja, consiste no que "o cliente vê".
O frontend se comunica com o backend por meio da API REST definida.

O _backend_ e o banco de dados correspondem ao nosso servidor.
No backend está a "lógica do sistema": os endpoints, o processamento e a comunicação com o banco de dados.

O banco de dados é um sistema independente hospedado na rede (via supadb) sobre o qual o backend realiza consultas sobre.
O storage também está organizado dentro do módulo, de tal forma que imagens (até então, mas possivelmente outros documentos) estão armazenados lá.
Assim, o frontend acessa a imagem pelo endereço fornecido (para ela) pelo backend para o documento na rede do storage.

## Dependências 

Para o desenvolvimento deste trabalho as seguintes tecnologias e soluções foram urilizadas:

|            | Banco de Dados | Backend | Frontend |
|---|---|---|---|
| **Linguagens**  | pgSQL | Python | HTML, CSS, TypeScript |
| **Frameworks / Tecnologias**  | SupaBase / Postegres | Django, Fast API | React / Next.js |
|  |  |  |


Adicionalmente, será utilizada a plataforma de hospedagem do DigitalOcean e, para tanto, faz-se a contenerização da aplicação taravés do Docker.

## Diagramas esquemáticos

<figure>
    <img src="diagrams/system_specification.png" width="500">
    <figcaption> <strong>Figura 1:</strong> Arquitetura geral do sistema. </figcaption>
</figure>

<figure>
    <img src="diagrams/system_deployment.png" width="500">
    <figcaption> <strong>Figura 2:</strong> Arquitetura de Deployment do sistema. </figcaption>
</figure>