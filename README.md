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

-   clone repo https://github.com/Drbenzene/xpaybills
-   npm i
-   create .env file in root dir. example file exists in the env.example file
-   start containers: docker compose up -d --build -V

## postman documantation:

-   https://documenter.getpostman.com/view/17815804/2sA3QwcVgz
