function HomePage({ userData }) {

  return (
    <div className="HomePage">
      <h1>Home Page</h1>
      <p>Welcome, {userData.name}!</p>
    </div>
  )
}

export default HomePage