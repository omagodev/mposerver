# MPOServer - Palworld Online

### Tela de gerenciamento do servidor

<img src="https://omagodev.s3.amazonaws.com/mposerver1.PNG" width="825px">

<table>
<tr>
<td valign="top">

![](https://emojiguide.com/wp-content/uploads/platform/facebook/43751.png)

# Índice

- [MPOServer - Palworld Online](#descricao-do-projeto)
- [End-points](#end-points)
- [Acesso ao MPOServer](#acesso-ao-mposerver)
  - [Uso da API](#uso-da-api)
    - [Endpoint Público](#endpoint-p-blico)
      - [Obter Informações do Servidor](#obter-informações-do-servidor)
- [Endpoint de Comando](#endpoint-de-comando)
  - [Envio de Comando](#envio-de-comando) + [Cabeçalhos Requeridos](#cabeçalhos-requeridos) + [Corpo da Requisição](#corpo-da-requisição) + [Respostas Possíveis](#respostas-possíveis) - [Sucesso na Execução do Comando](#sucesso-na-execução-do-comando) - [Falha na Autenticação](#falha-na-autenticação) - [Comando Faltando](#comando-faltando) - [Erro Interno do Servidor](#erro-interno-do-servidor) + [Exemplo de Uso](#exemplo-de-uso)
  </td>
  <td>

![](https://emojiguide.com/wp-content/uploads/platform/apple/44356.png)

# Índex

- [MPOServer - Palworld Online](#description)
  - [Key features of the MPOserver include](#key-features-of-the-mposerver-include)
    - [Graphical User Interface (GUI):](#graphical-user-interface-gui)
    - [Enhanced Security:](#enhanced-security)
    - [Public Endpoint:](#public-endpoint)
    - [RCON Compatibility:](#rcon-compatibility)

* [How to use MPOServer:](#how-to-use-mposerver)
* [Command Endpoint](#command-endpoint)
  - [Command Submission](#command-submission) + [Required Headers](#required-headers) + [Request Body](#request-body) + [Possible Responses](#possible-responses) - [Success in Executing the Command](#success-in-executing-the-command) - [Authentication Failure](#authentication-failure) - [Missing Command](#missing-command) - [Internal Server Error](#internal-server-error) + [Usage Example](#usage-example)
  </td>
  </table>

<a id="descricao-do-projeto"></a>

 <img src="https://emojiguide.com/wp-content/uploads/platform/facebook/43751.png">

O **_MPOserver_** é um wrapper de API para o **_Palworld RCON_**, inspirado e desenvolvido com base nos repositórios **_[palworld-server-docker](https://github.com/thijsvanloef/palworld-server-docker)_** e **_[palworld-rcon-buddy](https://github.com/valamidev/palworld-rcon-buddy)_**.

Este software foi projetado para ser executado em paralelo com o **_servidor Palworld_**, proporcionando uma interface HTTP/JSON segura para administração do servidor através de uma **_interface gráfica_** de usuário (GUI).

## Principais características do MPOserver

### Interface Gráfica de Usuário (GUI):

Facilita a administração do servidor Palworld, permitindo uma interação intuitiva e visual, ideal para usuários de diferentes níveis de experiência.

### Segurança Aprimorada:

Implementa autenticação via token de portador (Bearer Token), assegurando uma camada extra de proteção para as operações administrativas.

<a id="end-point-público"></a>

### Endpoint Público:

Oferece acesso remoto à interface administrativa, possibilitando gerenciamento eficiente de qualquer local.

### Compatibilidade com RCON:

Total integração com o protocolo RCON do Palworld, permitindo executar comandos RCON diretamente através da GUI.
O desenvolvimento do MPOserver foi fortemente influenciado pelos recursos e estruturas encontrados nos repositórios mencionados, e agradecemos aos criadores por disponibilizarem tais recursos que serviram de base para este projeto.

O MPOserver é uma ferramenta valiosa para administradores de servidores Palworld que procuram uma solução gráfica para gerenciar suas instâncias de jogo de forma mais eficiente e segura.

![](https://emojiguide.com/wp-content/uploads/platform/apple/44356.png)

<a id="description"></a>

## Description

The MPOserver is an API wrapper for Palworld RCON, inspired and developed based on the palworld-server-docker and palworld-rcon-buddy repositories.

This software is designed to run parallel to the Palworld server, providing a secure HTTP/JSON interface for server administration through a graphical user interface (GUI).

<a id="key-features-of-the-mposerver-include"></a>

## Key features of the MPOserver include

<a id="graphical-user-interface-gui"></a>

### Graphical User Interface (GUI):

Facilitates the administration of Palworld servers, allowing for intuitive and visual interaction, ideal for users of different experience levels.

<a id="enhanced-security"></a>

### Enhanced Security:

Implements authentication via bearer token (Bearer Token), ensuring an extra layer of protection for administrative operations.

<a id="public-endpoint"></a>

### Public Endpoint:

Offers remote access to the administrative interface, enabling efficient management from any location.

<a id="rcon-compatibility"></a>

### RCON Compatibility:

Fully integrated with the Palworld RCON protocol, allowing for the execution of RCON commands directly through the GUI. The development of the MPOserver was heavily influenced by the resources and structures found in the mentioned repositories, and we extend our gratitude to the creators for making such resources available, which served as a foundation for this project.

The MPOserver is a valuable tool for Palworld server administrators looking for a graphical solution to manage their game instances more efficiently and securely.

<a id="how-to-use-mposerver"></a>

# How to use MPOServer:

```
version: "3"
services:
  # Palworld Server Configuration
  palworld:
    image: thijsvanloef/palworld-server-docker:latest # Docker image for Palworld server
    restart: unless-stopped # Ensures the container restarts if it stops unexpectedly
    container_name: palworld-server # Name of the container
    ports:
      - 8211:8211/udp # Game server port
      - 27015:27015/udp # Steam query port
      - 127.0.0.1:25575:25575 # RCON port, bound to localhost for security
    environment:
      - PUID=1000 # User ID for the container
      - PGID=1000 # Group ID for the container
      - PORT=8211 # Game server port
      - PLAYERS=16 # Maximum number of players
      - SERVER_PASSWORD="your_server_password" # Optional but recommended server password
      - MULTITHREADING=true # Enable multithreading for performance
      - RCON_ENABLED=true # Enable RCON
      - RCON_PORT=25575 # RCON port
      - TZ=UTC # Timezone setting for the server
      - ADMIN_PASSWORD="your_admin_password" # Admin password for server management
      - COMMUNITY=true # Set to true to list server in the community tab
      - SERVER_NAME="Your_Server_Name" # Name of your server
      - SERVER_DESCRIPTION="" # Description of your server
    volumes:
      - ./palworld:/palworld/ # Mounts the server data directory

  # MPO Server Configuration
  mposerver:
    image: "omagodev/mposerver:latest" # Docker image for MPO server
    environment:
      PALWORLD_SERVER_IP_ADDRESS: "palworld" # IP address of the Palworld server
      PALWORLD_RCON_PORT: "25575" # RCON port of the Palworld server
      PALWORLD_RCON_PASSWORD: "your_admin_password" # RCON password for the Palworld server
      INFO_CACHE_DURATION_MS: 5000 # Duration for caching server info in milliseconds
      BEARER_TOKEN: "your_bearer_token" # Bearer token for authentication
      PORT: 3000 # Port for the MPO server
    ports:
      - "3000:3000" # Port mapping for the MPO server
```

<a id="end-points"></a>

# End-points

<a id="acesso-ao-mposerver"></a>

# Acesso ao MPOServer

Para acessar a aplicação, conecte-se à porta `3000`. Esta é a porta padrão onde o MPOServer está em execução.

### Tela de mensageria

 <img src="https://omagodev.s3.amazonaws.com/mposerver2.PNG" width="825px">

<a id="uso-da-api"></a>

## Uso da API

<a id="endpoint-público"></a>

### Endpoint Público

Este endpoint é público e não requer autenticação. Ele possui um cache com duração definida pela variável `INFO_CACHE_DURATION_MS` (padrão de 5 segundos) para evitar sobrecarga no servidor.

<a id="obter-informações-do-servidor"></a>

#### Obter Informações do Servidor

- Endpoint: `127.0.0.1:3000/info`
- Descrição: Retorna informações básicas do servidor.

Exemplo de resposta:

```json
{
  "players": [
    {
      "name": "O Mago",
      "playeruid": "41XXXXX2",
      "steamid": "765XXX"
    }
  ],
  "serverName": "A Quinta Onda",
  "serverVersion": "v0.1.3.0"
}
```

![](https://emojiguide.com/wp-content/uploads/platform/facebook/43751.png)

<a id="endpoint-de-comando"></a>

# Endpoint de Comando

Este endpoint permite que comandos sejam enviados para o servidor. É necessário autenticação via Bearer Token para acessar este endpoint.

<a id="envio-de-comando"></a>

## Envio de Comando

- Endpoint: `POST /command`
- Autenticação: Bearer Token

<a id="cabeçalhos-requeridos"></a>

### Cabeçalhos Requeridos

- `Authorization`: Bearer Token para autenticação.

<a id="corpo-da-requisição"></a>

### Corpo da Requisição

- `command`: O comando a ser executado no servidor.

<a id="respostas-possíveis"></a>

### Respostas Possíveis

<a id="sucesso-na-execução-do-comando"></a>

#### Sucesso na Execução do Comando

- Código de Status: `200 OK`
- Corpo da Resposta:

```json
{
  "result": "Resposta do comando executado"
}
```

<a id="falha-na-autenticação"></a>

#### Falha na Autenticação

- Código de Status: `401 Unauthorized`
- Corpo da Resposta:

```json
{
  "message": "Missing Bearer token" // ou "Invalid Bearer token", conforme o caso.
}
```

<a id="comando-faltando"></a>

#### Comando Faltando

- Código de Status: `400 Bad Request`
- Corpo da Resposta:

```json
{
  "message": "Missing command in request body"
}
```

<a id="erro-interno-do-servidor"></a>

#### Erro Interno do Servidor

- Código de Status: `500 Internal Server Error`
- Corpo da Resposta:

```json
{
  "message": "Mensagem de erro específica"
}
```

<a id="exemplo-de-uso"></a>

### Exemplo de Uso

Para enviar um comando ao servidor, você deve fazer um POST para o endpoint `/command` com o comando desejado no corpo da requisição e o Bearer Token no cabeçalho de autorização.

Exemplo de corpo da requisição:

```json
{
  "command": "comando_aqui"
}
```

Nota: Substitua "comando_aqui" pelo comando específico que deseja executar.

<a id="command-endpoint"></a>
![](https://emojiguide.com/wp-content/uploads/platform/apple/44356.png)

# Command Endpoint

This endpoint allows commands to be sent to the server. Authentication via Bearer Token is required to access this endpoint.

<a id="command-submission"></a>

## Command Submission

- Endpoint: `POST /command`
- Authentication: Bearer Token

<a id="required-headers"></a>

### Required Headers

- `Authorization`: Bearer Token for authentication.

<a id="request-body"></a>

### Request Body

- `command`: The command to be executed on the server.

<a id="possible-responses"></a>

### Possible Responses

<a id="success-in-executing-the-command"></a>

#### Success in Executing the Command

- Status Code: `200 OK`
- Response Body:

```json
{
  "result": "Response of the executed command"
}
```

<a id="authentication-failure"></a>

#### Authentication Failure

- Status Code: `401 Unauthorized`
- Response Body:

```json
{
  "message": "Missing Bearer token" // or "Invalid Bearer token",  as applicable.
}
```

<a id="missing-command"></a>

#### Missing Command

- Status Code: `400 Bad Request`
- Response Body:

```json
{
  "message": "Missing command in request body"
}
```

<a id="internal-server-error"></a>

#### Internal Server Error

- Status Code: `500 Internal Server Error`
- Response Body:

```json
{
  "message": "Specific error message"
}
```

<a id="usage-example"></a>

### Usage Example

To send a command to the server, you must make a POST to the /command endpoint with the desired command in the request body and the Bearer Token in the authorization header.

Example request body:

```json
{
  "command": "command_here"
}
```

Note: Replace "command_here" with the specific command you wish to execute.
