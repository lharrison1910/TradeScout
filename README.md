# TradeScout 🧭

> **The Making Tax Digital (MTD) app built for tradespeople, not accountants.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![MTD Ready](https://img.shields.io/badge/HMRC-MTD_Ready-blue)](https://www.gov.uk/government/publications/making-tax-digital)

TradeScout is a hyper-simple compliance and expense tracking app. It is designed specifically for UK sole traders, subbies, and tradespeople who need to comply with HMRC's Making Tax Digital (MTD) rules, but absolutely hate doing admin. 

No ledgers. No "reconciliation". No dashboards covered in pie charts. Just snap it, tap it, and get back to work.

## 🚧 The Philosophy: Zero-Accounting UI

Big accounting software is built for 50-person agencies and retail shops. TradeScout is built for the van dashboard. 

*   **Inbox, Not Dashboard:** Admin is treated like an inbox. Users log in, see what needs clearing (e.g., *“You have 3 receipts to scan”*), do it, and close the app.
*   **High-Vis Design:** Built with extreme contrast and fat-finger-friendly touch targets.
*   **No Finance Jargon:** We use words like *Money In*, *Money Out*, and *Match*. We never use *Chart of Accounts* or *Accounts Payable*.

## ✨ Core Features

*   📸 **One-Tap Receipt Scanner:** OCR technology to instantly extract date, amount, and supplier from screwed-up petrol receipts.
*   📥 **The Admin Inbox:** A linear, to-do list approach to clearing outstanding tasks.
*   🏦 **Open Banking Sync:** Securely pull in transactions to match against photos and invoices with zero manual data entry.
*   🇬🇧 **HMRC MTD Direct Integration:** Push quarterly updates directly to the taxman via HMRC's official API.

## 🛠 Tech Stack

*   **Frontend:** React (Vite / PWA-optimized for mobile access)
*   **Backend:** NestJS (Node.js framework)
*   **Package Manager:** pnpm
*   **Database:** PostgreSQL / Prisma ORM
*   **OCR Engine:** Google Cloud Vision / AWS Textract
*   **Banking API:** TrueLayer / Plaid / GoCardless
*   **Tax Integration:** HMRC Developer Hub (MTD ITSA APIs)

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* pnpm (`npm install -g pnpm`)
* Nest CLI (`npm i -g @nestjs/cli`) - *Optional but recommended for backend generation*
* An HMRC Developer Sandbox Account (for testing MTD API calls)

### Installation

1. **Clone the repo**
```sh
   git clone [https://github.com/yourusername/tradescout.git](https://github.com/yourusername/tradescout.git)
   cd tradescout