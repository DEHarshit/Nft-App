import Countdown from 'react-countdown';

const CountdownTimer = ({ date }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className='font-primary text-2xl tracking-widest font-medium text-violet-700'>CURRENTLY NOT FOR SALE</span>;
    } else {
      return (
        <div className='flex  flex-col space-y-3'>
          <h2 className='font-primary text-white text-xl'>Sale Ends In...</h2>
          <div>
            <div className='flex font-primary text-white gap-10 items-center'>
              <div className='flex flex-col'>
                <span className='leading-8 text-4xl tracking-wide'>{days}</span>
                <span className='translate-y-2 '>Days</span>
              </div>
              <div className='flex flex-col'>
                <span className='leading-8 text-4xl tracking-wide'>{hours}</span>
                <span className='translate-y-2 '>Hours</span>
              </div>
              <div className='flex flex-col'>
                <span className='leading-8 text-4xl tracking-wide'>{minutes}</span>
                <span className='translate-y-2 '>Minutes</span>
              </div>
              <div className='flex flex-col'>
                <span className='leading-8 text-4xl tracking-wide'>{seconds}</span>
                <span className='translate-y-2 '>Seconds</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <Countdown date={date} renderer={renderer} />;
};

export default CountdownTimer;
