export default function AboutUs() {
  const teamMembers = [
    { name: 'FAiruz Anadi', role: 'Founder', image: 'https://i.pravatar.cc/150?img=12' },
    { name: 'Naima Sultana', role: 'Director', image: 'https://i.pravatar.cc/150?img=33' },
    { name: 'Mirazum Mahin', role: 'Manager', image: 'https://i.pravatar.cc/150?img=47' }
  ];

  return (
    <section className="about-us">
      <h2>About Us</h2>

      <div className="about-section">
        <h3>Our mission</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luc Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Maecenas luc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luc
        </p>
      </div>

      <div className="about-section">
        <h3>Our history</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luc Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Maecenas luc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luc
        </p>
      </div>

      <div className="about-section">
        <h3>Our team</h3>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={member.name} />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}