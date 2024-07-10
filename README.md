# JudicialAI

## Description
JudicialAI is an automated system developed to predict final judgments in Sri Lankan legal cases using deep learning algorithms. The system provides access to relevant information and necessary instructions in both Sinhala and English. It employs a deep learning-based approach for text classification with a transformer model and the BERT algorithm. The system is web-based and developed using React.js, Python (Machine Learning), and Firebase.

## Problem Statement
As in many countries, the legal system in Sri Lanka faces the challenge of a growing number of legal cases, leading to prolonged case durations. This can result in overlooking important facts and legal issues, causing frustration among the parties involved and potential appeals. Experienced legal professionals may navigate these challenges more effectively, but newcomers and individuals without legal knowledge struggle to manage the complexities. JudicialAI aims to address these issues by providing a tool to predict legal decisions, assisting both legal professionals and the general public.

## Research Domain
The project focuses on criminal cases, leveraging deep learning techniques to analyze decided cases, evidence from both sides and relevant facts to make predictions.

## Features
- Predicts final judgments in Sri Lankan legal cases.
- Provides relevant legal information and instructions in Sinhala and English.
- Utilizes a deep learning-based approach with a transformer model and BERT algorithm.
- Web-based system for easy access and use.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Python (Machine Learning)
- **Database:** Firebase

## Installation
### Prerequisites
- Node.js
- Python
- Firebase Account

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/Supipi622/JudicialAI.git
    ```
2. Navigate to the project directory:
    ```bash
    cd JudicialAI
    ```
3. Install frontend dependencies:
    ```bash
    npm install
    ```
4. Set up the Python environment and install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5. Configure Firebase:
    - Create a Firebase project and obtain the configuration details.
    - Add the Firebase configuration to the project.

6. Start the development server:
    ```bash
    npm start
    ```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Register or log in to the application.
3. Input the legal case details to get the predicted judgment and access relevant information.

## Contributing
If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes.
4. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
5. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
6. Open a pull request.


