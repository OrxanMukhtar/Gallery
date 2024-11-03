// src/pages/Home.js

import React, { useState, useEffect } from 'react';
import '../assets/css/style.css';
import Registration from '../components/registration';

function Home() {
    const [inputNum, setInputNum] = useState('');
    const [displayH1, setDisplayH1] = useState('0');
    const [displayH3, setDisplayH3] = useState('');
    const [displayH5, setDisplayH5] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) setIsRegistered(true);

        // Keydown event listener
        const handleKeyDown = (event) => {
            const { key } = event;

            if (!isNaN(key)) {
                // Eğer basılan tuş bir rakamsa
                num(key);
            } else if (key === '+') {
                element('+');
            } else if (key === '-') {
                element('-');
            } else if (key === '*') {
                element('*');
            } else if (key === '/') {
                element('/');
            } else if (key === 'Enter' || key === '=') {
                equal();
            } else if (key === 'Backspace') {
                backspaceKey();
            } else if (key === 'Escape') {
                clear1();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputNum]);

    const handleRegisterClick = () => {
        setShowRegistration(true);
    };

    const closeRegistration = () => {
        setShowRegistration(false);
    };

    const num = (value) => {
        setInputNum((prev) => prev + value);
        setDisplayH1(inputNum + value);
    };

    const element = (value) => {
        setInputNum((prev) => prev + value);
        setDisplayH1(inputNum + value);
        setDisplayH5(value);
    };

    const clear1 = () => {
        setInputNum('');
        setDisplayH1('');
        setDisplayH3('');
        setDisplayH5('');
    };

    const persent = () => {
        const [num1, num2] = inputNum.split('*');
        const result = (parseFloat(num1) * parseFloat(num2)) / 100;
        setDisplayH1(result);
        setDisplayH5('%');
        setInputNum('');
    };

    const minus_plus = () => {
        const result = parseFloat(inputNum) * -1;
        setDisplayH1(result);
        setInputNum(result.toString());
    };

    const backspaceKey = () => {
        const updatedInput = inputNum.slice(0, -1);
        setInputNum(updatedInput);
        setDisplayH1(updatedInput);
    };

    const equal = () => {
        const savedPin = localStorage.getItem('pin');
        const result = eval(inputNum);
        setDisplayH3(inputNum);
        setDisplayH5('=');

        switch (inputNum) {
            case '6335557':
                setDisplayH1('🚀');
                break;
            case '100':
                setDisplayH1('💩');
                break;
            case '200':
                setDisplayH1('❤️');
                break;
            case '300':
                setDisplayH1('❤️');
                break;
            case '400':
                setDisplayH1('❤️');
                break;
            case '500':
                setDisplayH1('💰');
                break;
            default:
                if (inputNum === savedPin) {
                    window.location.href = '/gallery';
                } else {
                    setDisplayH1(result);
                }
                break;
        }
        setInputNum(result.toString());
    };

    return (
        <main>
            <div className="border_div HomeMain">
                {!isRegistered && !showRegistration && (
                    <button
                        id="registerButton"
                        onClick={handleRegisterClick}
                        style={{ padding: '1rem', fontSize: '1.5rem' }}
                    >
                        Register
                    </button>
                )}

                {showRegistration ? (
                    <div>
                        <Registration />
                        <button onClick={closeRegistration}>Close Registration</button>
                    </div>
                ) : (
                    <section className="main_body" id="main_body">
                        <header>
                            <div className="h3_div">
                                <h3 className="main_input_h3" style={{ height: '4rem' }} id="h3">
                                    {displayH3}
                                </h3>
                            </div>
                            <div className="input_div">
                                <h2 className="main_input_h1" id="h1">{displayH1}</h2>
                                <h5 id="h5">{displayH5}</h5>
                            </div>
                        </header>

                        <aside className="numbers container">
                            <article className="AC">
                                <div className="ac_btn" onClick={clear1}><h2>AC</h2></div>
                                <div onClick={minus_plus}><h2>+/-</h2></div>
                                <div onClick={persent}><h2>%</h2></div>
                                <div onClick={() => element('/')}><h2 className="bolur" style={{ color: 'coral' }}>/</h2></div>
                            </article>
                            <article className="AC">
                                <div onClick={() => num('7')}><h2>7</h2></div>
                                <div onClick={() => num('8')}><h2>8</h2></div>
                                <div onClick={() => num('9')}><h2>9</h2></div>
                                <div onClick={() => element('*')}><h2 style={{ color: 'coral' }}>x</h2></div>
                            </article>
                            <article className="AC">
                                <div onClick={() => num('4')}><h2>4</h2></div>
                                <div onClick={() => num('5')}><h2>5</h2></div>
                                <div onClick={() => num('6')}><h2>6</h2></div>
                                <div onClick={() => element('-')} className="minus"><h2 style={{ color: 'coral' }}>-</h2></div>
                            </article>
                            <div>
                                <article className="AC grid">
                                    <div onClick={() => num('1')}><h2>1</h2></div>
                                    <div onClick={() => num('2')}><h2>2</h2></div>
                                    <div onClick={() => num('3')}><h2>3</h2></div>
                                    <div onClick={() => element('+')} className="plus"><h2 style={{ color: 'coral' }}>+</h2></div>
                                    <div className="fo_fi_si">
                                        <div onClick={() => num('0')}><h2>0</h2></div>
                                        <div onClick={() => num('.')}><h2>.</h2></div>
                                        <div onClick={equal} className="egual"><h2 style={{ color: 'coral' }}>=</h2></div>
                                    </div>
                                </article>
                            </div>
                        </aside>
                    </section>
                )}
            </div>
        </main>
    );
}

export default Home;
