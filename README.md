# XBILLPAY

## Breakdown of Functionality:

-   Agent Authentication and Authorization
-   XBillpay Agent Wallet
-   Bill Payment via Agent Wallet
-   Wallet to Wallet Transfer

## Design Microservices Folder:

-   Auth : authentication and authorization of agents.
-   Wallet : agent wallets and wallet transactions.
-   Payment: bill payments.
-   Transfer: wallet-to-wallet transfers.

## HOW TO START THE APP

-   clone rEPO
-   npm i
-   create .env file in root dir. example file exists in the env.example file
-   start containers: docker compose up -d --build -V

## postman documantation:

-   https://documenter.getpostman.com/view/18642736/2sA3JJ9Nrx
