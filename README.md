# CollabHub: Revolutionizing Real-time Team Collaboration

CollabHub is a powerful, full-stack web application designed to redefine real-time collaboration for teams. Built with React (front-end) and a Node.js/Socket.IO server (back-end), CollabHub allows users to seamlessly work together on projects involving **live drawing, live coding, and rich text editing** – all within a single, intuitive platform.  Forget the frustration of juggling multiple tools and experiencing communication delays. CollabHub streamlines your workflow, boosting productivity and fostering creativity.

> [!IMPORTANT]
> ### Frontend is only hosted, run application locally to use its features..

##  Three Powerful Apps in One Platform

CollabHub's strength lies in its integrated approach to real-time collaboration, offering three core applications in one:


**1. Live Drawing:** A collaborative digital whiteboard perfect for brainstorming, design reviews, and remote team meetings.  Users can draw freely, add various shapes (rectangles, circles, arrows, stars, polygons), and utilize an eraser, all synchronized in real-time. The ability to undo and redo actions and export the finished product as an image enhances usability.  Forget emailing image iterations back and forth; see your design evolve organically as a team.
> [!CAUTION]
> ### Please be advised that there are performance issues with the Live Drawing tools, and certain features may cause the application to become unstable or crash.

**Demo:**

[draw-demo.webm](https://github.com/user-attachments/assets/ce9e02a8-fdf5-43cd-9b06-b72071de6222)


**2. Live Coding:**  This shared coding environment revolutionizes collaborative software development.  Programmers can code together in real time, benefiting from built-in syntax highlighting and language autocompletion. The intuitive editor enhances real-time comprehension and discussion while the shared workspace enables developers to collectively approach problem solving more quickly and more cohesively.

**Demo:**

[code-demo.webm](https://github.com/user-attachments/assets/bda22f40-6ed6-4704-9ba2-437bf9de7dc7)


**3. Rich Text Editing:** Similar in operation to popular tools like Google Docs or Etherpad, this robust editor allows several writers to work on a document at once.  Full support for rich text formatting, including various headers, formatting (bold, italics, underline, etc.), lists, alignment, links, images, video embedding, and mathematical formulas, creates an immensely usable shared workspace. This tool is extremely suited for content creation and joint document refinement.

**Demo:**

[text-demo.webm](https://github.com/user-attachments/assets/018a14d4-0dd5-4c94-9634-b0e06db68f93)


## Project Structure

The project follows a clean and efficient structure:

* **Client (`client` directory):** Houses the React application, utilizing Tailwind CSS for styling, `framer-motion` for animations, `react-konva` for the canvas, `react-quill` for the rich text editor, and Socket.IO for real-time communication.
* **Server (`server` directory):** Hosts the Node.js server with Socket.IO to manage real-time communication, and to keep track of shared session data like drawing and coding inputs and state changes for documents. Uses Express.js for backend routing.
* **LICENSE:** [MIT License](LICENSE)


## Getting Started

Follow these steps to run CollabHub locally:


**Prerequisites:**

* Node.js and npm (or yarn) installed on your machine.


**1. Cloning the Repository:**

```bash
git clone https://github.com/exyreams/Collabhub.git
cd Collabhub
```

**2. Installing Dependencies:**

```bash
# Client
cd Collabhub/client
npm install

# Server
cd Collabhub/server
npm install
```

**3. Running the Server:**

```bash
cd Collabhub/server
node server.js
```

(Starts on port 5000, unless the `PORT` environment variable is set)

**4. Running the Client:**

In a separate terminal:

```bash
cd Collabhub/client
npm run start
```

(Opens the app in your browser at `http://localhost:3000`)

**5.  Using CollabHub:**

Access `http://localhost:3000`. Create new sessions by navigating to a collaborative environment.  A simple Session ID and Password allow entry into already running sessions without the need for user creation, signups or accounts of any kind for simpler engagement.
- **Sessions**
    - **Creating Session**
      Enter the values.  
      `Session ID`: // Any string can be used for this.  
      `Display Name`: // This name will show up in the live chat session, and you can use a different one on Join the Session  
      `Password`: // You can use whatever password you choose for the session.
    - **Joining Session**
      Enter the Session ID & Password & Use any name you would like to use.  
      `Session ID`: // Session ID that was created on earlier steps.  
      `Display Name`: // Input any Name you would like to use
      `Password`: // Session Password that was created on earlier steps.
      **Demo:**

      [session-details-demo.webm](https://github.com/user-attachments/assets/b832765f-6225-4192-b56b-38c7ed7853de)
## Styling & User Experience

CollabHub uses a modern design, employing Tailwind CSS for a responsive layout. The `glassmorphism` CSS styles (see `client/src/index.css`) provide a sleek, visually appealing interface and highlight various application panels for intuitive use.

## Technology Stack

* **Client (Front-end):** React, React Router, Tailwind CSS, Framer Motion, React Konva, React Quill, Socket.IO-Client, Lucide React, React Color.
* **Server (Back-end):** Node.js, Express.js, Socket.IO, CORS.
