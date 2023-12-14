'uce client'
import React from 'react';

const TeamMemberCard = ({ name, position, imageUrl }) => (
    <div className="max-w-xs mx-auto mb-4 border border-brown rounded">
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover rounded-t" />
        <div className="bg-brown text-white p-4 rounded-b">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-500">{position}</p>
        </div>
    </div>
);

const About = () => {
    const leads = [
        { name: 'John Doe', position: 'President', imageUrl: 'https://placekitten.com/600/400' },
        { name: 'Jane Doe', position: 'Vice President', imageUrl: 'https://placekitten.com/300/200' },
    ];
    const relation = [
        { name: 'John Doe', position: 'Design Lead', imageUrl: 'https://placekitten.com/600/400' },
        { name: 'Jane Doe', position: 'Co-Design Lead', imageUrl: 'https://placekitten.com/300/200' },
        { name: 'Jane Doe', position: 'Co-Design Lead', imageUrl: 'https://placekitten.com/300/200' },
    ];
    const design = [
        { name: 'John Doe', position: 'Design Lead', imageUrl: 'https://placekitten.com/600/400' },
        { name: 'Jane Doe', position: 'Co-Design Lead', imageUrl: 'https://placekitten.com/300/200' },
        { name: 'Jane Doe', position: 'Co-Design Lead', imageUrl: 'https://placekitten.com/300/200' },
    ];
    const tech = [
        { name: 'Saini', position: 'Co-Design Lead', imageUrl: 'https://placekitten.com/300/200' },
        { name: 'Vansh Bhardwaj', position: 'Design Lead', imageUrl: 'https://placekitten.com/600/400' },
    ];
    const market = [
        { name: 'John Doe', position: 'Design Lead', imageUrl: 'https://placekitten.com/600/400' },
        { name: 'Jane Doe', position: 'Co-Design Lead', imageUrl: 'https://placekitten.com/300/200' },
        { name: 'Jane Doe', position: 'Co-Design Lead', imageUrl: 'https://placekitten.com/300/200' },
    ];
    const content = [
        { name: 'John Doe', position: 'Design Lead', imageUrl: 'https://placekitten.com/600/400' },
        { name: 'Jane Doe', position: 'Co-Design Lead', imageUrl: 'https://placekitten.com/300/200' },
        { name: 'Jane Doe', position: 'Co-Design Lead', imageUrl: 'https://placekitten.com/300/200' },
    ];

    return (
        <div className="container mx-auto p-4 bg-brown text-white">
            <br />
            <br />
            <br />
            <h1 className="text-3xl font-bold mb-4">
                About <span className='text-primary'>E Cell UVCE</span>
            </h1>
            <p className="mb-4">
                Welcome to our company's About Us page! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.
            </p>
            <p className="mb-4 text-primary">
                Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.
                Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.
            </p>
            <p className="mb-4">
                Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.
                Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
            <br />
            <br />

            {/* team */}
            <h1 className="text-3xl font-bold mb-4">Team <span className='text-primary'>E Cell UVCE</span></h1>
            <br />
            <h1 className="text-2xl text-center font-bold mb-4">Presidents</h1>
            <br />
            <div className="flex flex-wrap justify-evenly">
                {leads.map((member, index) => (
                    <TeamMemberCard key={index} {...member} />
                ))}
            </div>
            <br />
            <h1 className="text-2xl text-center font-bold mb-4">Public Relations Team</h1>
            <br />
            <div className="flex flex-wrap justify-evenly">
                {relation.map((member, index) => (
                    <TeamMemberCard key={index} {...member} />
                ))}
            </div>
            <br />
            <h1 className="text-2xl text-center font-bold mb-4">Design Team</h1>
            <br />
            <div className="flex flex-wrap justify-evenly">
                {design.map((member, index) => (
                    <TeamMemberCard key={index} {...member} />
                ))}
            </div>
            <br />
            <h1 className="text-2xl text-center font-bold mb-4">Technical Team</h1>
            <br />
            <div className="flex flex-wrap justify-evenly">
                {tech.map((member, index) => (
                    <TeamMemberCard key={index} {...member} />
                ))}
            </div>
            <br />
            <h1 className="text-2xl text-center font-bold mb-4">Marketing Team</h1>
            <br />
            <div className="flex flex-wrap justify-evenly">
                {market.map((member, index) => (
                    <TeamMemberCard key={index} {...member} />
                ))}
            </div>
            <br />
            <h1 className="text-2xl text-center font-bold mb-4">Content Team</h1>
            <br />
            <div className="flex flex-wrap justify-evenly">
                {market.map((member, index) => (
                    <TeamMemberCard key={index} {...member} />
                ))}
            </div>
            <br />
            <h1 className="text-2xl text-center font-bold mb-4">Operations Team</h1>
            <br />
            <div className="flex flex-wrap justify-evenly">
                {market.map((member, index) => (
                    <TeamMemberCard key={index} {...member} />
                ))}
            </div>
        </div>
    );
};

export default About;
