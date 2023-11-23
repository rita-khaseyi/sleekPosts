
"use client"
import useGetUsers from '../hooks/useGetUsers';
import Cookies from 'js-cookie';
import './style.css';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import Image from 'next/image';

const Profile: React.FC = () => {
  const { users } = useGetUsers();
  const loggedInUsername = Cookies.get('loggedInUsername');
  const loggedInZipcode = Cookies.get('loggedInZipcode');

  // Find the user with matching credentials
  const matchingUser = users.find(
    (u) => (u.username === loggedInUsername || u.email === loggedInUsername) && u.address.zipcode === loggedInZipcode
  );

  if (!matchingUser) {
    // Redirect to the login page if user data is not available
    // router.push('/login');
    return null;
  }

  return (
    <div>
        <Navbar/>
    <div className="profile-container">
      <div className="avatar-container">
        <Image src="/assests/jayy.jpg" alt="User Avatar" className="avatar" />
      </div>
      <h1>Profile</h1>
      <div className="profile-details">
        <p>
          <strong>ID:</strong> {matchingUser.id}
        </p>
        <p>
          <strong>Name:</strong> {matchingUser.name}
        </p>
        <p>
          <strong>Username:</strong> {matchingUser.username}
        </p>
        <p>
          <strong>Email:</strong> {matchingUser.email}
        </p>
        <p>
          <strong>Address:</strong> {matchingUser.address.street}, {matchingUser.address.suite}, {matchingUser.address.city},{' '}
          {matchingUser.address.zipcode}
        </p>
        <p>
          <strong>Phone:</strong> {matchingUser.phone}
        </p>
        <p>
          <strong>Website:</strong> {matchingUser.website}
        </p>
        <p>
          <strong>Company:</strong> {matchingUser.company.name} - {matchingUser.company.catchPhrase}
        </p>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Profile;
