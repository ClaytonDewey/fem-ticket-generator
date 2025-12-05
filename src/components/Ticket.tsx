import { Icon } from '../svg';

type TicketProps = {
  name: string;
  avatar: string;
  gitUser: string;
  ticketNum: number;
};

const Ticket = ({ name, avatar, gitUser, ticketNum }: TicketProps) => {
  return (
    <section className='ticket'>
      <Icon name='ticket' />
      <div className='ticket__body'>
        <div className='ticket__meta'>
          <div className='ticket__header'>
            <div className='ticket__header-logo'>
              <Icon name='logo-mark' />
            </div>
            <div className='ticket__header-text'>
              <h2>Coding Conf</h2>
              <p className='ticket__header-date'>Jan 31, 2025 / Austin, TX</p>
            </div>
          </div>
          <div className='ticket__info'>
            <div className='avatar'>
              <img src={avatar} alt={name} />
            </div>
            <div className='ticket__info-text'>
              <h3>{name}</h3>
              <div className='git-user'>
                <Icon name='github' /> @{gitUser}
              </div>
            </div>
          </div>
        </div>
        <div className='ticket__number'>#0{ticketNum}</div>
      </div>
    </section>
  );
};
export default Ticket;
