import React from "react"
// import '../home.css'


function Home() {
  return (
    <main className=" max-w-7xl flex gap-16 mx-auto mt-24 font-mono">
      <h1 className="uppercase text-3xl font-extrabold place-self-center p-4 tracking-widest text-center">Welcome to the Authentication Web App!</h1>
      <section className="bg-surround rounded-lg p-4 flex flex-col gap-8 ">
        <p className="text-xl font-bold place-self-center uppercase tracking-wide">Secure your online experience with our simple and efficient Authentication Web App. Take control of your account with the following features:</p>
        <ul className="flex flex-col gap-4 ">
          <li className="text-justify hover:text-lg"><span className="text-2xl underline text-slate-700 block hover:text-3xl hover:text-slate-900 hover:shadow-slate-500 mb-2">Sign Up:</span> Create a new account to establish your presence in our community.</li>
          <li className="text-justify hover:text-lg"><span className="text-2xl underline text-slate-700 block hover:text-3xl hover:text-slate-900 hover:shadow-slate-500 mb-2 ">Sign In:</span> Log in with your credentials. Our backend will verify your identity and provide you with an access token upon success.</li>
          <li className="text-justify hover:text-lg"><span className="text-2xl underline text-slate-700 block hover:text-3xl hover:text-slate-900 hover:shadow-slate-500 mb-2 ">Profile Page:</span> Manage your personal information and enhance your profile by adding an image.</li>
          <li className="text-justify hover:text-lg"><span className="text-2xl underline text-slate-700 block hover:text-3xl hover:text-slate-900 hover:shadow-slate-500 mb-2 ">Sign Out:</span> Log out whenever you're done. Your security is our priority.</li>
          <li className="text-justify hover:text-lg"><span className="text-2xl underline text-slate-700 block hover:text-3xl hover:text-slate-900 hover:shadow-slate-500 mb-2 ">Delete Account:</span> If you choose to leave, delete your account securely from our database.</li>
          <li className="text-justify hover:text-lg"><span className="text-2xl underline text-slate-700 block hover:text-3xl hover:text-slate-900 hover:shadow-slate-500 mb-2 ">Google Sign In:</span> Experience the convenience of signing in with your Google account, thanks to Firebase integration.</li>
        </ul>
      </section>
      {/* <footer>
      <p>Our user-friendly interface ensures a smooth journey through these features. Your data is handled with utmost care, and your privacy is our top concern.</p>

      <p>Ready to get started? Click the buttons below to Sign Up or Sign In.</p>

      <a href="signup.html"><button>Sign Up</button></a>
      <a href="signin.html"><button>Sign In</button></a>
      </footer> */}
    </main>
  )
}

export default Home;

