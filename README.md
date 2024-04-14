# Notes
https://cardmate.io

Notes is a demo project that showcases my coding abilities and skills. This project is built using Nx, Nest JS, TypeScript, Angular, NgRx, Playwright, Docker, Terraform, and Ansible, and it is hosted on AWS EC2. The entire development and deployment process is automated with GitHub Actions, demonstrating Continuous Integration and Continuous Deployment practices.

## Technical Stack

- **Nx Monorepo:** 

    The project is organized as an Nx monorepo, allowing for efficient code sharing and reusability across different applications and libraries.

- **Angular Frontend:** 

    The frontend is built with Angular, providing a responsive and user-friendly interface. It demonstrates my proficiency in creating modern and dynamic web applications.

- **NgRx State Management:** 

    NgRx is utilized for state management in the Angular frontend, ensuring a predictable and efficient data flow within the application.

- **Playwright for End-to-End Testing:** 

    Playwright is employed for end-to-end testing of the application, allowing for automated testing of user interactions across various browsers.

- **Nest JS Backend:** 

    The backend is powered by Nest JS, a scalable and extensible Node.js framework. It follows RESTful API principles and is designed for maintainability and scalability.

- **Docker Containers:** 

    The project is containerized using Docker, facilitating seamless deployment across different environments and ensuring consistency.

- **Infrastructure as Code (IaC):** 

    Infrastructure is managed as code using Terraform, enabling the provisioning and scaling of resources with ease.

- **Automation with Ansible:** 

    Ansible is employed for configuration management and automation, streamlining the deployment process and ensuring consistency across environments.

- **CI/CD with GitHub Actions:** 

    The project follows CI/CD best practices using GitHub Actions, automating the testing, building, and deployment processes with each push to the repository.




## Getting Started

To get started with Notes, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/aimadjaouhar1/notes.git
    
    cd notes

2. **Install the dependencies:**
   ```bash
   npm install

3. **Rename .env.example file and edit the environement variables:**
   ```bash
   mv .env.example .env

4. **Run the database:**
   ```bash
   docker-compose up db -d 

4. **Run the application:**

    ```bash
        nx serve api
        nx serve web
    ```
    Open your browser and navigate to http://localhost:4200 to access the application.
    
    or

    ```bash
        docker-compose up api -d
        docker-compose up web -d
    ```

    Open your browser and navigate to http://localhost:80 to access the application.

## Linting

    ```bash
        nx lint api
        nx lint web
    ```

## Testing

    ```bash
        nx e2e web-e2e
    ```