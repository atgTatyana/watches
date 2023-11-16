import { useState } from "react";
import { Watches } from "./Watches";

export interface IForm {
  town: string,
  zone: number,
}

export const ZoneForm = () => {
  const [form, setForm] = useState<IForm>({
    town: "",
    zone: 0,
  });
  const [formArray, setFormArray] = useState<IForm[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormArray([...formArray, form]);

    setForm({
      town: "",
      zone: 0,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm, 
      [name]: value,
    }))
  }

  const handleRemove = (town: string) => {
		setFormArray(prev => prev.filter(item => item.town !== town))
	}

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="town">Название</label>
          <input id="town" type="text" name="town" value={form.town} onChange={handleChange}/>
        </div>
        <div className="form-item">
          <label htmlFor="zone">Временная зона</label>
          <input id="zone" type="text" name="zone" value={form.zone} onChange={handleChange} />
        </div>
        <div className="form-item">
          <button className="form-button" type="submit" >Добавить</button>
        </div>
      </form>
      <div className="watches">
				{formArray.map(form => <Watches key={crypto.randomUUID()}
          town={form.town}
          zone={form.zone}
          remove={handleRemove} />)}	
			</div>
    </div>
  )
}
