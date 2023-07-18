import useSWRSubscription from 'swr/subscription';

const Countdown = () => {
  const { data } = useSWRSubscription(
    'ws://localhost:5002',
    (key, { next }) => {
      const socket = new WebSocket(key);
      socket.addEventListener('message', (event) => next(null, event.data));
      socket.addEventListener('error', (event) => next(event.error));
      return () => socket.close();
    }
  );

  return (
    <>
      <p>{data}</p>
    </>
  );
};

export default Countdown;
