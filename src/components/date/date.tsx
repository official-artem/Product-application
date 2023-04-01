import Image from 'next/image';
import { FC, useEffect, useState } from 'react'


const Data: FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat('en-EN', options).format(date);

  const datOfWeek = formattedDate.split(' ')[0].slice(0, -1);
  const day = formattedDate.split(' ')[1];
  const month = formattedDate.split(' ')[2].slice(0, -1);
  const year = formattedDate.split(' ')[3];

  const capitalize = (value: string) => {
    const [firstLetter, ...otherPart] = value;

    return firstLetter.toUpperCase() + otherPart.join('');
  }

  return (
    <div className='d-flex align-items-start flex-column p-1'>
      <p className='m-0'>{capitalize(datOfWeek)}</p>
      <div className='d-flex gap-5'>
        <span>{`${day} ${capitalize(month)}, ${year}`}</span>
        <div>
          <Image className='me-2' src='/clock_icon.png' width={16} height={16} alt="clock_icon" />
          <span>{`${date.toLocaleTimeString().slice(0, -3)}`}</span>
        </div>
      </div>
    </div>
  )
}

export default Data