import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Clock.module.css'
import CustomButton from '../../Components/Atoms/CustomButton/CustomButton';
import CustomSelect from '../../Components/Atoms/CustomSelect/CustomSelect';
const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [isClockPaused, setClockPaused] = useState(false);
  const [selectCountry, setSelectCountry] = useState('UTC')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    let interval;

    const fetchTime = async () => {
      try {
        const responseCountry = await axios.get("http://worldtimeapi.org/api/timezone")
        setCountries(responseCountry.data)
      } catch (error) {
        console.error('Error fetching time data', error);
      }
    };

    const startClock = () => {
      interval = setInterval(() => {
        if (!isClockPaused) {
          setTime((prevTime) => new Date(prevTime.getTime() + 1000));
        }
      }, 1000);
    };

    fetchTime();
    startClock();

    return () => clearInterval(interval);
  }, [isClockPaused]);

  const toggleClockPause = () => {
    setClockPaused((prev) => !prev);
  };
  async function handleSelect(options) {
    const response = await axios.get(`http://worldtimeapi.org/api/timezone/${options}`);
    const serverTime = new Date(response.data.datetime);
    console.log(serverTime, 'time')
    setTime(serverTime);
    setSelectCountry(options);
  }
  return (
    <div className={style.clockContainer}>
      <CustomSelect text={countries} className={style.select} handleSelect={handleSelect} selected={selectCountry} />
      <h3 className={style.timer}>{time.toLocaleTimeString('en-US', { timeZone: selectCountry })}</h3>
      <CustomButton className={style.timerButton} onClick={toggleClockPause} text={'Pause/Start'} />
    </div>
  );
};

export default Clock;
