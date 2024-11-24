# Mint Me A Moment

**Mint Me A Moment** is a web3 application on the Solana blockchain that allows supporters to send SOL tips to their favorite creators. Inspired by the "Buy Me a Coffee" concept, this dApp leverages Solana's fast and low-cost transactions.

## Features

* **Anchor-based Solana program** for managing tips and tracking history.
* **React frontend** for a simple and elegant user interface.
* **Support multiple tips** from tippers with on-chain storage of tip history using PDAs.

## Folder Structure

The repository has the following structure:

### 1. Anchor Program
The on-chain program handles the logic for tipping and storing tip history.

### 2. React UI
The frontend enables users to tip creators and view tip history.

## Getting Started

### 1. Setting up the Anchor Program
1. Navigate to the `anchor_project` folder:
   ```bash
   cd anchor_project

2. Build and deploy the program
    ```bash
   anchor build
   anchor deploy

### 2. Setting up the Frontend UI

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend

2. Update env variable `NEXT_PUBLIC_CREATOR_WALLET_ADDRESS` 

3. Build and deploy the program
    ```bash
   npm install
   npm run dev

### How It Works:
- **Tip a Creator**: Users can send SOL to a predefined creator wallet directly from the frontend.
- **View Tip History**: The frontend displays a list of all tips sent to the creator, including the tipper's address, message, and amount.

### Technical Details:
- **Cross-Program Invocation (CPI)**: Used to transfer SOL from the tipper to the creator.
- **Program Derived Address (PDA)**: Stores the tip history on-chain.
