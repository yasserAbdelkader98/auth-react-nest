function Home() {
  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=3840&q=90')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.7)',
      }}
    >
      <h1>Welcome to the application</h1>
    </div>
  );
}

export default Home;
