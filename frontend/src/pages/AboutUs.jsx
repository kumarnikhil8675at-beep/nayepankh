import React from 'react';

export default function AboutUs() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', margin: '3rem 0' }}>
         <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Who We Are</h1>
         <p style={{ color: 'var(--text-muted)' }}>About Us</p>
      </div>

      <div className='landing-section section-surface' style={{ borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '50px' }}>
          <div style={{ marginBottom: '50px' }}>
            <h2>How it started?</h2>
            <p>
               As we all know, 2020 was a year the world was striving to survive the global pandemic of covid-19. During these dire times we felt an urge to make an impact with whatever we had, and so we tried!! We tried to uplift the underprivileged and help the needy with all our resources and material we could arrange, it was tough but we didn't lose our hope and kept going in order to bring a change everyone was expecting the bigger authorities to bring in the societies on smaller levels. We started off as a group of bunch of highschoolers but now are a team of numerous people from different parts of the city and state! 28th March 2021, the day we officially landed on the ground to serve our duties as the youth of the most rapidly progressing nation afterall, the main hope of a nation lies in the arms of its youth. 
            </p>
          </div>
          <div>
            <img style={{ borderRadius: '12px', maxWidth: '100%' }} src='https://ik.imagekit.io/hswujnlap/img-20210530-wa0251_1622926825-mP4ZLjyn3ecJBJrR.avif' alt="How it started" />
          </div>
        </div>

        <h2>What is NayePankh?</h2>
        <p>Nayepankh foundation was initiated to bring a change and help people during the tough times of Covid. Later in the year, the NGO started to expand their operations and provide help to a wider section of the society. With this revamped vision, the NGO acquired the name of NayePankh – giving wings to uplift the underprivileged section of our society. NayePankh is one of the eminent NGOs espoused in providing food, sanitary napkins, clothes, educating underprivileged sectors of our society for the better future. We make efforts to solve daily problems faced by people of India. Most of the young women feel humiliating in public places during their menstrual cycle; to bring change we create awareness campaigns among woman and youths about personal hygiene, providing sanitary napkins. Also, in our endeavour to fight hunger we distribute food not only to the underprivileged community but also to the stray animals. We are also providing clothes to the poor families. Till date we have helped more than two lakhs of people. Although this seems quite a big achievement, but our goal is still not complete, therefore we’re continuing more with hustle. When lockdown was hitting hard, we took a decision and now we are a 12A and 80G certified NGO (that means if someone donates to NayePankh they will get a relief of 50%in income tax). The most striking feature about us is that we are completely led by the youths of our country, many of whom are still in their colleges and schools. We are on a mission to make this earth a better place to live for all creatures. We are here as 'BADALTE BHARAT KI NAYI TASVEER'!!</p>
      </div>
    </div>
  );
}
