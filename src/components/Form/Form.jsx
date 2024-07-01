import React, { useCallback, useEffect, useState } from "react";
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const { tg } = useTelegram();

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }
    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        };
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send'
        })
    }, [])

    useEffect(() => {
        if (!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    return (
        <div className={'form'}>
            <h3>Enter the data</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Country'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Street'}
                value={street}
                onChange={onChangeStreet}
            />
            <select className={'select'} value={subject} onChange={onChangeSubject}>
                <option value={'legal'}>Legal entity</option>
                <option value={'physical'}>Person</option>
            </select>
        </div>
    )
}

export default Form;