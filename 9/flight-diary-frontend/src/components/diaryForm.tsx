import { useState } from "react";
import { DiaryFormValues, Visibility, Weather } from "../types";

interface Props {
  submitNewDiary: (values: DiaryFormValues) => void;
}

const DiaryForm = ({ submitNewDiary }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Rainy);
  const [comment, setComment] = useState('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDate(e.target.value);
    console.log(date)
  }

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVisibility(e.target.value as Visibility);
    console.log(visibility);
  }

  const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWeather(e.target.value as Weather);
    console.log(weather);
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setComment(e.target.value);
    console.log(comment);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    submitNewDiary({
      date,
      visibility,
      weather,
      comment
    })

    clearRadioButtons()
    setDate('')
    setComment('')
  }

  const clearRadioButtons = () => {
    const elements = document.querySelectorAll("input[type=radio]");
    elements.forEach((element) => {
      const radioElement = element as HTMLInputElement;
      radioElement.checked = false;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add new entry</h3>

        <input type="date" id="diaryFormDateField" value={date} min="1992-10-10" max="2024-01-01" onChange={handleDateChange} />

        <div id="visibilityFormRadio">
          <label>Visibility: </label>
          <fieldset>
            <label htmlFor="visibilityChoiceGreat">great</label>
            <input 
              type="radio"
              id="visibilityChoiceGreat"
              name="visibility"
              value="great"
              onChange={handleVisibilityChange}/>

            <label htmlFor="visibilityChoiceGood">good</label>
            <input 
              type="radio"
              id="visibilityChoiceGood"
              name="visibility"
              value="good"
              onChange={handleVisibilityChange}/>
            
            <label htmlFor="visibilityChoiceOk">ok</label>
            <input 
              type="radio"
              id="visibilityChoiceGood"
              name="visibility"
              value="ok"
              onChange={handleVisibilityChange}/>

            <label htmlFor="visibilityChoicePoor">poor</label>
            <input 
              type="radio"
              id="visibilityChoicePoor"
              name="visibility"
              value="poor"
              onChange={handleVisibilityChange}/>
          </fieldset>
        </div>

        <div id="weatherFormRadio">
          <label>Weather: </label>
          <fieldset>
            <label htmlFor="weatherChoiceSunny">sunny</label>
            <input 
              type="radio"
              id="weatherChoiceSunny"
              name="weather"
              value="sunny"
              onChange={handleWeatherChange}/>
            
            <label htmlFor="weatherChoiceRainy">rainy</label>
            <input
              type="radio"
              id="weatherChoiceRainy"
              name="weather"
              value="rainy"
              onChange={handleWeatherChange}/>
            
            <label htmlFor="weatherChoiceCloudy">cloudy</label>
            <input
              type="radio"
              id="weatherChoiceCloudy"
              name="weather"
              value="cloudy"
              onChange={handleWeatherChange}/>
            
            <label htmlFor="weatherChoiceStormy">stormy</label>
            <input 
              type="radio"
              id="weatherChoiceStormy"
              name="weather"
              value="Stormy"
              onChange={handleWeatherChange}/>
            
            <label htmlFor="weatherChoiceWindy">windy</label>
            <input
              type="radio"
              id="weatherChoiceWindy"
              name="weather"
              value="windy"
              onChange={handleWeatherChange}/>
          </fieldset>
        </div>

        <div id="commentForm">
          <label>Comment: </label>
          <input id="formCommentField" onChange={handleCommentChange} value={comment}/>
        </div>

        <button id="formAddButton">add</button>


      </form>
      
    </div>
  )
}

export default DiaryForm