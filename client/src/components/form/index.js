import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import FormFooter from '../form-footer';
import FormSection from '../form-section';

const Form = (props) => {
    const { data, properties } = props;

    const [isSuccess, setSuccess] = useState(false);
    const [values, setValues] = useState({});

    const unsetSuccess = () => setSuccess(false);

    const onChange = e => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    }

    const onSubmit = async e => {
        unsetSuccess();
        e.preventDefault();
        const { getAccessTokenSilently } = useAuth0();
        const token = await getAccessTokenSilently();
        // TODO: replace with env variable once available
        fetch('http://localhost:5050/config', {
            body: JSON.stringify(values),
            headers: {
                authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
        .then(res => res.json())
        .then(setSuccess)
    }

    const resetForm = () => {
        const flattenedData = data.map(d => [...d[2]][0]);
        const newValues = flattenedData.reduce((acc, d) => {
            acc[d.name] = properties[d.name];
            return acc;
        }, {});

        setValues(newValues);
    }

    useEffect(() => {
        return resetForm();
    }, []);

    return (
        <form onSubmit={onSubmit}>
            {data.map(s => <FormSection section={s} values={values} onChange={onChange} />)}
            <FormFooter onCancel={resetForm} isSuccess={isSuccess} onMessageClose={unsetSuccess} />
        </form>
    );
}

export default Form;