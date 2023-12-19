import React from "react"

function About() {
  return (
    <main className="bg-box-color p-8 rounded-3xl max-w-7xl flex flex-col gap-8 mx-auto mt-24 font-mono">
      <section className="flex flex-col gap-4 ">
      <h1 className="uppercase text-3xl mb-2 font-extrabold tracking-widest text-center">About Me!</h1>
      <p>Hello there! I'm Haruday, a 2nd-year Computer Science undergraduate who started exploring the world of backend engineering during my winter holidays. It was during this time that I conceptualized and developed the Authentication Web App.</p>
      <p>The project was crafted using a set of powerful tools and frameworks, each chosen with a specific purpose in mind:</p>
      </section>
      <section className="hover:bg-slate-200 hover:p-4">
      <h3 className="uppercase mb-4 text-xl font-extrabold tracking-widest">Key Technologies Used:</h3>
      <ul className="flex flex-col gap-2">
        <li><strong>Express.js:</strong> For the server-side, I leveraged the capabilities of Express.js to build a robust and efficient backend, handling authentication requests seamlessly.</li>
        <li><strong>MongoDB:</strong> As the database of choice, MongoDB was employed to store user data securely, providing a reliable and scalable solution for our needs.</li>
        <li><strong>Vite with React:</strong> On the frontend, I opted for Vite with React to create a responsive and dynamic user interface, ensuring a smooth and engaging user experience.</li>
        <li><strong>Redux Tools:</strong> To manage the state of the application effectively, I integrated Redux tools, allowing for a streamlined flow of data and enhanced control over the application's behavior.</li>
      </ul>
      </section>
      <section className="hover:bg-slate-200 hover:p-4">
      <h3 className="uppercase mb-4 text-xl font-extrabold tracking-widest">Key Objectives:</h3>
      <ul className="flex flex-col gap-2">
        <li><strong>Learning Experience:</strong> The app was developed as a learning project to gain hands-on experience with Express.js, MongoDB, Vite with React, and Redux Tools.</li>
        <li><strong>Security First:</strong> Throughout the development process, the main focus was on creating a secure environment for user authentication.</li>
      </ul>

      <p>The choice of these tools reflects a commitment to utilizing industry-standard technologies and frameworks to create a secure, efficient, and enjoyable user experience. Your feedback and support are invaluable as I continue to refine and enhance this project.</p>

      </section>
      <p className="text-right mx-auto underline">Thank you for being a part of this journey!</p>

    </main>

  )
}

export default About;
