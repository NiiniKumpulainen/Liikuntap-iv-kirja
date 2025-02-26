import { useNavigate } from 'react-router-dom';
import useForm from '../../shared/useform/useform';
import styles from './ItemForm.module.scss';
import Button from '../../shared/buttons';

function ItemForm(props) {
  const navigate = useNavigate();

  const submit = () => {
    let storedValues = Object.assign({}, values);
    storedValues.amount = parseFloat(storedValues.amount);
    storedValues.id = storedValues.id ? storedValues.id : crypto.randomUUID();
    props.onItemSubmit(storedValues);
    navigate(-1);
  };

  const initialState = props.formData ? props.formData : {
    type: "",
    amount: 0,
    date: "",
    length: ""
  };

  const { values, handleChange, handleSubmit } = useForm(submit, initialState, false);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    props.onItemDelete(values.id);
    navigate(-1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.itemform}>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='type'>Liikuntamuoto</label>
              <select id='type' name='type' onChange={handleChange} value={values.type}>
                <option value="">(valitse)</option>
                {props.typelist.map(
                  type => <option key={type}>{type}</option>
                )}
              </select>
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='amount'>Liikuntaan kulunut aika</label>
              <input id='amount' type='text' name='amount' onChange={handleChange} value={values.amount} />
            </div>
            <div>
              <label htmlFor='date'>Liikunta päivä</label>
              <input type='date' id='date' name='date' onChange={handleChange} value={values.date} />
            </div>
          </div>

          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='length'>Liikunnan pituus</label>
              <input id='length' type='text' name='length' onChange={handleChange} value={values.length} />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <Button onClick={handleCancel}>PERUUTA</Button>
            </div>
            <div>
              <Button primary
                disabled={values.type &&
                  values.amount &&
                  values.date &&
                  values.length ? "" : "true"}
                type='submit'>
                {props.formData ? "TALLENNA" : "LISÄÄ"}
              </Button>
            </div>
          </div>
          {props.onItemDelete ?
            <div className={styles.itemform_row}>
              <div>
                <Button secondary onClick={handleDelete}>POISTA</Button>
              </div>
              <div></div>
            </div>
            : null}

        </div>
      </form>
    </div>
  );
}

export default ItemForm;