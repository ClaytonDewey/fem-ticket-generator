import { Header, Form, Ticket, Footer } from './components';
import useTicketStore from './store/useTicketStore';

const App = () => {
  const { name, avatar, gitUser, ticketNum, isSubmitted } = useTicketStore();
  return (
    <>
      <Header />
      <main>
        {!isSubmitted ? (
          <>
            <Form />
          </>
        ) : (
          <>
            <Ticket
              name={name}
              avatar={avatar}
              gitUser={gitUser}
              ticketNum={ticketNum}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};
export default App;
