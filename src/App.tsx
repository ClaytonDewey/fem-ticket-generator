import { Header, Form, Ticket, Footer } from './components';
import avatarImg from './images/image-avatar.jpg';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Form />
        {/* <Ticket
          name='Clayton Dewey'
          avatar={avatarImg}
          gitUser='ClaytonDewey'
          ticketNum={1609}
        /> */}
      </main>
      <Footer />
    </>
  );
};
export default App;
